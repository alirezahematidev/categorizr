import { Callback, CallbackWithError, TreeNode, Replacer } from "$core/index";
import * as functions from "./functions";
import { nonUniqueTreeWarning, safeError } from "./helpers";

class Categorizr<T extends TreeNode> {
  private readonly tree: ReadonlyArray<T> = [];
  private listener: Callback<T> | undefined;

  constructor(tree: T[], listener?: Callback<T>) {
    nonUniqueTreeWarning(tree, "constructor");

    this.tree = tree;

    this.listener = listener;
  }

  private listen(callback: Callback<T>) {
    return (tree: readonly T[]) => {
      try {
        callback(tree);

        if (this.listener) this.listener(tree);
      } catch (error) {
        safeError(error, "An error occured while listening to update.");
      }
    };
  }

  private safeListen(callback: CallbackWithError<T>) {
    return (tree: readonly T[], error: Error | undefined) => {
      try {
        callback(tree, error);

        if (this.listener) this.listener(tree);
      } catch (_error) {
        callback(tree, _error instanceof Error ? _error : error);

        if (error) return console.error(error.message);

        safeError(_error, "An error occured while listening to update.");
      }
    };
  }

  public remove(id: string): T[];
  public remove(id: string, callback: Callback<T>): void;
  public remove(id: string, callback?: Callback<T>) {
    if (callback) return void functions.remove(this.tree, id, this.listen(callback));

    const update = functions.remove(this.tree, id);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while removing a node.");
    }

    return update;
  }

  public safeRemove(id: string): T[];
  public safeRemove(id: string, callback: CallbackWithError<T>): void;
  public safeRemove(id: string, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeRemove(this.tree, id, this.safeListen(callback));

    const update = functions.safeRemove(this.tree, id);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while removing a node.");
    }

    return update;
  }

  public insert(destination: string | null, node: T): T[];
  public insert(destination: string | null, node: T, callback: Callback<T>): void;
  public insert(destination: string | null, node: T, callback?: Callback<T>) {
    if (callback) return void functions.insert(this.tree, destination, node, this.listen(callback));

    const update = functions.insert(this.tree, destination, node);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while inserting a node.");
    }

    return update;
  }

  public safeInsert(destination: string | null, node: T): T[];
  public safeInsert(destination: string | null, node: T, callback: CallbackWithError<T>): void;
  public safeInsert(destination: string | null, node: T, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeInsert(this.tree, destination, node, this.safeListen(callback));

    const update = functions.safeInsert(this.tree, destination, node);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while inserting a node.");
    }

    return update;
  }

  public move(from: string, to: string | null): T[];
  public move(from: string, to: string | null, callback: Callback<T>): void;
  public move(from: string, to: string | null, callback?: Callback<T>) {
    if (callback) return void functions.move(this.tree, from, to, this.listen(callback));

    const update = functions.move(this.tree, from, to);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while moving a node.");
    }

    return update;
  }

  public safeMove(from: string, to: string | null): T[];
  public safeMove(from: string, to: string | null, callback: CallbackWithError<T>): void;
  public safeMove(from: string, to: string | null, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeMove(this.tree, from, to, this.safeListen(callback));

    const update = functions.safeMove(this.tree, from, to);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while moving a node.");
    }

    return update;
  }

  public replace(target: string, replacer: Replacer<T>): T[];
  public replace(target: string, replacer: Replacer<T>, callback: Callback<T>): void;
  public replace(target: string, replacer: Replacer<T>, callback?: Callback<T>) {
    if (callback) return void functions.replace(this.tree, target, replacer, this.listen(callback));

    const update = functions.replace(this.tree, target, replacer);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while replacing a node.");
    }

    return update;
  }

  public safeReplace(target: string, replacer: Replacer<T>): T[];
  public safeReplace(target: string, replacer: Replacer<T>, callback: CallbackWithError<T>): void;
  public safeReplace(target: string, replacer: Replacer<T>, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeReplace(this.tree, target, replacer, this.safeListen(callback));

    const update = functions.safeReplace(this.tree, target, replacer);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while replacing a node.");
    }

    return update;
  }

  public swap(from: string, to: string): T[];
  public swap(from: string, to: string, callback: Callback<T>): void;
  public swap(from: string, to: string, callback?: Callback<T>) {
    if (callback) return void functions.swap(this.tree, from, to, this.listen(callback));

    const update = functions.swap(this.tree, from, to);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while swaping a node.");
    }

    return update;
  }

  public safeSwap(from: string, to: string): T[];
  public safeSwap(from: string, to: string, callback: CallbackWithError<T>): void;
  public safeSwap(from: string, to: string, callback?: CallbackWithError<T>) {
    if (callback) return void functions.safeSwap(this.tree, from, to, this.safeListen(callback));

    const update = functions.safeSwap(this.tree, from, to);

    try {
      if (this.listener) this.listener(update);
    } catch (error) {
      safeError(error, "An error occured while swaping a node.");
    }

    return update;
  }
}

export default Categorizr;
