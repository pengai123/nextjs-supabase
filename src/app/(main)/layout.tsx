import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen [&>main]:min-h-[calc(100vh-74px)]">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
