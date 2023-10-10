import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cards from "./cards";

export default function Subject() {
  
  const [subject, setSubject] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getSubject() {
      const response = await fetch(`http://localhost:4000/subject/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const subject = await response.json();
      setSubject(subject);
    }
    getSubject();
    return;
  }, [params.id]);


  return(
    <div>
      <h1>{subject.subjectId} {subject.fullTitle}</h1>
      <dl className="row">
        <dt className="col-sm-3">Version</dt>
        <dd className="col-sm-9">v{subject.subjectv}</dd>
        <dt className="col-sm-3">Type</dt>
        <dd className="col-sm-9">{subject.spkTypeId}: {subject.spkTypeName}</dd>
        <dt className="col-sm-3">Credit Points</dt>
        <dd className="col-sm-9">{subject.cpv}</dd>
        <dt className="col-sm-3">Faculty</dt>
        <dd className="col-sm-9">{subject.orgName}</dd>
        <dt className="col-sm-3">Field of Education</dt>
        <dd className="col-sm-9">{subject.primaryFoeName}</dd>
        <dt className="col-sm-3">Study Area</dt>
        <dd className="col-sm-9">{subject.studyAreaId}: {subject.studyAreaName}</dd>
        <dt className="col-sm-3">Study Type</dt>
        <dd className="col-sm-9">{subject.studyType}</dd>
        <dt className="col-sm-3">Grading</dt>
        <dd className="col-sm-9">{subject.grading}</dd>
        <dt className="col-sm-3">Study Type</dt>
        <dd className="col-sm-9">{subject.studyType}</dd>
        <dt className="col-sm-3">Fee Level</dt>
        <dd className="col-sm-9">{subject.feeLevelType} ({subject.feeLevelCode})</dd>
        <dt className="col-sm-3">Stage</dt>
        <dd className="col-sm-9">{subject.stage}</dd> 
      </dl>

      <Cards data = {subject}/>

    </div>
  );
}