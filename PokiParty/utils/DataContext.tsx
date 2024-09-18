import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';

/**
 * A React Context that makes the session information available to the entire app.
 */
const AuthContext = createContext<{
  signIn: (idToken: string, email: string) => void;
  signOut: () => void;
  session?: string | null;
  email?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  email: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

/**
 * @returns A wrapper that adds functionality to the context.
 */
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[isLoading2, email], setEmail] = useStorageState('email');

  return (
    <AuthContext.Provider
      value={{
        signIn: (idToken: string, email: string) => {
          // Perform sign-in logic here
          setSession(idToken);
          setEmail(email)
        },
        signOut: () => {
          setSession(null);
          setEmail(null)
        },
        session,
        email,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
