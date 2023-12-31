"use client";

import ListProduct from "@/components/homepage/listProduct";
import Header from "../components/homepage/header";
import ProductCategory from "@/components/homepage/ProductCategory";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>OnlineStore - Home</title>
        <meta
          name="description"
          content="Welcome to OnlineStore - your ultimate destination for shopping."
        />
        <meta name="author" content="OnlineStore" />
        <meta
          name="keywords"
          content="online store, shopping, ecommerce, home products"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://front-end-next-js-task.vercel.app/"
        />
      </Head>

      <Header />
      <ListProduct />
      {/* <ProductCategory /> */}
    </>
  );
}
