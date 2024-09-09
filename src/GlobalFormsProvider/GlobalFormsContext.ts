import React, { useCallback, useContext, useMemo } from 'react';

export type FormInfo = { name: string; order: number };
type FormInfoObjectOrString = FormInfo | string;

export type CallbackWithOrder = {
  callback: () => Promise<void>;
  order: number;
};

export type GlobalFormsContextType = {
  isSubmitting: boolean;
  reset: () => void;
  setResetCallback: (form: FormInfo, callback: () => void) => void;
  setSubmitCallback: (form: FormInfo, callback: () => Promise<void>) => void;
  setSubmitting: (form: FormInfo, submitting: boolean) => void;
  setSubmitSuccessful: (form: FormInfo, submitSuccessful: boolean) => void;
  /** Returns true when all forms were submitted successfully.  */
  submit: (additionalCallback?: CallbackWithOrder) => Promise<boolean>;
};

export const GlobalFormsContext = React.createContext<GlobalFormsContextType>({
  isSubmitting: false,
  reset: () => {},
  setResetCallback: () => {},
  setSubmitCallback: () => {},
  setSubmitting: () => {},
  setSubmitSuccessful: () => {},
  submit: () => Promise.resolve(false),
});

export function useGlobalForms() {
  return useContext(GlobalFormsContext);
}

export function normalizeFormInfo(form: FormInfoObjectOrString): FormInfo {
  if (typeof form === 'string') {
    return { name: form, order: 0 };
  }

  return form;
}

export function useGlobalForm(form: FormInfoObjectOrString) {
  const formInfo = useMemo(() => normalizeFormInfo(form), [form]);

  const {
    setResetCallback,
    setSubmitCallback,
    setSubmitting,
    setSubmitSuccessful,
  } = useContext(GlobalFormsContext);

  const setResetCallbackWrapped = useCallback(
    (callback: () => void) => {
      setResetCallback(formInfo, callback);
    },
    [formInfo, setResetCallback],
  );

  const setSubmitCallbackWrapped = useCallback(
    (callback: () => Promise<void>) => {
      setSubmitCallback(formInfo, callback);
    },
    [formInfo, setSubmitCallback],
  );

  const setSubmittingWrapped = useCallback(
    (submitting: boolean) => {
      setSubmitting(formInfo, submitting);
    },
    [formInfo, setSubmitting],
  );

  const setSubmitSuccessfulWrapped = useCallback(
    (submitSuccessful: boolean) => {
      setSubmitSuccessful(formInfo, submitSuccessful);
    },
    [formInfo, setSubmitSuccessful],
  );

  return {
    setResetCallback: setResetCallbackWrapped,
    setSubmitCallback: setSubmitCallbackWrapped,
    setSubmitSuccessful: setSubmitSuccessfulWrapped,
    setSubmitting: setSubmittingWrapped,
  };
}
