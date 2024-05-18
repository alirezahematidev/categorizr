export type TreeNode = {
  id: string;
  children: TreeNode[];
  [property: string]: any;
};

export type FlatNode = {
  id: string;
  parentId: string | null;
  [property: string]: any;
};

export type TreeOptions<T extends TreeNode> = {
  listener?: Callback<T>;
};

export type TreeLike<T extends TreeNode> = T | T[];

export type MaybeNode<T extends TreeNode> = T | undefined;

export type Callback<T extends TreeNode> = (tree: readonly T[]) => void;

export type CallbackWithError<T extends TreeNode> = (tree: readonly T[], error: Error | undefined) => void;

export type Replacer<T extends TreeNode> = Omit<T, "id"> & { id?: T["id"] };

export type Mutable<T> = T extends readonly (infer U)[] ? Array<U> : T;

export type ActualParameters<T extends TreeNode, K extends keyof TreeImpl<T>> = Parameters<TreeImpl<T>[K]> extends [...infer R, infer C] ? [T[], ...R, C?] : never;

export interface TreeImpl<T extends TreeNode> {
  remove: {
    (id: string): typeof this;
    (id: string, callback: Callback<T>): void;
  };

  safeRemove: {
    (id: string): typeof this;
    (id: string, callback: CallbackWithError<T>): void;
  };

  insert: {
    (destination: string | null, data: TreeLike<T>): typeof this;
    (destination: string | null, data: TreeLike<T>, callback: Callback<T>): void;
  };
  safeInsert: {
    (destination: string | null, data: TreeLike<T>): typeof this;
    (destination: string | null, data: TreeLike<T>, callback: CallbackWithError<T>): void;
  };
  move: {
    (from: string, to: string | null): typeof this;
    (from: string, to: string | null, callback: Callback<T>): void;
  };
  safeMove: {
    (from: string, to: string | null): typeof this;
    (from: string, to: string | null, callback: CallbackWithError<T>): void;
  };
  replace: {
    (target: string, replacer: Replacer<T>): typeof this;
    (target: string, replacer: Replacer<T>, callback: Callback<T>): void;
  };
  safeReplace: {
    (target: string, replacer: Replacer<T>): typeof this;
    (target: string, replacer: Replacer<T>, callback: CallbackWithError<T>): void;
  };
  swap: {
    (from: string, to: string): typeof this;
    (from: string, to: string, callback: Callback<T>): void;
  };
  safeSwap: {
    (from: string, to: string): typeof this;
    (from: string, to: string, callback: CallbackWithError<T>): void;
  };
}
