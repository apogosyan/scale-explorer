import { scalesOfSize } from "./index";

test("There's only one scale of size 12", () => {
  expect(scalesOfSize(1).length).toBe(1);
});

test("There are 330 possible pentatonics", () => {
  expect(scalesOfSize(5).length).toBe(330);
});
