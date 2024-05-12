import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "$core/types";
import { replace } from "../functions";

describe("replace", async () => {
  beforeAll(() => {
    vi.fn().mockImplementation(replace);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const { default: CATEGORIES } = await vi.importActual<{ default: TreeNode[] }>("$core/__mocks__");

  it("throws an error when node is not found", () => {
    const emptyTree: TreeNode[] = [];

    expect(() => replace(emptyTree, "1", {})).toThrow(new Error("[Categorizr:replace] cannot found the target node within given id"));
    expect(() => replace(CATEGORIES, "10", {})).toThrow(new Error("[Categorizr:replace] cannot found the target node within given id"));
  });

  it("returns updated tree within replaced node that has id", () => {
    expect(
      replace(CATEGORIES, "5", {
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
      replace(CATEGORIES, "5", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    replace(
      CATEGORIES,
      "5",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree) => {
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that has not id", () => {
    expect(
      replace(CATEGORIES, "5", {
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
      replace(CATEGORIES, "5", {
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    replace(
      CATEGORIES,
      "5",
      {
        name: "new node",
        children: [],
      },
      (newTree) => {
        expect(newTree).toMatchSnapshot();
      }
    );
  });

  it("returns updated tree within replaced node that placed in first depth", () => {
    expect(
      replace(CATEGORIES, "1", {
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
      replace(CATEGORIES, "1", {
        id: "10",
        name: "new node",
        children: [],
      })
    ).toMatchSnapshot();

    replace(
      CATEGORIES,
      "1",
      {
        id: "10",
        name: "new node",
        children: [],
      },
      (newTree) => {
        expect(newTree).toMatchSnapshot();
      }
    );
  });
});
