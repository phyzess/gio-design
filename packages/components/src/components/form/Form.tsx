import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import RcForm, { FormInstance, useForm } from 'rc-field-form';
import React, { useContext } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { FormContext, FormLabelAlign, RequiredMark } from './context';
import { SizeContextProvider, SizeType } from '../config-provider/SizeContext';

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export interface Props<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string;
  className?: string;
  name?: string;
  labelWidth?: number;
  inputWidth?: number;
  labelAlign?: FormLabelAlign;
  form?: FormInstance<Values>;
  layout?: FormLayout;
  size?: SizeType;
  colon?: boolean;
  requiredMark?: RequiredMark;
}

const Form: React.ForwardRefRenderFunction<FormInstance, Props> = (props: Props, ref) => {
  const {
    name,
    prefixCls: customizePrefixCls,
    className,
    layout = 'horizontal',
    labelWidth,
    inputWidth,
    labelAlign,
    size,
    form,
    colon = false,
    requiredMark = true,
    ...restProps
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('form', customizePrefixCls);
  const cls = classNames(prefixCls, className, `${prefixCls}-${size || 'middle'}`, `${prefixCls}-${layout}`);
  // @TODO: wrap form with custom functions
  const [wrapForm] = useForm(form);
  const formContextValues = {
    name,
    layout,
    labelWidth,
    inputWidth,
    labelAlign,
    requiredMark,
    colon,
  };

  React.useImperativeHandle(ref, () => wrapForm);

  return (
    <FormContext.Provider value={formContextValues}>
      <SizeContextProvider size={size}>
        <RcForm {...restProps} id={name} name={name} className={cls} form={wrapForm} />
      </SizeContextProvider>
    </FormContext.Provider>
  );
};

export default Form;
export { FormInstance, List, useForm, FormProvider } from 'rc-field-form';