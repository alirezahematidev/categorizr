import { useState } from "react";
import { TreeData } from "../types";
import { createNode } from "./createNode";

interface InsertActionProps {
  callback(destination: string, node: TreeData): void;
}

function InsertAction({ callback }: InsertActionProps) {
  const [dest, setDest] = useState<string>("");
  const [node, setNode] = useState<string>("");

  const disabled = !dest || !node;

  function onInsert() {
    if (disabled) return;

    callback(dest, createNode(node));

    setDest("");
    setNode("");
  }

  return (
    <div className="action-box">
      <input type="text" className="input" placeholder="destination" value={dest} onChange={(e) => setDest(e.target.value)} />
      <input type="text" className="input" placeholder="node name" value={node} onChange={(e) => setNode(e.target.value)} />
      <button className="button" disabled={disabled} onClick={onInsert}>
        Insert
      </button>
    </div>
  );
}

export default InsertAction;
