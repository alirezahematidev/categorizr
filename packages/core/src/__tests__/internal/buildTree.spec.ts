import { FlatNode, TreeNode } from "$core/index";
import { buildTree } from "$core/utils";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("buildTree", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA, FLAT_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[]; FLAT_DATA: FlatNode[] }>("$core/__mocks__");

  it("should returns tree version of given flat data", () => {
    const fn = vi.fn(buildTree);

    expect(fn(FLAT_DATA)).toStrictEqual(TREE_DATA);

    expect(fn(FLAT_DATA)).toMatchSnapshot();
  });
});
