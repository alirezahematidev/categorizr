import { useState } from "react";
import data from "./data";
import Tree from "@treekit/core";
import Arrow from "./assets/arrow-big-right.svg?react";
import TreeView from "./components/tree-view";
import Actions from "./components/actions";
import { TreeData } from "./components/types";
import "./styles.css";

const tree = new Tree<TreeData>(data);

function App() {
  const [updatedData, set] = useState<readonly TreeData[]>(tree.originalTree);

  return (
    <div className="tree-container">
      <Actions
        insert={(...args) => tree.insert(...args, set)}
        remove={(...args) => tree.remove(...args, set)}
        move={(...args) => tree.move(...args, set)}
        replace={(...args) => tree.replace(...args, set)}
        swap={(...args) => tree.swap(...args, set)}
      />
      <TreeView data={tree.originalTree} />
      <Arrow className="arrow" />
      <TreeView data={updatedData} />
    </div>
  );
}

export default App;
