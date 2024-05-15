import { afterEach, describe, expect, it, vi } from "vitest";
import { TreeNode } from "$core/index";
import { findNode } from "../../helpers";

describe("findNode", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("returns undefined for empty tree", () => {
    const fn = vi.fn(findNode);

    const emptyTree: TreeNode[] = [];

    const nodeId = "1";

    expect(fn(emptyTree, nodeId)).toBeUndefined();
  });

  it("returns correct node for existing node in the tree", async () => {
    const fn = vi.fn(findNode);

    const nodeId = "4";

    const expectedNode = {
      id: "4",
      name: "sub-category-2",
      children: [],
    };

    expect(fn(TREE_DATA, nodeId)).toStrictEqual(expectedNode);
    expect(fn(TREE_DATA, nodeId)).toMatchSnapshot();
  });
});
