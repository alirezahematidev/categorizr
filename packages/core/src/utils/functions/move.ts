import { insert } from "./insert";
import { remove } from "./remove";
import { Callback, DestId, TreeNode } from "$core/types";
import { containsNode, findNode, findParent } from "./internal";
import { exception } from "../helpers";

function move<T extends TreeNode>(tree: readonly T[], sourceId: string, destId: DestId): T[];
function move<T extends TreeNode>(tree: readonly T[], sourceId: string, destId: DestId, callback: Callback<T>): void;
function move<T extends TreeNode>(tree: readonly T[], sourceId: string, destId: DestId, callback?: Callback<T>) {
  const node = findNode(tree, sourceId);

  if (containsNode(tree, sourceId, destId)) throw exception("move", "Cannot move the node into its own descendants.");

  if (!node) throw exception("move", "cannot found the node within given id");

  const parent = findParent(tree, node);

  if (parent && parent.id === destId) {
    if (callback) return void callback(tree as T[]);

    return tree as T[];
  }

  const result = insert(remove(tree, sourceId), destId, node);

  if (callback) return void callback(result);

  return result;
}

export { move };
