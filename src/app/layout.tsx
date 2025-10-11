import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-mono p-8 md:text-3xl lg:text-4xl"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
