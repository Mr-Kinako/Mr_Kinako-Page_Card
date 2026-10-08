// src/hooks/useDocumentTitle.ts

import { useEffect, useRef } from "react";

const BASE_TITLE = "Mr_Kinako";

export const useDocumentTitle = (title: string) => {
  const initialTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      // Возвращаем заголовок ТОЛЬКО если новый компонент его еще не переопределил
      if (document.title === title) {
        document.title = initialTitleRef.current || BASE_TITLE;
      }
    };
  }, [title]);
};
