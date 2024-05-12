import { DestId, CallbackWithError, TreeNode } from "$core/types";
import { clone, exception, warning } from "../helpers";
import { findNode } from "./internal";

function safeInsert<T extends TreeNode>(tree: readonly T[], destId: DestId, node: T): T[];
function safeInsert<T extends TreeNode>(tree: readonly T[], destId: DestId, node: T, callback: CallbackWithError<T>): void;
function safeInsert<T extends TreeNode>(tree: readonly T[], destId: DestId, node: T, callback?: CallbackWithError<T>) {
  const cloneTree = clone(tree);

  if (destId === null) {
    cloneTree.push(node);

    return cloneTree;
  }

  const parentNode = findNode(cloneTree, destId);

  if (!parentNode) {
    warning("safeInsert", "cannot found the node within given id");

    if (callback) return void callback(tree, exception("safeInsert", "cannot found the parent node within given destId."));

    return tree;
  }

  if (!parentNode.children) parentNode.children = [];

  parentNode.children.push(node);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeInsert };
