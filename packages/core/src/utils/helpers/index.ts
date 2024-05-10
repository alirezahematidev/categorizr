import { TreeNode } from "$core/types";

export function noChildren<T extends TreeNode>(node: T) {
  return !node.children || node.children.length === 0;
}

export function todo(message: string) {
  throw new Error(message);
}

export function clone<T>(input: T): T {
  if (input === null || typeof input !== "object") return input;

  if (Array.isArray(input)) {
    const clonedArr: any[] = [];

    for (let i = 0; i < input.length; i++) {
      clonedArr.push(clone(input[i]));
    }

    return clonedArr as T;
  }

  const clonedObj = Object.create(Object.getPrototypeOf(input));

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      clonedObj[key] = clone(input[key]);
    }
  }

  return clonedObj as T;
}
