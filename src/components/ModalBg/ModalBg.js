export default function ModalBg({ children, setShowModal }) {
  return (
    <>
      <div onClick={() => setShowModal(false)} className="modal-bg">
        {children}
      </div>
    </>
  );
}
