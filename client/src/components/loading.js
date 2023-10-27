import React from "react";

export default function Loading() {

  return(
    <div className="text-center text-primary mb-3">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}