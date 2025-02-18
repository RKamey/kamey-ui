/**
 * @alias DynamicForm
 * @description The DynamicForm component is a form that allows you to create and update records.
 * @param {DynamicFormProps} props
 * @param {'create' | 'update'} props.mode - The mode of the form
 * @param {string} props.title - The title of the form
 * @param {string} props.description - The description of the form
 * @param {React.ElementType} props.icon - The icon of the form
 * @param {'vertical' | 'horizontal'} props.layout - The layout of the form
 * @param {number} props.cols - The number of columns of the form
 * @param {FormField[]} props.fields - The fields of the form
 * @param {string} props.submitButtonText - The text of the submit button
 * @param {() => void} props.onSubmit - The function to be called when the submit button is clicked
 * @param {Record<string, unknown>} props.initialData - The initial data of the form
 * @param {ApiConfig} props.apiConfig - The API configuration of the form
 * @returns {React.ReactNode}
 */

import React, { ReactElement, useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Row,
  Col,
  Upload,
} from "antd";
import { FormField, Options, Validations } from "./types";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";
import { BiUpload } from "react-icons/bi";

export interface ApiConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  responseDataPath?: string;
}

export interface DynamicFormProps {
  mode?: "create" | "update" | "view";
  title?: string | ReactElement;
  description?: string | ReactElement;
  icon?: ReactElement;
  layout?: "vertical" | "horizontal";
  cols?: 1 | 2 | 3 | 4;
  fields: FormField[] | FormField[][];
  submitButtonText?: string;
  onSubmit?: (data: unknown) => void;
  apiConfig?: ApiConfig;
  initialData?: Record<string, unknown>;
  customCols?: boolean;
}

