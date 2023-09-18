import React from "react";
import { useParams } from "react-router";

export default function Spk() {
  
  const params = useParams();
  
  return(
    <div>
      <h1>
        {params.id.toString()} Spk Page
      </h1>
    </div>
  );
}