import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cards from "./cards";

export default function Spk() {
  
  const [spk, setSpk] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getSpk() {
      const response = await fetch(`http://localhost:4000/spk/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const spk = await response.json();
      setSpk(spk);
    }
    getSpk();
    return;
  }, [params.id]);


  return(
    <div>
      <h1>{spk.spkId} {spk.fullTitle}</h1>
      <dl className="row">
        <dt className="col-sm-3">Version</dt>
        <dd className="col-sm-9">v{spk.spkv}</dd>
        <dt className="col-sm-3">Type</dt>
        <dd className="col-sm-9">{spk.spkTypeId}: {spk.spkTypeName}</dd>
        <dt className="col-sm-3">Credit Points</dt>
        <dd className="col-sm-9">{spk.cpv}</dd>
        <dt className="col-sm-3">Faculty</dt>
        <dd className="col-sm-9">{spk.orgName}</dd>
        <dt className="col-sm-3">Field of Education</dt>
        <dd className="col-sm-9">{spk.primaryFoeName}</dd>
        <dt className="col-sm-3">Study Area</dt>
        <dd className="col-sm-9">{spk.studyAreaId}: {spk.studyAreaName}</dd>
        <dt className="col-sm-3">Stage</dt>
        <dd className="col-sm-9">{spk.stage}</dd> 
      </dl>

      <Cards data = {spk}/>
    
    </div>
  );
}