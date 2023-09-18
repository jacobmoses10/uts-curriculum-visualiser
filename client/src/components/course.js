import React from "react";
import { useParams } from "react-router";

export default function Course() {
  
  const params = useParams();
  
  return(
    <div>
      <h1>
        {params.id.toString()} Course Page
      </h1>
    </div>
  );
}