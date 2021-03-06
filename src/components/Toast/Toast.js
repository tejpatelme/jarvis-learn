import { useEffect } from "react";
import { useToast } from "../../context/toast-context";

export default function Toast({ toast }) {
  const { message, type } = toast;
  const { dispatch } = useToast();

  useEffect(() => {
    const { id, autoCloseInterval } = toast;
    const handle = setTimeout(
      () => dispatch({ type: "DELETE", payload: id }),
      autoCloseInterval ? autoCloseInterval : 4000
    );
    return () => clearTimeout(handle);
  }, [dispatch, toast]);
  return (
    <div className={`alert ${type.toLowerCase()}`}>
      {type === "SUCCESS" ? (
        <svg width="20px" height="20px" viewBox="0 0 36 36">
          <path
            className="clr-i-solid clr-i-solid-path-1"
            d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2zm10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2z"
          ></path>
        </svg>
      ) : (
        <svg width="20px" height="20px" viewBox="0 0 24 24">
          <path d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"></path>
        </svg>
      )}
      {message}
    </div>
  );
}
