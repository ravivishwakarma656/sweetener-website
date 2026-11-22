import type { Metadata } from "next";
import "@fontsource/pacifico";
import "@fontsource-variable/fredoka";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/nunito";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweetzy Natura — Monk Fruit Sweetener | Nature's Sweetness, Without Sugar",
  description:
    "Sweetzy Natura Monk Fruit Sweetener: made from monk fruit extract. 100% natural, zero sugar, calorie free and plant based.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
