import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, loading] = useAuthState(auth);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading: loading || !authChecked,
    isAuthenticated: !!user,
  };
}
