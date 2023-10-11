import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

export default function Visualiser(data) {
  const tree = data.data;

  return (
    <div>
      <h4>Visualiser</h4>
      <AnimatedTree data={tree} height={400} width={800}/>
    </div>
  );
}