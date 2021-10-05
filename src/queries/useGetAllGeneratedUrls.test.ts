import { useQuery } from "react-query";
jest.mock("react-query");

import { useGetAllGeneratedUrls } from "./useGetAllGeneratedUrls";

describe("useGetAllGeneratedUrls", () => {
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
    const actual = useGetAllGeneratedUrls("test-token");
    expect(actual).toEqual({
      data: "data",
      isLoading: "isLoading",
      isError: "isError",
    });
  });
});
