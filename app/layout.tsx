"use client";

import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav_bar/navBar";
import { ToastContainer } from "@/components/toast";
import CantoWalletProvider from "@/provider/rainbowProvider";
import { ReactQueryClientProvider } from "@/provider/reactQueryProvider";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "./globals.scss";

const rm_mono = localFont({
  src: "../fonts/rm-mono-regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--rm-mono",
});

const proto_mono = localFont({
  src: "../fonts/proto-mono-regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--proto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </head> */}
      {/* <!-- Primary Meta Tags --> */}
      <title>Canto.io - Layer-1 Blockchain</title>
      <meta name="title" content="Canto.io - Layer-1 Blockchain" />
      <meta
        name="description"
        content="canto is a layer-1 blockchain built to deliver on the promise of defi. as a post-traditional financial movement, canto enables accessibility, transparency, and freedom for new systems. driven by a loosely organized collective of chain-native builders, canto provides a new commons powered by free public infrastructure_"
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://canto.io" />
      <meta property="og:title" content="Canto.io - Layer-1 Blockchain" />
      <meta
        property="og:description"
        content="canto is a layer-1 blockchain built to deliver on the promise of defi. as a post-traditional financial movement, canto enables accessibility, transparency, and freedom for new systems. driven by a loosely organized collective of chain-native builders, canto provides a new commons powered by free public infrastructure_"
      />
      <meta property="og:image" content="https://canto.io/meta.jpg" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://canto.io" />
      <meta property="twitter:title" content="Canto.io - Layer-1 Blockchain" />
      <meta
        property="twitter:description"
        content="canto is a layer-1 blockchain built to deliver on the promise of defi. as a post-traditional financial movement, canto enables accessibility, transparency, and freedom for new systems. driven by a loosely organized collective of chain-native builders, canto provides a new commons powered by free public infrastructure_"
      />
      <meta property="twitter:image" content="https://canto.io/meta.jpg" />

      <body
        className={"dark"}
        style={
          {
            "--rm-mono": rm_mono.style.fontFamily,
            "--proto-mono": proto_mono.style.fontFamily,
          } as React.CSSProperties
        }
      >
        <div id="toast-root"></div>
        <CantoWalletProvider>
          <ReactQueryClientProvider>
            <ToastContainer>
              <div className="body">
                {/* <InfoBar
                values={[
                  {
                    name: "contracts w/ CSR enabled:",
                    value: "$1,210.56",
                    change: "+2% $23.4",
                    isPositive: true,
                  },
                  {
                    name: "CANTO price:",
                    value: "$1,210.56",
                    change: "+22%",
                    isPositive: true,
                  },
                  {
                    name: "TVL:",
                    value: "$1,210.56",
                    change: "-1.2%",
                    isPositive: false,
                  },
                  {
                    name: "Market Cap:",
                    value: "$1,435,438.56",
                    change: "-34.2%",
                    isPositive: false,
                  },
                ]}
              /> */}
                <NavBar />

                {children}
                <div id="modal-root"></div>
                <Footer />
              </div>
            </ToastContainer>
          </ReactQueryClientProvider>
        </CantoWalletProvider>
        <Analytics />
      </body>
    </html>
  );
}
