import "./urlShortenerForm.css";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCreateShortenedUrl } from "../../mutations/useCreateShortenedUrl";

export function UrlShortenerForm() {
  const [validated, setValidated] = useState(false);
  const {
    mutate: createShortenedUrl,
    isSuccess: createShortenedUrlSuccess,
    isError: createShortenedUrlError,
  } = useCreateShortenedUrl(process.env.REACT_APP_API_KEY ?? "");
  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Card>
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Short URL</Form.Label>
            <Form.Control
              data-testid="ShortUrlInput"
              required
              type="text"
              placeholder="Short URL"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              data-testid="SlugInput"
              type="text"
              placeholder="Slug (optional)"
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
