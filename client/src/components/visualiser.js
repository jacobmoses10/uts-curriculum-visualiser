import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';

export default function Visualiser(data) {
  const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };
  const treeData = useMemo(() => hierarchy(data.data), [data.data]);
  const navigate = useNavigate();

  const width = (window.innerWidth < 700) ? window.innerWidth - 26 : window.innerWidth - 216;
  
  // Colours
  const blue = '#05d6f5';
  const green = '#26deb0';
  const red = '#ff1300';
  const lightpurple = '#374469';
  const white = '#ffffff';
  const background = '#272b4d';

  // Root node
  function CourseNode({ node }) {
    const width = 50;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;

    return (
      <Group top={node.x} left={node.y}>
        <rect
          height={height}
          width={width}
          y={centerY}
          x={centerX}
          fill={background}
          stroke={red}
          strokeWidth={1}
        />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={white}
        >
          {node.data.name}
        </text>
      </Group>
    );
  }

  // SPK nodes
  function SpkNode({ node }) {
    const width = 50;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;

    return (
      <Group top={node.x} left={node.y}>
        <rect
          height={height}
          width={width}
          y={centerY}
          x={centerX}
          fill={background}
          stroke={blue}
          strokeWidth={1}
          strokeDasharray="2,2"
          strokeOpacity={0.6}
          rx={10}
        />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          fill={blue}
          style={{ cursor: 'pointer' }}
          onClick={() => handleOnClick(node)}
        >
          {node.data.name}
        </text>
      </Group>
    );
  }

  // Handles rendering Root, Spk, and Subject Nodes.
  function Node({ node }) {
    const width = 50;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;
    const isRoot = node.depth === 0;
    const isSpk = node.data.type === 'spk';

    if (isRoot) return <CourseNode node={node} />;
    if (isSpk) return <SpkNode node={node} />;

    return (
      <Group top={node.x} left={node.y}>
        <rect
          height={height}
          width={width}
          y={centerY}
          x={centerX}
          fill={background}
          stroke={green}
          strokeWidth={1}
          strokeDasharray="2,2"
          strokeOpacity={0.6}
          rx={10}
        />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          fill={green}
          style={{ cursor: "pointer" }}
          onClick={() => handleOnClick(node)}
        >
          {node.data.name}
        </text>
      </Group>
    );
  }

  // Get height based on num. of nodes.
  function getHeight() {
    let childrenCount = 0;
    const defaultHeight = 500;
    if (data.data.children) {
      childrenCount += data.data.children.length / 2;
      data.data.children.forEach(child => {
        if (child.children) {
          childrenCount += child.children.length;
        } 
      });
    }
    const adjustedHeight = childrenCount * 30;
    return (adjustedHeight > defaultHeight) ? adjustedHeight : defaultHeight;
  }
  const height = getHeight();
  
  // Link nodes to their pages.
  function handleOnClick(node) {   
    if (node.data.type === 'spk') {
      navigate(`/spk/${node.data.name}`);
    } else {
      navigate(`/subject/${node.data.name}`);
    } 
  }

  return(
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background} />
      <Tree root={treeData} size={[height - 20, width - 150]}>
        {(tree) => (
          <Group top={defaultMargin.top} left={defaultMargin.left}>
            {tree.links().map((link, i) => (
              <LinkHorizontal
                key={`link-${i}`}
                data={link}
                stroke={lightpurple}
                strokeWidth="1"
                fill="none"
              />
            ))}
            {tree.descendants().map((node, i) => (
              <Node key={`node-${i}`} node={node} />
            ))}
          </Group>
        )}
      </Tree>
    </svg>
  );
}