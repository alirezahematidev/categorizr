import { TreeNode } from "$core/types";
import { clone } from "../helpers";
import { findNode } from "./findNode";
import { findParent } from "./findParent";

function removeNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], nodeId: Id): T[] {
  const cloneTree = clone(tree);

  const node = findNode(cloneTree, nodeId);

  if (!node) throw new Error("cannot found the node within given id");

  const parentNode = findParent(cloneTree, node);

  if (!parentNode) {
    const nodeIndex = cloneTree.findIndex((treeNode) => treeNode.id === nodeId);

    if (nodeIndex !== -1) cloneTree.splice(nodeIndex, 1);

    return cloneTree;
  }

  const nodeIndex = parentNode.children.findIndex((treeNode) => treeNode.id === nodeId);

  if (nodeIndex !== -1) parentNode.children.splice(nodeIndex, 1);

  return cloneTree;
}

export { removeNode };
