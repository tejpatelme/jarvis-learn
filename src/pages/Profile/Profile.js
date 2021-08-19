import "./Profile.css";
import { useEffect, useState } from "react";
import { useToast } from "../../context/toast-context";
import { getUserDetails } from "../../services/api/users-requests";

export default function Profile() {
  const { dispatch: toastDispatch } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  useEffect(() => {
    (async () => {
      const user = await getUserDetails(toastDispatch);
      console.log(user);
      setCurrentUser(user);
    })();
  }, [toastDispatch]);
  return (
    <>
      {currentUser && (
        <div className="profile-container">
          <span className="label">Name</span>
          <div className="details-display">{currentUser.name}</div>

          <span className="label">Email</span>
          <div className="details-display">{currentUser.email}</div>
        </div>
      )}
    </>
  );
}
