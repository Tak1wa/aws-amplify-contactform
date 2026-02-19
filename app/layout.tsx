import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "お問い合わせフォーム",
  description: "Contact form with AWS Amplify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
