import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

// Use environment-aware base URL
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hotlinkstudio.com'
  : 'http://localhost:3000';

export const metadata = {
  title: "Hotlink Studio - Connect you to the web, one hotlink at a time.",
  description: "Connect you to the web, one hotlink at a time.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Hotlink Studio - Connect you to the web, one hotlink at a time.',
    description: 'Connect you to the web, one hotlink at a time.',
    siteName: 'Hotlink Studio',
    images: [
      {
        url: '/logo2.png',
        width: 180,
        height: 74,
        alt: 'Hotlink Studio',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html >
  );
}
