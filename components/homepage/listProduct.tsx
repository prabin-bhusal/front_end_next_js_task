"use client";

import React, { useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import ProductCard from "./productCard";
import { useQuery } from "react-query";

interface Product {
  id: Number;
  title: String;
  price: Number;
  description: String;
  category: String;
  image: String;
  rating: Object;
}

export default function ListProduct() {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });
  console.log(data);

  if (isLoading || !data)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="grow" variant="secondary" />
      </div>
    );

  return (
    <>
      <div className="product-section">
        <Container>
          <div className="container-section text-center">
            <h2>Buy Your Favourite One</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              labore!
            </p>
          </div>

          <Row>
            <ProductCard product={data[0]} />
            <ProductCard product={data[1]} />
            <ProductCard product={data[2]} />
            <ProductCard product={data[3]} />
            <ProductCard product={data[4]} />
            <ProductCard product={data[5]} />
          </Row>
          <div className="my-4 d-flex justify-content-center">
            <button className="btn btn-danger">View More</button>
          </div>
        </Container>
      </div>
    </>
  );
}
