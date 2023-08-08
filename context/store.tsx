"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  userId: boolean;
  setUserId: Dispatch<SetStateAction<boolean>>;
  showBtls: boolean;
  setShowBtls: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: true,
  setUserId: (): boolean => {
    return true;
  },
  showBtls: false,
  setShowBtls: (): boolean => {
    return true;
  },
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userId, setUserId] = useState(false);
  const [showBtls, setShowBtls] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ userId, setUserId, showBtls, setShowBtls }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
