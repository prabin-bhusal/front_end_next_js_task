"use client";

import ProductListCard from "@/components/product/ProductListCard";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // If no categories selected, only filter based on search term
      if (selectedCategories.length === 0) {
        return matchesSearch;
      } else {
        // Filter based on both search term and selected categories
        const matchesCategory = selectedCategories.some(
          (category) =>
            product.category.toLowerCase() === category.toLowerCase()
        );
        return matchesSearch && matchesCategory;
      }
    });
  }, [data, searchTerm, selectedCategories]);

  if (isLoading || !data) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="grow" variant="secondary" />
      </div>
    );
  }

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    let updatedCategories = [...selectedCategories];

    const index = updatedCategories.indexOf(category);

    if (index === -1) {
      updatedCategories = [...updatedCategories, category];
    } else {
      updatedCategories.splice(index, 1);
    }

    setSelectedCategories(updatedCategories);
  };

  const filters = (
    <div className="filters">
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="categories">
        <h6>Categories:</h6>
        {categories.map((category, index) => (
          <div key={index} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`category-${index}`}
              onChange={() => handleCategoryChange(category)}
            />
            <label className="form-check-label" htmlFor={`category-${index}`}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const productList = filteredData.map((product: Product) => (
    <ProductListCard key={product.id} product={product} />
  ));

  return (
    <>
      <Head>
        <title>Products | OnlineStore</title>
        <meta
          name="description"
          content="Browse our wide range of products at OnlineStore."
        />
        <meta name="author" content="Online Store" />
        <meta
          name="keywords"
          content="products, online store, shopping, ecommerce"
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Products | OnlineStore" />
        <meta
          property="og:description"
          content="Browse our wide range of products at OnlineStore."
        />
        <link rel="canonical" href={`https://yourwebsite.com/products`} />
        <meta
          property="og:image"
          content="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        />
        <meta
          property="og:url"
          content="https://front-end-next-js-task.vercel.app/products"
        />

        {/* Twitter */}
        <meta
          property="twitter:card"
          content="Buy clothes, electronics in onlinestore."
        />
        <meta property="twitter:title" content="Products | OnlineStore" />
        <meta
          property="twitter:description"
          content="Browse our wide range of products at OnlineStore."
        />
        <meta
          property="twitter:image"
          content="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        />

        {/* Structured Data - Product Listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: filteredData.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Product",
                  name: product.title,
                  description: product.description,
                  image: product.image,
                  url: `https://front-end-next-js-task.vercel.app//product/${product.id}`,
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "NPR",
                    price: product.price.toString(),
                  },
                },
              })),
            }),
          }}
        />
      </Head>
      <main
        className="products-section bg-white py-4 "
        style={{ minHeight: "100vh" }}
      >
        <Container>
          <Row>
            <div className="col-md-3 col-sm-12">{filters}</div>
            <div className="col-lg-9 col-12">{productList}</div>
          </Row>
        </Container>
      </main>
    </>
  );
}
