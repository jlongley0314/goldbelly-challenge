import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function HomeScreen() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 3 }}>URL Shortener Form</Col>
        <Col md={{ span: 9 }}>Shortened URL table</Col>
      </Row>
    </Container>
  );
}
