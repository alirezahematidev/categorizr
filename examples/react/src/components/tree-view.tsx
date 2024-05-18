import { TreeData } from "./types";

interface TreeViewProps {
  data: readonly TreeData[];
}

function TreeView({ data }: TreeViewProps) {
  return (
    <ul className="tree-list">
      {data.map(({ id, name, children }) => (
        <li key={id} className="tree-list-item">
          <span className="tree-list-item-text">
            {name} (id={id})
          </span>
          {children?.length !== 0 && <TreeView key={id} data={children as TreeData[]} />}
        </li>
      ))}
    </ul>
  );
}

export default TreeView;
