import { MaybeNode, TreeNode } from "$core/types";

export function findNode<T extends TreeNode, const Id extends T["id"]>(tree: readonly T[], id: Id): MaybeNode<T> {
  for (const node of tree) {
    if (node.id === id) return node;

    const foundNode = findNode<T, Id>(node.children as T[], id);

    if (foundNode) return foundNode;
  }
  return undefined;
}
