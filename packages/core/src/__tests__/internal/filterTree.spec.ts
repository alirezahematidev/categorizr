import { TreeNode } from "$core/index";
import { filterTree } from "$core/utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("filterTree", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(filterTree);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("should returns empty array tree if predicate is false for all nodes", () => {
    expect(filterTree(TREE_DATA, (node) => node.id === "99")).toStrictEqual([]);
  });

  it("should returns filtered tree", () => {
    expect(filterTree(TREE_DATA, (node) => node.id === "3")).toStrictEqual([
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

    expect(filterTree(TREE_DATA, (node) => node.id === "3")).toMatchSnapshot();
  });

  it("should returns filtered tree", () => {
    expect(filterTree(TREE_DATA, (node) => ["4", "5"].includes(node.id))).toStrictEqual([
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
    ]);

    expect(filterTree(TREE_DATA, (node) => ["4", "5"].includes(node.id))).toMatchSnapshot();
  });
});
