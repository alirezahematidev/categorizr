import { Mutable, Replacer, TreeNode } from "$core/types";

export function noChildren<T extends TreeNode>(node: T) {
  return !node.children || node.children.length === 0;
}

export function warning(method: string, message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.warn("[Categorizr:%s] %s\n", method, message);
  }
}

export function exception(method: string, message: string) {
  return new Error(`[Categorizr:${method}] ${message}`);
}

export function modifyWith<T extends TreeNode>(tree: T[], id: string, replacer?: Replacer<T>) {
  const nodeIndex = tree.findIndex((treeNode) => treeNode.id === id);

  if (nodeIndex !== -1) {
    replacer ? tree.splice(nodeIndex, 1, replacer as T) : tree.splice(nodeIndex, 1);
  }
}

export function todo(message: string) {
  throw new Error(message);
}

export function clone<T extends object>(input: T, cache: WeakMap<T, any> = new WeakMap()): Mutable<T> {
  if (input === null || typeof input !== "object") return input as Mutable<T>;

  if (cache.has(input)) return cache.get(input)!;

  if (Array.isArray(input)) {
    const clonedArr = new Array();

    for (let i = 0; i < input.length; i++) {
      clonedArr.push(clone(input[i], cache));
    }

    cache.set(input, clonedArr);

    return clonedArr as Mutable<T>;
  }

  const clonedObj = Object.create(Object.getPrototypeOf(input));

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      clonedObj[key] = clone(input[key] as any, cache);
    }
  }

  cache.set(input, clonedObj);

  return clonedObj as Mutable<T>;
}
