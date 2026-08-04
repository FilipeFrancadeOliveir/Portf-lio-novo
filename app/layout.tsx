import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filipe França | Tecnologia, Cloud & Dados",
  description: "Portfólio de Filipe França de Oliveira — profissional de desenvolvimento Full Stack, cloud, infraestrutura e dados em Brasília.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
