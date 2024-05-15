import { afterEach, describe, expect, it, vi } from "vitest";
import { insert } from "../functions";
import { ActualParameters, TreeNode } from "$core/index";

describe("insert", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "insert">>(insert);

    const emptyTree: TreeNode[] = [];

    const node = {
      id: "10",
      name: "sub-category-3",
      children: [],
    };

    expect(() => fn(emptyTree, "3", node)).toThrow(new Error("[Treekit:insert] Cannot find the destination node with the given id."));
    expect(() => fn(emptyTree, "3", [node])).toThrow(new Error("[Treekit:insert] Cannot find the destination node with the given id."));
  });

  it("returns updated tree including the inserted node at first level of tree within null destId", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "insert">>(insert);

    const node = {
      id: "6",
      name: "sub-category-root",
      children: [],
    };

    expect(fn(TREE_DATA, null, node)).toStrictEqual([
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

    expect(fn(TREE_DATA, null, node)).toMatchSnapshot();
  });

  it("returns updated tree including the inserted array of nodes", () => {
    const node = [
      {
        id: "6",
        name: "sub-category-3",
        children: [],
      },
      {
        id: "7",
        name: "sub-category-3",
        children: [],
      },
    ];

    expect(insert(TREE_DATA, "3", node)).toStrictEqual([
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
                id: "6",
                name: "sub-category-3",
                children: [],
              },
              {
                id: "7",
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
    ]);

    expect(insert(TREE_DATA, null, node)).toMatchSnapshot();
  });

  it("returns updated tree including the inserted node", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "insert">>(insert);

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

    expect(fn(TREE_DATA, "3", node1)).toMatchSnapshot();

    expect(() => fn(TREE_DATA, "10", node2)).toThrow(new Error("[Treekit:insert] Cannot find the destination node with the given id."));

    fn(TREE_DATA, "3", node2, (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
