import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="stock-market-icon.ico" sizes="any" />
      <body
        className="font-mono p-8 lg:text-2xl xl:text-3xl"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
