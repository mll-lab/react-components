import { renderHook } from '@testing-library/react-hooks';
import React, { PropsWithChildren } from 'react';
import { act } from 'react-test-renderer';

import { useGlobalForms, useGlobalForm } from './GlobalFormsContext';
import { GlobalFormsProvider } from './GlobalFormsProvider';

function createOptions() {
  return {
    wrapper: function Wrapper({ children }: PropsWithChildren<unknown>) {
      return <GlobalFormsProvider>{children}</GlobalFormsProvider>;
    },
  };
}

describe('GlobalFormsProvider', () => {
  it('finds one submitting form', () => {
    const { result } = renderHook(() => {
      const { isSubmitting } = useGlobalForms();
      const { setSubmitting: setSubmitting1 } = useGlobalForm('form1');
      const { setSubmitting: setSubmitting2 } = useGlobalForm('form2');

      return { isSubmitting, setSubmitting1, setSubmitting2 };
    }, createOptions());
    expect(result.error).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();

    act(() => result.current.setSubmitting1(true));
    act(() => result.current.setSubmitting2(false));
    expect(result.current.isSubmitting).toBeTruthy();
  });

  it('overrides submitting value', () => {
    const { result } = renderHook(() => {
      const { isSubmitting } = useGlobalForms();
      const { setSubmitting } = useGlobalForm('form');

      return { isSubmitting, setSubmitting };
    }, createOptions());
    expect(result.current.isSubmitting).toBeFalsy();

    act(() => result.current.setSubmitting(true));
    expect(result.current.isSubmitting).toBeTruthy();

    act(() => result.current.setSubmitting(false));
    expect(result.current.isSubmitting).toBeFalsy();
  });

  it('calls all reset callbacks', () => {
    const { result } = renderHook(() => {
      const { reset } = useGlobalForms();
      const { setResetCallback: setResetCallback1 } = useGlobalForm('form1');
      const { setResetCallback: setResetCallback2 } = useGlobalForm('form2');

      return { reset, setResetCallback1, setResetCallback2 };
    }, createOptions());
    result.current.reset();

    const reset1 = jest.fn();
    act(() => result.current.setResetCallback1(reset1));

    const reset2 = jest.fn();
    act(() => result.current.setResetCallback2(reset2));

    result.current.reset();
    expect(reset1).toHaveBeenCalledTimes(1);
    expect(reset2).toHaveBeenCalledTimes(1);

    act(() => result.current.setResetCallback1(jest.fn()));
    result.current.reset();
    expect(reset1).toHaveBeenCalledTimes(1);
    expect(reset2).toHaveBeenCalledTimes(2);
  });

  it('overrides reset callback', () => {
    const { result } = renderHook(() => {
      const { reset } = useGlobalForms();
      const { setResetCallback } = useGlobalForm('form');

      return { reset, setResetCallback };
    }, createOptions());
    const resetOld = jest.fn();
    act(() => result.current.setResetCallback(resetOld));
    result.current.reset();
    expect(resetOld).toHaveBeenCalledTimes(1);

    const resetNew = jest.fn();
    act(() => result.current.setResetCallback(resetNew));
    result.current.reset();
    expect(resetOld).toHaveBeenCalledTimes(1);
    expect(resetNew).toHaveBeenCalledTimes(1);
  });

  it('calls all submit callbacks', async () => {
    const { result } = renderHook(() => {
      const { submit } = useGlobalForms();
      const { setSubmitCallback: setSubmitCallback1 } = useGlobalForm('form1');
      const { setSubmitCallback: setSubmitCallback2 } = useGlobalForm('form2');

      return { submit, setSubmitCallback1, setSubmitCallback2 };
    }, createOptions());
    await expect(result.current.submit()).resolves.toBeTruthy();

    const submit1 = jest.fn(() => Promise.resolve());
    act(() => result.current.setSubmitCallback1(submit1));

    const submit2 = jest.fn(() => Promise.resolve());
    act(() => result.current.setSubmitCallback2(submit2));

    await expect(result.current.submit()).resolves.toBeFalsy();
    expect(submit1).toHaveBeenCalledTimes(1);
    expect(submit2).toHaveBeenCalledTimes(1);
  });

  it('overrides submit callback', async () => {
    const { result } = renderHook(() => {
      const { submit } = useGlobalForms();
      const { setSubmitCallback } = useGlobalForm('form');

      return { submit, setSubmitCallback };
    }, createOptions());

    const submitOld = jest.fn(() => Promise.resolve());
    act(() => result.current.setSubmitCallback(submitOld));

    await expect(result.current.submit()).resolves.toBeFalsy();
    expect(submitOld).toHaveBeenCalledTimes(1);

    const submitNew = jest.fn(() => Promise.resolve());
    act(() => result.current.setSubmitCallback(submitNew));

    await expect(result.current.submit()).resolves.toBeFalsy();
    expect(submitOld).toHaveBeenCalledTimes(1);
    expect(submitNew).toHaveBeenCalledTimes(1);
  });

  it('maintains submit order', async () => {
    const { result } = renderHook(() => {
      const { submit } = useGlobalForms();
      const { setSubmitCallback: setSubmitCallbackError } = useGlobalForm({
        name: 'form-error',
        order: 2,
      });
      const { setSubmitCallback: setSubmitCallbackFirst } = useGlobalForm({
        name: 'form-first',
        order: 1,
      });
      const { setSubmitCallback: setSubmitCallbackLast } = useGlobalForm({
        name: 'form-last',
        order: 3,
      });

      return {
        submit,
        setSubmitCallbackError,
        setSubmitCallbackFirst,
        setSubmitCallbackLast,
      };
    }, createOptions());
    const submitError = jest.fn(() => Promise.reject());
    act(() => result.current.setSubmitCallbackError(submitError));

    const submitFirst = jest.fn(() => Promise.resolve());
    act(() => result.current.setSubmitCallbackFirst(submitFirst));

    const submitLast = jest.fn(() => Promise.resolve());
    act(() => result.current.setSubmitCallbackLast(submitLast));

    await expect(result.current.submit()).rejects.toBeFalsy();
    expect(submitFirst).toHaveBeenCalledTimes(1);
    expect(submitError).toHaveBeenCalledTimes(1);
    expect(submitLast).toHaveBeenCalledTimes(0);
  });
});
