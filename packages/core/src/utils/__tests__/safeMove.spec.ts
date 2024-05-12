import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { safeMove } from "../functions";

describe("safeMove", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeMove);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("returns original data when node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(safeMove(emptyTree, "1", null)).toStrictEqual(emptyTree);
    expect(safeMove(CATEGORIES, "10", null)).toStrictEqual(CATEGORIES);

    safeMove(CATEGORIES, "10", null, (tree, error) => {
      expect(tree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("[Categorizr:safeMove] cannot found the node within given id"));
    });
  });

  it("returns original data when try move node to its own descendants", () => {
    expect(safeMove(CATEGORIES, "1", "3")).toStrictEqual(CATEGORIES);
    expect(safeMove(CATEGORIES, "1", "5")).toStrictEqual(CATEGORIES);
    expect(safeMove(CATEGORIES, "3", "5")).toStrictEqual(CATEGORIES);

    safeMove(CATEGORIES, "1", "3", (tree, error) => {
      expect(tree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("[Categorizr:safeMove] Cannot move the node into its own descendants."));
    });
  });

  it("moved nodeId:4 to nodeId:3 should", () => {
    expect(safeMove(CATEGORIES, "4", "3")).toStrictEqual([
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
              {
                id: "4",
                name: "sub-category-2",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "category-2",
        children: [],
      },
    ]);

    expect(safeMove(CATEGORIES, "4", "3")).toMatchSnapshot();

    safeMove(CATEGORIES, "4", "3", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("moved nodeId:3 to nodeId:null (first level depth) should", () => {
    expect(safeMove(CATEGORIES, "3", null)).toStrictEqual([
      {
        id: "1",
        name: "category-1",
        children: [],
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
    ]);

    expect(safeMove(CATEGORIES, "3", null)).toMatchSnapshot();

    safeMove(CATEGORIES, "3", null, (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });

  it("skip move processes if node moved to same dest", () => {
    expect(safeMove(CATEGORIES, "3", "1")).toStrictEqual(CATEGORIES);
    expect(safeMove(CATEGORIES, "2", null)).toStrictEqual(CATEGORIES);
  });
});
