import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { safeInsertNode } from "../functions";

describe("safeInsertNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeInsertNode);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    const node = {
      id: "10",
      name: "category-3",
      children: [],
    };

    expect(safeInsertNode(emptyTree, "3", node)).toStrictEqual(emptyTree);
  });

  it("returns updated tree including the inserted node", () => {
    const node1 = {
      id: "10",
      name: "category-3",
      children: [],
    };

    const node2 = {
      id: "20",
      name: "category-10",
      children: [],
    };

    expect(safeInsertNode(CATEGORIES, "3", node1)).toMatchSnapshot();

    expect(safeInsertNode(CATEGORIES, "10", node2)).toStrictEqual(CATEGORIES);

    safeInsertNode(CATEGORIES, "3", node2, (newTree) => {
      expect(newTree).toMatchSnapshot();
    });

    safeInsertNode(CATEGORIES, "10", node2, (newTree, error) => {
      expect(newTree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("cannot found the parent node within given parentId."));
    });
  });
});
