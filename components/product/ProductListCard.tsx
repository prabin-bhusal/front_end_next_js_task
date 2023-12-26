import { useCart } from "@/utils/CartContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

const ProductListCard = (props: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  return (
    <>
      <div className="row my-3 p-2 bg-white border rounded">
        <div className="col-md-3 mt-1">
          <Image
            height={100}
            width={100}
            className="img-fluid img-responsive rounded product-image"
            src={props.product?.image.toString()}
            alt="product"
          />
        </div>
        <div className="col-md-6 mt-1">
          <h5>{props.product?.title.toUpperCase()}</h5>
          <div className="d-flex flex-row align-items-center">
            <div className="ratings mr-2">
              <StarRatings
                rating={4.5}
                starDimension="18px"
                starSpacing="1px"
              />
            </div>
            <span>310</span>
          </div>

          <p
            className="text-justify para mb-0 py-1"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {props.product?.description}
          </p>
        </div>
        <div className="align-items-center align-content-center col-md-3 border-left mt-1">
          <div className="d-flex flex-row align-items-center">
            <h4 className="mr-1">Rs.{props.product?.price.toString()}</h4>
          </div>
          <h6 className="text-success">{props.product?.category}</h6>
          <div className="d-flex flex-column mt-4">
            <button className="btn btn-primary btn-sm" type="button">
              <Link
                href={`/product/${props.product?.id}`}
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Details
              </Link>
            </button>

            <button
              className="btn btn-outline-primary btn-sm mt-2"
              type="button"
              onClick={() => handleAddToCart(props.product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListCard;
