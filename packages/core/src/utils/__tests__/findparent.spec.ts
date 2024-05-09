import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { findParent } from "../findParent";
import type { TreeNode } from "$core/types";

describe("findParent", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(findParent);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("returns undefined for empty tree", () => {
    const emptyTree: TreeNode[] = [];

    const node = {
      id: "1",
      name: "category-1",
      children: [],
    };

    expect(findParent(emptyTree, node)).toBeUndefined();
  });

  it("returns undefined when node is not found", async () => {
    const node = {
      id: "100",
      name: "non-existent-node",
      children: [],
    };

    expect(findParent(CATEGORIES, node)).toBeUndefined();
  });

  it("returns correct parent node for node with children", async () => {
    const node = {
      id: "3",
      name: "sub-category-1",
      children: [],
    };

    expect(findParent(CATEGORIES, node)).toMatchSnapshot();
  });

  it("returns correct parent node for node with children", async () => {
    const node = {
      id: "4",
      name: "sub-category-1",
      children: [],
    };

    expect(findParent(CATEGORIES, node)).toMatchSnapshot();
  });
});
