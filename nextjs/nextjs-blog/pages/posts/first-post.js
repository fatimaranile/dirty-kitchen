import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

/** Layout */
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log("Script loaded correctly, window.FB has been populated")
        }
      />
      <h1>First Post</h1>
      <Image
        src="/images/profile.png"
        height={240}
        width={240}
        alt="Profile Picture"
      />
      <h2>
        <Link href="/">
          <a>Back home</a>
        </Link>
      </h2>
    </Layout>
  );
}