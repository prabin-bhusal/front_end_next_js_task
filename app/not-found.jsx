import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Online Store</title>
        <meta
          name="description"
          content="Sorry, the page you're looking for does not exist."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        className="d-flex justify-content-center flex-column"
        style={{ height: "60vh", width: "100vw", alignItems: "center" }}
      >
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </>
  );
}
