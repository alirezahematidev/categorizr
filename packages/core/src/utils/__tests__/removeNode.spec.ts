import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { removeNode } from "../functions";

describe("removeNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(removeNode);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => removeNode(emptyTree, "1")).toThrow(new Error("cannot found the node within given id"));
    expect(() => removeNode(CATEGORIES, "10")).toThrow(new Error("cannot found the node within given id"));
  });

  it("removes the node from tree correctly", () => {
    expect(removeNode(CATEGORIES, "1")).toStrictEqual([
      {
        id: "2",
        name: "category-2",
        children: [
          {
            id: "4",
            name: "sub-category-2",
            children: [],
          },
        ],
      },
    ]);

    expect(removeNode(CATEGORIES, "4")).toStrictEqual([
      {
        id: "1",
        name: "category-1",
        children: [
          {
            id: "3",
            name: "sub-category-1",
            children: [],
          },
        ],
      },
      {
        id: "2",
        name: "category-2",
        children: [],
      },
    ]);

    expect(removeNode(CATEGORIES, "1")).toMatchSnapshot();
  });
});
