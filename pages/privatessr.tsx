import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { authServer } from "../lib/session";
import type { TIdTokenResult } from "../lib/authContext";
import React, { ReactNode } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await authServer(ctx);

  return { props: { user: user } };
};

const Home: NextPage = ({
  user,
}: {
  user?: TIdTokenResult;
  children?: ReactNode;
}) => {
  if (!user) return <h1>You need to login</h1>;

  return (
    <>
      <Head>
        <title>Private SSR</title>
      </Head>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  );
};

export default Home;
