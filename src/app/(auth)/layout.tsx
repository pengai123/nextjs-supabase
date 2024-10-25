import Header from "@/components/Header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
