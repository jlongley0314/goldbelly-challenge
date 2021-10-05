import { useMutation } from "react-query";
jest.mock("react-query");
import { useDeleteUrlBySlug } from "./useDeleteUrlBySlug";

describe("useCreateShortenedUrl", () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: "loading",
      isError: "error",
      error: "error",
      isSuccess: "success",
      mutate: undefined,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should return mutation with expected values", () => {
    expect(useDeleteUrlBySlug("test-token")).toEqual({
      isLoading: "loading",
      isError: "error",
      error: "error",
      isSuccess: "success",
      mutate: undefined,
    });
  });
});
