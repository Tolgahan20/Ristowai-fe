"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/common';

interface UseApiState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiResult<T = any> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<{ data: T }>
): UseApiResult<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await apiFunction(...args);
        const data = response.data;
        
        setState(prev => ({ ...prev, data, loading: false }));
        return data;
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        
        if (error instanceof AxiosError) {
          const apiError = error.response?.data as ApiError;
          errorMessage = apiError?.message || error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for API calls that return arrays with optional pagination
export function useApiList<T = any>(
  apiFunction: (...args: any[]) => Promise<{ data: T[] | { data: T[]; total: number } }>
) {
  const [state, setState] = useState<{
    items: T[];
    total: number;
    loading: boolean;
    error: string | null;
  }>({
    items: [],
    total: 0,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T[]> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await apiFunction(...args);
        const responseData = response.data;
        
        // Handle both direct arrays and paginated responses
        const items = Array.isArray(responseData) ? responseData : responseData.data;
        const total = Array.isArray(responseData) ? responseData.length : responseData.total;
        
        setState(prev => ({ ...prev, items, total, loading: false }));
        return items;
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        
        if (error instanceof AxiosError) {
          const apiError = error.response?.data as ApiError;
          errorMessage = apiError?.message || error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      items: [],
      total: 0,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
