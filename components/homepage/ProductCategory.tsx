"use client";
import { Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

export default function ProductCategory() {
  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="catproduct">
        <Container>
          <Row>
            <ProductCategory />
            <ProductCategory />
          </Row>
        </Container>
      </div>
    </>
  );
}
