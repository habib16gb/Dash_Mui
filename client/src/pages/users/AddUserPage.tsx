import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { DashContext, tyDashContext } from "../../App";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { inputsFields, setInputs, inputs } = useContext(
    DashContext
  ) as tyDashContext;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/users", inputs)
      .then((res) => {
        console.log(res.data);
        navigate("/users");
      })
      .catch((err) => console.error(err.response.data.message));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setInputs({ ...inputs, [name]: event.target.value });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex items-center flex-col gap-3 shadow-lg w-2/3 px-8 py-4 mx-auto my-4'
      >
        {inputsFields.map(({ id, label, name }, index) =>
          name === "birthDate" ? (
            <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{ width: "100%" }}
                components={["DateField", "DateField"]}
              >
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  label='Date of Birth'
                  className='w-full'
                  name={name}
                  onChange={(date) =>
                    setInputs({ ...inputs, [name]: date?.toISOString() })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          ) : (
            <TextField
              key={index}
              id={id}
              label={label}
              name={name}
              onChange={(e) => handleChange(e, name)}
              size='small'
              className='w-full'
              value={inputs[name]}
            />
          )
        )}

        <Button
          type='submit'
          className='w-full'
          variant='contained'
          color='primary'
        >
          add user
        </Button>
      </form>
    </div>
  );
};

export default AddUserPage;
