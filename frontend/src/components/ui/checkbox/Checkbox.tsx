import React, { useContext, useCallback, useState } from "react";
import CheckboxGroupContext from "./context";

const Checkbox = React.forwardRef((props: any, ref) => {
  const {
    name: nameContext,
    value: groupValue,
    onChange: onGroupChange,
    color: colorContext
  } = useContext<any>(CheckboxGroupContext);

  const {
    color,
    className,
    onChange,
    children,
    disabled,
    readOnly,
    name = nameContext,
    defaultChecked,
    value,
    checked: controlledChecked,
    labelRef,
    field,
    ...rest
  } = props;

  const isChecked = useCallback(() => {
    if (typeof groupValue !== "undefined" && typeof value !== "undefined") {
      return groupValue.some((i: any) => i === value);
    }
    return controlledChecked || defaultChecked;
  }, [controlledChecked, groupValue, value, defaultChecked]);

  const [checkboxChecked, setCheckboxChecked] = useState(isChecked());

  const getControlProps = () => {
    let checkedValue = checkboxChecked;

    let groupChecked: any = { checked: checkedValue };
    let singleChecked: any = { value: checkedValue };

    if (controlledChecked !== "undefined") {
      singleChecked.checked = controlledChecked;
    }

    if (field) {
      checkedValue =
        typeof field.value === "boolean" ? field.value : defaultChecked;
      singleChecked = { value: checkedValue, checked: checkedValue };
    }

    if (typeof groupValue !== "undefined") {
      groupChecked = { checked: groupValue.includes(value) };
    }

    if (defaultChecked) {
      singleChecked.defaultChecked = defaultChecked;
    }
    return typeof groupValue !== "undefined" ? groupChecked : singleChecked;
  };

  const controlProps = getControlProps();

  const onCheckboxChange = useCallback(
    (e: any) => {
      let nextChecked = !checkboxChecked;

      if (typeof groupValue !== "undefined") {
        nextChecked = !groupValue.includes(value);
      }

      if (disabled || readOnly) {
        return;
      }

      setCheckboxChecked(nextChecked);
      onChange?.(nextChecked, e);
      onGroupChange?.(value, nextChecked, e);
    },
    [
      checkboxChecked,
      disabled,
      readOnly,
      setCheckboxChecked,
      onChange,
      value,
      onGroupChange,
      groupValue
    ]
  );

  const checkboxColor =
    color || colorContext || `blue-500`;

  const checkboxDefaultClass = `checkbox border-gray-300 rounded shadow text-${checkboxColor} h-[20px] w-[20px]`;
  const checkboxColorClass = disabled && "disabled";
  const labelDefaultClass = `checkbox-label`;
  const labelDisabledClass = disabled && "disabled";

  const checkBoxClass = `${checkboxDefaultClass} ${checkboxColorClass}`;

  const labelClass = `${labelDefaultClass} ${labelDisabledClass} ${className}`;

  return (
    <label ref={labelRef} className={labelClass}>
      <input
        ref={ref}
        className={checkBoxClass}
        type="checkbox"
        disabled={disabled}
        readOnly={readOnly}
        onChange={onCheckboxChange}
        name={name}
        {...controlProps}
        {...field}
        {...rest}
      />
      {children ? (
        <span
          className={`ltr:ml-2 rtl:mr-2 ${disabled ? "opacity-50" : ""}`}
        >
            {children}
        </span>
      ) : null}
    </label>
  );
}) as any;

export default Checkbox;
