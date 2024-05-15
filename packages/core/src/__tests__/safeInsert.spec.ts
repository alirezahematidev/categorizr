import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { safeInsert } from "../functions";
import { TreeNode } from "$core/index";

describe("safeInsert", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeInsert);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

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
      expect(error).toStrictEqual(new Error("[Treekit:safeInsert] Cannot found the destination node with the given id."));
    });
  });

  it("returns updated tree including the inserted node at first level of tree within null destId", () => {
    const node = {
      id: "6",
      name: "sub-category-root",
      children: [],
    };

    expect(safeInsert(TREE_DATA, null, node)).toStrictEqual([
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

    expect(safeInsert(TREE_DATA, null, node)).toMatchSnapshot();
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

    expect(safeInsert(TREE_DATA, "3", node1)).toMatchSnapshot();

    expect(safeInsert(TREE_DATA, "10", node2)).toStrictEqual(TREE_DATA);

    safeInsert(TREE_DATA, "3", node2, (newTree, error) => {
      expect(error).toBeUndefined();
      expect(newTree).toMatchSnapshot();
    });

    safeInsert(TREE_DATA, "10", node2, (newTree, error) => {
      expect(newTree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Treekit:safeInsert] Cannot found the destination node with the given id."));
    });
  });
});
