import { CallbackWithError, TreeNode } from "$core/types";
import { clone, exception, warning } from "../helpers";
import { findNode } from "../helpers/internal";

function safeInsert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T): T[];
function safeInsert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T, callback: CallbackWithError<T>): void;
function safeInsert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T, callback?: CallbackWithError<T>) {
  const cloneTree = clone(tree);

  if (destination === null) {
    cloneTree.push(node);

    return cloneTree;
  }

  const destNode = findNode(cloneTree, destination);

  if (!destNode) {
    warning("safeInsert", "Cannot found the destination node with the given id.");

    if (callback) return void callback(tree, exception("safeInsert", "Cannot found the destination node with the given id."));

    return tree;
  }

  if (!destNode.children) destNode.children = [];

  destNode.children.push(node);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeInsert };
