import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoadingContainer({ children, loading }) {
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <Loader type="TailSpin" color="#9CA3AF" height={60} width={60} />
        </div>
      ) : (
        children
      )}
    </>
  );
}
