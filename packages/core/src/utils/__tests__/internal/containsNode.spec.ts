import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { TreeNode } from "$core/types";
import { containsNode } from "../../functions/internal";

describe("containsNode", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(containsNode);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("returns false if tree is empty", () => {
    expect(containsNode([], "3", "1")).toBeFalsy();
  });

  it("returns false if destId is null", () => {
    expect(containsNode(CATEGORIES, "3", null)).toBeFalsy();
  });

  it("returns false if nodeId is equals to destId", () => {
    expect(containsNode(CATEGORIES, "1", "1")).toBeFalsy();
  });

  it("returns false if node appears in node 2", () => {
    expect(containsNode(CATEGORIES, "2", "3")).toBeFalsy();
  });

  it("returns true if node appears in node 1", () => {
    expect(containsNode(CATEGORIES, "1", "3")).toBeTruthy();
  });

  it("returns true if node appears in node 2", () => {
    expect(containsNode(CATEGORIES, "2", "4")).toBeTruthy();
  });
});
