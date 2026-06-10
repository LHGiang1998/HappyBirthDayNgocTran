import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chúc Mừng Sinh Nhật Ngọc Trân ❤️ My Love",
  description: "Không gian kỉ niệm tình yêu và lời chúc mừng sinh nhật ngọt ngào gửi tới Ngọc Trân.",
  authors: [{ name: "Lâm Hoàng Giang" }],
  openGraph: {
    title: "Chúc Mừng Sinh Nhật Ngọc Trân ❤️",
    description: "Không gian kỉ niệm tình yêu ngọt ngào dành riêng cho Ngọc Trân.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}
