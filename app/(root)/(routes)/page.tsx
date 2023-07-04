"use client"

import { useEffect } from "react";

import { useApplicationModal } from "@/hooks/use-application-modal";

const SetupPage = () => {
  const onOpen = useApplicationModal((state) => state.onOpen);
  const isOpen = useApplicationModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  
  return null;
};

export default SetupPage;

