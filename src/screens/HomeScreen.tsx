import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./HomeScreen.css";
import Col from "react-bootstrap/Col";
import { UrlShortenerForm } from "../components/UrlShortenerForm/urlShortnerForm";
import { UrlTable } from "../components/UrlTable/urlTable";

export function HomeScreen() {
  return (
    <Container className="HomeScreenContainer">
      <Row>
        <Col md={{ span: 3 }}>
          <UrlShortenerForm />
        </Col>
        <Col md={{ span: 9 }}>
          <UrlTable />
        </Col>
      </Row>
    </Container>
  );
}