export const DynamicForm = ({
  mode,
  title,
  description,
  icon,
  layout = "vertical",
  cols = 1,
  fields,
  submitButtonText = "Enviar",
  onSubmit,
  initialData = {},
  customCols = false,
}: DynamicFormProps): React.ReactNode => {
  const [form] = Form.useForm();
  const [selectOptions, setSelectOptions] = useState<Record<string, Options[]>>(
    {}
  );

  useEffect(() => {
  if (initialData && Object.keys(initialData).length > 0) {
    const formattedData = { ...initialData };
    
    // Formatear fechas si es necesario
    fields.filter((field): field is FormField => 
      typeof field === "object" && !Array.isArray(field)
    ).forEach(field => {
      if (field.type === "datepicker" && formattedData[field.name]) {
        formattedData[field.name] = dayjs(formattedData[field.name] as string | number | Date | null | undefined);
      }
    });

    form.setFieldsValue(formattedData);
  }
}, [form, initialData, fields]);

  useEffect(() => {
    fields
      .filter(
        (field): field is FormField =>
          typeof field === "object" && !Array.isArray(field)
      )
      .forEach((field) => {
        if (
          field.type === "select" &&
          field.selectConfig?.apiConfig &&
          !field.selectConfig.dependsOn
        ) {
          fetchSelectOptions(field);
        } else if (field.type === "select" && field.dependsOn) {
          fetchDependentOptions(
            field,
            initialData[field.dependsOn.field] as string
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: Record<string, unknown>) => {
    const formattedValues = { ...values };

    // Formatea los valores de los campos datepicker
    fields
      .filter(
        (field): field is FormField =>
          typeof field === "object" && !Array.isArray(field)
      )
      .forEach((field) => {
        if (field.type === "datepicker" && formattedValues[field.name]) {
          formattedValues[field.name] = dayjs(
            formattedValues[field.name] as string
          ).format(field.datepickerConfig?.format || "YYYY-MM-DD");
        }
      });

    onSubmit?.(formattedValues); // Envía los datos formateados
  };

  const fetchSelectOptions = async (field: FormField) => {
    if (!field.selectConfig?.apiConfig) return;

    const {
      url,
      getterMethod,
      method,
      headers,
      valueKey,
      labelKey,
      responseDataPath,
    } = field.selectConfig.apiConfig;

    let response: AxiosResponse | void;

    if (getterMethod) {
      response = (await getterMethod()) as AxiosResponse;
    } else {
      response = await axios.get(url ? url : "", {
        method: method || "GET",
        headers,
      });
    }

    const responseData =
      response && responseDataPath
        ? response.data[responseDataPath]
        : response?.data?.data;

    const data =
      Array.isArray(responseData) && Array.isArray(responseData[0])
        ? responseData[0]
        : responseData;

    const options = data.map((item: Record<string, unknown>) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));

    setSelectOptions((prev) => ({ ...prev, [field.name]: options }));
  };

  const fetchDependentOptions = async (
    field: FormField,
    parentValue: string | number
  ) => {
    if (!field.dependsOn) return;

    const {
      apiUrl,
      method = "GET",
      labelKey,
      valueKey,
      idPlaceholder = ":id",
    } = field.dependsOn;

    try {
      // Reemplazar el placeholder con el valor real
      const processedUrl = apiUrl.replace(
        idPlaceholder,
        parentValue.toString()
      );

      const response = await axios({
        url: processedUrl,
        method,
      });

      const responseData = response.data.data || response.data;

      const options = responseData.map((item: Record<string, unknown>) => ({
        value: item[valueKey],
        label: item[labelKey],
      }));

      setSelectOptions((prev) => ({ ...prev, [field.name]: options }));
      form.setFieldValue(field.name, undefined);
    } catch (error) {
      console.error(`Error fetching options for ${field.name}:`, error);
      setSelectOptions((prev) => ({ ...prev, [field.name]: [] }));
    }
  };

  const getFormattedPlaceholder = (
    field: FormField,
    parentFieldName?: string
  ) => {
    if (!field.dependsOn?.placeholderTemplate || !parentFieldName) {
      return field.placeholder;
    }

    // Obtener el valor del campo padre
    const parentField = fields.find(
      (f) =>
        typeof f === "object" && !Array.isArray(f) && f.name === parentFieldName
    ) as FormField;

    const parentValue = form.getFieldValue(parentFieldName);

    // Si no hay valor seleccionado en el padre, usar placeholder default
    if (!parentValue) {
      return `Seleccione primero un ${parentField?.label?.toLowerCase()}`;
    }

    // Obtener el label del valor seleccionado del padre
    const parentOptions = selectOptions[parentFieldName] || [];
    const selectedOption = parentOptions.find(
      (opt) => opt.value === parentValue
    );

    // Reemplazar el placeholder con el valor real
    return field.dependsOn.placeholderTemplate.replace(
      "${" + parentFieldName + "}",
      selectedOption?.label || parentValue
    );
  };

  const getRules = (validations?: Validations[]) => {
    if (!validations) return [];

    return validations.map((validation) => {
      const rules: Record<string, unknown> = {};

      if (validation.required) {
        const requiredConfig =
          typeof validation.required === "object"
            ? validation.required
            : { value: validation.required };

        rules.required = requiredConfig.value;
        if (requiredConfig.message) {
          rules.message = requiredConfig.message;
        }
      }

      if (validation.regex) {
        const regexConfig =
          typeof validation.regex === "object"
            ? validation.regex
            : { pattern: validation.regex };

        rules.pattern = new RegExp(regexConfig.pattern);
        if (regexConfig.message) {
          rules.message = regexConfig.message;
        }
      }

      if (validation.min) {
        const minConfig = validation.min;
        rules.min = minConfig.value;
        if (minConfig.message) {
          rules.message = minConfig.message;
        }
      }

      if (validation.max) {
        const maxConfig = validation.max;
        rules.max = maxConfig.value;
        if (maxConfig.message) {
          rules.message = maxConfig.message;
        }
      }

      if (validation.email) {
        const emailConfig = validation.email;
        rules.type = "email";
        if (emailConfig.message) {
          rules.message = emailConfig.message;
        }
      }

      return rules;
    });
  };

  const processFields = (fields: FormField[] | FormField[][]) => {
    if (customCols) {
      return fields.map((row) => (Array.isArray(row) ? row : [row]));
    }

    return groupFieldsInRows(fields as FormField[]);
  };

  const groupFieldsInRows = (fields: FormField[]) => {
    const rows: FormField[][] = [];
    let currentRow: FormField[] = [];

    // Filtrar campos ocultos antes de agruparlos
    const visibleFields = fields.filter((field) => !field.hidden);

    visibleFields.forEach((field) => {
      if (currentRow.length < cols) {
        currentRow.push(field);
      }

      if (currentRow.length === cols) {
        rows.push(currentRow);
        currentRow = [];
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const renderFormField = (field: FormField) => {
    const {
      type,
      name,
      label,
      placeholder,
      readonly,
      validations,
      options,
      min,
      max,
      step,
      datepickerConfig,
      hidden,
    } = field;
   
    if (hidden) return null;
   
    // Si estamos en modo view, mostramos el valor como texto
    if (mode === 'view') {
      // Obtener el valor actual del campo
      const value = initialData?.[name] ?? form.getFieldValue(name) ?? '-';
      let displayValue: React.ReactNode = value;
  
      switch (type) {
        case 'text':
        case 'number':
        case 'textarea':
        case 'email':
        case 'password':
          displayValue = value;
          break;
      
        case 'select': {
          const optionsList = field.dependsOn 
            ? selectOptions[name] 
            : field.selectConfig?.apiConfig 
              ? selectOptions[name] 
              : options;
          const option = optionsList?.find(opt => opt.value === value);
          displayValue = option?.label || value;
          break;
        }
      
        case 'datepicker':
          if (value && dayjs.isDayjs(value)) {
            const { format = 'YYYY-MM-DD' } = datepickerConfig || {};
            displayValue = value.format(format);
          }
          break;
      
        case 'checkbox':
          if (options) {
            if (Array.isArray(value)) {
              const selectedLabels = options
                .filter(opt => value.includes(opt.value))
                .map(opt => opt.label);
              displayValue = selectedLabels.join(', ');
            }
          } else {
            displayValue = value ? 'Sí' : 'No';
          }
          break;
      
        case 'radio': {
          const option = options?.find(opt => opt.value === value);
          displayValue = option?.label || value;
          break;
        }
      
        case 'switch':
          displayValue = value ? 'Sí' : 'No';
          break;
      
        default:
          displayValue = value;
          break;
      }
  
      return (
        <Form.Item label={label} className="mb-4">
          <div className="text-gray-700">
            {String(displayValue)}
          </div>
        </Form.Item>
      );
    }
  
   
    const { format, showTime, picker, size } = datepickerConfig || {};
   
    let formItem;
   
    switch (type) {
      case "text":
        formItem = <Input placeholder={placeholder} readOnly={readonly} />;
        break;
      case "number":
        formItem = (
          <InputNumber
            className="w-full"
            style={{ width: "100%" }}
            placeholder={placeholder}
            readOnly={readonly}
            min={min}
            max={max}
            step={step}
          />
        );
        break;
      case "select":
        formItem = (
          <Select
            showSearch
            placeholder={
              placeholder
                ? placeholder
                : getFormattedPlaceholder(field, field.dependsOn?.field)
            }
            options={
              field.dependsOn
                ? selectOptions[name]
                : field.selectConfig?.apiConfig
                ? selectOptions[name]
                : options
            }
            optionFilterProp="label"
            onChange={(value) => {
              form.setFieldsValue({ [name]: value });
   
              if (value) {
                fields
                  .filter(
                    (f): f is FormField =>
                      typeof f === "object" &&
                      !Array.isArray(f) &&
                      f.dependsOn?.field === name
                  )
                  .forEach((dependentField) => {
                    fetchDependentOptions(dependentField, value);
                  });
              }
            }}
          />
        );
        break;
      case "datepicker":
        formItem = (
          <DatePicker
            className="w-full"
            placeholder={placeholder}
            size={size}
            format={format}
            showTime={showTime}
          />
        );
        break;
      case "rangepicker":
        formItem = (
          <DatePicker.RangePicker
            className="w-full"
            picker={picker}
            format={format}
            showTime={showTime}
            size={size}
          />
        );
        break;
      case "email":
        formItem = (
          <Input type="email" placeholder={placeholder} readOnly={readonly} />
        );
        break;
      case "password":
        formItem = (
          <Input
            type="password"
            placeholder={placeholder}
            readOnly={readonly}
          />
        );
        break;
      case "textarea":
        formItem = (
          <Input.TextArea placeholder={placeholder} readOnly={readonly} />
        );
        break;
      case "checkbox":
        if (options) {
          formItem = (
            <Checkbox.Group
              options={options}
              disabled={readonly}
              onChange={(checkedValues) => {
                form.setFieldsValue({
                  [name]: checkedValues,
                });
              }}
            />
          );
        } else {
          formItem = (
            <Checkbox
              disabled={readonly}
              onChange={(e) => {
                form.setFieldsValue({
                  [name]: e.target.checked,
                });
              }}
            >
              {placeholder}
            </Checkbox>
          );
        }
        break;
      case "radio":
        formItem = (
          <div style={{ width: field.radioConfig?.radioWidth || "40%" }}>
            <Radio.Group
              disabled={readonly}
              onChange={(e) => {
                form.setFieldsValue({ [name]: e.target.value });
              }}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${field?.radioConfig?.cols || 1}, 1fr)`,
                gap: "0.5rem",
              }}
            >
              {options?.map((option) => (
                <Radio 
                  key={option.value} 
                  value={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "0",
                  }}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        );
        break;
      case "switch":
        formItem = <Switch />;
        break;
      case "slider":
        formItem = <Slider />;
        break;
      case "upload":
        formItem = (
          <Upload>
            <Button
              icon={<BiUpload />}
            >
              Subir
            </Button>
          </Upload>
        );
        break;
      default:
        break;
    }
   
    if (!formItem) return null;
   
    return (
      <Form.Item label={label} name={name} rules={getRules(validations)}>
        {React.cloneElement(formItem)}
      </Form.Item>
    );
   };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-4">
          {icon && React.cloneElement(icon)}
          <span className="font-semibold">{title}</span>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
  
      {/* Form */}
      <Form
        form={form}
        layout={layout}
        initialValues={initialData}
        onFinish={handleSubmit}
      >
        {/* Render the formItems from json */}
        {processFields(fields).map((row, rowIndex) => (
          <Row key={rowIndex} gutter={16}>
            {row.map((field: FormField, colIndex: number) => (
              <Col key={`${rowIndex}-${colIndex}`} span={24 / row.length}>
                {renderFormField(field)}
              </Col>
            ))}
          </Row>
        ))}
        {/* Add hidden fields */}
        {fields
          .filter(
            (field): field is FormField =>
              typeof field === "object" &&
              !Array.isArray(field) &&
              field.hidden === true
          )
          .map((field) => (
            <Form.Item key={field.name} name={field.name} hidden>
              <Input type="hidden" />
            </Form.Item>
          ))}
        {/* Only show submit button if not in view mode */}
        {mode !== 'view' && (
          <Row justify="end">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary"
                style={{ color: "white" }}
              >
                {submitButtonText ||
                  (mode
                    ? { create: "Crear", update: "Actualizar" }[mode]
                    : "Crear")}
              </Button>
            </Form.Item>
          </Row>
        )}
      </Form>
    </div>
  );
};
