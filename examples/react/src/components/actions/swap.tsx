import { useState } from "react";

interface SwapActionProps {
  callback(from: string, to: string): void;
}

function SwapAction({ callback }: SwapActionProps) {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const disabled = !from || !to;

  function onSwap() {
    if (disabled) return;

    callback(from, to);

    setTo("");
    setFrom("");
  }

  return (
    <div className="action-box">
      <input type="text" className="input" placeholder="from" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="text" className="input" placeholder="to" value={to} onChange={(e) => setTo(e.target.value)} />
      <button className="button" disabled={disabled} onClick={onSwap}>
        Swap
      </button>
    </div>
  );
}

export default SwapAction;
