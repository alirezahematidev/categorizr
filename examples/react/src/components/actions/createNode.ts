import { nanoid } from "nanoid";

export function createNode(name: string) {
  return {
    id: nanoid(6),
    name,
    children: [],
  };
}
