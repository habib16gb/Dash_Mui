export interface tyInput {
  id: string;
  label: string;
  name: string;
}

const inputsUser: tyInput[] = [
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

export default inputsUser;
