import "./urlTable.css";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useGetAllGeneratedUrls } from "../../queries/useGetAllGeneratedUrls";
import { UrlShortenerFormData } from "../../mutations/useCreateShortenedUrl";

export function UrlTable() {
  const getAllGeneratedUrlsQuery = useGetAllGeneratedUrls(
    process.env.REACT_APP_API_KEY ?? ""
  );

  function handleUrlDelete(url: string) {
    console.log("delete click for url", url);
  }

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
                (data: UrlShortenerFormData) => {
                  return (
                    <tr>
                      <td>{data.url}</td>
                      <td>{data.short_url}</td>
                      <td>{data.slug ?? ""}</td>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => handleUrlDelete(data.short_url)}
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
