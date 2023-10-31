"use client";

import type { NextPage } from "next";
import Head from "next/head";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import React from "react";
import { UserType, useSetUser } from "@/lib/network/users";
import { useAuth } from "@/lib/authContext";
import { addQueryParameters } from "@/lib/utils";
import { Button, Divider, Input, TextInput } from "@mantine/core";

const Home: NextPage = () => {
  const router = useRouter();
  const params = useParams();
  const { query } = params;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutateAsync } = useSetUser();
  const { user, loading } = useAuth();

  //   const { redirect, reffererMsg } = query as any;
  const redirect = query;
  const reffererMsg = query;

  if (loading) return null;

  if (user) return <h1>Authenticated</h1>;

  const auth = getAuth();

  function doRedirect() {
    if (redirect) {
      router.push(
        addQueryParameters(redirect as string, {
          fromSignin: "true",
        })
      );
    }
  }

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("success", user);
        console.log("redirect", redirect);
        // mutateAsync({
        //   user_id: user.uid,
        //   email: user?.email!,
        //   display_name: user?.displayName!,
        //   photoURL: user?.photoURL!,
        //   phoneNumber: user?.phoneNumber!,
        //   emailVerified: user?.emailVerified!,
        //   type: UserType.customer,
        // });
        doRedirect();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorMessage);
        window.alert(errorMessage);
      });
  }

  function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("sign with google", user);
        console.log("redirect", redirect);
        mutateAsync({
          user_id: user.uid,
          email: user?.email!,
          display_name: user?.displayName!,
          photoURL: user?.photoURL!,
          phoneNumber: user?.phoneNumber!,
          emailVerified: user?.emailVerified!,
          type: UserType.customer,
        });

        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser!).then(() => {
            console.log("email sent");
          });
        }

        doRedirect();
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-xs mx-auto md:my-20 my-10">
        {reffererMsg && <p>{reffererMsg}</p>}
        <div className="space-y-4">
          <TextInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <TextInput label="Passowrd" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth onClick={() => login()}>
            Login
          </Button>

          <Divider />

          <Button fullWidth onClick={() => loginWithGoogle()}>
            Login with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
