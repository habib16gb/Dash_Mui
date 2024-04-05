import { TextField } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DashContext, tyDashContext } from "../../App";

interface inFormInput {
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  discount: number;
  imageUrl: string;
}

type tyInputs = {
  id:
    | "price"
    | "stock"
    | "brand"
    | "discount"
    | "imageUrl"
    | "description"
    | "title"
    | "rating";
  label: string;
  type: string;
  width: number;
  required: boolean;
};

const inputs: tyInputs[] = [
  {
    id: "price",
    label: "Price",
    type: "number",
    width: 100,
    required: true,
  },
  {
    id: "stock",
    label: "Stock",
    type: "number",
    width: 100,
    required: true,
  },
  {
    id: "brand",
    label: "Brand",
    type: "string",
    width: 100,
    required: true,
  },
  {
    id: "discount",
    label: "Discount",
    type: "number",
    width: 100,
    required: true,
  },
  {
    id: "imageUrl",
    label: "Image Url",
    type: "string",
    width: 180,
    required: false,
  },
  {
    id: "description",
    label: "description",
    type: "string",
    width: 260,
    required: true,
  },
];

const AddProductPage = () => {
  const { products, setProducts } = useContext(DashContext) as tyDashContext;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inFormInput>();
  const onSubmit: SubmitHandler<inFormInput> = (data) => {
    axios
      .post("http://localhost:3000/api/product", data)
      .then((res) => {
        console.log(data);
        setProducts([...products, res.data]);
        navigate("/products");
      })
      .catch((err) => console.error(err))
      .finally(() => console.log(data));
  };

  return (
    <form
      className='shadow-lg my-2 p-2 rounded-md flex items-center gap-4 flex-wrap'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("title", {
          required: true,
        })}
        error={errors.title !== undefined}
        size='small'
        id='title'
        label='Title'
        variant='outlined'
        type='text'
        style={{ width: 150 }}
      />
      <p className='text-red-500'>{errors.title?.message}</p>
      {inputs.map(({ width, id, label, type, required }, index) => (
        <div key={index}>
          <TextField
            error={errors[id] !== undefined}
            {...register(id, { required, valueAsNumber: type == "number" })}
            size='small'
            style={{ width }}
            label={label}
            variant='outlined'
            type={type}
            id={id}
          />
          <p className='text-red-500'>{errors[id]?.message}</p>
        </div>
      ))}
      <TextField
        {...register("rating", {
          required: true,
          min: 1,
          max: 5,
          valueAsNumber: true,
        })}
        style={{ width: 100 }}
        error={errors.rating !== undefined}
        size='small'
        id='rating'
        label='Rating'
        variant='outlined'
        type='number'
        InputProps={{
          inputProps: {
            max: 5,
            min: 1,
          },
        }}
      />
      <p className='text-red-500'>{errors.rating?.message}</p>
      <button
        type='submit'
        className='uppercase bg-green-500 text-sm text-white px-4 py-2 rounded-md font-semibold'
      >
        add
      </button>
    </form>
  );
};

export default AddProductPage;
