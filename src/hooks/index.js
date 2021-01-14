import { useEffect, useState } from "react";
import { auth, createUserProfileDocument } from "../utilities/firebase";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          console.log(snapshot.data());

          setCurrentUser({
            currentUser: { uid: snapshot.id, ...snapshot.data() },
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, setCurrentUser };
};
