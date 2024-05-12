import { DestId, Callback, CallbackWithError, TreeNode, Replacer } from "$core/types";
import * as functions from "./functions";

export class Categorizr<T extends TreeNode> {
  private readonly tree: ReadonlyArray<T> = [];

  constructor(tree: T[]) {
    if (tree.length === 0) console.warn("[Categorizr] The given data is an empty array");

    this.tree = tree;
  }

  public remove(id: string): T[];
  public remove(id: string, callback: Callback<T>): void;
  public remove(id: string, callback?: Callback<T>) {
    if (callback) return void functions.remove(this.tree, id, callback);

    return functions.remove(this.tree, id);
  }

  public safeRemove(id: string): T[];
  public safeRemove(id: string, callback: CallbackWithError<T>): void;
  public safeRemove(id: string, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeRemove(this.tree, id, callback);

    return functions.safeRemove(this.tree, id);
  }

  public insert(destId: DestId, node: T): T[];
  public insert(destId: DestId, node: T, callback: Callback<T>): void;
  public insert(destId: DestId, node: T, callback?: Callback<T>) {
    if (callback) return void functions.insert(this.tree, destId, node, callback);

    return functions.insert(this.tree, destId, node);
  }

  public safeInsert(destId: DestId, node: T): T[];
  public safeInsert(destId: DestId, node: T, callback: CallbackWithError<T>): void;
  public safeInsert(destId: DestId, node: T, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeInsert(this.tree, destId, node, callback);

    return functions.safeInsert(this.tree, destId, node);
  }

  public move(sourceId: string, destId: DestId): T[];
  public move(sourceId: string, destId: DestId, callback: Callback<T>): void;
  public move(sourceId: string, destId: DestId, callback?: Callback<T>) {
    if (callback) return void functions.move(this.tree, sourceId, destId, callback);

    return functions.move(this.tree, sourceId, destId);
  }

  public safeMove(sourceId: string, destId: DestId): T[];
  public safeMove(sourceId: string, destId: DestId, callback: CallbackWithError<T>): void;
  public safeMove(sourceId: string, destId: DestId, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeMove(this.tree, sourceId, destId, callback);

    return functions.safeMove(this.tree, sourceId, destId);
  }

  public replace(targetId: string, replacer: Replacer<T>): T[];
  public replace(targetId: string, replacer: Replacer<T>, callback: Callback<T>): void;
  public replace(targetId: string, replacer: Replacer<T>, callback?: Callback<T>) {
    if (callback) return void functions.replace(this.tree, targetId, replacer, callback);

    return functions.replace(this.tree, targetId, replacer);
  }

  public safeReplace(targetId: string, replacer: Replacer<T>): T[];
  public safeReplace(targetId: string, replacer: Replacer<T>, callback: CallbackWithError<T>): void;
  public safeReplace(targetId: string, replacer: Replacer<T>, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeReplace(this.tree, targetId, replacer, callback);

    return functions.safeReplace(this.tree, targetId, replacer);
  }
}
