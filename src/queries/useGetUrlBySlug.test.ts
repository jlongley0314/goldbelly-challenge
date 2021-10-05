import { useQuery } from "react-query";
jest.mock("react-query");

import { useGetUrlBySlug } from "./useGetUrlBySlug";

describe("useGetUrlBySlug", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: "data",
      isLoading: "isLoading",
      isError: "isError",
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should return a hook with the expected values", () => {
    const actual = useGetUrlBySlug("test-token", "test-slug");
    expect(useQuery).toBeCalled();
    expect(actual).toEqual({
      data: "data",
      isLoading: "isLoading",
      isError: "isError",
    });
  });
});
