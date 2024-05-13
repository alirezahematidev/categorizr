import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { safeSwap } from "../functions";

describe("safeSwap", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeSwap);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when the node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(safeSwap(emptyTree, "1", "2")).toStrictEqual(emptyTree);
    expect(safeSwap(CATEGORIES, "1", "10")).toStrictEqual(CATEGORIES);

    safeSwap(CATEGORIES, "1", "10", (tree, error) => {
      expect(tree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("[Categorizr:safeSwap] Cannot found the from/to node with the given ids."));
    });
  });

  it("throws an error when the node is descendant of the other", () => {
    expect(safeSwap(CATEGORIES, "3", "5")).toStrictEqual(CATEGORIES);
    expect(safeSwap(CATEGORIES, "5", "3")).toStrictEqual(CATEGORIES);

    safeSwap(CATEGORIES, "5", "3", (tree, error) => {
      expect(tree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("[Categorizr:safeSwap] Nodes cannot be swapped as one is a descendant of the other."));
    });
  });

  it("returns updated tree data within the swapped nodes", () => {
    expect(safeSwap(CATEGORIES, "3", "4")).toStrictEqual([
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

    expect(safeSwap(CATEGORIES, "3", "4")).toMatchSnapshot();

    safeSwap(CATEGORIES, "3", "4", (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });

  it("returns original tree data when swapped node with itself", () => {
    expect(safeSwap(CATEGORIES, "3", "3")).toStrictEqual(CATEGORIES);
  });

  it("returns original tree data when swapped nodes in same depth", () => {
    expect(safeSwap(CATEGORIES, "1", "2")).toStrictEqual([
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

    expect(safeSwap(CATEGORIES, "1", "2")).toMatchSnapshot();

    safeSwap(CATEGORIES, "1", "2", (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });
});
