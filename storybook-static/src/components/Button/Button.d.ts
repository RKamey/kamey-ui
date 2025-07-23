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
export declare const Btn: ({ children, type, size, variant, preset, icon, iconPosition, iconOnly, loading, disabled, onClick }: BtnProps) => React.ReactNode;
