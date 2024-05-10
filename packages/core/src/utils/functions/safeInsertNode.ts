import { DestId, InsertCallbackWithError, TreeNode } from "$core/types";
import { clone } from "../helpers";
import { findNode } from "./findNode";

function safeInsertNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], destId: DestId<Id>, node: T, callback: InsertCallbackWithError<T>): void;
function safeInsertNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], destId: DestId<Id>, node: T): T[];
function safeInsertNode(tree: readonly any[], destId: DestId<any>, node: any, callback?: InsertCallbackWithError<any>) {
  const cloneTree = clone(tree);

  if (destId === null) {
    cloneTree.push(node);

    return cloneTree;
  }

  const parentNode = findNode(cloneTree, destId);

  if (!parentNode) {
    if (callback) return void callback(tree, new Error("cannot found the parent node within given destId."));

    return tree;
  }

  if (!parentNode.children) parentNode.children = [];

  parentNode.children.push(node);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeInsertNode };
