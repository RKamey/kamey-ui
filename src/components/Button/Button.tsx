import { Button } from 'antd';
import { 
  FiSave, FiTrash2, FiEdit3, FiPlus, FiDownload, FiUpload, 
  FiRefreshCw, FiSearch, FiSettings, FiUser, FiHeart, 
  FiShoppingCart, FiMail, FiPhone, FiHome, FiArrowRight 
} from 'react-icons/fi';

export interface BtnProps {
  children?: React.ReactNode;
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  size?: 'small' | 'middle' | 'large';
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
  preset?: 'save' | 'delete' | 'edit' | 'add' | 'download' | 'upload' | 'refresh' | 'search' | 'settings' | 'profile' | 'favorite' | 'cart' | 'mail' | 'call' | 'home' | 'next';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * @alias Btn
 * @description Versatile button component with icon support, custom variants and presets
 * @param {BtnProps} props
 * @param {React.ReactNode} props.children - The content of the button
 * @param {'primary' | 'link' | 'text' | 'default' | 'dashed'} props.type - The Ant Design button type
 * @param {'small' | 'middle' | 'large'} props.size - The size of the button
 * @param {'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark'} props.variant - Color variant
 * @param {'save' | 'delete' | 'edit' | 'add' | 'download' | 'upload' | 'refresh' | 'search' | 'settings' | 'profile' | 'favorite' | 'cart' | 'mail' | 'call' | 'home' | 'next'} props.preset - Predefined button with icon and text
 * @param {React.ReactNode} props.icon - Custom icon
 * @param {'left' | 'right'} props.iconPosition - Position of the icon
 * @param {boolean} props.iconOnly - Show only icon without text
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {() => void} props.onClick - Click handler
 * @returns {React.ReactNode}
 * @example 
 * <Btn preset="save" variant="success">Guardar</Btn>
 * <Btn icon={<FiCustomIcon />} variant="info">Custom</Btn>
 * <Btn preset="delete" iconOnly />
 */
export const Btn = ({ 
  children, 
  type = 'primary', 
  size = 'middle', 
  variant = 'default',
  preset,
  icon,
  iconPosition = 'left',
  iconOnly = false,
  loading = false,
  disabled = false,
  onClick 
}: BtnProps): React.ReactNode => {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return '!bg-green-600 hover:!bg-green-700 !border-green-600 hover:!border-green-700 !text-white';
      case 'danger':
        return '!bg-red-600 hover:!bg-red-700 !border-red-600 hover:!border-red-700 !text-white';
      case 'warning':
        return '!bg-yellow-600 hover:!bg-yellow-700 !border-yellow-600 hover:!border-yellow-700 !text-white';
      case 'info':
        return '!bg-blue-600 hover:!bg-blue-700 !border-blue-600 hover:!border-blue-700 !text-white';
      case 'dark':
        return '!bg-gray-800 hover:!bg-gray-900 !border-gray-800 hover:!border-gray-900 !text-white';
      default:
        return '';
    }
  };

  const getPresetConfig = () => {
    const presets = {
      save: { icon: <FiSave />, text: 'Guardar', variant: 'success' as const },
      delete: { icon: <FiTrash2 />, text: 'Eliminar', variant: 'danger' as const },
      edit: { icon: <FiEdit3 />, text: 'Editar', variant: 'info' as const },
      add: { icon: <FiPlus />, text: 'Agregar', variant: 'success' as const },
      download: { icon: <FiDownload />, text: 'Descargar', variant: 'info' as const },
      upload: { icon: <FiUpload />, text: 'Subir', variant: 'warning' as const },
      refresh: { icon: <FiRefreshCw />, text: 'Actualizar', variant: 'default' as const },
      search: { icon: <FiSearch />, text: 'Buscar', variant: 'info' as const },
      settings: { icon: <FiSettings />, text: 'Configurar', variant: 'dark' as const },
      profile: { icon: <FiUser />, text: 'Perfil', variant: 'default' as const },
      favorite: { icon: <FiHeart />, text: 'Favorito', variant: 'danger' as const },
      cart: { icon: <FiShoppingCart />, text: 'Carrito', variant: 'warning' as const },
      mail: { icon: <FiMail />, text: 'Enviar', variant: 'info' as const },
      call: { icon: <FiPhone />, text: 'Llamar', variant: 'success' as const },
      home: { icon: <FiHome />, text: 'Inicio', variant: 'default' as const },
      next: { icon: <FiArrowRight />, text: 'Siguiente', variant: 'default' as const, iconPosition: 'right' as const }
    };

    return preset ? presets[preset] : null;
  };

  const presetConfig = getPresetConfig();
  const finalIcon = icon || presetConfig?.icon;
  const finalVariant = presetConfig?.variant || variant;
  const finalIconPosition = (presetConfig && 'iconPosition' in presetConfig ? presetConfig.iconPosition : iconPosition);
  const finalChildren = children || (preset && !iconOnly ? presetConfig?.text : '');

  const baseClasses = iconOnly 
    ? '!rounded-full !w-10 !h-10 !flex !items-center !justify-center !shadow-md !cursor-pointer !transition-all !duration-200'
    : '!rounded-lg !shadow-md !cursor-pointer !transition-all !duration-200 !font-medium';

  const variantClasses = finalVariant !== 'default' ? getVariantClasses() : '';

  if (iconOnly) {
    return (
      <Button
        className={`${baseClasses} ${variantClasses}`}
        type={type}
        size={size}
        loading={loading}
        disabled={disabled}
        onClick={onClick}
      >
        {finalIcon}
      </Button>
    );
  }

  return (
    <Button
      className={`${baseClasses} ${variantClasses}`}
      type={type}
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      icon={finalIconPosition === 'left' ? finalIcon : undefined}
    >
      <div className={`!flex !items-center !gap-2 ${finalIconPosition === 'right' ? '!flex-row-reverse' : ''}`}>
        {finalIconPosition === 'right' && finalIcon}
        {finalChildren}
      </div>
    </Button>
  );
};