import { Odin } from "../src/odin";

describe("Odin class", () => {
  test("sayHello logs correct string", () => {
    const odin = new Odin();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    odin.sayHello();

    expect(logSpy).toHaveBeenCalledWith("Hello Odin");

    logSpy.mockRestore();
  });
});
