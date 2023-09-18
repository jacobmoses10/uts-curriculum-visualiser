import React from "react";
import { useParams } from "react-router";

export default function Subject() {
  
  const params = useParams();
  
  return(
    <div>
      <h1>
        {params.id.toString()} Subject Page
      </h1>
    </div>
  );
}