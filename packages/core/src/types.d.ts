export interface TreeNode {
  id: string;
  children: TreeNode[];
  [property: string]: any;
}

export type MaybeNode<T extends TreeNode> = T | undefined;
