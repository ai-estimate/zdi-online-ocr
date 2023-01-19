import React, {useEffect, useRef} from 'react';

export function usePrevious<T extends unknown>(
  value: T,
): React.MutableRefObject<T | undefined> {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
