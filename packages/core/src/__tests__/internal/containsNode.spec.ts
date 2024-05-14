import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { containsNode } from "../../helpers";
import { TreeNode } from "$core/index";

describe("containsNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(containsNode);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { TREE_DATA } = await vi.importActual<{ TREE_DATA: TreeNode[] }>("$core/__mocks__");

  it("returns false if tree is empty", () => {
    expect(containsNode([], "3", "1")).toBeFalsy();
  });

  it("returns false if destId is null", () => {
    expect(containsNode(TREE_DATA, "3", null)).toBeFalsy();
  });

  it("returns false if nodeId is equals to destId", () => {
    expect(containsNode(TREE_DATA, "1", "1")).toBeFalsy();
  });

  it("returns false if node appears in node 2", () => {
    expect(containsNode(TREE_DATA, "2", "3")).toBeFalsy();
  });

  it("returns true if node appears in node 1", () => {
    expect(containsNode(TREE_DATA, "1", "3")).toBeTruthy();
  });

  it("returns true if node appears in node 2", () => {
    expect(containsNode(TREE_DATA, "2", "4")).toBeTruthy();
  });
});