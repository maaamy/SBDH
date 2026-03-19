const FormInput = ({ label, type = "text", placeholder, icon, rightIcon, onRightIconClick, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full">

      <label className="normalText text-black font-bold">
        {label}
      </label>

      <div className="relative flex items-center">

        {icon && (
          <span className="absolute left-3 text-grey">
            {icon}
          </span>
        )}

        <input
           type={type}
           placeholder={placeholder}
           value={value}
           onChange={onChange}
           className="w-full h-9 bg-white rounded-full border border-light px-8 normalText text-black placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-button"
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 text-grey hover:text-black transition-colors"
          >
            {rightIcon}
          </button>
        )}

      </div>
    </div>

  );
};

export default FormInput;
