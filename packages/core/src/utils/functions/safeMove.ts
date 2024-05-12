import { safeInsert } from "./safeInsert";
import { safeRemove } from "./safeRemove";
import { CallbackWithError, DestId, TreeNode } from "$core/types";
import { containsNode, findNode, findParent } from "./internal";
import { exception, warning } from "../helpers";

function safeMove<T extends TreeNode>(tree: readonly T[], sourceId: string, destId: DestId): T[];
function safeMove<T extends TreeNode>(tree: readonly T[], sourceId: string, destId: DestId, callback: CallbackWithError<T>): void;
function safeMove<T extends TreeNode>(tree: readonly T[], sourceId: string, destId: DestId, callback?: CallbackWithError<T>) {
  const node = findNode(tree, sourceId);

  if (containsNode(tree, sourceId, destId)) {
    warning("safeMove", "Cannot move the node into its own descendants.");

    if (callback) return void callback(tree, exception("safeMove", "Cannot move the node into its own descendants."));

    return tree;
  }

  if (!node) {
    warning("safeMove", "cannot found the node within given id");

    if (callback) return void callback(tree, exception("safeMove", "cannot found the node within given id"));

    return tree;
  }

  const parent = findParent(tree, node);

  if (parent && parent.id === destId) {
    if (callback) return void callback(tree as T[], undefined);

    return tree as T[];
  }

  const result = safeInsert(safeRemove(tree, sourceId), destId, node);

  if (callback) return void callback(result, undefined);

  return result;
}

export { safeMove };
