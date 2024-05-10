import { DestId, InsertCallback, InsertCallbackWithError, MaybeNode, TreeNode } from "$core/types";
import { findParent, findNode, insertNode, safeInsertNode, removeNode } from "./functions";

export class Categorizr<T extends TreeNode> {
  private readonly tree: ReadonlyArray<T> = [];

  constructor(tree: T[]) {
    this.tree = tree;
  }

  public findParent(node: T): MaybeNode<T> {
    return findParent(this.tree, node);
  }

  public findNode<Id extends T["id"]>(id: Id): MaybeNode<T> {
    return findNode(this.tree, id);
  }

  public removeNode<Id extends T["id"]>(id: Id): T[] {
    return removeNode(this.tree, id);
  }

  public insertNode<const Id extends T["id"]>(destId: DestId<Id>, node: T, callback: InsertCallback<T>): void;
  public insertNode<const Id extends T["id"]>(destId: DestId<Id>, node: T): T[];
  public insertNode(destId: DestId<any>, node: any, callback?: InsertCallback<any>) {
    if (callback) return insertNode(this.tree, destId, node, callback);

    return insertNode(this.tree, destId, node);
  }

  public safeInsertNode<const Id extends T["id"]>(destId: DestId<Id>, node: T, callback: InsertCallbackWithError<T>): void;
  public safeInsertNode<const Id extends T["id"]>(destId: DestId<Id>, node: T): T[];
  public safeInsertNode(destId: DestId<any>, node: any, callback?: InsertCallbackWithError<any>) {
    if (callback) return safeInsertNode(this.tree, destId, node, callback);

    return safeInsertNode(this.tree, destId, node);
  }
}
