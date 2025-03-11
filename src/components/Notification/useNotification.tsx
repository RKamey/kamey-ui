/**
 * Componente de Notificación
 * @description Muestra una notificación con un mensaje
 * @param type Tipo de notificación
 * @param message Mensaje de la notificación
 * @param placement Posición de la notificación
 * @example openNotification('success', 'Usuario creado', 'El usuario fue creado exitosamente');
 */

import { notification } from 'antd';

type NotificationType = 'success' | 'error' | 'info' | 'warning';
type placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

const openNotification = (type: NotificationType, message: string, description: string, placement: placement = 'bottomRight') => {
  notification[type]({
    message,
    description,
    placement
  });
};

export { openNotification }