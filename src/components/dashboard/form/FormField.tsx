import React from 'react';

interface FormFieldProps {
  name: string;
  type?: string;
  value: string;
  valueSetter: (value: string) => void;
  valueError?: string;
  valueErrorSetter?: (valueError: string) => void;
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.name.toLowerCase()}
      >
        {props.name}
      </label>
      <input
        value={props.value}
        onChange={event => {
          props.valueSetter(event.target.value);
          if (props.valueErrorSetter) {
            props.valueErrorSetter('');
          }
        }}
        className={`shadow appearance-none border ${
          props.valueError ? 'border-red-500' : ''
        } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        id={props.name.toLowerCase()}
        type={props.type ?? 'text'}
        placeholder={props.name}
      />
      <p className="text-red-500 text-xs italic">{props.valueError}</p>
    </div>
  );
};

export default FormField;
