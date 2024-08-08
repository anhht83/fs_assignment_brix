import { useField } from "formik";
import { useState, useRef, useEffect } from 'react';

export interface IInput {
  label?: string,
  type?: string,
  placeholder?: string,
  name: string,
  onKeyPress: (event: any)=> void,
  className?: string,
  readOnly?: boolean,
}

const Input: React.FC<IInput> = ({ readOnly, className, label, type = "text", placeholder, onKeyPress, ...props }) => {
  const ref: any = useRef(null);
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  const [isReadOnly, setIsReadOnly] = useState<boolean>(readOnly || false)
  
  const handleClickOutSide = ()=>{
    if(readOnly) setIsReadOnly(true)
  }
  
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutSide();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);


  return (
    <label className="block w-full">
      {label && <span className={`mb-1 block text-sm font-medium ${isError ? "text-red-500" : "text-slate-700"}`}>{label}</span>}
      {isReadOnly ? (
          <div
            className={`block w-full rounded  ${className}`}
            onDoubleClick={()=> setIsReadOnly(false)}
          >
            {field.value}
          </div>
        ) : (
          <input
            ref={ref}
            {...field}
            type={type}
            className={`block w-full rounded  ${className}`}
            placeholder={placeholder}
            onKeyPress={onKeyPress}
          />
        )
      }
    </label>
  );
};

export default Input;
