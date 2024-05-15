import { afterEach, describe, expect, it, vi } from "vitest";
import { remove } from "../functions";
import { ActualParameters, TreeNode } from "$core/index";

describe("remove", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "remove">>(remove);

    const emptyTree: TreeNode[] = [];

    expect(() => fn(emptyTree, "1")).toThrow(new Error("[Treekit:remove] Cannot found the node with the given id"));
    expect(() => fn(TREE_DATA, "10")).toThrow(new Error("[Treekit:remove] Cannot found the node with the given id"));
  });

  it("removes the node from tree correctly", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "remove">>(remove);

    const copy = [...TREE_DATA];

    expect(fn(TREE_DATA, "1")).toStrictEqual([
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

    fn(TREE_DATA, "1", (newTree) => {
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

    expect(fn(TREE_DATA, "4")).toStrictEqual([
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

    expect(fn(TREE_DATA, "1")).toMatchSnapshot();

    fn(TREE_DATA, "1", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
