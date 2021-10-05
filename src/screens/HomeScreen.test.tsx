import { render } from "@testing-library/react";
import { HomeScreen } from "./HomeScreen";

describe("HomScreen", () => {
  it("should render as expected", () => {
    expect(render(<HomeScreen />)).toMatchSnapshot();
  });
});
