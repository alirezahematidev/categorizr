import { useState } from "react";
import { TreeData } from "../types";
import { createNode } from "./createNode";

interface InsertActionProps {
  callback(destination: string | null, node: TreeData): void;
}

function InsertAction({ callback }: InsertActionProps) {
  const [dest, setDest] = useState<string | null>(null);
  const [node, setNode] = useState<string>("");

  function onInsert() {
    if (!node) return;

    callback(dest, createNode(node));

    setDest(null);
    setNode("");
  }

  return (
    <div className="action-box">
      <input type="text" className="input" placeholder="destination" value={dest ?? ""} onChange={(e) => setDest(e.target.value)} />
      <input type="text" className="input" placeholder="node name" value={node} onChange={(e) => setNode(e.target.value)} />
      <button className="button" disabled={!node} onClick={onInsert}>
        Insert
      </button>
    </div>
  );
}

export default InsertAction;
