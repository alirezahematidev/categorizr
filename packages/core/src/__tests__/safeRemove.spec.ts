import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { safeRemove } from "../functions";

describe("safeRemove", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeRemove);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("returns original data error when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(safeRemove(emptyTree, "1")).toStrictEqual(emptyTree);

    safeRemove(emptyTree, "1", (tree, error) => {
      expect(tree).toStrictEqual(emptyTree);
      expect(error).toStrictEqual(new Error("[Categorizr:safeRemove] Cannot found the node with the given id."));
    });

    expect(safeRemove(CATEGORIES, "10")).toStrictEqual(CATEGORIES);

    safeRemove(CATEGORIES, "10", (tree, error) => {
      expect(tree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("[Categorizr:safeRemove] Cannot found the node with the given id."));
    });
  });

  it("removes the node from tree correctly", () => {
    const copy = [...CATEGORIES];

    expect(safeRemove(CATEGORIES, "1")).toStrictEqual([
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

    expect(CATEGORIES).toStrictEqual(copy);

    expect(CATEGORIES).not.toStrictEqual([
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

    expect(safeRemove(CATEGORIES, "4")).toStrictEqual([
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
        children: [],
      },
    ]);

    expect(CATEGORIES).toStrictEqual(copy);

    expect(CATEGORIES).not.toStrictEqual([
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
        children: [],
      },
    ]);

    expect(safeRemove(CATEGORIES, "1")).toMatchSnapshot();

    safeRemove(CATEGORIES, "1", (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });
});
