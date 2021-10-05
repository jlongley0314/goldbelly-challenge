import {
  render,
  RenderResult,
  fireEvent,
  screen,
} from "@testing-library/react";
import { UrlShortenerForm } from "./urlShortenerForm";
import { useCreateShortenedUrl } from "../../mutations/useCreateShortenedUrl";
jest.mock("../../mutations/useCreateShortenedUrl");
import { useQueryClient } from "react-query";
jest.mock("react-query");

describe("URLShortenerForm", () => {
  describe("URLShortenerForm success", () => {
    let component: RenderResult;
    let mutate = jest.fn();
    let invalidateQueries = jest.fn();
    beforeEach(() => {
      (useCreateShortenedUrl as jest.Mock).mockReturnValue({
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        mutate: mutate,
      });
      (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries });
      component = render(<UrlShortenerForm />);
    });

    it("should render component as expected", () => {
      expect(component).toMatchSnapshot();
    });

    it("does not call query when long url is not entered", () => {
      fireEvent.change(screen.getByTestId("LongUrlInput"), {
        target: { value: "test-long" },
      });
      fireEvent.click(screen.getByText("Submit"));
      expect(mutate).not.toHaveBeenCalled();
    });

    it("does not call query when short url is not entered", () => {
      fireEvent.change(screen.getByTestId("ShortUrlInput"), {
        target: { value: "test-short" },
      });
      fireEvent.click(screen.getByText("Submit"));
      expect(mutate).not.toHaveBeenCalled();
    });

    it("should call mutation when form is filled out with correct values", () => {
      fireEvent.change(screen.getByTestId("LongUrlInput"), {
        target: { value: "test-long" },
      });
      fireEvent.change(screen.getByTestId("ShortUrlInput"), {
        target: { value: "test-short" },
      });
      fireEvent.change(screen.getByTestId("SlugInput"), {
        target: { value: "test-slug" },
      });
      fireEvent.click(screen.getByText("Submit"));
      expect(mutate).toHaveBeenCalledWith({
        short_url: "test-short",
        slug: "test-slug",
        url: "test-long",
      });
      expect(invalidateQueries).toHaveBeenCalledWith("getAllGeneratedUrls");
    });
  });

  describe("URLShortenerForm success", () => {
    let mutate = jest.fn();
    let invalidateQueries = jest.fn();
    beforeEach(() => {
      (useCreateShortenedUrl as jest.Mock).mockReturnValue({
        isLoading: false,
        isError: true,
        error: undefined,
        isSuccess: false,
        mutate: mutate,
      });
      (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries });
      render(<UrlShortenerForm />);
    });

    it("should render the error toast when isError is true", () => {
      expect(screen.getByText("Error Creating Short Url")).toBeInTheDocument();
    });
  });
});
