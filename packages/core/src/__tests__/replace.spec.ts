import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { replace } from "../functions";
import { TreeNode } from "$core/index";

describe("replace", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(replace);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => replace(emptyTree, "1", {})).toThrow(new Error("[Categorizr:replace] Cannot found the target node with the given id"));
    expect(() => replace(TREE_DATA, "10", {})).toThrow(new Error("[Categorizr:replace] Cannot found the target node with the given id"));
  });

  it("returns updated tree within replaced node that has id", () => {
    expect(
      replace(TREE_DATA, "5", {
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
      replace(TREE_DATA, "5", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    replace(
      TREE_DATA,
      "5",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree) => {
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that has not id", () => {
    expect(
      replace(TREE_DATA, "5", {
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
      replace(TREE_DATA, "5", {
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    replace(
      TREE_DATA,
      "5",
      {
        name: "new node",
        children: [],
      },
      (newTree) => {
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that placed in first depth", () => {
    expect(
      replace(TREE_DATA, "1", {
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
      replace(TREE_DATA, "1", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    replace(
      TREE_DATA,
      "1",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree) => {
        expect(newTree).toMatchSnapshot();
      }
    );
  });
});
