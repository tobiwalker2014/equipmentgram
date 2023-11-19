"use client";

import CustomLoader from "@/components/Loader";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebaseConfig/init";
import { UserType, UsersCollection, useSetUser } from "@/lib/network/users";
import { doc, getDoc } from "@firebase/firestore";
import { Button, Divider, TextInput } from "@mantine/core";
import {
  GoogleAuthProvider,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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

  if (loading) return <CustomLoader />;

  if (user) {
    router.push("/");
    return null;
  }

  const auth = getAuth();

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("success", user);
        console.log("redirect", redirect);
        router.push("/");
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
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("sign with google", user);
        console.log("redirect", redirect);

        const docRef = doc(db, UsersCollection, user.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot) {
          console.log("user exists");
        } else {
          mutateAsync({
            user_id: user.uid,
            email: user?.email!,
            display_name: user?.displayName!,
            photoURL: user?.photoURL!,
            phoneNumber: user?.phoneNumber!,
            emailVerified: user?.emailVerified!,
            type: UserType.customer,
          });
        }

        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser!).then(() => {
            console.log("email sent");
          });
        }

        router.push("/");
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
