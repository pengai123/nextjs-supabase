import Header from "@/components/Header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen [&>main]:flex-1">
      <Header />
      {children}
    </div>
  );
}
