import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase/db";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({children}) {

    const [session, setSession] = useState({        
        user: null
    });

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setSession({user})
        });

        return () => unsub()
    },[]);

    return <UserContext.Provider value={session}>{children}</UserContext.Provider>;
}