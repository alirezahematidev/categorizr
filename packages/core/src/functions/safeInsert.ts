import { CallbackWithError, TreeNode } from "$core/index";
import { clone, exception, findNode, error, nonUniqueTreeWarning } from "../helpers";

function safeInsert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T): T[];
function safeInsert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T, callback: CallbackWithError<T>): void;
function safeInsert<T extends TreeNode>(tree: readonly T[], destination: string | null, node: T, callback?: CallbackWithError<T>) {
  nonUniqueTreeWarning(tree, "safeInsert");

  const cloneTree = clone(tree);

  if (destination === null) {
    cloneTree.push(node);

    return cloneTree;
  }

  const destNode = findNode(cloneTree, destination);

  if (!destNode) {
    error("safeInsert", "Cannot found the destination node with the given id.");

    if (callback) return void callback(tree, exception("safeInsert", "Cannot found the destination node with the given id."));

    return [...tree];
  }

  if (!destNode.children) destNode.children = [];

  destNode.children.push(node);

  if (callback) return void callback(cloneTree, undefined);

  return cloneTree;
}

export { safeInsert };