import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDa5QyoPFwUz6X6U2znLg88tBWDenn3KTs&libraries=places`}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
