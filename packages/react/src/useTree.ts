import * as functions from "@categorizr/core";
import { buildTree, flattenTree, type TreeNode } from "@categorizr/core";
import { useState } from "react";
import type { Override } from "$react/index";

type TreeOptions<T extends TreeNode> = {
  readonly tree: T[];
};

function useTree<T extends TreeNode>({ tree }: TreeOptions<T>) {
  const [data, setData] = useState<readonly T[]>(tree);

  const insert: Override<T, "insert"> = (destination, node) => {
    setData((previous) => functions.insert(previous, destination, node));
  };

  const safeInsert: Override<T, "safeInsert"> = (destination, node) => {
    setData((previous) => functions.safeInsert(previous, destination, node));
  };

  const move: Override<T, "move"> = (from, to) => {
    setData((previous) => functions.move(previous, from, to));
  };

  const safeMove: Override<T, "safeMove"> = (from, to) => {
    setData((previous) => functions.safeMove(previous, from, to));
  };

  const remove: Override<T, "remove"> = (id) => {
    setData((previous) => functions.remove(previous, id));
  };

  const safeRemove: Override<T, "safeRemove"> = (id) => {
    setData((previous) => functions.safeRemove(previous, id));
  };

  const replace: Override<T, "replace"> = (target, replacer) => {
    setData((previous) => functions.replace(previous, target, replacer));
  };

  const safeReplace: Override<T, "safeReplace"> = (target, replacer) => {
    setData((previous) => functions.safeReplace(previous, target, replacer));
  };

  const swap: Override<T, "swap"> = (from, to) => {
    setData((previous) => functions.swap(previous, from, to));
  };

  const safeSwap: Override<T, "safeSwap"> = (from, to) => {
    setData((previous) => functions.safeSwap(previous, from, to));
  };

  return { data, insert, safeInsert, move, safeMove, remove, safeRemove, replace, safeReplace, swap, safeSwap };
}

export type { TreeOptions };

export { useTree, flattenTree, buildTree };
