import React from "react";
import "./loading.css";

function Loading() {
  return (
    <div className="loading-modal">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-white" />
      <div className="loading-text">Processando...</div>
    </div>
  );
}

export default Loading;
