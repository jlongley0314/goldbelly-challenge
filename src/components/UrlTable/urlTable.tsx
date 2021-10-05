import "./urlTable.css";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useGetAllGeneratedUrls } from "../../queries/useGetAllGeneratedUrls";
import { useDeleteUrlBySlug } from "../../mutations/useDeleteUrlBySlug";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

type UrlShortenerDataResponse = {
  url: string;
  short_url: string;
  slug: string;
};

export function UrlTable() {
  const queryClient = useQueryClient();
  const getAllGeneratedUrlsQuery = useGetAllGeneratedUrls(
    process.env.REACT_APP_API_KEY ?? ""
  );

  const { mutate: deleteUrl, isSuccess: deleteSuccess } = useDeleteUrlBySlug(
    process.env.REACT_APP_API_KEY ?? ""
  );

  useEffect(() => {
    if (deleteSuccess) {
      queryClient.invalidateQueries("getAllGeneratedUrls");
    }
  }, [deleteSuccess, queryClient]);

  return (
    <Card>
      <Card.Title className="UrlTableHeader">Your URLs</Card.Title>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Long Url</th>
              <th>Short Url</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getAllGeneratedUrlsQuery.isSuccess &&
              getAllGeneratedUrlsQuery.data.map(
                (data: UrlShortenerDataResponse) => {
                  return (
                    <tr key={data.short_url}>
                      <td>{data.url}</td>
                      <td>{data.short_url}</td>
                      <td>{data.slug}</td>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => deleteUrl(data.slug)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
