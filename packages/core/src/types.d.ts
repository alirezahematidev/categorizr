export interface TreeNode {
  id: string;
  children: TreeNode[];
  [property: string]: any;
}

export type MaybeNode<T extends TreeNode> = T | undefined;

export type Callback<T extends TreeNode> = (tree: readonly T[]) => void;

export type CallbackWithError<T extends TreeNode> = (tree: readonly T[], error: Error | undefined) => void;

export type DestId = string | null;

export type Replacer<T extends TreeNode> = Omit<T, "id"> & { id?: T["id"] };

export type Mutable<T> = T extends readonly (infer U)[] ? Array<U> : T;
