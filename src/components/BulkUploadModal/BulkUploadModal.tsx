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
  onFinish?: (data: T[]) => void;
  mockData?: T[];
}

enum STEP {
  DownloadTemplate = 0,
  UploadFile = 1,
  ReviewData = 2,
  ValidateData = 3,
  ConfirmImport = 4,
}

const BulkUploadModal = <T extends Record<string, unknown>>({
  title = "Carga masiva",
  subtitle,
  visible,
  onCancel,
  onFinish,
  config,
  // onDownloadTemplate,
  onValidateData,
  // mockData = [],
}: BulkUploadModalProps<T>) => {
  // ===== [ State ] =====
  const [currentStep, setCurrentStep] = useState<number>(STEP.DownloadTemplate);
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
  const [processedJsonData, setProcessedJsonData] = useState<T[]>([]);
  const [isProcessingData, setIsProcessingData] = useState<boolean>(false);

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
    if (file.size / 1024 / 1024 > maxSize) {
      return `El archivo debe ser menor a ${maxSize}MB`;
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (
      !fileExtension ||
      !formats.includes(fileExtension as AllowedBulkFormats[number])
    ) {
      return `Formato de archivo no soportado. Formatos permitidos: ${formats.join(", ")}`;
    }

    const allowedMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "text/csv", // .csv
      "application/vnd.ms-excel", // .xls (legacy Excel)
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      console.warn(
        `MIME type no reconocido: ${file.type}, pero la extensión es válida`
      );

      return `Tipo de archivo no soportado. Por favor sube un archivo válido.`;
    }

    const problematicChars = /[<>:"/\\|?*]/;
    if (problematicChars.test(file.name)) {
      return "El nombre del archivo contiene caracteres no válidos";
    }

    return true;
  };

  const processDataToJson = async (dataToProcess?: T[]): Promise<T[]> => {
    const dataSource = dataToProcess || fileData;
    const processedData: T[] = [];

    dataSource.forEach((row) => {
      const hasContent = config.templateFields.some((field) => {
        const value = row[field.key as keyof T];
        return (
          value !== null && value !== undefined && String(value).trim() !== ""
        );
      });

      if (!hasContent) {
        return;
      }

      const cleanedRow: Partial<T> = {};
      let hasValidData = false;

      config.templateFields.forEach((field) => {
        const value = row[field.key as keyof T];

        if (
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
        ) {
          hasValidData = true;
          const stringValue = String(value).trim();

          switch (field.type) {
            case "number":
              cleanedRow[field.key as keyof T] = Number(
                stringValue
              ) as T[keyof T];
              break;
            case "date": {
              const dateValue = new Date(stringValue);
              cleanedRow[field.key as keyof T] = dateValue
                .toISOString()
                .split("T")[0] as T[keyof T];
              break;
            }
            case "email":
              cleanedRow[field.key as keyof T] =
                stringValue.toLowerCase() as T[keyof T];
              break;
            case "boolean": {
              const boolValue = stringValue.toLowerCase();
              cleanedRow[field.key as keyof T] = (boolValue === "true" ||
                boolValue === "1" ||
                boolValue === "si" ||
                boolValue === "yes") as T[keyof T];
              break;
            }
            case "text":
            default:
              cleanedRow[field.key as keyof T] = stringValue as T[keyof T];
              break;
          }
        } else if (field.required) {
          cleanedRow[field.key as keyof T] = null as T[keyof T];
        }
      });

      if (hasValidData && Object.keys(cleanedRow).length > 0) {
        processedData.push(cleanedRow as T);
      }
    });

    return processedData;
  };

  const performDataValidation = async () => {
    setIsValidating(true);
    setValidationResults(null);
    setIsProcessingData(true);
    setProcessedJsonData([]);

    try {
      const nonEmptyRows = fileData.filter((row) => {
        const hasContent = config.templateFields.some((field) => {
          const value = row[field.key as keyof T];
          return (
            value !== null && value !== undefined && String(value).trim() !== ""
          );
        });

        return hasContent;
      });

      if (nonEmptyRows.length === 0) {
        setValidationErrors([
          "No se encontraron filas con datos válidos para procesar",
        ]);
        return;
      }

      const validationDetails: Array<{
        rowIndex: number;
        field: string;
        value: unknown;
        error: string;
        severity: "error" | "warning";
      }> = [];

      let passedCount = 0;
      let failedCount = 0;

      for (let i = 0; i < nonEmptyRows.length; i++) {
        const row = nonEmptyRows[i];
        const originalIndex = fileData.indexOf(row);
        let rowHasErrors = false;

        for (const field of config.templateFields) {
          const value = row[field.key as keyof T];
          const validation = await validateFieldData(
            value,
            field,
            originalIndex + 1
          );

          if (!validation.isValid) {
            validationDetails.push({
              rowIndex: originalIndex,
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
        const customErrors = await onValidateData(nonEmptyRows);
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
        const jsonData = await processDataToJson(nonEmptyRows);
        setProcessedJsonData(jsonData);
        setCurrentStep(STEP.ConfirmImport);
      } else {
        setCurrentStep(STEP.ValidateData);
      }
    } catch (error) {
      message.error("Error durante la validación");
      console.error("Validation error:", error);
    } finally {
      setIsValidating(false);
      setIsProcessingData(false);
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
    setCurrentStep(STEP.DownloadTemplate);
    setUploadedFile(null);
    setFileData([]);
    setValidationErrors([]);
    setValidationWarnings([]);
    setValidationResults(null);
    setProcessedJsonData([]);
    setIsProcessingData(false);
    setIsValidating(false);
    setIsLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setUploadedFile(file);
    setValidationErrors([]);
    setValidationWarnings([]);

    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const isValidExtension =
        fileExtension && ["xlsx", "xls", "csv"].includes(fileExtension);
      const isValidMimeType = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls (legacy Excel)
        "text/csv", // .csv
      ].includes(file.type);

      if (!isValidExtension || !isValidMimeType) {
        throw new Error("Formato de archivo no soportado");
      }

      let result: FileReaderResult<T>;

      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        fileExtension === "xlsx" ||
        fileExtension === "xls"
      ) {
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
            setCurrentStep(STEP.ReviewData);
          }
        } else {
          setCurrentStep(STEP.ReviewData);
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
      case STEP.DownloadTemplate:
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
                    setCurrentStep(STEP.UploadFile);
                    handleDownloadTemplate("xlsx");
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
                    setCurrentStep(STEP.UploadFile);
                    handleDownloadTemplate("csv");
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
                setCurrentStep(STEP.UploadFile);
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

      case STEP.UploadFile:
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

      case STEP.ReviewData:
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
                  loading={isValidating || isProcessingData}
                  onClick={performDataValidation}
                >
                  Validar datos ({fileData.length} registros)
                </Button>
              </Col>
            </Row>
          </Card>
        );
      case STEP.ValidateData:
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

                {processedJsonData.length > 0 && (
                  <Card size="small" style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      Vista previa JSON (primeros 3 registros):
                    </Title>
                    <pre
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {JSON.stringify(processedJsonData.slice(0, 3), null, 2)}
                    </pre>
                    {processedJsonData.length > 3 && (
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        ... y {processedJsonData.length - 3} registros más
                      </Text>
                    )}
                  </Card>
                )}

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
                    <Button
                      block
                      onClick={() => setCurrentStep(STEP.ReviewData)}
                    >
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
                      onClick={() => setCurrentStep(STEP.ConfirmImport)}
                    >
                      Continuar importación
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        );
      case STEP.ConfirmImport:
        return (
          <Card>
            <Title level={4}>Confirmar datos</Title>
            <Text>¿Estás seguro de que deseas cargar estos datos?</Text>

            <Alert
              message="Resumen de carga"
              description={
                <div>
                  <p>
                    <strong>Archivo:</strong> {uploadedFile?.name}
                  </p>
                  <p>
                    <strong>Registros a cargar:</strong>{" "}
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
                <Button block onClick={() => setCurrentStep(STEP.ValidateData)}>
                  Volver a validación
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    message.success(
                      `${processedJsonData.length} registros cargados exitosamente`
                    );
                    if (onFinish && processedJsonData.length > 0)
                      onFinish(processedJsonData);
                    handleReset();
                    onCancel();
                  }}
                >
                  Cargar datos
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
