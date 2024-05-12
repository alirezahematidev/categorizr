import { CallbackWithError, Replacer, TreeNode } from "$core/types";
import { clone, exception, modifyWith, warning } from "../helpers";
import { findNode, findParent } from "./internal";

function safeReplace<T extends TreeNode>(tree: readonly T[], targetId: string, replacer: Replacer<T>): T[];
function safeReplace<T extends TreeNode>(tree: readonly T[], targetId: string, replacer: Replacer<T>, callback: CallbackWithError<T>): void;
function safeReplace<T extends TreeNode>(tree: readonly T[], targetId: string, replacer: Replacer<T>, callback?: CallbackWithError<T>) {
  const cloneTree = clone(tree);

  const sourceNode = findNode(cloneTree, targetId);

  if (!sourceNode) {
    warning("safeReplace", "cannot found the node within given id");

    if (callback) return void callback(tree, exception("safeReplace", "cannot found the node within given id"));

    return tree;
  }

  if (!replacer.id) replacer.id = targetId;

  const parentNode = findParent(cloneTree, sourceNode);

  if (!parentNode) {
    modifyWith(cloneTree, sourceNode.id, replacer);

    if (callback) return void callback(cloneTree, undefined);

    return cloneTree;
  }

  if (!parentNode.children) parentNode.children = [];

  modifyWith(parentNode.children, sourceNode.id, replacer);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeReplace };
