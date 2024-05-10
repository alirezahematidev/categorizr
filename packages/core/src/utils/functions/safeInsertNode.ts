import { InsertCallbackWithError, TreeNode } from "$core/types";
import { clone } from "../helpers";
import { findNode } from "./findNode";

function safeInsertNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], destId: Id, node: T, callback: InsertCallbackWithError<T>): void;
function safeInsertNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], destId: Id, node: T): T[];
function safeInsertNode(tree: readonly any[], destId: string, node: any, callback?: InsertCallbackWithError<any>) {
  const cloneTree = clone(tree);

  const parentNode = findNode(cloneTree, destId);

  if (!parentNode) {
    if (callback) return void callback(tree, new Error("cannot found the parent node within given parentId."));

    return tree;
  }

  if (!parentNode.children) parentNode.children = [];

  parentNode.children.push(node);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeInsertNode };
