import CustomLoader from "@/components/CustomLoader";
import { MantineProvider } from "@mantine/core";
import { Auth, User, getAuth, onAuthStateChanged, signInWithCustomToken, signOut as signout } from "firebase/auth";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import firebaseApp from "./firebaseConfig/init";

const auth: Auth = getAuth(firebaseApp);
interface AuthContextProps {
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
});

export const useAuth = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const cookies = parseCookies();
      if (!cookies.idToken) {
        setUser(null);
        navigation.push(process.env.NEXT_PUBLIC_REDIRECT_URL as string);
      }

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    const auth = getAuth(firebaseApp);

    // Check for user authentication on page load
    const checkUserAuth = async () => {
      const response = await fetch("/api/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.idToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const signInResponse = await signInWithCustomToken(auth, data.token);
        setUser(signInResponse.user);
      } else {
        console.error("Error:", response.statusText);
        navigation.push(process.env.NEXT_PUBLIC_REDIRECT_URL as string);
      }
    };

    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <MantineProvider>
          <CustomLoader />
        </MantineProvider>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const signOut = async () => {
  const auth = getAuth();
  destroyCookie(null, "idToken");
  await signout(auth);
};
