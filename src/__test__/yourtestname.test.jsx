// import { describe, test, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import App from "../App";

const user = {
  name: 'Matt',
  age: 22,
};

  test("Matt is 22", () => {
    expect(user.name).toBe("Matt");
    expect(user.age).toBe(22);
  });