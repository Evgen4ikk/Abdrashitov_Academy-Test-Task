import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type TypeOut = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

export const useOutside = (initialIsVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { isShow, ref, setIsShow };
};
