import type { Metadata } from "next";
import "./globals.css";
import TheNavbar from "@/components/TheNavbar";
import TheFooter from "@/components/TheFooter";
import I18nProvider from "@/components/i18nProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://lederboxed.vercel.app"),
  title: "lederboxed - Check your favorite movies and TV shows",
  description:
    "Discover and explore the world of movies and TV shows. Search, check the ratings, platforms, and get detailed information about your favorite titles.",
  keywords:
    "movies, tv shows, ratings, platforms, information, search, explore",
  authors: [{ name: "Felipe Bueno", url: "https://www.felipe-bueno.com/" }],
  creator: "Felipe Bueno",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "lederboxed - Check your favorite movies and TV shows",
    description:
      "Discover and explore the world of movies and TV shows. Search, check the ratings, platforms, and get detailed information about your favorite titles.",
    images: "/lederboxed-preview.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "lederboxed - Check your favorite movies and TV shows",
    description:
      "Discover and explore the world of movies and TV shows. Search, check the ratings, platforms, and get detailed information about your favorite titles.",
    images: ["https://lederboxed.vercel.app/lederboxed-preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <I18nProvider>
        <body>
          <TheNavbar />
          {children}
          <TheFooter />
        </body>
      </I18nProvider>
    </html>
  );
}
