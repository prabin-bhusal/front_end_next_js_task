import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <Container className="mt-auto">
        <footer className="py-5  ">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <Link href="/" className="nav-link fs-5 text-muted">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link fs-5 text-muted">
                Prodcuts
              </Link>
            </li>
          </ul>
          <p className="text-center text-muted">© 2023 onlinestore</p>
        </footer>
      </Container>
    </>
  );
}
