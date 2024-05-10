import { InsertCallback, TreeNode } from "$core/types";
import { clone } from "../helpers";
import { findNode } from "./findNode";

function insertNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], destId: Id, node: T, callback: InsertCallback<T>): void;
function insertNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], destId: Id, node: T): T[];
function insertNode(tree: readonly any[], destId: string, node: any, callback?: InsertCallback<any>) {
  const cloneTree = clone(tree);

  const parentNode = findNode(cloneTree, destId);

  if (!parentNode) throw new Error("cannot found the parent node within given parentId.");

  if (!parentNode.children) parentNode.children = [];

  parentNode.children.push(node);

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { insertNode };
