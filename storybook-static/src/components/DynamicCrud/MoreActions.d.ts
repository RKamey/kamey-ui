import { default as React } from '../../../node_modules/react';
import { MoreActions } from '../DynamicTable/types';
/**
 * Crea un generador de acciones tipado para un tipo específico
 * @returns Una función createMoreAction tipada con T
 */
declare const createActionFactory: <T>() => (key: string, icon: React.ReactElement, tooltip: string, className: string, onClick: (record: T) => void, hidden?: (record: T) => boolean, label?: string, style?: React.CSSProperties) => MoreActions<T>;
export { createActionFactory };
