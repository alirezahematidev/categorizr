import { FlatNode, TreeNode } from "$core/index";
import { flattenTree } from "$core/utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("flattenTree", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(flattenTree);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA, FLAT_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[]; FLAT_DATA: FlatNode[] }>("$core/__mocks__");

  it("should returns flat version of given tree data", () => {
    expect(flattenTree(TREE_DATA)).toStrictEqual(FLAT_DATA);

    expect(flattenTree(TREE_DATA)).toMatchSnapshot();
  });
});
