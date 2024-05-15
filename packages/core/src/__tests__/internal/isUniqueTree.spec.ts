import { afterEach, describe, expect, it, vi } from "vitest";
import { isUniqueTree } from "../../helpers";

describe("isUniqueTree", async () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns false if tree has duplicated node id", () => {
    const fn = vi.fn(isUniqueTree);

    expect(
      fn([
        {
          id: "1",
          name: "category-1",
          children: [
            {
              id: "3",
              name: "sub-category-1",
              children: [
                {
                  id: "1",
                  name: "sub-category-3",
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
      ])
    ).toBeFalsy();
  });

  it("returns true if tree nodes has unique id", () => {
    const fn = vi.fn(isUniqueTree);

    expect(
      fn([
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
                  name: "sub-category-3",
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
      ])
    ).toBeTruthy();
  });
});
