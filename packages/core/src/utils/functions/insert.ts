import { DestId, Callback, TreeNode } from "$core/types";
import { clone, exception } from "../helpers";
import { findNode } from "./internal";

function insert<T extends TreeNode>(tree: readonly T[], destId: DestId, node: T): T[];
function insert<T extends TreeNode>(tree: readonly T[], destId: DestId, node: T, callback: Callback<T>): void;
function insert<T extends TreeNode>(tree: readonly T[], destId: DestId, node: T, callback?: Callback<T>) {
  const cloneTree = clone(tree);

  if (destId === null) {
    cloneTree.push(node);

    return cloneTree;
  }

  const parentNode = findNode(cloneTree, destId);

  if (!parentNode) throw exception("insert", "cannot found the parent node within given destId.");

  if (!parentNode.children) parentNode.children = [];

  parentNode.children.push(node);

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { insert };
