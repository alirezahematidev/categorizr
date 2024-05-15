import { FlatNode, TreeNode } from "$core/index";
import { flattenTree } from "$core/utils";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("flattenTree", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA, FLAT_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[]; FLAT_DATA: FlatNode[] }>("$core/__mocks__");

  it("should returns flat version of given tree data", () => {
    const fn = vi.fn(flattenTree);

    expect(fn(TREE_DATA)).toStrictEqual(FLAT_DATA);

    expect(fn(TREE_DATA)).toMatchSnapshot();
  });
});
