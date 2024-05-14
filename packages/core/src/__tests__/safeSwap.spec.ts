import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { safeSwap } from "../functions";
import { TreeNode } from "$core/index";

describe("safeSwap", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeSwap);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when the node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(safeSwap(emptyTree, "1", "2")).toStrictEqual(emptyTree);
    expect(safeSwap(TREE_DATA, "1", "10")).toStrictEqual(TREE_DATA);

    safeSwap(TREE_DATA, "1", "10", (tree, error) => {
      expect(tree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Categorizr:safeSwap] Cannot found the from/to node with the given ids."));
    });
  });

  it("throws an error when the node is descendant of the other", () => {
    expect(safeSwap(TREE_DATA, "3", "5")).toStrictEqual(TREE_DATA);
    expect(safeSwap(TREE_DATA, "5", "3")).toStrictEqual(TREE_DATA);

    safeSwap(TREE_DATA, "5", "3", (tree, error) => {
      expect(tree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Categorizr:safeSwap] Nodes cannot be swapped as one is a descendant of the other."));
    });
  });

  it("returns updated tree data within the swapped nodes", () => {
    expect(safeSwap(TREE_DATA, "3", "4")).toStrictEqual([
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

    expect(safeSwap(TREE_DATA, "3", "4")).toMatchSnapshot();

    safeSwap(TREE_DATA, "3", "4", (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });

  it("returns original tree data when swapped node with itself", () => {
    expect(safeSwap(TREE_DATA, "3", "3")).toStrictEqual(TREE_DATA);
  });

  it("returns original tree data when swapped nodes in same depth", () => {
    expect(safeSwap(TREE_DATA, "1", "2")).toStrictEqual([
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

    expect(safeSwap(TREE_DATA, "1", "2")).toMatchSnapshot();

    safeSwap(TREE_DATA, "1", "2", (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });
});
