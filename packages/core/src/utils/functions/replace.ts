import { Callback, Replacer, TreeNode } from "$core/types";
import { clone, exception, modifyWith } from "../helpers";
import { findNode, findParent } from "./internal";

function replace<T extends TreeNode>(tree: readonly T[], targetId: string, replacer: Replacer<T>): T[];
function replace<T extends TreeNode>(tree: readonly T[], targetId: string, replacer: Replacer<T>, callback: Callback<T>): void;
function replace<T extends TreeNode>(tree: readonly T[], targetId: string, replacer: Replacer<T>, callback?: Callback<T>) {
  const cloneTree = clone(tree);

  const sourceNode = findNode(cloneTree, targetId);

  if (!sourceNode) throw exception("replace", "cannot found the target node within given id");

  if (!replacer.id) replacer.id = targetId;

  const parentNode = findParent(cloneTree, sourceNode);

  if (!parentNode) {
    modifyWith(cloneTree, sourceNode.id, replacer);

    if (callback) return void callback(cloneTree);

    return cloneTree;
  }

  if (!parentNode.children) parentNode.children = [];

  modifyWith(parentNode.children, sourceNode.id, replacer);

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { replace };
