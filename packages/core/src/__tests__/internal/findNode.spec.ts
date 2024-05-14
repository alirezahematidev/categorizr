import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { TreeNode } from "$core/index";
import { findNode } from "../../helpers";

describe("findNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(findNode);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("returns undefined for empty tree", () => {
    const emptyTree: TreeNode[] = [];

    const nodeId = "1";

    expect(findNode(emptyTree, nodeId)).toBeUndefined();
  });

  it("returns correct node for existing node in the tree", async () => {
    const nodeId = "4";

    const expectedNode = {
      id: "4",
      name: "sub-category-2",
      children: [],
    };

    expect(findNode(TREE_DATA, nodeId)).toStrictEqual(expectedNode);
    expect(findNode(TREE_DATA, nodeId)).toMatchSnapshot();
  });
});
