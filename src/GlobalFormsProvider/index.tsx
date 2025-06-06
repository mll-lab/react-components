import { Maybe, callSequentially } from '@mll-lab/js-utils';
import { sortBy } from 'lodash';
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  CallbackWithOrder,
  GlobalFormsContext,
  GlobalFormsContextType,
} from './GlobalFormsContext';

export type GlobalFormsProviderProps = PropsWithChildren<unknown>;

function findNextOrder(
  callbacks: Maybe<Record<string, CallbackWithOrder>>,
): number {
  if (!callbacks) {
    return 1;
  }

  const orders = Object.values(callbacks).map((callback) => callback.order);
  if (orders.length === 0) {
    return 1;
  }

  return Math.max(...orders) + 1;
}

export function GlobalFormsProvider({ children }: GlobalFormsProviderProps) {
  const [submitCallbacks, setSubmitCallbacks] =
    useState<Record<string, CallbackWithOrder>>();
  const [resetCallbacks, setResetCallbacks] =
    useState<Record<string, () => void>>();
  const [submittings, setSubmittings] = useState<Record<string, boolean>>();
  const submitSuccessfulList = useRef<Record<string, boolean>>({});

  const setSubmitCallback: GlobalFormsContextType['setSubmitCallback'] =
    useCallback((form, callback) => {
      setSubmitCallbacks((prevCallbacks) => {
        const nextOrder =
          form.order > 0 ? form.order : findNextOrder(prevCallbacks);

        return {
          ...prevCallbacks,
          [form.name]: {
            callback,
            order: nextOrder,
          },
        };
      });
    }, []);

  const setResetCallback: GlobalFormsContextType['setResetCallback'] =
    useCallback((form, callback) => {
      setResetCallbacks((prevCallbacks) => ({
        ...prevCallbacks,
        [form.name]: callback,
      }));
    }, []);

  const setSubmitSuccessful: GlobalFormsContextType['setSubmitSuccessful'] =
    useCallback((form, value) => {
      submitSuccessfulList.current[form.name] = value;
    }, []);

  const submit: GlobalFormsContextType['submit'] = useCallback(
    async (additionalCallback?: CallbackWithOrder) => {
      if (submitCallbacks) {
        Object.keys(submitCallbacks).forEach((formName) => {
          submitSuccessfulList.current[formName] = false;
        });
      }
      const callbacks = Object.values(submitCallbacks ?? {});
      if (additionalCallback) {
        callbacks.push(additionalCallback);
      }
      const sortedCallbacks = sortBy(callbacks, (wrapper) => wrapper.order).map(
        (wrapper) => wrapper.callback,
      );
      await callSequentially(sortedCallbacks);

      return Object.values(submitSuccessfulList.current).every(Boolean);
    },
    [submitCallbacks],
  );

  const setSubmitting: GlobalFormsContextType['setSubmitting'] = useCallback(
    (form, value) => {
      setSubmittings((prevSubmittings) => ({
        ...prevSubmittings,
        [form.name]: value,
      }));
    },
    [],
  );

  const isSubmitting = useMemo(
    () => Object.values(submittings ?? {}).some(Boolean),
    [submittings],
  );

  const reset: GlobalFormsContextType['reset'] = useCallback(
    () => Object.values(resetCallbacks ?? {}).forEach((callback) => callback()),
    [resetCallbacks],
  );

  const value = useMemo(
    () => ({
      isSubmitting,
      setSubmitSuccessful,
      reset,
      setResetCallback,
      setSubmitCallback,
      setSubmitting,
      submit,
    }),
    [
      isSubmitting,
      setSubmitSuccessful,
      reset,
      setResetCallback,
      setSubmitCallback,
      setSubmitting,
      submit,
    ],
  );

  return (
    <GlobalFormsContext.Provider value={value}>
      {children}
    </GlobalFormsContext.Provider>
  );
}

export * from './GlobalFormsContext';
