"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/Components/AuthModal";
import UploadModal from "@/Components/UploadModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}

export default ModalProvider;
