import { createContext, useState } from "react";
import { MiniDrawer } from "./components/mui";

export type tyDashContext = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DashContext = createContext<tyDashContext | null>(null);

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DashContext.Provider value={{ open, setOpen }}>
        <MiniDrawer />
      </DashContext.Provider>
    </>
  );
};

export default App;
