import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { insertNode } from "../functions";

describe("insertNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(insertNode);
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

    expect(() => insertNode(emptyTree, "3", node)).toThrow(new Error("cannot found the parent node within given parentId."));
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

    expect(insertNode(CATEGORIES, "3", node1)).toMatchSnapshot();

    insertNode(CATEGORIES, "10", node2, (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
