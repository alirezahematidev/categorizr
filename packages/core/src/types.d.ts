export interface TreeNode {
  id: string;
  children: TreeNode[];
  [property: string]: any;
}

export type MaybeNode<T extends TreeNode> = T | undefined;

export type InsertCallback<T extends TreeNode> = (tree: readonly T[]) => void;

export type InsertCallbackWithError<T extends TreeNode> = (tree: readonly T[], error: Error | undefined) => void;

export type DestId<T extends TreeNode["id"]> = T | null;

export type Mutable<T> = T extends readonly (infer U)[] ? Array<U> : T;
