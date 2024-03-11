import { useField } from "formik";
import { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-[270px] h-[90px] flex flex-col justify-center items-center relative rounded">
      <input
        type="text"
        {...field}
        {...props}
        autoComplete="off"
        className={`w-[260px] h-[60%] outline-none border rounded  bg-[white] py-2 pl-3 text-[14px] transition duration-1000 ${
          focused ? "border-blue-700 border-[2px]" : "border-gray-400"
        } ${meta.touched && meta.error ? "border-red-500" : ""}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        className={`bg-white absolute left-4 transition-all duration-1000 cursor-text hover:cursor-text ${
          focused || field.value
            ? "text-[14px] text-blue-700 top-[6.8px] px-[4px]"
            : "text-[18px] text-gray-900"
        }`}
        onClick={() => {
          const input = document.querySelector(
            'input[name="' + props.name + '"]'
          );
          input.focus();
        }}
      >
        {label}
      </label>

      {meta.touched && meta.error && (
        <span className="absolute text-[14px] w-full text-red-500 bottom-0 left-4 transition-all duration-500">
          {meta.error}
        </span>
      )}
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TextField;
