import { afterEach, describe, expect, it, vi } from "vitest";
import { safeMove } from "../functions";
import { ActualParameters, TreeNode } from "$core/index";

describe("safeMove", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("returns original data when node is not found", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeMove">>(safeMove);

    const emptyTree: TreeNode[] = [];

    expect(fn(emptyTree, "1", null)).toStrictEqual(emptyTree);
    expect(fn(TREE_DATA, "10", null)).toStrictEqual(TREE_DATA);

    fn(TREE_DATA, "10", null, (tree, error) => {
      expect(tree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Treekit:safeMove] Cannot found the source node with the given id."));
    });
  });

  it("returns original data when try move node to its own descendants", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeMove">>(safeMove);

    expect(fn(TREE_DATA, "1", "3")).toStrictEqual(TREE_DATA);
    expect(fn(TREE_DATA, "1", "5")).toStrictEqual(TREE_DATA);
    expect(fn(TREE_DATA, "3", "5")).toStrictEqual(TREE_DATA);

    fn(TREE_DATA, "1", "3", (tree, error) => {
      expect(tree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Treekit:safeMove] Cannot move the node into its own descendants."));
    });
  });

  it("moved nodeId:4 to nodeId:3 should", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeMove">>(safeMove);

    expect(fn(TREE_DATA, "4", "3")).toStrictEqual([
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

    expect(fn(TREE_DATA, "4", "3")).toMatchSnapshot();

    fn(TREE_DATA, "4", "3", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("moved nodeId:3 to nodeId:null (first level depth) should", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeMove">>(safeMove);

    expect(fn(TREE_DATA, "3", null)).toStrictEqual([
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

    expect(fn(TREE_DATA, "3", null)).toMatchSnapshot();

    fn(TREE_DATA, "3", null, (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });
  });

  it("skip move processes if node moved to same dest", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeMove">>(safeMove);

    expect(fn(TREE_DATA, "3", "1")).toStrictEqual(TREE_DATA);
    expect(fn(TREE_DATA, "2", null)).toStrictEqual(TREE_DATA);
  });
});
