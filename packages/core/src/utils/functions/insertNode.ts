import { TreeNode } from "$core/types";
import { findNode } from "./findNode";

function insertNode<T extends TreeNode, const Id extends T["id"]>(tree: T[], destId: Id, node: T, callback: (tree: T[]) => void): void;
function insertNode<T extends TreeNode, const Id extends T["id"]>(tree: T[], destId: Id, node: T): T[];
function insertNode(tree: any[], destId: string, node: any, callback?: (tree: any[]) => void) {
  const cloneTree = [...tree];

  const parentNode = findNode(cloneTree, destId);

  if (!parentNode) throw new Error("cannot found the parent node within given parentId.");

  if (!parentNode.children) parentNode.children = [];

  parentNode.children.push(node);

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { insertNode };
