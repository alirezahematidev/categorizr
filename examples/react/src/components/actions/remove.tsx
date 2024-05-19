import { useState } from "react";

interface RemoveActionProps {
  callback(id: string): void;
}

function RemoveAction({ callback }: RemoveActionProps) {
  const [id, setId] = useState<string>("");

  function onRemove() {
    if (!id) return;

    callback(id);

    setId("");
  }

  return (
    <div className="action-box">
      <input type="text" className="input" placeholder="node id" value={id} onChange={(e) => setId(e.target.value)} />
      <button className="button" disabled={!id} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default RemoveAction;
