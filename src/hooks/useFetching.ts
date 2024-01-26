import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackFunction = (...args: any[]) => Promise<void>;

export const useFetching = (
  callback: CallbackFunction
): [CallbackFunction, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetching: CallbackFunction = async (...args: any[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
