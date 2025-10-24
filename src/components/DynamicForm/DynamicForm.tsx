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

import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
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
import { message } from "antd";

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
  // cols?: 1 | 2 | 3 | 4;
  cols?: number;
  fields: FormField[] | FormField[][];
  submitButtonText?: string;
  submitEditText?: string;
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
  submitButtonText = "Guardar",
  submitEditText = "Actualizar",
  onSubmit,
  initialData = {},
  customCols = false,
}: DynamicFormProps): React.ReactNode => {
  const [form] = Form.useForm();
  const [validationMap, setValidationMap] = useState<Record<string, string>>({});
  const [selectOptions, setSelectOptions] = useState<Record<string, Options[]>>(
    {}
  );
  const [conditionalFields, setConditionalFields] = useState<Record<string, boolean>>({});
  const [conditionalValidations, setConditionalValidations] = useState<Record<string, Validations[]>>({});
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const formattedData = { ...initialData };

      fields.filter((field): field is FormField =>
        typeof field === "object" && !Array.isArray(field)
      ).forEach(field => {
        if (field.type === "datepicker" && formattedData[field.name]) {
          formattedData[field.name] = dayjs(formattedData[field.name] as string | number | Date | null | undefined);
        }
      });
      form.setFieldsValue(formattedData);

      const newConditionalFields: Record<string, boolean> = {};
      const newConditionalValidations: Record<string, Validations[]> = {};

      fields
        .filter((field): field is FormField => typeof field === "object" && !Array.isArray(field))
        .forEach(field => {
          if (field.conditionalConfig) {
            const { dependsOn, conditions } = field.conditionalConfig;
            const dependentValue = formattedData[dependsOn];
            const matchingRule = conditions.find(condition => condition.value === dependentValue);
            
            if (matchingRule) {
              newConditionalFields[field.name] = matchingRule.show;
              newConditionalValidations[field.name] = matchingRule.validations || field.validations || [];
            } else {
              newConditionalFields[field.name] = false;
              newConditionalValidations[field.name] = [];
            }
          }
        });

      setConditionalFields(newConditionalFields);
      setConditionalValidations(newConditionalValidations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

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
          const dependentValue = initialData[field.dependsOn.field] as string;
          if (dependentValue) {
            fetchDependentOptions(field, dependentValue);
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fieldsWithDateValidation = fields.filter(
      (field): field is FormField =>
        typeof field === "object" &&
        !Array.isArray(field) &&
        !!field.validations?.some((v) => v.isGreaterThan)
    );

    const map = fieldsWithDateValidation.reduce((acc: Record<string, string>, field) => {
      const validation = field.validations?.find((v) => v.isGreaterThan);
      if (validation?.isGreaterThan?.target) {
        acc[field.name] = validation.isGreaterThan.target;
      }
      return acc;
    }, {});
    setValidationMap(map);
  }, [fields]);

  const validateDates = useCallback(() => {
    const fieldsToValidate = new Set();
    Object.entries(validationMap).forEach(([field, target]) => {
      fieldsToValidate.add(field);
      fieldsToValidate.add(target);
    });

    if (fieldsToValidate.size > 0) {
      form
        .validateFields([...fieldsToValidate])
    }
  }, [form, validationMap]);

  // useEffect para evaluar campos condicionales en la inicialización y cuando cambien los initialData
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const formValues = form.getFieldsValue();
    const allValues = { ...formValues, ...initialData };
    updateConditionalFields(allValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // Función para actualizar campos condicionales
  const updateConditionalFields = useCallback((formValues: Record<string, unknown>) => {
    const newConditionalFields: Record<string, boolean> = {};
    const newConditionalValidations: Record<string, Validations[]> = {};

    fields
      .filter((field): field is FormField => typeof field === "object" && !Array.isArray(field))
      .forEach(field => {
        if (field.conditionalConfig) {
          const { dependsOn, conditions } = field.conditionalConfig;
          const dependentValue = formValues[dependsOn];
          const matchingRule = conditions.find(condition => condition.value === dependentValue);
          
          if (matchingRule) {
            newConditionalFields[field.name] = matchingRule.show;
            newConditionalValidations[field.name] = matchingRule.validations || field.validations || [];
          } else {
            newConditionalFields[field.name] = false;
            newConditionalValidations[field.name] = [];
            form.setFieldValue(field.name, undefined);
          }
        }
      });

    // Solo actualizar si hay cambios reales
    setConditionalFields(prev => {
      if (JSON.stringify(prev) === JSON.stringify(newConditionalFields)) {
        return prev;
      }
      return newConditionalFields;
    });
    
    setConditionalValidations(prev => {
      if (JSON.stringify(prev) === JSON.stringify(newConditionalValidations)) {
        return prev;
      }
      return newConditionalValidations;
    });
  }, [fields, form]);
  interface ChangedValues {
    [key: string]: unknown;
  }

  const handleValuesChange = (changedValues: ChangedValues) => {
    const changedFieldNames = Object.keys(changedValues);
    const shouldValidate = changedFieldNames.some((fieldName) => {
      return validationMap[fieldName] || Object.values(validationMap).includes(fieldName);
    });

    if (shouldValidate) {
      validateDates();
    }

    const currentFormValues = form.getFieldsValue();
    updateConditionalFields(currentFormValues);
  };

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
      filterBy,
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

    // Apply filters if configured
    let filteredData = data;
    if (filterBy) {
      const filters = Array.isArray(filterBy) ? filterBy : [filterBy];
      filteredData = data.filter((item: Record<string, unknown>) => {
        return filters.every(filter => {
          const fieldValue = item[filter.field];
          switch (filter.condition) {
            case '==':
              return fieldValue === filter.value;
            case '!=':
              return fieldValue !== filter.value;
            case 'contains':
              return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
            case 'not_contains':
              return !String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
            case '>':
              return Number(fieldValue) > Number(filter.value);
            case '<':
              return Number(fieldValue) < Number(filter.value);
            case 'in':
              return Array.isArray(filter.value) && filter.value.includes(fieldValue as string | number | boolean);
            case 'not_in':
              return Array.isArray(filter.value) && !filter.value.includes(fieldValue as string | number | boolean);
            default:
              return true;
          }
        });
      });
    }

    const options = filteredData.map((item: Record<string, unknown>) => ({
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

  const convertOptions = (options: Options[] | undefined, field: FormField): Options[] => {
    if (!options) return [];

    if (field.selectConfig?.customOption) {
      return [field.selectConfig.customOption as Options, ...options];
    }

    return options;
  }

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

  const getRules = (validations?: Validations[], fieldName?: string) => {
    // Usar validaciones condicionales si están disponibles
    const effectiveValidations = fieldName && conditionalValidations[fieldName]?.length > 0
      ? conditionalValidations[fieldName]
      : validations;

    if (!effectiveValidations) return [];

    return effectiveValidations.map((validation) => {
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

      if (validation.isGreaterThan) {
        const { target, message } = validation.isGreaterThan;

        rules.validator = async (_: unknown, value: string | number | Date | dayjs.Dayjs | null | undefined) => {
          if (!value) return Promise.resolve();

          const targetValue = form.getFieldValue(target);
          if (!targetValue) return Promise.resolve();

          const currentDate = dayjs(value);
          const targetDate = dayjs(targetValue);

          if (currentDate.isAfter(targetDate)) {
            return Promise.reject(new Error(message));
          }

          return Promise.resolve();
        };
      }

      if (validation.isLessThan) {
        const { target, message } = validation.isLessThan;

        rules.validator = async (_: unknown, value: string | number | Date | dayjs.Dayjs | null | undefined) => {
          if (!value) return Promise.resolve();

          const targetValue = form.getFieldValue(target);
          if (!targetValue) return Promise.resolve();

          const currentDate = dayjs(value);
          const targetDate = dayjs(targetValue);

          if (currentDate.isBefore(targetDate)) {
            return Promise.reject(new Error(message));
          }

          return Promise.resolve();
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
      onChange,
    } = field;

    // Evaluar si el campo debe estar oculto (original hidden o por condiciones)
    const isConditionallyHidden = field.conditionalConfig && conditionalFields[name] === false;
    if (hidden || isConditionallyHidden) return null;

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
          
          if (field.selectConfig?.mode === 'multiple' || field.selectConfig?.mode === 'tags') {
            // Para selects múltiples, mostrar una lista
            if (Array.isArray(value)) {
              const selectedLabels = optionsList
                ?.filter(opt => value.includes(opt.value))
                .map(opt => opt.label) || [];
              displayValue = selectedLabels.join(', ') || '-';
            } else {
              displayValue = '-';
            }
          } else {
            // Para selects simples
            const option = optionsList?.find(opt => opt.value === value);
            displayValue = option?.label || value;
          }
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

        case 'upload': {
          const value = initialData?.[name] ?? form.getFieldValue(name) ?? '-';
          let displayValue: React.ReactNode = value;

          // If there's a renderPreview method, use it
          if (field.uploadConfig?.renderPreview) {
            displayValue = field.uploadConfig.renderPreview(value);
          }

          return (
            <Form.Item label={label} className="mb-4">
              <div className="text-gray-700">
                {displayValue}
              </div>
            </Form.Item>
          );
        }

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
            mode={field.selectConfig?.mode}
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
                  : convertOptions(options, field)
            }
            optionFilterProp="label"
            onChange={(value) => {
              form.setFieldsValue({ [name]: value });

              if (field.selectConfig?.customOption) {
                if (value === field.selectConfig.customOption.value) {
                  field.selectConfig.customOption.onClick?.();
                }
              }

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
            onChange={onChange}
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
      case "radio": {
        formItem = (
          <div style={{ width: field.radioConfig?.radioWidth || "40%" }}>
            <Radio.Group
              disabled={readonly}
              defaultValue={initialData[name]}
              onChange={(e) => {
                form.setFieldsValue({ [name]: e.target.value });
              }}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${field?.radioConfig?.cols || 1}, 1fr)`,
                gap: "0.5rem",
              }}
            >
              {options?.map((option, index) => {
                return (
                  <Radio
                    key={index}
                    value={option.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "0",
                    }}
                  >
                    {option.label}
                  </Radio>
                )
              })}
            </Radio.Group>
          </div>
        );
        break;
      }
      case "switch":
        formItem = <Switch defaultChecked />;
        break;
      case "slider":
        formItem = <Slider />;
        break;
      // En la sección donde se renderiza el campo upload
      case "upload":
        formItem = (
          <Upload
            name={field.uploadConfig?.name || name}
            action={field.uploadConfig?.action}
            accept={field.uploadConfig?.accept}
            multiple={field.uploadConfig?.multiple}
            maxCount={field.uploadConfig?.maxCount}
            listType={field.uploadConfig?.listType || 'text'}
            beforeUpload={(file) => {
              if (field.uploadConfig?.maxSize && file.size > field.uploadConfig.maxSize) {
                const maxSizeMB = Math.round(field.uploadConfig.maxSize / (1024 * 1024));
                message.error(`El archivo no debe exceder ${maxSizeMB}MB`);
                return Upload.LIST_IGNORE;
              }
              return field.uploadConfig?.beforeUpload ? field.uploadConfig.beforeUpload(file) : true;
            }}
            onChange={(info) => {
              const { status, response } = info.file;

              if (status === 'done') {
                const fileId = response;
                if (fileId) {
                  form.setFieldValue(name, fileId);
                  message.success(`${info.file.name} se subió correctamente`);
                }
              } else if (status === 'error') {
                message.error(`${info.file.name} falló al subirse.`);
              }

              field.uploadConfig?.onChange?.(info);
            }}
            customRequest={field.uploadConfig?.customRequest}
          >
            {field.uploadConfig?.renderPreview && form.getFieldValue(name) ? (
              <div>
                {field.uploadConfig.renderPreview(form.getFieldValue(name))}
                <Button
                  icon={field.uploadConfig?.iconButton ? <span className={field.uploadConfig.iconButton}></span> : <BiUpload />}
                >
                  Cambiar archivo
                </Button>
              </div>
            ) : (
              <Button
                icon={field.uploadConfig?.iconButton ? <span className={field.uploadConfig.iconButton}></span> : <BiUpload />}
              >
                {field.uploadConfig?.textButton || "Subir archivo"}
              </Button>
            )}
          </Upload>
        );
        break;
      default:
        break;
    }

    if (!formItem) return null;

    return (
      <Form.Item label={label} name={name} rules={getRules(validations, name)}>
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
        onValuesChange={handleValuesChange}
      >
        {/* Render the formItems from json */}
        {processFields(fields).map((row, rowIndex) => (
          <Row key={rowIndex} gutter={16}>
            {row.map((field: FormField, colIndex: number) => {
              return (
                <Col key={`${rowIndex}-${colIndex}`} span={24 / row.length}>
                  {renderFormField(field)}
                </Col>
              )
            })}
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
                {mode === 'update' ? submitEditText : submitButtonText}
              </Button>
            </Form.Item>
          </Row>
        )}
      </Form>
    </div>
  );
};
