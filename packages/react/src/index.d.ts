import type Categorizr from "@categorizr/core";

export type Override<T extends TreeNode, K extends keyof Categorizr<T>> = Parameters<Categorizr<T>[K]> extends [...infer R, unknown] ? (...args: R) => void : never;
