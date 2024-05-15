import type Tree from "@treekit/core";

export type Override<T extends TreeNode, K extends keyof Tree<T>> = Parameters<Tree<T>[K]> extends [...infer R, unknown] ? (...args: R) => void : never;
