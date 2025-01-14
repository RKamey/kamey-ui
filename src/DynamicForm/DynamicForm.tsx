import React, { useEffect, useState } from "react";
import {
  Typography,
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
} from "antd";
import { FormField, Options } from "./types";
import dayjs from "dayjs";
import axios from "axios";

const { Title, Text } = Typography;

export interface ApiConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  responseDataPath?: string;
}

export interface DynamicFormProps {
  mode?: 'create' | 'update';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  layout?: "vertical" | "horizontal";
  fields: FormField[];
  submitButtonText?: string;
  onSubmit?: (data: unknown) => void;
  apiConfig?: ApiConfig;
  initialData?: Record<string, unknown>;
}

const DynamicForm = ({
  mode,
  title,
  description,
  icon,
  layout = "vertical",
  fields,
  submitButtonText = "Enviar",
  onSubmit,
  initialData = {},
}: DynamicFormProps) => {
  const [form] = Form.useForm();
  const [selectOptions, setSelectOptions] = useState<Record<string, Options[]>>({});

  // ==== [ Effects ] ====
  useEffect(() => {
    if ((mode === 'update' && initialData) || initialData) {
      const newInitialData = { ...initialData };
      
      // Iteramos sobre cada campo
      fields.forEach(field => {
        const value = newInitialData[field.name];
        
        if (field.type === 'datepicker' && value) {
          const converted = dayjs(value as string);
          if (converted.isValid()) {
            newInitialData[field.name] = converted;
          }
        }
      });
      
      form.setFieldsValue(newInitialData);
    }
  }, [form, mode, initialData, fields]);

  useEffect(() => {
    fields.forEach(field => {
      if (field.type === 'select' && 
          field.selectConfig?.apiConfig && 
          !field.selectConfig.dependsOn) {
        fetchSelectOptions(field);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==== [ Functions ] ====
  const fetchSelectOptions = async (field: FormField) => {
    if (!field.selectConfig?.apiConfig) return;
    
    const { url, method, headers, valueKey, labelKey, responseDataPath } = field.selectConfig.apiConfig;

    const response = await axios.get(url, { method: method || 'GET', headers });
    
    const responseData = responseDataPath ? response.data[responseDataPath] : response.data.data;

    const data = Array.isArray(responseData) && Array.isArray(responseData[0]) 
      ? responseData[0] 
      : responseData;

    const options = data.map((item: Record<string, unknown>) => ({
      value: item[valueKey],
      label: item[labelKey]
    }));

    setSelectOptions(prev => ({ ...prev, [field.name]: options }));
  }

  const renderFormField = (field: FormField) => {
    const { type, name, label, placeholder, readonly, validations, options, min, max, step, datepickerConfig } = field;

    if (readonly) {
      return null;
    }

    const { format, showTime } = datepickerConfig || {};
    
    let formItem;

    switch (type) {
      case 'text':
        formItem = <Input placeholder={placeholder} readOnly={readonly} />;
        break;
      case 'number':
        formItem = (
          <InputNumber
            className="w-full"
            placeholder={placeholder} 
            readOnly={readonly} 
            min={min} 
            max={max} 
            step={step} 
          />
        );
        break;
      case 'select':
        formItem = (
          <Select 
            showSearch
            placeholder={placeholder}
            options={field.selectConfig ? selectOptions[name] : options}
            optionFilterProp="label"
            onChange={(value) => {
              form.setFieldsValue({
                [name]: value
              });
            }}
          />
        );
        break;
      case 'datepicker':
        formItem = <DatePicker className="w-full" placeholder={placeholder} format={format} showTime={showTime} />;
        break;
      case 'email':
        formItem = <Input type="email" placeholder={placeholder} readOnly={readonly} />;
        break;
      case 'password':
        formItem = <Input type="password" placeholder={placeholder} readOnly={readonly} />;
        break;
      case 'textarea':
        formItem = <Input.TextArea placeholder={placeholder} readOnly={readonly} />;
        break;
      case 'checkbox':
        if (options) {
          formItem = (
            <Checkbox.Group
              options={options}
              disabled={readonly}
              onChange={(checkedValues) => {
                form.setFieldsValue({
                  [name]: checkedValues
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
                  [name]: e.target.checked
                });
              }}
            >
              {placeholder}
            </Checkbox>
          );
        }
        break;
      case 'radio':
        formItem = (
          <Radio.Group
            options={options}
            disabled={readonly}
            onChange={(e) => {
              form.setFieldsValue({ [name]: e.target.value });
            }}
          />
        );
        break;
      case 'switch':
        formItem = <Switch />;
        break;
      case 'slider':
        formItem = <Slider />;
        break;
      default:
        break;
    }

    if (!formItem) return null;

    return (
      <Form.Item 
        label={label} 
        name={name} 
        rules={validations}
      >
        {React.cloneElement(formItem)}
      </Form.Item>
    )
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Title level={3} className="flex items-center gap-4">
          {icon}
          {title}
        </Title>
        <Text className="text-sm text-gray-500">{description}</Text>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout={layout}
        initialValues={initialData}
        onFinish={onSubmit}
      >
        {/* Render the formItems from json */}
        {fields.map((field, index) => (
          <Row key={index} gutter={16}>
            {Array.isArray(field) ? (
              field.map((item, innerIndex) => (
                <Col key={innerIndex} span={24 / field.length}>
                  {renderFormField(item)}
                </Col>
              ))
            ) : (
              <Col span={24}>
                {renderFormField(field)}
              </Col>
            )}
          </Row>
        ))}

        <Row justify="end">
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="bg-primary"
              >
              {submitButtonText || (mode ? { create: 'Crear', update: 'Actualizar' }[mode] : 'Crear')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default DynamicForm;