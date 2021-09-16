import "./Profile.css";
import { useEffect, useState } from "react";
import { useToast } from "../../context/toast-context";
import { getUserDetails } from "../../services/api/users-requests";
import { Spinner } from "../../components";

export default function Profile() {
  const [getUserDetailsStatus, setGetUserDetailsStatus] = useState("idle");
  const { dispatch: toastDispatch } = useToast();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      setGetUserDetailsStatus("loading");
      const user = await getUserDetails(toastDispatch);
      setGetUserDetailsStatus("fulfilled");
      setCurrentUser(user);
    })();
  }, [toastDispatch]);

  if (getUserDetailsStatus === "loading") {
    return (
      <div
        style={{ width: "100%", height: "50vh" }}
        className="flex justify-between align-center"
      >
        <Spinner size="40" />
      </div>
    );
  }

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
