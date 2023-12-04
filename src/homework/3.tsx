import { ChangeEvent, FC, ReactElement, useState } from 'react';

export const FormComponent: FC = (): ReactElement => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <input type="text" value={value} onChange={handleChange} />
  );
}
