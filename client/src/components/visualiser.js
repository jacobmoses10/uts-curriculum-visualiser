import React from "react";
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

export default function Visualiser(data) {

  function getNodes() {
    let nodes = [
      { id: '1', position: { x: 10, y: 10 }, data: { label: data.data.courseId } }
    ];
    
    if (data.data.spks) {
      data.data.spks.forEach(spk => {
        nodes.push({id: spk.spkId, position: {x: 20, y: 20}, data: { label: spk.spkId }})
      });
    }

    if (data.data.subjects) {
      data.data.subjects.forEach(subject => {
        nodes.push({id: subject.subjectId, position: {x: 20, y: 20}, data: { label: subject.subjectId }})
      });
    }

    return nodes;
  }

  function getEdges() {
    let edges = [];
    //
    return edges;
  }
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={getNodes()} edges={getEdges()}>
      <Background variant="dots"/>
      </ReactFlow>
    </div>
  );
}