import { useEffect, useState} from 'react'

// Pattern from https://usehooks.com/useDebounce/
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    };
  }, [value, delay])
  return debouncedValue
}