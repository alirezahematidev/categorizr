import { MaybeNode, TreeNode } from "$core/types";
import { clone, noChildren } from "../helpers";

export function findParent<T extends TreeNode>(tree: readonly T[], node: T): MaybeNode<T> {
  const cloneTree = clone(tree);

  for (const branch of cloneTree) {
    if (noChildren(branch)) continue;

    if (branch.children.some((child) => child.id === node.id)) return branch;

    const parent = findParent<T>(branch.children as T[], node);

    if (parent) return parent;
  }

  return undefined;
}
