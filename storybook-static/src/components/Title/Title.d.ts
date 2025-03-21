import { CSSProperties } from '../../../node_modules/react';
export interface CustomTitleProps {
    level?: 1 | 2 | 3 | 4 | 5;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare const Title: ({ level, children, className, style }: CustomTitleProps) => import("react/jsx-runtime").JSX.Element;
