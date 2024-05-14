import { FlatNode, TreeNode } from "$core/index";
import { buildTree } from "$core/utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("buildTree", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(buildTree);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA, FLAT_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[]; FLAT_DATA: FlatNode[] }>("$core/__mocks__");

  it("should returns tree version of given flat data", () => {
    expect(buildTree(FLAT_DATA)).toStrictEqual(TREE_DATA);

    expect(buildTree(FLAT_DATA)).toMatchSnapshot();
  });
});
