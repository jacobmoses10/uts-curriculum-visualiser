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

  function getFoe() {
    if (spk.primaryFoeName) {
      return (
        <div>
          <dt className="sm-2">Field of Education</dt>
          <dd className="sm-9">{spk.primaryFoeName}</dd>
        </div>
      );
    }
  }

  return(
    <div className="container">
      <h2>{spk.spkId} {spk.fullTitle}</h2>
      <hr/>

      <div className="row">
        <dl className="col">
          <dt className="sm-2">SPK Version</dt>
          <dd className="sm-9">v{spk.spkv}</dd>
          <dt className="sm-2">SPK Type</dt>
          <dd className="sm-9">{spk.spkTypeId}: {spk.spkTypeName}</dd>
          <dt className="sm-2">Credit Points</dt>
          <dd className="sm-9">{spk.cpv}</dd>
          {getFoe()}  
        </dl>

        <dl className="col">
          <dt className="sm-2">Faculty</dt>
          <dd className="sm-9">{spk.orgName}</dd>
          <dt className="sm-2">Study Area</dt>
          <dd className="sm-9">{spk.studyAreaId}: {spk.studyAreaName}</dd>
          <dt className="sm-2">Stage</dt>
          <dd className="sm-9">{spk.stage}</dd>
        </dl>
      </div>

      <hr/>
      <Cards data = {spk}/>
    
    </div>
  );
}