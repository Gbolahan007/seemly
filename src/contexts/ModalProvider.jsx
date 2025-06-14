import { createContext, useContext, useState } from "react";

const ModalContexts = createContext(null);

function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false); // Default: Hidden
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <ModalContexts.Provider
      value={{ showModal, setShowModal, isOpenModal, setIsOpenModal }}
    >
      {children}
    </ModalContexts.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContexts);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

export { ModalProvider, useModal };
