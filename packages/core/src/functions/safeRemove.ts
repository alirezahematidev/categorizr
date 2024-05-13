import { CallbackWithError, TreeNode } from "$core/types";
import { clone, exception, modifyWith, warning } from "../helpers";
import { findNode, findParent } from "../helpers/internal";

function safeRemove<T extends TreeNode>(tree: readonly T[], id: string): T[];
function safeRemove<T extends TreeNode>(tree: readonly T[], id: string, callback: CallbackWithError<T>): void;
function safeRemove<T extends TreeNode>(tree: readonly T[], id: string, callback?: CallbackWithError<T>) {
  const cloneTree = clone(tree);

  const targetNode = findNode(cloneTree, id);

  if (!targetNode) {
    warning("safeRemove", "Cannot found the node with the given id.");

    if (callback) return void callback(tree, exception("safeRemove", "Cannot found the node with the given id."));

    return tree;
  }

  const parentNode = findParent(cloneTree, targetNode);

  if (!parentNode) {
    modifyWith(cloneTree, targetNode.id);

    if (callback) return void callback(cloneTree, undefined);

    return cloneTree;
  }

  if (!parentNode.children) parentNode.children = [];

  modifyWith(parentNode.children, targetNode.id);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeRemove };
