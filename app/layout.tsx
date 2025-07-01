import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Serif, Danfo } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from './ClientLayout'; 

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const danfoFont = Danfo({
  subsets: ['latin'],
  variable: '--font-danfo',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-noto-serif', 
  display: 'swap',
});

export const metadata: Metadata = {
   title: "Connect.Grow.Succeed | Triber",
  description:
    "Your ultimate platform to connect with like-minded professionals, grow your network, and succeed in your business endeavors.",
  generator: 'Triber',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>      
      <body className={`${notoSerif.className} ${inter.variable} ${danfoFont.variable} antialiased`}>        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >        
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}