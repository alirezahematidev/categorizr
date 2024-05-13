import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { insert } from "../functions";

describe("insert", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(insert);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when parent node is not found", () => {
    const emptyTree: TreeNode[] = [];

    const node = {
      id: "10",
      name: "sub-category-3",
      children: [],
    };

    expect(() => insert(emptyTree, "3", node)).toThrow(new Error("[Categorizr:insert] Cannot find the destination node with the given id."));
  });

  it("returns updated tree including the inserted node at first level of tree within null destId", () => {
    const node = {
      id: "6",
      name: "sub-category-root",
      children: [],
    };

    expect(insert(CATEGORIES, null, node)).toStrictEqual([
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

    expect(insert(CATEGORIES, null, node)).toMatchSnapshot();
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

    expect(insert(CATEGORIES, "3", node1)).toMatchSnapshot();

    expect(() => insert(CATEGORIES, "10", node2)).toThrow(new Error("[Categorizr:insert] Cannot find the destination node with the given id."));

    insert(CATEGORIES, "3", node2, (newTree) => {
      expect(newTree).toMatchSnapshot();
    });
  });
});
