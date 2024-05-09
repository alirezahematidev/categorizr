import { TreeNode } from "$core/types";
import { noChildren } from "./helpers";

export function findParent<T extends TreeNode>(tree: T[], node: T): T | undefined {
  for (const branch of tree) {
    if (noChildren(branch)) continue;

    if (branch.children.some((child) => child.id === node.id)) return branch;

    const parent = findParent<T>(branch.children as T[], node);

    if (parent) return parent;
  }

  return undefined;
}
