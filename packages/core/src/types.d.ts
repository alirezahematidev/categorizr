export interface TreeNode {
  id: string;
  children: TreeNode[];
  [property: string]: any;
}

export type MaybeNode<T extends TreeNode> = T | undefined;

export type InsertCallback<T extends TreeNode> = (tree: readonly T[]) => void;

export type InsertCallbackWithError<T extends TreeNode> = (tree: readonly T[], error: Error | undefined) => void;
