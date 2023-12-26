"use client";

import { useCart } from "@/utils/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function TopNav() {
  const { cart, viewFromCart, removeFromCart } = useCart();
  const totalItems = cart.length;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };
  return (
    <Navbar
      expand="lg"
      className="bg-white py-4 custom-nav-border"
      variant="light"
      justify="end"
    >
      <Container>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand className="brand-logo">OnlineStore</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav justify-content-end"
          className="custom-collapse"
        >
          <Nav className="ms-auto">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Nav.Link href="/" className="nav-link-custom">
                Home
              </Nav.Link>
            </Link>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Nav.Link href="/" className="nav-link-custom">
                View Products
              </Nav.Link>
            </Link>

            <button className="nav-btn" onClick={handleShow}>
              Cart <sup>[{totalItems}]</sup>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Image
                      height={50}
                      width={50}
                      src={item.image}
                      alt={item.title}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>Rs.{item.price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td colSpan={2} className="total-price">
                  Rs. {totalPrice}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default TopNav;
