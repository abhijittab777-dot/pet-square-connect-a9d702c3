import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get(key, initialValue);
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prevValue => {
      const valueToStore = value instanceof Function ? value(prevValue) : value;
      storage.set(key, valueToStore);
      return valueToStore;
    });
  }, [key]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `petSquare_${key}` && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}
