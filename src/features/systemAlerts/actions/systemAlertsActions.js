import uid from 'nanoid';
import { createActions } from 'redux-actions';
import { AlertActionTypes } from 'constants/index';

export const { hideAlert, showAlert } = createActions({
  [AlertActionTypes.HIDE_ALERT]: (id: string) => ({ id }),
  [AlertActionTypes.SHOW_ALERT]: (message: string, options: Object) => {
    const timeout = options.variant === 'danger' ? 0 : 2;

    return {
      id: options.id || uid(),
      icon: options.icon,
      message,
      position: options.position || 'bottom-right',
      variant: options.variant || 'dark',
      timeout: typeof options.timeout === 'number' ? options.timeout : timeout,
    };
  },
});
