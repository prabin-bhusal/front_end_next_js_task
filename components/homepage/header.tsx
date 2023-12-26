import React from "react";

import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <>
      <div className="container hero-section">
        <div className="row vh-80 align-items-center">
          <div className="col-lg-6 col-sm-12">
            <span className="brand d-none d-md-block">OnlineStore</span>
            <h1>
              Order Your
              <span>
                <strong>favourite</strong> Products
              </span>
            </h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              provident expedita magnam veritatis minima sapiente sunt velit
              quasi placeat beatae?
            </p>
            <div className="hero-buttons py-4">
              <Link href="/products">
                <button className="pre-sign">Search Products</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="hero-img-container">
              <div className="hero-img himg1 d-none d-md-block"></div>
              <div className="hero-img himg2"></div>
              <div className="hero-img himg3 d-none d-md-block"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
