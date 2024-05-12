import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { remove } from "../functions";

describe("remove", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(remove);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => remove(emptyTree, "1")).toThrow(new Error("[Categorizr:remove] cannot found the node within given id"));
    expect(() => remove(CATEGORIES, "10")).toThrow(new Error("[Categorizr:remove] cannot found the node within given id"));
  });

  it("removes the node from tree correctly", () => {
    const copy = [...CATEGORIES];

    expect(remove(CATEGORIES, "1")).toStrictEqual([
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

    remove(CATEGORIES, "1", (newTree) => {
      expect(newTree).toStrictEqual([
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
    });

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

    expect(remove(CATEGORIES, "4")).toStrictEqual([
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

    expect(remove(CATEGORIES, "1")).toMatchSnapshot();

    remove(CATEGORIES, "1", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
