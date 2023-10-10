import React, { useEffect, useState } from "react";
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

export default function Visualiser(data) {

  const [tree, setTree] = useState([]);

  useEffect(() => {
    async function getTree() {
      const treeData = {
        name: data.data.abbTitle,
        children: []
      };

      if (data.data.spks) {
        data.data.spks.forEach(spk => {
          treeData.children.push({
            name: spk.abbTitle
          })
        });
      }
      
      if (data.data.subjects) {
        data.data.subjects.forEach(subject => {
          treeData.children.push({
            name: subject.abbTitle
          })
        });
      }
      
      setTree(treeData);
    }
    getTree();
    return;
  }, [data]);

  return (
    <div>
      <h4>Visualiser</h4>
      <AnimatedTree data={tree} height={400} width={400}/>
    </div>
  );
}