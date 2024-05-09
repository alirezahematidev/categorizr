export interface TreeNode {
  id: string;
  children: TreeNode[];
  [property: string]: any;
}
