import { useState } from "react";
import { TreeData } from "../types";
import { createNode } from "./createNode";

interface ReplaceActionProps {
  callback(target: string, replacer: TreeData): void;
}

function ReplaceAction({ callback }: ReplaceActionProps) {
  const [target, setTarget] = useState<string>("");
  const [node, setNode] = useState<string>("");

  const disabled = !target || !node;

  function onReplace() {
    if (disabled) return;

    callback(target, createNode(node));

    setTarget("");
    setNode("");
  }

  return (
    <div className="action-box">
      <input type="text" className="input" placeholder="target" value={target} onChange={(e) => setTarget(e.target.value)} />
      <input type="text" className="input" placeholder="replacer name" value={node} onChange={(e) => setNode(e.target.value)} />
      <button className="button" disabled={disabled} onClick={onReplace}>
        Replace
      </button>
    </div>
  );
}

export default ReplaceAction;
