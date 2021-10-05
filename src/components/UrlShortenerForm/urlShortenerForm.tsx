import "./urlShortenerForm.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  UrlShortenerFormData,
  useCreateShortenedUrl,
} from "../../mutations/useCreateShortenedUrl";
import { Toast } from "react-bootstrap";
import { useQueryClient } from "react-query";

export function UrlShortenerForm() {
  const [validated, setValidated] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [formData, setFormData] = useState<UrlShortenerFormData>({
    url: "",
    short_url: "",
    slug: undefined,
  });
  const {
    mutate: createShortenedUrl,
    isSuccess: createShortenedUrlSuccess,
    isError: createShortenedUrlError,
  } = useCreateShortenedUrl(process.env.REACT_APP_API_KEY ?? "");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (createShortenedUrlSuccess) {
      queryClient.invalidateQueries("getAllGeneratedUrls");
    }
  }, [createShortenedUrlSuccess]);

  useEffect(() => {
    setShowErrorToast(true);
  }, [createShortenedUrlError]);

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      createShortenedUrl(formData);
    }
    setValidated(true);
  };

  return (
    <Card>
      <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)}>
        <Toast.Header>
          <strong className="me-auto ErrorText">
            Error Creating Short Url
          </strong>
        </Toast.Header>
        <Toast.Body>Error encountered</Toast.Body>
      </Toast>
      <Card.Title className="ShortenUrlTitle">Shorten Your URL</Card.Title>
      <Card.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Long URL</Form.Label>
            <Form.Control
              data-testid="LongUrlInput"
              required
              type="text"
              placeholder="Long URL"
              onChange={(event) =>
                setFormData({ ...formData, url: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Short URL</Form.Label>
            <Form.Control
              data-testid="ShortUrlInput"
              required
              type="text"
              placeholder="Short URL"
              onChange={(event) =>
                setFormData({ ...formData, short_url: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              data-testid="SlugInput"
              type="text"
              placeholder="Slug (optional)"
              onChange={(event) =>
                setFormData({ ...formData, slug: event.target.value })
              }
            />
          </Form.Group>
          <div className="d-grid">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
