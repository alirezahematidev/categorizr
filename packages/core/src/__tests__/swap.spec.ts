import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { swap } from "../functions";
import { TreeNode } from "$core/index";

describe("swap", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(swap);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when the node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => swap(emptyTree, "1", "2")).toThrow(new Error("[Treekit:swap] Cannot found the from/to node with the given ids."));
    expect(() => swap(TREE_DATA, "1", "10")).toThrow(new Error("[Treekit:swap] Cannot found the from/to node with the given ids."));
  });

  it("throws an error when the node is descendant of the other", () => {
    expect(() => swap(TREE_DATA, "3", "5")).toThrow(new Error("[Treekit:swap] Nodes cannot be swapped as one is a descendant of the other."));
    expect(() => swap(TREE_DATA, "5", "3")).toThrow(new Error("[Treekit:swap] Nodes cannot be swapped as one is a descendant of the other."));
  });

  it("returns updated tree data within the swapped nodes", () => {
    expect(swap(TREE_DATA, "3", "4")).toStrictEqual([
      {
        id: "1",
        name: "category-1",
        children: [
          {
            id: "4",
            name: "sub-category-2",
            children: [],
          },
        ],
      },
      {
        id: "2",
        name: "category-2",
        children: [
          {
            id: "3",
            name: "sub-category-1",
            children: [
              {
                id: "5",
                name: "sub-category-3",
                children: [],
              },
            ],
          },
        ],
      },
    ]);

    expect(swap(TREE_DATA, "3", "4")).toMatchSnapshot();

    swap(TREE_DATA, "3", "4", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("returns original tree data when swapped node with itself", () => {
    expect(swap(TREE_DATA, "3", "3")).toStrictEqual(TREE_DATA);
  });

  it("returns original tree data when swapped nodes in same depth", () => {
    expect(swap(TREE_DATA, "1", "2")).toStrictEqual([
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
      {
        id: "1",
        name: "category-1",
        children: [
          {
            id: "3",
            name: "sub-category-1",
            children: [
              {
                id: "5",
                name: "sub-category-3",
                children: [],
              },
            ],
          },
        ],
      },
    ]);

    expect(swap(TREE_DATA, "1", "2")).toMatchSnapshot();

    swap(TREE_DATA, "1", "2", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
