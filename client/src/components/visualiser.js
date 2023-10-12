import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import '../styles/tree.css';

export default function Visualiser(data) {
  const tree = data.data;

  return (
    <div>
      <h4>Visualiser</h4>
      <Tree 
        className="row"
        data={tree} 
        height={1000} 
        width={1000}
        svgProps={{className: 'custom'}}
        />
    </div>
  );
}