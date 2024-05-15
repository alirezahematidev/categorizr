import { afterEach, describe, expect, it, vi } from "vitest";
import { safeReplace } from "../functions";
import { ActualParameters, TreeNode } from "$core/index";

describe("safeReplace", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when node is not found", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeReplace">>(safeReplace);

    const emptyTree: TreeNode[] = [];

    expect(fn(emptyTree, "1", {})).toStrictEqual(emptyTree);
    expect(fn(TREE_DATA, "10", {})).toStrictEqual(TREE_DATA);

    fn(TREE_DATA, "10", {}, (tree, error) => {
      expect(tree).toStrictEqual(TREE_DATA);
      expect(error).toStrictEqual(new Error("[Treekit:safeReplace] Cannot found the target node with the given id."));
    });
  });

  it("returns updated tree within replaced node that has id", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeReplace">>(safeReplace);

    expect(
      fn(TREE_DATA, "5", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toStrictEqual([
      {
        id: "1",
        name: "category-1",
        children: [
          {
            id: "3",
            name: "sub-category-1",
            children: [
              {
                id: "10",
                name: "new node",
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

    expect(
      fn(TREE_DATA, "5", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    fn(
      TREE_DATA,
      "5",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree, error) => {
        expect(error).toBeUndefined();
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that has not id", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeReplace">>(safeReplace);

    expect(
      fn(TREE_DATA, "5", {
        name: "new node",
        children: [],
      })
    ).toStrictEqual([
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
                name: "new node",
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

    expect(
      fn(TREE_DATA, "5", {
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    fn(
      TREE_DATA,
      "5",
      {
        name: "new node",
        children: [],
      },
      (newTree, error) => {
        expect(error).toBeUndefined();
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that placed in first depth", () => {
    const fn = vi.fn<ActualParameters<TreeNode, "safeReplace">>(safeReplace);

    expect(
      fn(TREE_DATA, "1", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toStrictEqual([
      {
        id: "10",
        name: "new node",
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
    ]);

    expect(
      fn(TREE_DATA, "1", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    fn(
      TREE_DATA,
      "1",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree, error) => {
        expect(error).toBeUndefined();
        expect(newTree).toMatchSnapshot();
      }
    );
  });
});
