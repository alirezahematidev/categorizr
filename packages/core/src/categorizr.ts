import { Callback, CallbackWithError, TreeNode, Replacer } from "$core/types";
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

  public insert(destination: string | null, node: T): T[];
  public insert(destination: string | null, node: T, callback: Callback<T>): void;
  public insert(destination: string | null, node: T, callback?: Callback<T>) {
    if (callback) return void functions.insert(this.tree, destination, node, callback);

    return functions.insert(this.tree, destination, node);
  }

  public safeInsert(destination: string | null, node: T): T[];
  public safeInsert(destination: string | null, node: T, callback: CallbackWithError<T>): void;
  public safeInsert(destination: string | null, node: T, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeInsert(this.tree, destination, node, callback);

    return functions.safeInsert(this.tree, destination, node);
  }

  public move(from: string, to: string | null): T[];
  public move(from: string, to: string | null, callback: Callback<T>): void;
  public move(from: string, to: string | null, callback?: Callback<T>) {
    if (callback) return void functions.move(this.tree, from, to, callback);

    return functions.move(this.tree, from, to);
  }

  public safeMove(from: string, to: string | null): T[];
  public safeMove(from: string, to: string | null, callback: CallbackWithError<T>): void;
  public safeMove(from: string, to: string | null, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeMove(this.tree, from, to, callback);

    return functions.safeMove(this.tree, from, to);
  }

  public replace(target: string, replacer: Replacer<T>): T[];
  public replace(target: string, replacer: Replacer<T>, callback: Callback<T>): void;
  public replace(target: string, replacer: Replacer<T>, callback?: Callback<T>) {
    if (callback) return void functions.replace(this.tree, target, replacer, callback);

    return functions.replace(this.tree, target, replacer);
  }

  public safeReplace(target: string, replacer: Replacer<T>): T[];
  public safeReplace(target: string, replacer: Replacer<T>, callback: CallbackWithError<T>): void;
  public safeReplace(target: string, replacer: Replacer<T>, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeReplace(this.tree, target, replacer, callback);

    return functions.safeReplace(this.tree, target, replacer);
  }

  public swap(from: string, to: string): T[];
  public swap(from: string, to: string, callback: Callback<T>): void;
  public swap(from: string, to: string, callback?: Callback<T>) {
    if (callback) return void functions.swap(this.tree, from, to, callback);

    return functions.swap(this.tree, from, to);
  }

  public safeSwap(from: string, to: string): T[];
  public safeSwap(from: string, to: string, callback: CallbackWithError<T>): void;
  public safeSwap(from: string, to: string, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeSwap(this.tree, from, to, callback);

    return functions.safeSwap(this.tree, from, to);
  }
}
