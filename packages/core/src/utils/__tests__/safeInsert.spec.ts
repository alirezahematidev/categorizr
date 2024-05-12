import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { safeInsert } from "../functions";

describe("safeInsert", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeInsert);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("returns original data when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    const node = {
      id: "10",
      name: "category-3",
      children: [],
    };

    expect(safeInsert(emptyTree, "3", node)).toStrictEqual(emptyTree);

    safeInsert(emptyTree, "3", node, (tree, error) => {
      expect(tree).toStrictEqual(emptyTree);
      expect(error).toStrictEqual(new Error("[Categorizr:safeInsert] cannot found the parent node within given destId."));
    });
  });

  it("returns updated tree including the inserted node at first level of tree within null destId", () => {
    const node = {
      id: "6",
      name: "sub-category-root",
      children: [],
    };

    expect(safeInsert(CATEGORIES, null, node)).toStrictEqual([
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
        id: "6",
        name: "sub-category-root",
        children: [],
      },
    ]);

    expect(safeInsert(CATEGORIES, null, node)).toMatchSnapshot();
  });

  it("returns updated tree including the inserted node", () => {
    const node1 = {
      id: "10",
      name: "sub-category-3",
      children: [],
    };

    const node2 = {
      id: "20",
      name: "sub-category-10",
      children: [],
    };

    expect(safeInsert(CATEGORIES, "3", node1)).toMatchSnapshot();

    expect(safeInsert(CATEGORIES, "10", node2)).toStrictEqual(CATEGORIES);

    safeInsert(CATEGORIES, "3", node2, (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });

    safeInsert(CATEGORIES, "10", node2, (newTree, error) => {
      expect(newTree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("[Categorizr:safeInsert] cannot found the parent node within given destId."));
    });
  });
});
