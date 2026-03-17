const Checkbox = ({ label, checked, onChange }) => {

  return (

    <label className="flex items-center gap-2 cursor-pointer select-none">
      
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-4 border border-black bg-white appearance-none 
        checked:bg-black cursor-pointer"
      />
      
      <span className="normalText text-black">
        {label}
      </span>
      
    </label>
  );
}

export default Checkbox;