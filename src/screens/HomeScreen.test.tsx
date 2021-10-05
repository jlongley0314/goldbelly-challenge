import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomeScreen } from "./HomeScreen";

describe("HomScreen", () => {
  const queryClient = new QueryClient();
  it("should render as expected", () => {
    expect(
      render(
        <QueryClientProvider client={queryClient}>
          <HomeScreen />
        </QueryClientProvider>
      )
    ).toMatchSnapshot();
  });
});
