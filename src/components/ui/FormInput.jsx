const FormInput = ({ 
    label, 
    type = "text", 
    placeholder, 
    icon, 
    rightIcon, 
    onRightIconClick, 
    value, 
    onChange }) => {
        
    return (

        <div className="flex flex-col gap-1 w-full">

            {label && (
                <label className="secondaryTitleText text-black">
                {label}
                </label>
            )}

            <div className="relative flex items-center">

                {/* Icône gauche */}
                {icon && (
                    <span className="absolute left-4 text-grey pointer-events-none">
                        {icon}
                    </span>
                )}

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full h-14 bg-white rounded-full border-2 border-black
                        normalText text-black placeholder:text-grey
                        focus:outline-none focus:ring-2 focus:ring-color-button
                        ${icon ? "pl-12" : "pl-6"}
                        ${rightIcon ? "pr-12" : "pr-6"}
                    `}
                />

                {/* Icône droite */}
                {rightIcon && (
                    <button
                        type="button"
                        onClick={onRightIconClick}
                        className="absolute right-4 text-grey hover:text-black transition-colors"
                    >
                        {rightIcon}
                    </button>
                )}

            </div>
        </div>
    );
};

export default FormInput;