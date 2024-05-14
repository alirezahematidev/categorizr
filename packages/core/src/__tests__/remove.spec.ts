import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { remove } from "../functions";
import { TreeNode } from "$core/index";

describe("remove", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(remove);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => remove(emptyTree, "1")).toThrow(new Error("[Categorizr:remove] Cannot found the node with the given id"));
    expect(() => remove(TREE_DATA, "10")).toThrow(new Error("[Categorizr:remove] Cannot found the node with the given id"));
  });

  it("removes the node from tree correctly", () => {
    const copy = [...TREE_DATA];

    expect(remove(TREE_DATA, "1")).toStrictEqual([
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

    remove(TREE_DATA, "1", (newTree) => {
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

    expect(TREE_DATA).toStrictEqual(copy);

    expect(TREE_DATA).not.toStrictEqual([
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

    expect(remove(TREE_DATA, "4")).toStrictEqual([
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

    expect(TREE_DATA).toStrictEqual(copy);

    expect(TREE_DATA).not.toStrictEqual([
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

    expect(remove(TREE_DATA, "1")).toMatchSnapshot();

    remove(TREE_DATA, "1", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
