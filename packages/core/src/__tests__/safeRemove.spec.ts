import { afterEach, describe, expect, it, vi } from "vitest";
import { safeRemove } from "../functions";
import { ActualParameters, TreeNode } from "$core/index";

describe("safeRemove", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("returns original data error when parent node is not found", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeRemove">>(safeRemove);

    const emptyTree: TreeNode[] = [];

    expect(fn(emptyTree, "1")).toStrictEqual(emptyTree);

    fn(emptyTree, "1", (tree, error) => {
      expect(tree).toStrictEqual(emptyTree);
      expect(error).toStrictEqual(new Error("[Treekit:safeRemove] Cannot found the node with the given id."));
    });

    expect(fn(TREE_DATA, "10")).toStrictEqual(TREE_DATA);

    fn(TREE_DATA, "10", (tree, error) => {
      expect(tree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Treekit:safeRemove] Cannot found the node with the given id."));
    });
  });

  it("removes the node from tree correctly", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeRemove">>(safeRemove);

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

    fn(TREE_DATA, "1", (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });
});
