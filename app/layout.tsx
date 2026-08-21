import type { Metadata } from "next";
import "./globals.css";
import "./upgrade.css";

export const metadata: Metadata = {
  title: "Filipe França | Tecnologia, Cloud & Dados",
  description: "Portfólio de Filipe França de Oliveira — profissional de desenvolvimento Full Stack, cloud, infraestrutura e dados em Brasília.",
  icons: {
    icon: "/favicon.svg",
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
