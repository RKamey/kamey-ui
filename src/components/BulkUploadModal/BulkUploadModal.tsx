import { Alert, Button, Card, Col, Modal, Row, Steps, Typography } from "antd";
import { BulkConfig } from "../DynamicTable/types";
import { useState } from "react";
import { steps } from "./BulkUpload.config";
import { IoDownloadOutline } from "react-icons/io5";
import { TiUploadOutline } from "react-icons/ti";
import Dragger from "antd/es/upload/Dragger";

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

const BulkUploadModal = <T,>({
  title = "Carga masiva",
  subtitle,
  visible,
  onCancel,
  // onUpload,
  config,
  // onDownloadTemplate,
  // onValidateData,
  // mockData = [],
}: BulkUploadModalProps<T>) => {
  // ===== [ State ] =====
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // ===== [ Config ] =====
  const defaultTitle = title || `Carga masiva de ${config?.entityName}`;
  const defaultSubtitle =
    subtitle ||
    `Descarga la plantilla, completa los datos y súbelos para registrar ${config.entityName} en bloque`;

  const maxSize = config.maxFileSize || 10;
  const formats = config.allowedFormats || ["xlsx", "csv"];
  // const templates = config.downloadTemplates || [];

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleFileUpload = (file: File) => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setUploadedFile(file);
    setCurrentStep(1);

    console.log("File uploaded:", file);
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
                    console.log("Download CSV template");
                  }}
                >
                  Descargar plantilla CSV (.csv)
                </Button>
              </Col>
            </Row>
          </Card>
        );

      case 1:
        return (
          <Card>
            <Title level={4}>Subir archivo</Title>
            <Dragger
              name="file"
              multiple={false}
              accept={formats.join(",")}
              beforeUpload={handleFileUpload}
              showUploadList={false}
              disabled={isLoading}
            >
              <p className="ant-upload-drag-icon">
                <TiUploadOutline />
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
              <Alert
                message="Procesando archivo..."
                type="info"
                style={{ marginTop: 16 }}
              />
            )}
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
