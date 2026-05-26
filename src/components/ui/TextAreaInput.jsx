const TextAreaInput = ({ label, placeholder, value, onChange, rows }) => {
 
    return (
        <div className="bg-white border border-white flex flex-col gap-2 items-start px-3 py-5 rounded-2xl w-full">
            <label className="secondaryTitleText text-button">{label}</label>

            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className= "border rounded-2xl w-full px-5 secondaryText text-black placeholder:text-grey focus:outline-none focus:border-color-button bg-white py-3 resize-none"
            />
        </div>

    );
  
};



export default TextAreaInput;