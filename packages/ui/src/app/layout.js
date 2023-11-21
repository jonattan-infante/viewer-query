import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./providers";
import Header from "../components/header";
import UserProvider from "@/context/user";

export const metadata = {
  title: "Viewer Query",
  description: "Get information about your data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
