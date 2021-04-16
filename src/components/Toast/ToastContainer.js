import { useToast } from "../../context/toast-context";
import { Toast } from "../../components";
import "./Toast.css";

export default function ToastContainer() {
  const { state } = useToast();
  return (
    <div className="toast-container">
      {state.map((toast) => {
        return <Toast key={toast.id} toast={toast} />;
      })}
    </div>
  );
}
