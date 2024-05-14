import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { move } from "../functions";
import { TreeNode } from "$core/index";

describe("move", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(move);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("throws an error when node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => move(emptyTree, "1", null)).toThrow(new Error("[Categorizr:move] Cannot found the source node with the given id"));
    expect(() => move(TREE_DATA, "10", null)).toThrow(new Error("[Categorizr:move] Cannot found the source node with the given id"));
  });

  it("throws an error when try move node to its own descendants", () => {
    expect(() => move(TREE_DATA, "1", "3")).toThrow(new Error("[Categorizr:move] Cannot move the node into its own descendants."));
    expect(() => move(TREE_DATA, "1", "5")).toThrow(new Error("[Categorizr:move] Cannot move the node into its own descendants."));
    expect(() => move(TREE_DATA, "3", "5")).toThrow(new Error("[Categorizr:move] Cannot move the node into its own descendants."));
  });

  it("moved nodeId:4 to nodeId:3 should", () => {
    expect(move(TREE_DATA, "4", "3")).toStrictEqual([
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

    expect(move(TREE_DATA, "4", "3")).toMatchSnapshot();

    move(TREE_DATA, "4", "3", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("moved nodeId:3 to nodeId:null (first level depth) should", () => {
    expect(move(TREE_DATA, "3", null)).toStrictEqual([
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

    expect(move(TREE_DATA, "3", null)).toMatchSnapshot();

    move(TREE_DATA, "3", null, (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("skip move processes if node moved to same dest", () => {
    expect(move(TREE_DATA, "3", "1")).toStrictEqual(TREE_DATA);
    expect(move(TREE_DATA, "2", null)).toStrictEqual(TREE_DATA);
  });
});
