import { afterEach, describe, expect, it, vi } from "vitest";
import { TreeNode } from "$core/index";
import { findParent } from "../../helpers";

describe("findParent", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("returns undefined for empty tree", () => {
    const fn = vi.fn(findParent);

    const emptyTree: TreeNode[] = [];

    const node = {
      id: "1",
      name: "category-1",
      children: [],
    };

    expect(fn(emptyTree, node)).toBeUndefined();
  });

  it("returns undefined when node is not found", async () => {
    const fn = vi.fn(findParent);

    const node = {
      id: "100",
      name: "non-existent-node",
      children: [],
    };

    expect(fn(TREE_DATA, node)).toBeUndefined();
  });

  it("returns correct parent node for node with children", async () => {
    const fn = vi.fn(findParent);

    const node = {
      id: "3",
      name: "sub-category-1",
      children: [
        {
          id: "5",
          name: "sub-category-3",
          children: [],
        },
      ],
    };

    expect(fn(TREE_DATA, node)).toMatchSnapshot();
  });

  it("returns correct parent node for node with children", async () => {
    const fn = vi.fn(findParent);

    const node = {
      id: "4",
      name: "sub-category-1",
      children: [],
    };

    expect(fn(TREE_DATA, node)).toMatchSnapshot();
  });
});
