"use client";

import ListProduct from "@/components/homepage/listProduct";
import Header from "../components/homepage/header";
import ProductCategory from "@/components/homepage/ProductCategory";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <Header />
      <ListProduct />
      {/* <ProductCategory /> */}
    </>
  );
}
