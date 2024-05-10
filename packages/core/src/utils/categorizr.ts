import { MaybeNode, TreeNode } from "$core/types";
import { findParent, findNode, insertNode } from "./functions";

export class Categorizr<T extends TreeNode> {
  private readonly tree: ReadonlyArray<T> = [];

  constructor(tree: T[]) {
    this.tree = tree;
  }

  private clone() {
    return this.tree.slice();
  }

  public findParent(node: T): MaybeNode<T> {
    return findParent(this.clone(), node);
  }

  public findNode<Id extends T["id"]>(id: Id): MaybeNode<T> {
    return findNode(this.clone(), id);
  }

  public insertNode<const Id extends T["id"]>(destId: Id, node: T, callback: (tree: T[]) => void): void;
  public insertNode<const Id extends T["id"]>(destId: Id, node: T): T[];
  public insertNode(destId: string, node: any, callback?: (tree: any[]) => void) {
    if (callback) return insertNode(this.clone(), destId, node, callback);

    return insertNode(this.clone(), destId, node);
  }
}
