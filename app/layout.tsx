import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

import TopNav from "../components/topnav/topnav";
import Footer from "@/components/homepage/Footer";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { CartProvider } from "@/utils/CartContext";

export const metadata = {
  title: "Online Store",
  description: "Your next shopping mall",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <CartProvider>
        <html lang="en" style={{ height: "100%" }}>
          <body
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <TopNav />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ReactQueryProvider>
  );
}
