import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { useQueryClient } from "react-query";
jest.mock("react-query");
import { useDeleteUrlBySlug } from "../../mutations/useDeleteUrlBySlug";
jest.mock("../../mutations/useDeleteUrlBySlug");
import { useGetAllGeneratedUrls } from "../../queries/useGetAllGeneratedUrls";
jest.mock("../../queries/useGetAllGeneratedUrls");
import { UrlTable } from "./urlTable";

const mockUrls = [
  {
    url: "fdsafs",
    slug: "shorter",
    short_url: "http://bely.me/shorter",
  },
  {
    url: "asdfasdf",
    slug: "s",
    short_url: "http://bely.me/s",
  },
  {
    url: "asdfdsafdsa",
    slug: "tewrewfsdaf",
    short_url: "http://bely.me/tewrewfsdaf",
  },
  {
    url: "fdsafsdafdas",
    slug: "dfasdfsdafsdafsdafd",
    short_url: "http://bely.me/dfasdfsdafsdafsdafd",
  },
  {
    url: "fdsacdsacdasc",
    slug: "cdsacdsacd",
    short_url: "http://bely.me/cdsacdsacd",
  },
  {
    url: "asdfdsfasdcdasc",
    slug: "dcasddfsdafdsaf",
    short_url: "http://bely.me/dcasddfsdafdsaf",
  },
];

describe("URLTable", () => {
  let component: RenderResult;
  let mutate = jest.fn();
  let invalidateQueries = jest.fn();

  beforeEach(() => {
    (useDeleteUrlBySlug as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: undefined,
      isSuccess: true,
      mutate: mutate,
    });
    (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries });
    (useGetAllGeneratedUrls as jest.Mock).mockReturnValue({
      data: mockUrls,
      isSuccess: true,
    });
    component = render(<UrlTable />);
  });

  it("should render component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should display the url values in table", () => {
    mockUrls.forEach((url) => {
      expect(screen.getByText(url.url)).toBeInTheDocument;
      expect(screen.getByText(url.short_url)).toBeInTheDocument;
      expect(screen.getByText(url.slug)).toBeInTheDocument;
    });
  });

  it("should call delete mutation with correct slug when delete button is pressed", () => {
    const url = mockUrls[0];
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mutate).toHaveBeenCalledWith(url.slug);
  });
});
