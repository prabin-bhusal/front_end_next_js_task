"use client";

import { useCart } from "@/utils/CartContext";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import StarRatings from "react-star-ratings";

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

export default function Page({ params }: { params: { slug: string } }) {
  console.log("slug is", params.slug);
  const { data, isLoading } = useQuery<Product>({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${params.slug}`).then((res) =>
        res.json()
      ),
  });

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (isLoading || !data)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="grow" variant="secondary" />
      </div>
    );
  return (
    <>
      <Head>
        <title>{data.title} | OnlineStore</title>
        <meta name="description" content={data.description} />
        <meta name="author" content="OnlineStore" />
        <meta
          name="keywords"
          content={`${data.category}, ${data.title}, online store, shopping, ecommerce`}
        />
        <meta name="robots" content="index, follow" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link
          rel="canonical"
          href={`https://yourwebsite.com/product/${params.slug}`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: data.title,
              description: data.description,
              image: data.image,
              url: `https://yourwebsite.com/product/${params.slug}`,
              category: data.category,
              offers: {
                "@type": "Offer",
                priceCurrency: "NPR",
                price: data.price.toString(),
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: data.rating.rate.toString(),
                reviewCount: data.rating.count.toString(),
              },
            }),
          }}
        />
      </Head>

      <div className="product-container bg-white py-5">
        <Container>
          <Row className="py-4">
            <Col md={6}>
              <Image
                src={data.image?.toString()}
                alt="product image"
                height={400}
                width={300}
                layout="responsive"
                className="img-fluid"
                style={{
                  padding: "0 30px",
                  maxHeight: "500px",
                  width: "100%",
                }}
              />
            </Col>
            <Col md={6}>
              <article className="product-desc">
                <span className="btn btn-info py-2 my-2">{data.category}</span>
                <h1>{data.title}</h1>
                <p className="text-secondary py-2 lh-lg ">{data.description}</p>
                <div className="ratingAndPrice">
                  <div className="rating">
                    <StarRatings
                      rating={data.rating?.rate}
                      starDimension="18px"
                      starSpacing="1px"
                    />
                    <span>{data.rating?.count} Reviews</span>
                  </div>
                  <div className="priceCont">
                    <span className="price">Rs. {data.price?.toString()}</span>
                  </div>
                </div>
                <button
                  className="btn btn-outline-info btn-lg"
                  onClick={() => handleAddToCart(data)}
                >
                  Add To Cart
                </button>
              </article>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
