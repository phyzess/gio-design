import React from 'react';
import ReactDOM from 'react-dom';
import { WarningCircleFilled, InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@gio-design/icons';
import { PaletteBlue4, PaletteYellow5, PaletteGreen6, PaletteRed5 } from '@gio-design/tokens';
import { defaultRootPrefixCls } from '../config-provider';
import CalloutModal from './CalloutModal';
import { IModalStaticFuncConfig, IModalStaticFuncReturn, IModalConfigs } from './interface';

let modalPrefixCls = defaultRootPrefixCls;

export function configModal({ prefixCls }: IModalConfigs): void {
  if (prefixCls) {
    modalPrefixCls = prefixCls;
  }
}

export default function callout(config: IModalStaticFuncConfig): IModalStaticFuncReturn {
  const container = document.createElement('div');
  container.classList.add(`${modalPrefixCls}-modal__callout-container`);
  document.body.appendChild(container);

  let props = { okText: '确定', closeText: '取消', prefixCls: modalPrefixCls, ...config, close, visible: true };

  function render(modalProps: any): void {
    setTimeout(() => {
      ReactDOM.render(<CalloutModal {...modalProps}>{modalProps.content}</CalloutModal>, container);
    });
  }

  function destroy(originAfterClose: () => void): void {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);

    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    originAfterClose?.();
  }

  function close(...args: any[]): void {
    props = {
      ...props,
      visible: false,
      afterClose: destroy.bind(this, props.afterClose, ...args),
    };
    render(props);
  }

  function update(newConfig: IModalStaticFuncConfig): void {
    props = {
      ...props,
      ...newConfig,
    };
    render(props);
  }

  render(props);

  return {
    destroy: close,
    update,
  };
}

export const iconColorMap = {
  confirm: PaletteYellow5,
  info: PaletteBlue4,
  success: PaletteGreen6,
  warn: PaletteYellow5,
  error: PaletteRed5,
};

export function withConfirm(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'confirm',
    icon: <WarningCircleFilled size="20px" color={iconColorMap.confirm} />,
    showClose: true,
    ...props,
  };
}

export function withInfo(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'info',
    icon: <InfoCircleFilled size="20px" color={iconColorMap.info} />,
    showClose: false,
    ...props,
  };
}

export function withSuccess(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'success',
    icon: <CheckCircleFilled size="20px" color={iconColorMap.success} />,
    showClose: false,
    ...props,
  };
}

export function withWarn(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'warn',
    icon: <WarningCircleFilled size="20px" color={iconColorMap.warn} />,
    showClose: false,
    ...props,
  };
}

export function withError(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'error',
    icon: <CloseCircleFilled size="20px" color={iconColorMap.error} />,
    showClose: false,
    ...props,
  };
}
