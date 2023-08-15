import type { NextPage } from "next";
import Head from "next/head";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../lib/authContext";
import { useRouter } from "next/router";
import { addQueryParameters } from "../lib/utils";
import React from "react";
import { useSetUser, UserType } from "../lib/network/users";

const Home: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutateAsync } = useSetUser();
  const { user, loading } = useAuth();

  const { redirect, reffererMsg } = query;

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
        mutateAsync({
          user_id: user.uid,
          email: user?.email!,
          display_name: user?.displayName!,
          photoURL: user?.photoURL!,
          phoneNumber: user?.phoneNumber!,
          emailVerified: user?.emailVerified!,
          type: UserType.customer,
        });
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
      <div className="m-auto my-24 w-1/3 h-1/3 divide-y-4 space-y-1">
        {reffererMsg && <p>{reffererMsg}</p>}
        <div className="space-y-1">
          <label>Email</label>
          <br />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-current	"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-current	"
          />
          <br />
          <button className="bg-primary inline-flex items-center justify-center py-2 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => login()}>Login</button>
          <br />
          <br />
        </div>
        <div>
        <br />
          <button className="bg-secondary inline-flex items-center justify-center py-2 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => loginWithGoogle()}>Login with Google</button>
        </div>
      </div>
    </>
  );
};

export default Home;
