import {
  Alert,
  Button,
  Card,
  Col,
  message,
  Modal,
  Row,
  Spin,
  Steps,
  Typography,
  UploadProps,
} from "antd";
import { AllowedBulkFormats, BulkConfig } from "../DynamicTable/types";
import { useState } from "react";
import { steps } from "./BulkUpload.config";
import { IoDownloadOutline } from "react-icons/io5";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { TemplateField, TemplateGenerator } from "./utils/templateGenerator";
import { FileReaderResult, FileReaderUtil } from "./utils/fileReader";
import { Table } from "antd";

const { Title, Text } = Typography;

interface BulkUploadModalProps<T> {
  title: string;
  subtitle?: string;
  visible: boolean;
  config: BulkConfig;
  onDownloadTemplate?: (format: string, filename: string) => void;
  onValidateData?: (data: T[]) => Promise<string[] | null>;
  onCancel: () => void;
  onUpload: (file: File) => void;
  mockData?: T[];
}

const BulkUploadModal = <T extends Record<string, unknown>>({
  title = "Carga masiva",
  subtitle,
  visible,
  onCancel,
  // onUpload,
  config,
  // onDownloadTemplate,
  onValidateData,
  // mockData = [],
}: BulkUploadModalProps<T>) => {
  // ===== [ State ] =====
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<T[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[] | null>(
    null
  );
  const [validationWarnings, setValidationWarnings] = useState<string[] | null>(
    null
  );
  const [validationResults, setValidationResults] = useState<{
    passed: number;
    failed: number;
    details: Array<{
      rowIndex: number;
      field: string;
      value: unknown;
      error: string;
      severity: "error" | "warning";
    }>;
  } | null>(null);

  const [isValidating, setIsValidating] = useState<boolean>(false);

  // ===== [ Config ] =====
  const defaultTitle = title || `Carga masiva de ${config?.entityName}`;
  const defaultSubtitle =
    subtitle ||
    `Descarga la plantilla, completa los datos y súbelos para registrar ${config.entityName} en bloque`;

  const maxSize = config.maxFileSize || 10;
  const formats = config.allowedFormats || ["xlsx", "csv"];
  // const templates = config.downloadTemplates || [];

  const draggerProps: UploadProps = {
    name: "file",
    multiple: false,
    action: undefined,
    beforeUpload: (file) => {
      const validation = validateFile(file);

      if (!validation) {
        message.error(validation);
        return false;
      }

      handleFileUpload(file);

      return false;
    },
    showUploadList: false,
  };

  const validateFile = (file: File): boolean | string => {
    console.log(file, "validatefile");

    if (file.size / 1024 / 1024 > maxSize) {
      console.log(file.size / 1024 / 1024 > maxSize);
      return `El archivo debe ser menor a ${maxSize}MB`;
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (
      !fileExtension ||
      !formats.includes(fileExtension as AllowedBulkFormats[number])
    ) {
      return `Formato de archivo no soportado. Formatos permitidos: ${formats.join(", ")}`;
    }

    return true;
  };

  const performDataValidation = async () => {
    setIsValidating(true);
    setValidationResults(null);

    try {
      const validationDetails: Array<{
        rowIndex: number;
        field: string;
        value: unknown;
        error: string;
        severity: "error" | "warning";
      }> = [];

      let passedCount = 0;
      let failedCount = 0;

      for (let i = 0; i < fileData.length; i++) {
        const row = fileData[i];
        let rowHasErrors = false;

        for (const field of config.templateFields) {
          const value = row[field.key as keyof T];
          const validation = await validateFieldData(value, field, i + 1);

          if (!validation.isValid) {
            validationDetails.push({
              rowIndex: i,
              field: field.label,
              value: value,
              error: validation.error!,
              severity: field.required ? "error" : "warning",
            });

            if (field.required) {
              rowHasErrors = true;
            }
          }
        }

        if (rowHasErrors) {
          failedCount++;
        } else {
          passedCount++;
        }
      }

      if (onValidateData) {
        const customErrors = await onValidateData(fileData);
        if (customErrors && customErrors.length > 0) {
          customErrors.forEach((error) => {
            validationDetails.push({
              rowIndex: -1,
              field: "General",
              value: "",
              error: error,
              severity: "error",
            });
          });
          failedCount += customErrors.length;
        }
      }

      setValidationResults({
        passed: passedCount,
        failed: failedCount,
        details: validationDetails,
      });

      const criticalErrors = validationDetails.filter(
        (d) => d.severity === "error"
      );
      if (criticalErrors.length === 0) {
        setCurrentStep(4);
      } else {
        setCurrentStep(3);
      }
    } catch (error) {
      message.error("Error durante la validación");
      console.error("Validation error:", error);
    } finally {
      setIsValidating(false);
    }
  };

  const validateFieldData = async (
    value: unknown,
    field: TemplateField,
    rowNumber: number
  ): Promise<{ isValid: boolean; error?: string }> => {
    if (field.required && (!value || String(value).trim() === "")) {
      return {
        isValid: false,
        error: `Fila ${rowNumber}: ${field.label} es requerido`,
      };
    }

    if (!value) return { isValid: true };

    const stringValue = String(value).trim();

    switch (field.type) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(stringValue)) {
          return {
            isValid: false,
            error: `Fila ${rowNumber}: ${field.label} no es un email válido`,
          };
        }
        break;
      }

      case "number": {
        const numValue = Number(stringValue);
        if (isNaN(numValue)) {
          return {
            isValid: false,
            error: `Fila ${rowNumber}: ${field.label} debe ser un número`,
          };
        }
        break;
      }

      case "date": {
        const dateValue = new Date(stringValue);
        if (isNaN(dateValue.getTime())) {
          return {
            isValid: false,
            error: `Fila ${rowNumber}: ${field.label} debe ser una fecha válida`,
          };
        }
        break;
      }
    }

    return { isValid: true };
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setUploadedFile(file);
    setValidationErrors([]);
    setValidationWarnings([]);

    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      let result: FileReaderResult<T>;

      if (fileExtension === "xlsx") {
        result = await FileReaderUtil.readExcelFile<T>(
          file,
          config.templateFields
        );
      } else if (fileExtension === "csv") {
        result = await FileReaderUtil.readCSVFile<T>(
          file,
          config.templateFields
        );
      } else {
        throw new Error("Formato de archivo no soportado");
      }

      if (result.success && result.data) {
        setFileData(result.data);

        if (onValidateData) {
          const customValidationErrors = await onValidateData(result.data);
          if (customValidationErrors && customValidationErrors.length > 0) {
            setValidationErrors([
              ...(result.errors || []),
              ...customValidationErrors,
            ]);
          } else {
            setCurrentStep(2);
          }
        } else {
          setCurrentStep(2);
        }

        if (result.warnings) {
          setValidationWarnings(result.warnings);
        }
      } else {
        setValidationErrors(
          result.errors || ["Error desconocido al procesar el archivo"]
        );
      }
    } catch (error) {
      setValidationErrors([`Error al procesar el archivo: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = (format: "xlsx" | "csv") => {
    const templateConfig = {
      entityName: config.entityName,
      fields: config.templateFields,
      includeExamples: true,
    };

    if (format === "xlsx") {
      TemplateGenerator.generateExcel(templateConfig);
    } else {
      TemplateGenerator.generateCSV(templateConfig);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <Title level={4}>Descargar plantilla</Title>
            <Text>
              Descarga el formato de plantilla para completar con los datos
              requeridos.
            </Text>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Button
                  type="primary"
                  icon={<IoDownloadOutline />}
                  block
                  onClick={() => {
                    setCurrentStep(1);
                    handleDownloadTemplate("xlsx");
                    console.log("Download Excel template");
                  }}
                >
                  Descargar plantilla Excel (.xlsx)
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  icon={<IoDownloadOutline />}
                  block
                  onClick={() => {
                    setCurrentStep(1);
                    handleDownloadTemplate("csv");
                    console.log("Download CSV template");
                  }}
                >
                  Descargar plantilla CSV (.csv)
                </Button>
              </Col>
            </Row>

            <div
              style={{
                margin: "24px 0",
                textAlign: "center",
                borderTop: "1px solid #f0f0f0",
                paddingTop: "16px",
              }}
            >
              <Text type="secondary" style={{ fontSize: "14px" }}>
                ¿Ya tienes la plantilla descargada?
              </Text>
            </div>

            <Button
              type="dashed"
              block
              size="large"
              onClick={() => {
                setCurrentStep(1);
                console.log("Skip template download");
              }}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
                fontWeight: 500,
              }}
            >
              Continuar sin descargar plantilla
            </Button>
          </Card>
        );

      case 1:
        return (
          <Card>
            <Title level={4}>Subir archivo</Title>
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Arrastra tu archivo aquí o haz clic para seleccionarlo
              </p>
              <p className="ant-upload-hint">
                Formatos soportados: {formats.join(", ")} • Máximo {maxSize}MB
              </p>
            </Dragger>
            {uploadedFile && (
              <Alert
                message={`Archivo seleccionado: ${uploadedFile.name}`}
                type="success"
                style={{ marginTop: 16 }}
              />
            )}
            {isLoading && (
              <div className="mt-4 flex items-center">
                <Spin size="small" style={{ marginRight: 8 }} />
                Validando archivo... Por favor espera
              </div>
            )}

            {validationErrors && validationErrors.length > 0 && (
              <Alert
                message="Errores de validación"
                description={
                  <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                }
                type="error"
                style={{ marginTop: 16 }}
                action={
                  <Button size="small" onClick={handleReset}>
                    Reintentar
                  </Button>
                }
              />
            )}
          </Card>
        );

      case 2:
        return (
          <Card>
            <Title level={4}>Revisar datos</Title>
            <Text>
              Revisa los datos cargados antes de proceder con la importación.
            </Text>

            {uploadedFile && (
              <Alert
                message={`Archivo: ${uploadedFile.name} • ${fileData.length} registros encontrados`}
                type="info"
                style={{ marginTop: 16, marginBottom: 16 }}
              />
            )}

            {validationWarnings && validationWarnings.length > 0 && (
              <Alert
                message="Advertencias"
                description={
                  <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                    {validationWarnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                }
                type="warning"
                style={{ marginBottom: 16 }}
              />
            )}

            {fileData.length > 0 && (
              <div
                style={{
                  maxHeight: 400,
                  overflowY: "auto",
                  border: "1px solid #f0f0f0",
                  borderRadius: 6,
                }}
              >
                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Card size="small">
                      <Text strong>{fileData.length}</Text>
                      <br />
                      <Text type="secondary">Registros totales</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card size="small">
                      <Text strong style={{ color: "#52c41a" }}>
                        {fileData.length}
                      </Text>
                      <br />
                      <Text type="secondary">Registros válidos</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card size="small">
                      <Text strong style={{ color: "#faad14" }}>
                        {validationWarnings?.length || 0}
                      </Text>
                      <br />
                      <Text type="secondary">Advertencias</Text>
                    </Card>
                  </Col>
                </Row>
                <Table
                  dataSource={fileData}
                  columns={[
                    {
                      title: "#",
                      key: "index",
                      width: 60,
                      render: (_, __, index) => index + 1,
                    },
                    ...config.templateFields.map((field) => ({
                      title: field.required ? `${field.label} *` : field.label,
                      dataIndex: field.key,
                      key: field.key,
                      ellipsis: true,
                      width: 150,
                      render: (value: unknown) => String(value || ""),
                    })),
                  ]}
                  scroll={{ y: 400 }}
                  pagination={{ pageSize: 50, showSizeChanger: true }}
                  size="small"
                />
              </div>
            )}

            <Row gutter={16} style={{ marginTop: 24 }}>
              <Col span={12}>
                <Button block onClick={handleReset}>
                  Cargar otro archivo
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  block
                  loading={isValidating}
                  onClick={performDataValidation}
                >
                  Validar datos ({fileData.length} registros)
                </Button>
              </Col>
            </Row>
          </Card>
        );
      case 3:
        return (
          <Card>
            <Title level={4}>Validar datos</Title>
            <Text>
              Revisa los resultados de la validación antes de proceder con la
              carga final.
            </Text>

            {validationResults && (
              <>
                <Row gutter={16} style={{ margin: "16px 0" }}>
                  <Col span={8}>
                    <Card size="small" style={{ textAlign: "center" }}>
                      <Text
                        strong
                        style={{ fontSize: "24px", color: "#52c41a" }}
                      >
                        {validationResults.passed}
                      </Text>
                      <br />
                      <Text type="secondary">Registros válidos</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card size="small" style={{ textAlign: "center" }}>
                      <Text
                        strong
                        style={{
                          fontSize: "24px",
                          color:
                            validationResults.failed > 0
                              ? "#ff4d4f"
                              : "#52c41a",
                        }}
                      >
                        {validationResults.failed}
                      </Text>
                      <br />
                      <Text type="secondary">Registros con errores</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card size="small" style={{ textAlign: "center" }}>
                      <Text strong style={{ fontSize: "24px" }}>
                        {validationResults.passed + validationResults.failed}
                      </Text>
                      <br />
                      <Text type="secondary">Total registros</Text>
                    </Card>
                  </Col>
                </Row>

                {validationResults.details.length > 0 && (
                  <div
                    style={{
                      maxHeight: 400,
                      overflowY: "auto",
                      marginBottom: 16,
                    }}
                  >
                    <Title level={5}>Detalles de validación:</Title>
                    {validationResults.details.map((detail, index) => (
                      <Alert
                        key={index}
                        message={`${detail.field}: ${detail.error}`}
                        type={detail.severity}
                        style={{ marginBottom: 8 }}
                        showIcon
                      />
                    ))}
                  </div>
                )}

                <Row gutter={16}>
                  <Col span={8}>
                    <Button block onClick={handleReset}>
                      Corregir archivo
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button block onClick={() => setCurrentStep(2)}>
                      Volver a vista previa
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      block
                      disabled={
                        validationResults.details.filter(
                          (d) => d.severity === "error"
                        ).length > 0
                      }
                      onClick={() => setCurrentStep(4)}
                    >
                      Continuar importación
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        );
      case 4:
        return (
          <Card>
            <Title level={4}>Confirmar importación</Title>
            <Text>¿Estás seguro de que deseas importar estos datos?</Text>

            <Alert
              message="Resumen de importación"
              description={
                <div>
                  <p>
                    <strong>Archivo:</strong> {uploadedFile?.name}
                  </p>
                  <p>
                    <strong>Registros a importar:</strong>{" "}
                    {validationResults?.passed || fileData.length}
                  </p>
                  <p>
                    <strong>Advertencias:</strong>{" "}
                    {validationResults?.details.filter(
                      (d) => d.severity === "warning"
                    ).length || 0}
                  </p>
                </div>
              }
              type="info"
              style={{ margin: "16px 0" }}
            />

            <Row gutter={16}>
              <Col span={12}>
                <Button block onClick={() => setCurrentStep(3)}>
                  Volver a validación
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    if (uploadedFile) {
                      message.success("Datos importados correctamente");
                      console.log(uploadedFile, "imported file");
                      onCancel();
                    }
                  }}
                >
                  Importar datos
                </Button>
              </Col>
            </Row>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title={defaultTitle}
      open={visible}
      onCancel={() => {
        onCancel();
        handleReset();
      }}
      width={1200}
      destroyOnHidden
      footer={null}
    >
      <div style={{ marginBottom: 24 }}>
        <Text type="secondary">{defaultSubtitle}</Text>
      </div>

      <Steps current={currentStep} items={steps} className="!mb-4" />

      {renderStepContent()}
    </Modal>
  );
};

export default BulkUploadModal;
