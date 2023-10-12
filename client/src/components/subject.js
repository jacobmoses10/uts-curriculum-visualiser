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

  function getFeeLevel() {
    if (subject.feeLevelType && subject.feeLevelCode) {
      return(
        <div>
          <dt className="sm-2">Fee Level</dt>
          <dd className="sm-9">{subject.feeLevelType} ({subject.feeLevelCode})</dd>
        </div>
      );
    }
  }

  return(
    <div className="container">
      <h2>{subject.subjectId} {subject.fullTitle}</h2>
      <hr/>

      <div className="row">
        <dl className="col">
          <dt className="sm-2">Version</dt>
          <dd className="sm-9">v{subject.subjectv}</dd>
          <dt className="sm-2">Type</dt>
          <dd className="sm-9">{subject.spkTypeId}: {subject.spkTypeName}</dd>
          <dt className="sm-2">Credit Points</dt>
          <dd className="sm-9">{subject.cpv}</dd>
          <dt className="sm-2">Faculty</dt>
          <dd className="sm-9">{subject.orgName}</dd>
          <dt className="sm-2">Field of Education</dt>
          <dd className="sm-9">{subject.primaryFoeName}</dd>
          <dt className="sm-2">Study Area</dt>
          <dd className="sm-9">{subject.studyAreaId}: {subject.studyAreaName}</dd>
        </dl>

        <dl className="col">
          <dt className="sm-2">Study Type</dt>
          <dd className="sm-9">{subject.studyType}</dd>
          <dt className="sm-2">Grading</dt>
          <dd className="sm-9">{subject.grading}</dd>
          <dt className="sm-2">Study Type</dt>
          <dd className="sm-9">{subject.studyType}</dd>
          {getFeeLevel()}
          <dt className="sm-2">Stage</dt>
          <dd className="sm-9">{subject.stage}</dd>
        </dl>
      </div>
      
      <hr/>
      <Cards data = {subject}/>

    </div>
  );
}