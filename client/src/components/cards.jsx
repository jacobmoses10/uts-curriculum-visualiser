import React from "react";
import { Link } from "react-router-dom";

const Spk = (props) => (
  <div className="col-md-3">
    <div className="card shadow" style={{width: "18rem"}}>
      <div className="card-header bg-primary text-white position-relative">
        {props.spk.spkTypeName}
        <span className="badge rounded-pill text-bg-light position-absolute end-0 me-2">{props.spk.cpv}cp</span> 
      </div> 
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.spk.spkId}</h6>
        <h5 className="card-title">{props.spk.fullTitle}</h5>
        <p className="card-text">{props.spk.orgName}</p>
        <Link className="btn btn-outline-primary" to={`/spk/${props.spk.spkId}`}>View</Link> 
      </div>
    </div>
  </div>
);

const Subject = (props) => (
  <div className="col-md-3">
    <div className="card shadow" style={{width: "18rem"}}>
      <div className="card-header bg-success text-white">
        {props.subject.spkTypeName}
        <span className="badge rounded-pill text-bg-light position-absolute end-0 me-2">{props.subject.cpv}cp</span> 
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.subject.subjectId}</h6>
        <h5 className="card-title">{props.subject.fullTitle}</h5>
        <p className="card-text">{props.subject.orgName}</p>
        <Link className="btn btn-outline-primary" to={`/subject/${props.subject.subjectId}`}>View</Link>
      </div>
    </div>
  </div>
);

export default function Cards(data) {

  function spkCards() {
    if (data.data.spks) {
      const spkMap = data.data.spks.map((spk)=> {
        return (<Spk spk={spk} key={spk._id}/>);
      });
      return (
        <div className="container gy-3">
          <h4>SPKs</h4>
          <div className="row gy-5 justify-content-start">
            {spkMap}
          </div>
        </div> 
      );
    }
  }

  function subjectCards() {
    if (data.data.subjects) {
      const subjectMap = data.data.subjects.map((subject)=> {
        return (<Subject subject={subject} key={subject._id}/>);
      });
      return (
        <div className="container gy-3">
          <h4>Subjects</h4>
          <div className="row gy-5 justify-content-start">
            {subjectMap}
          </div>
        </div> 
      );
    }
  }
  
  function prereqCards() {
    if (data.data.prereqs) {
      const prereqMap = data.data.prereqs.map((subject)=> {
        return (<Subject subject={subject} key={subject._id}/>);
      });
      return (
        <div className="container gy-3">
          <h4>Prerequisites For This Subject</h4>
          <div className="row gy-5 justify-content-start">
            {prereqMap}
          </div>
        </div> 
      );
    }
  }

  function postreqCards() {
    if (data.data.postreqs) {
      const postreqMap = data.data.postreqs.map((subject)=> {
        return (<Subject subject={subject} key={subject._id}/>);
      });
      return (
        <div className="container gy-3">
          <h4>This Subject Is A Prequisite To</h4>
          <div className="row gy-5 justify-content-start">
            {postreqMap}
          </div>
        </div> 
      );
    }
  }

  return (
    <div className="row">
        {subjectCards()}
        {spkCards()}
        {prereqCards()}
        {postreqCards()}
    </div>
  );
}