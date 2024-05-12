import { Callback, TreeNode } from "$core/types";
import { clone, exception, modifyWith } from "../helpers";
import { findNode, findParent } from "./internal";

function remove<T extends TreeNode>(tree: readonly T[], id: string): T[];
function remove<T extends TreeNode>(tree: readonly T[], id: string, callback: Callback<T>): void;
function remove<T extends TreeNode>(tree: readonly T[], id: string, callback?: Callback<T>) {
  const cloneTree = clone(tree);

  const node = findNode(cloneTree, id);

  if (!node) throw exception("remove", "cannot found the node within given id");

  const parentNode = findParent(cloneTree, node);

  if (!parentNode) {
    modifyWith(cloneTree, node.id);

    if (callback) return void callback(cloneTree);

    return cloneTree;
  }

  if (!parentNode.children) parentNode.children = [];

  modifyWith(parentNode.children, node.id);

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { remove };
