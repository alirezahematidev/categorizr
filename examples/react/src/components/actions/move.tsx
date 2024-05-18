import { useState } from "react";

interface MoveActionProps {
  callback(from: string, to: string | null): void;
}

function MoveAction({ callback }: MoveActionProps) {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string | null>(null);

  function onMove() {
    if (!from) return;

    callback(from, to);

    setFrom("");
    setTo(null);
  }

  return (
    <div className="action-box">
      <input type="text" className="input" placeholder="from" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="text" className="input" placeholder="to" value={to ?? ""} onChange={(e) => setTo(e.target.value)} />
      <button className="button" disabled={!from} onClick={onMove}>
        Move
      </button>
    </div>
  );
}

export default MoveAction;
