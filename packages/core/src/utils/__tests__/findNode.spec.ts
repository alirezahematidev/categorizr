import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { findNode } from "../functions";

describe("findNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(findNode);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

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

    expect(findNode(CATEGORIES, nodeId)).toStrictEqual(expectedNode);
    expect(findNode(CATEGORIES, nodeId)).toMatchSnapshot();
  });
});
