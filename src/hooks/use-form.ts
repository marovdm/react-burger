import { ChangeEvent, useState } from "react";

type TFieldValues = Record<string, any>;

export function useForm(inputValues: TFieldValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}