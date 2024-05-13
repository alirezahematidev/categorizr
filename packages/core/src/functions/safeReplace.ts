import { CallbackWithError, Replacer, TreeNode } from "$core/types";
import { clone, exception, modifyWith, warning } from "../helpers";
import { findNode, findParent } from "../helpers/internal";

function safeReplace<T extends TreeNode>(tree: readonly T[], target: string, replacer: Replacer<T>): T[];
function safeReplace<T extends TreeNode>(tree: readonly T[], target: string, replacer: Replacer<T>, callback: CallbackWithError<T>): void;
function safeReplace<T extends TreeNode>(tree: readonly T[], target: string, replacer: Replacer<T>, callback?: CallbackWithError<T>) {
  const cloneTree = clone(tree);

  const targetNode = findNode(cloneTree, target);

  if (!targetNode) {
    warning("safeReplace", "Cannot found the target node with the given id.");

    if (callback) return void callback(tree, exception("safeReplace", "Cannot found the target node with the given id."));

    return tree;
  }

  if (!replacer.id) replacer.id = target;

  const parentNode = findParent(cloneTree, targetNode);

  if (!parentNode) {
    modifyWith(cloneTree, targetNode.id, replacer);

    if (callback) return void callback(cloneTree, undefined);

    return cloneTree;
  }

  if (!parentNode.children) parentNode.children = [];

  modifyWith(parentNode.children, targetNode.id, replacer);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeReplace };
