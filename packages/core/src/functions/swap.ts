import { Callback, TreeNode } from "$core/types";
import { clone, exception } from "../helpers";
import { containsNode, findNode, findParent } from "../helpers/internal";

function swap<T extends TreeNode>(tree: readonly T[], from: string, to: string): T[];
function swap<T extends TreeNode>(tree: readonly T[], from: string, to: string, callback: Callback<T>): void;
function swap<T extends TreeNode>(tree: readonly T[], from: string, to: string, callback?: Callback<T>) {
  const cloneTree = clone(tree);

  const fromNode = findNode(cloneTree, from);

  const toNode = findNode(cloneTree, to);

  if (!fromNode || !toNode) throw exception("swap", "Cannot found the from/to node with the given ids.");

  if (fromNode.id === toNode.id) {
    if (callback) return void callback(cloneTree);

    return cloneTree;
  }

  if (containsNode(cloneTree, from, to) || containsNode(cloneTree, to, from)) {
    throw exception("swap", "Nodes cannot be swapped as one is a descendant of the other.");
  }

  const fromParent = findParent(cloneTree, fromNode) ?? { children: cloneTree };

  const toParent = findParent(cloneTree, toNode) ?? { children: cloneTree };

  const fromIndex = fromParent.children.findIndex((child) => child.id === fromNode.id);

  const toIndex = toParent.children.findIndex((child) => child.id === toNode.id);

  [fromParent.children[fromIndex], toParent.children[toIndex]] = [toParent.children[toIndex], fromParent.children[fromIndex]];

  if (callback) return void callback(cloneTree);

  return cloneTree;
}

export { swap };
