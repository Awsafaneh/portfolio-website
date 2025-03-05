import { DefaultSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Mustafa Eftekin - AI & Full-Stack Developer"
        description="AI & Full-Stack Developer with a passion for machine learning, data science, and building innovative projects."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://eftekin.com",
          site_name: "Mustafa Eftekin Portfolio",
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
