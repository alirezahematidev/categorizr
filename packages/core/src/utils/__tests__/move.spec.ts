import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { move } from "../functions";

describe("move", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(move);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => move(emptyTree, "1", null)).toThrow(new Error("cannot found the node within given id"));
    expect(() => move(CATEGORIES, "10", null)).toThrow(new Error("cannot found the node within given id"));
  });

  it("throws an error when try move node to its own descendants", () => {
    expect(() => move(CATEGORIES, "1", "3")).toThrow(new Error("Cannot move the node into its own descendants."));
    expect(() => move(CATEGORIES, "1", "5")).toThrow(new Error("Cannot move the node into its own descendants."));
    expect(() => move(CATEGORIES, "3", "5")).toThrow(new Error("Cannot move the node into its own descendants."));
  });

  it("moved nodeId:4 to nodeId:3 should", () => {
    expect(move(CATEGORIES, "4", "3")).toStrictEqual([
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

    expect(move(CATEGORIES, "4", "3")).toMatchSnapshot();

    move(CATEGORIES, "4", "3", (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("moved nodeId:3 to nodeId:null (first level depth) should", () => {
    expect(move(CATEGORIES, "3", null)).toStrictEqual([
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

    expect(move(CATEGORIES, "3", null)).toMatchSnapshot();

    move(CATEGORIES, "3", null, (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });

  it("skip move processes if node moved to same dest", () => {
    expect(move(CATEGORIES, "3", "1")).toStrictEqual(CATEGORIES);
    expect(move(CATEGORIES, "2", null)).toStrictEqual(CATEGORIES);
  });
});
