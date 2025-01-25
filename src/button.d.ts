import { ButtonProps } from 'antd';

declare module 'antd' {
    interface ButtonProps {
        type?: ButtonProps['type'] | 'warning' | 'danger' | 'new' | 'info' | 'success' | 'download' | 'primary';
    }
}