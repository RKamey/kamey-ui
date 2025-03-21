export interface BtnProps {
    children: React.ReactNode;
    type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
    size?: 'small' | 'middle' | 'large';
    onClick?: () => void;
}
/**
 * @alias Btn
 * @description Simple button component
 * @param {BtnProps} props
 * @param {React.ReactNode} props.children - The content of the button
 * @param {'primary' | 'link' | 'text' | 'default' | 'dashed'} props.type - The type of the button
 * @param {'small' | 'middle' | 'large'} props.size - The size of the button
 * @param {() => void} props.onClick - The function to be called when the button is clicked
 * @returns {React.ReactNode}
 * @example <Btn type="primary" size="middle" onClick={() => console.log('clicked')}>Click me</Btn>
 */
export declare const Btn: ({ children, type, size, onClick }: BtnProps) => React.ReactNode;
