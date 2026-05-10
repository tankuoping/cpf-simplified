import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CPF Simplified — Singapore's CPF Explained Clearly",
  description:
    "Understand Singapore's CPF system — contributions, accounts, retirement sums, CPF LIFE, and more. With an AI assistant to answer your CPF questions.",
  keywords: "CPF, Singapore, retirement, CPF LIFE, BRS, FRS, ERS, MediSave, Ordinary Account, Special Account",
  openGraph: {
    title: "CPF Simplified",
    description: "Singapore's CPF explained clearly, with an AI assistant.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
