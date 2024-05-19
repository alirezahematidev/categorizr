import InsertAction from "./insert";
import { TreeData } from "../types";
import RemoveAction from "./remove";
import MoveAction from "./move";
import ReplaceAction from "./replace";
import SwapAction from "./swap";

interface ActionsProps {
  insert(destination: string, node: TreeData): void;
  move(from: string, to: string | null): void;
  replace(target: string, replacer: TreeData): void;
  swap(from: string, to: string): void;
  remove(id: string): void;
}

function Actions({ insert, remove, replace, swap, move }: ActionsProps) {
  return (
    <div className="actions-list">
      <InsertAction callback={insert} />
      <RemoveAction callback={remove} />
      <MoveAction callback={move} />
      <ReplaceAction callback={replace} />
      <SwapAction callback={swap} />
      <button className="button" onClick={() => window.location.reload()}>
        Refresh
      </button>
    </div>
  );
}

export default Actions;
