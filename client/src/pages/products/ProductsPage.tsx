import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductGrid } from "../../components/products";
import { Outlet } from "react-router-dom";
import { DashContext, tyDashContext } from "../../App";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControlLabel, Radio } from "@mui/material";

export type tyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  discount: number;
  imageUrl: string;
};

const getValue = (value: string) =>
  typeof value === "string" ? value.toUpperCase() : value;

type tyFilter = {
  brand: string[];
};

function range(start, end) {
  start = parseInt(start);
  end = parseInt(end) + 1;
  return new Float32Array(end - start).fill().map((d, i) => i + start);
}

const minDistance = 10000;

const initialFilter = { brand: [], price: [], rating: [] };

function filterPlainArray(array: tyProduct[], filters: tyFilter) {
  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores an empty filter
      if (!filters[key].length) return true;
      return filters[key].find(
        (filter) => getValue(filter) === getValue(item[key])
      );
    });
  });
}

const ProductsPage = () => {
  const [priceMinMax, setPriceMinMax] = useState<number[]>([0, 0]);
  const [valueMinMax, setValueMinMax] = useState<number[]>([0, 0]);
  const [valueRating, setValueRating] = useState([]);

  const [avaliable, setAvaliable] = useState("avaliable");
  const [brands, setBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState<tyFilter>(initialFilter);
  const [checked, setChecked] = useState(filters.brand);
  const { products, setProducts } = useContext(DashContext) as tyDashContext;
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product")
      .then((res) => {
        // const min = Math.min.apply(
        //   null,
        //   res.data.map((ele) => +ele.price)
        // );
        console.log(res.data.map((ele) => +ele.price));
        console.log(res.data.map((ele) => ele.stock));
        const max = Math.max.apply(
          null,
          res.data.map((ele: tyProduct) => +ele.price)
        );
        setProducts(res.data);
        setPriceMinMax([0, max]);
        setValueMinMax([0, max]);
      })
      .catch((err) => console.error(err));
  }, [setProducts]);

  useEffect(() => {
    setBrands(
      products
        .map((ele: tyProduct) => ele.brand)
        .filter(
          (val: string, index: number, arr: string[]) =>
            arr.indexOf(val) === index
        )
    );
  }, [products]);

  useEffect(() => {
    setFilters({
      ...filters,
      brand: checked,
      rating: valueRating,
    });
  }, [checked, valueRating]);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked([...checked, e.target.name]);
    } else {
      setChecked(checked.splice(checked.indexOf(e.target.name), 1));
    }
  };

  const handleChangeAvaliable = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvaliable((event.target as HTMLInputElement).value);
  };

  const handleResetFilter = () => {
    setFilters({ brand: [] });
    setChecked([]);
  };

  const handleChange2 = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], priceMinMax[1] - minDistance);
        setValueMinMax([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValueMinMax([clamped - minDistance, clamped]);
      }
    } else {
      setValueMinMax(newValue as number[]);
    }
  };

  return (
    <div className='h-screen'>
      <Outlet />
      <div className='container flex items-start gap-8 h-full'>
        <aside className=' h-full'>
          <div className='filtersTop pb-8 mb-2 border-b-2'>
            <h2 className='capitalize font-semibold'>filter</h2>
            <div className='filtesSelected'>
              {checked.length > 0 && (
                <div className='mt-2'>
                  <h3 className='capitalize text-sm font-semibold '>brand</h3>
                  {checked.map((brand, index) => (
                    <div
                      className=' inline-flex gap-1 ml-1'
                      style={{ fontSize: "8px" }}
                      key={index}
                    >
                      <span className=' text-gray-400'>{brand}</span>
                      <button
                        name={brand}
                        onClick={(e) =>
                          setFilters({
                            ...filters,
                            brand: checked.filter(
                              (ele) => ele !== e.target?.name
                            ),
                          })
                        }
                        className='text-gray-400 hover:text-black hover:scale-105'
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {checked.length > 0 && (
                <div
                  onClick={handleResetFilter}
                  className='capitalize text-sm text-red-500  hover:text-red-600 cursor-pointer mt-2'
                >
                  reset filter
                </div>
              )}
            </div>
          </div>
          <div className='filtersBottom flex flex-col gap-12'>
            <div className='brand '>
              <h2 className='font-semibold mb-2'>Brand</h2>
              <div className='checkboxs '>
                {brands.map((brand, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <input
                      type='checkbox'
                      name={brand}
                      id={brand}
                      onChange={handleCheckBox}
                      checked={checked.includes(brand)}
                    />
                    <label className='capitalize' htmlFor={brand}>
                      {brand}
                    </label>
                  </div>
                ))}
                {/* <div className='flex items-center gap-4'>
                  <input type='checkbox' name='samsung' id='samsung' />
                  <label className='capitalize' htmlFor='samsung'>
                    samsung
                  </label>
                </div> */}
              </div>
            </div>
            <div className='price'>
              <h2 className='font-semibold mb-2'>price</h2>
              <div className='inputs flex flex-col gap-2'>
                <div className='min flex gap-2 flex-col'>
                  <label className='capitalize text-gray-500' htmlFor='min'>
                    min
                  </label>
                  <TextField
                    id='min'
                    value={valueMinMax[0]}
                    onChange={() => {}}
                    inputProps={{ readOnly: true }}
                    size='small'
                  />
                </div>
                <div className='max flex gap-2 flex-col'>
                  <label className='capitalize text-gray-500' htmlFor='max'>
                    max
                  </label>
                  <TextField
                    id='max'
                    value={valueMinMax[1]}
                    onChange={() => {}}
                    inputProps={{ readOnly: true }}
                    size='small'
                  />
                </div>
                <div className='slider'>
                  <Slider
                    value={valueMinMax}
                    onChange={handleChange2}
                    valueLabelDisplay='auto'
                    disableSwap
                    min={priceMinMax[0]}
                    max={priceMinMax[1]}
                    step={1000}
                  />
                </div>
              </div>
            </div>
            <div className='avaliable'>
              <h2 className='font-semibold mb-2'>avaliable</h2>
              <FormControl component='fieldset'>
                <FormLabel component='legend'></FormLabel>
                <RadioGroup
                  aria-label=''
                  name=''
                  value={avaliable}
                  onChange={handleChangeAvaliable}
                >
                  <FormControlLabel
                    value={"avaliable"}
                    control={<Radio />}
                    label='avaliable'
                  />
                  <FormControlLabel
                    value={"not-avaliable"}
                    control={<Radio />}
                    label='not-avaliable'
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className='rating'>
              <h2>rating {valueRating} </h2>
              <Rating
                name='simple-controlled'
                value={valueRating}
                onChange={(_event, newValue) => {
                  setValueRating([newValue]);
                }}
              />
            </div>
          </div>
        </aside>
        {filterPlainArray(products, filters).length > 0 ? (
          <div>
            <ProductGrid products={filterPlainArray(products, filters)} />
          </div>
        ) : (
          <div> no products</div>
        )}
      </div>
    </div>
  );
};

ProductsPage.propTypes = {};

export default ProductsPage;
