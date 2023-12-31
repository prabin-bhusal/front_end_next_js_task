import { useCart } from "@/utils/CartContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const ProductCard = (props: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  return (
    <div className="col-md-4 mt-4">
      <div className="card h-100">
        <div className="card-body">
          <div className="card-img-actions product-card">
            <Image
              src={props.product?.image.toString()}
              className="card-img img-fluid"
              height={200}
              width={200}
              alt="product"
            />
          </div>
        </div>

        <div className="card-body bg-light text-center">
          <div className="mb-2">
            <p className="font-weight-semibold mb-2">
              <a href="#" className="text-default mb-2" data-abc="true">
                {props.product?.title}
              </a>
            </p>

            <a href="#" className="text-muted" data-abc="true">
              {props.product?.category}
            </a>
          </div>

          <h3 className="">Rs.{props.product?.price.toString()}</h3>

          {/* <div className="text-muted mb-3">
            {props.product.rating.count}
          </div> */}

          <div className="d-flex justify-content-center gap-3">
            <Link href={`/product/${props.product?.id}`}>
              <button type="button" className="btn btn-info bg-cart">
                Details
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-warning bg-cart"
              onClick={() => handleAddToCart(props.product)}
            >
              Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
