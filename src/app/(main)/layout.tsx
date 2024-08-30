import Header from "@/components/Header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
        <p className="p-8 text-center border-t">Footer</p>
      </div>
    </>
  );
}
