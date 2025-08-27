import { Alert, Button, Card, Col, message, Modal, Row, Spin, Steps, Typography, UploadProps } from "antd";
import { BulkConfig } from "../DynamicTable/types";
import { useState } from "react";
import { steps } from "./BulkUpload.config";
import { IoDownloadOutline } from "react-icons/io5";
import { InboxOutlined } from "@ant-design/icons";
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

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: undefined,
    beforeUpload: (file) => {
      const validation = validateFile(file);
      
      if (!validation) {
        message.error(validation);
        return false
      }

      handleFileUpload(file);

      return false;
    },
    showUploadList: false,
  }

  const validateFile = (file: File): boolean | string => {
    console.log(file, 'validatefile');

    if (file.size / 1024 / 1024 > maxSize) {
      console.log(file.size / 1024 / 1024 > maxSize);
      return `El archivo debe ser menor a ${maxSize}MB`;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !formats.includes(fileExtension)) {
      return `Formato de archivo no soportado. Formatos permitidos: ${formats.join(", ")}`;
    }
    
    return true;
  }

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleFileUpload = (file: File) => {
    setIsLoading(true);
    setUploadedFile(file);

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
            <Dragger {...draggerProps}
            >
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
                <Spin size="small" style={{ marginRight: 8, }} />
                Validando archivo...
                Por favor espera
              </div>
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
