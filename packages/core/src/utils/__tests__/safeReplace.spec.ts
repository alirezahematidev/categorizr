import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { safeReplace } from "../functions";

describe("safeReplace", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(safeReplace);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(safeReplace(emptyTree, "1", {})).toStrictEqual(emptyTree);
    expect(safeReplace(CATEGORIES, "10", {})).toStrictEqual(CATEGORIES);

    safeReplace(CATEGORIES, "10", {}, (tree, error) => {
      expect(tree).toStrictEqual(CATEGORIES);
      expect(error).toStrictEqual(new Error("cannot found the target node within given id"));
    });
  });

  it("returns updated tree within replaced node that has id", () => {
    expect(
      safeReplace(CATEGORIES, "5", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toStrictEqual([
      {
        id: "1",
        name: "category-1",
        children: [
          {
            id: "3",
            name: "sub-category-1",
            children: [
              {
                id: "10",
                name: "new node",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "category-2",
        children: [
          {
            id: "4",
            name: "sub-category-2",
            children: [],
          },
        ],
      },
    ]);

    expect(
      safeReplace(CATEGORIES, "5", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    safeReplace(
      CATEGORIES,
      "5",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree, error) => {
        expect(error).toBeUndefined();
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that has not id", () => {
    expect(
      safeReplace(CATEGORIES, "5", {
        name: "new node",
        children: [],
      })
    ).toStrictEqual([
      {
        id: "1",
        name: "category-1",
        children: [
          {
            id: "3",
            name: "sub-category-1",
            children: [
              {
                id: "5",
                name: "new node",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "category-2",
        children: [
          {
            id: "4",
            name: "sub-category-2",
            children: [],
          },
        ],
      },
    ]);

    expect(
      safeReplace(CATEGORIES, "5", {
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    safeReplace(
      CATEGORIES,
      "5",
      {
        name: "new node",
        children: [],
      },
      (newTree, error) => {
        expect(error).toBeUndefined();
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that placed in first depth", () => {
    expect(
      safeReplace(CATEGORIES, "1", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toStrictEqual([
      {
        id: "10",
        name: "new node",
        children: [],
      },
      {
        id: "2",
        name: "category-2",
        children: [
          {
            id: "4",
            name: "sub-category-2",
            children: [],
          },
        ],
      },
    ]);

    expect(
      safeReplace(CATEGORIES, "1", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    safeReplace(
      CATEGORIES,
      "1",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree, error) => {
        expect(error).toBeUndefined();
        expect(newTree).toMatchSnapshot();
      }
    );
  });
});
