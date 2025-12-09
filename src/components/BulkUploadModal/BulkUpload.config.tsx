import type { StepsProps } from "antd";
import { IoCheckmarkOutline, IoDownloadOutline, IoEyeOutline } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { TiUploadOutline } from "react-icons/ti";

export const steps: NonNullable<StepsProps['items']> = [
  {
    title: 'Descargar plantilla',
    description: 'Obten el formato correcto',
    icon: <IoDownloadOutline />
  },
  {
    title: 'Subir archivo',
    description: 'Carga tu archivo de datos',
    icon: <TiUploadOutline />
  },
  {
    title: 'Vista previa',
    description: 'Revisa los datos cargados',
    icon: <IoEyeOutline />
  },
  {
    title: 'Validar',
    description: 'Verifica que los datos sean correctos',
    icon: <IoCheckmarkOutline />
  },
  {
    title: 'Confirmar',
    description: 'Procesa la carga masiva',
    icon: <MdCheckCircleOutline />
  }
];
