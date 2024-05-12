import { DestId, TreeNode } from "$core/types";
import { noChildren } from "$core/utils/helpers";
import { findNode } from "./findNode";

export function containsNode<T extends TreeNode>(tree: readonly T[], nodeId: string, destId: DestId) {
  if (tree.length === 0 || destId === null || nodeId === destId) return false;

  const destNode = findNode(tree, nodeId);

  if (!destNode || noChildren(destNode)) return false;

  if (destNode.children.some((child) => child.id === destId)) return true;

  for (const branch of destNode.children) {
    if (noChildren(branch)) continue;

    if (containsNode([branch], branch.id, destId)) return true;
  }

  return false;
}
