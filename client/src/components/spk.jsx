import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cards from "./cards";
import Visualiser from "./visualiser";
import Loading from "./loading";

export default function Spk() {
  
  const [spk, setSpk] = useState([]);
  const [tree, setTree] = useState({});
  const params = useParams();
  window.scrollTo(0, 0);

  useEffect(() => {
    async function getSpk() {
      const spkResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/spk/${params.id.toString()}`);
      const spk = await spkResponse.json();
      setSpk(spk);

      const treeResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/spk/tree/${params.id.toString()}`);
      const tree = await treeResponse.json();
      setTree(tree);
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
      <div className="d-flex justify-content-center">
        {(!spk.spkId) ? <Loading/> : <Visualiser data={tree} />}
      </div>
      <hr/>
      <Cards data = {spk}/>
    
    </div>
  );
}