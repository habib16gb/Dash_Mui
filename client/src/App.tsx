import { createContext, useState } from "react";
import { MiniDrawer } from "./components/mui";
import { tyProduct } from "./pages/products/ProductsPage";

export interface tyInput {
  id: string;
  label: string;
  name: string;
}

const inputsFields: tyInput[] = [
  {
    id: "first_name",
    label: "First Name",
    name: "first_name",
  },
  {
    id: "last_name",
    label: "Last Name",
    name: "last_name",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
  },
  {
    id: "address",
    label: "Address",
    name: "address",
  },
  {
    id: "phone",
    label: "Phone Number",
    name: "phone",
  },
  {
    id: "birthDate",
    label: "Date of Birth",
    name: "birthDate",
  },
];

export type tyDashContext = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: never[];
  setUsers: React.Dispatch<React.SetStateAction<never[]>>;
  inputsFields: tyInput[];
  setInputs: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>;
  emptyInputs: unknown;
  inputs: object;
  keys: string[];
  products: tyProduct[];
  setProducts: React.Dispatch<React.SetStateAction<never[]>>;
};

export const DashContext = createContext<tyDashContext | null>(null);

const App = () => {
  const keys = inputsFields.map(({ name }) => name);
  const emptyInputs = keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState(emptyInputs);
  const [products, setProducts] = useState([]);
  return (
    <>
      <DashContext.Provider
        value={{
          open,
          setOpen,
          users,
          setUsers,
          inputsFields,
          inputs,
          setInputs,
          emptyInputs,
          keys,
          products,
          setProducts,
        }}
      >
        <MiniDrawer />
      </DashContext.Provider>
    </>
  );
};

export default App;
