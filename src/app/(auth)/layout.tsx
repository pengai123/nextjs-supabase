// import { Inter } from "next/font/google";
// import "@/app/globals.css";
// import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth",
  description: "Authentication page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
