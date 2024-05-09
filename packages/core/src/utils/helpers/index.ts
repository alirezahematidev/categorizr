import { TreeNode } from "$core/types";

export function noChildren<T extends TreeNode>(node: T) {
  return !node.children || node.children.length === 0;
}
