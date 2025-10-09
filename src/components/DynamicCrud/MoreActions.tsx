import React from 'react';
import { MoreActions } from '../DynamicTable/types';

/**
 * Crea un generador de acciones tipado para un tipo específico
 * @returns Una función createMoreAction tipada con T
 */
const createActionFactory = <T,>() => {
  /**
   * Crear un objeto de acción para el menú de opciones
   * @param key Clave de la acción
   * @param icon Icono de la acción
   * @param tooltip Mensaje emergente de la acción
   * @param className Clase de la acción
   * @param onClick Función al hacer clic en la acción
   * @param hidden Función para determinar si la acción está oculta (opcional)
   * @param label Etiqueta de la acción (opcional)
   * @param style Estilo de la acción (opcional)
   */
  return function createMoreAction(
    key: string,
    icon: React.ReactElement,
    tooltip: string,
    className: string,
    onClick: (record: T) => void,
    hidden?: (record: T) => boolean,
    label: string = '',
    loading: boolean = false,
    style: React.CSSProperties = {}
  ): MoreActions<T> {
    return {
      key,
      icon,
      label,
      style,
      tooltip,
      className,
      onClick,
      hidden,
      loading
    };
  };
};

export { createActionFactory };