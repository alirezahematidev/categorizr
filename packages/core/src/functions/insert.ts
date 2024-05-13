import { Callback, TreeNode } from "$core/types";
import { clone, exception } from "../helpers";
import { findNode } from "../helpers/internal";

function insert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T): T[];
function insert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T, callback: Callback<T>): void;
function insert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T, callback?: Callback<T>) {
  const cloneTree = clone(tree);

  if (destination === null) {
    cloneTree.push(node);

    return cloneTree;
  }

  const destNode = findNode(cloneTree, destination);

  if (!destNode) throw exception("insert", "Cannot find the destination node with the given id.");

  if (!destNode.children) destNode.children = [];

  destNode.children.push(node);

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { insert };
