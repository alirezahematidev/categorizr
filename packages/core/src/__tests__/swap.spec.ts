import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { swap } from "../functions";

describe("swap", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(swap);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when the node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => swap(emptyTree, "1", "2")).toThrow(new Error("[Categorizr:swap] Cannot found the from/to node with the given ids."));
    expect(() => swap(CATEGORIES, "1", "10")).toThrow(new Error("[Categorizr:swap] Cannot found the from/to node with the given ids."));
  });

  it("throws an error when the node is descendant of the other", () => {
    expect(() => swap(CATEGORIES, "3", "5")).toThrow(new Error("[Categorizr:swap] Nodes cannot be swapped as one is a descendant of the other."));
    expect(() => swap(CATEGORIES, "5", "3")).toThrow(new Error("[Categorizr:swap] Nodes cannot be swapped as one is a descendant of the other."));
  });

  it("returns updated tree data within the swapped nodes", () => {
    expect(swap(CATEGORIES, "3", "4")).toStrictEqual([
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

    expect(swap(CATEGORIES, "3", "4")).toMatchSnapshot();

    swap(CATEGORIES, "3", "4", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("returns original tree data when swapped node with itself", () => {
    expect(swap(CATEGORIES, "3", "3")).toStrictEqual(CATEGORIES);
  });

  it("returns original tree data when swapped nodes in same depth", () => {
    expect(swap(CATEGORIES, "1", "2")).toStrictEqual([
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

    expect(swap(CATEGORIES, "1", "2")).toMatchSnapshot();

    swap(CATEGORIES, "1", "2", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
