import { safeInsert } from "./safeInsert";
import { safeRemove } from "./safeRemove";
import { CallbackWithError, TreeNode } from "$core/types";
import { containsNode, findNode, findParent } from "../helpers/internal";
import { exception, warning } from "../helpers";

function safeMove<T extends TreeNode>(tree: readonly T[], from: string, to: string | null): T[];
function safeMove<T extends TreeNode>(tree: readonly T[], from: string, to: string | null, callback: CallbackWithError<T>): void;
function safeMove<T extends TreeNode>(tree: readonly T[], from: string, to: string | null, callback?: CallbackWithError<T>) {
  const fromNode = findNode(tree, from);

  if (containsNode(tree, from, to)) {
    warning("safeMove", "Cannot move the node into its own descendants.");

    if (callback) return void callback(tree, exception("safeMove", "Cannot move the node into its own descendants."));

    return tree;
  }

  if (!fromNode) {
    warning("safeMove", "Cannot found the source node with the given id.");

    if (callback) return void callback(tree, exception("safeMove", "Cannot found the source node with the given id."));

    return tree;
  }

  const parentNode = findParent(tree, fromNode);

  if (parentNode && parentNode.id === to) {
    if (callback) return void callback(tree as T[], undefined);

    return tree as T[];
  }

  const result = safeInsert(safeRemove(tree, from), to, fromNode);

  if (callback) return void callback(result, undefined);

  return result;
}

export { safeMove };
