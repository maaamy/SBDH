const Checkbox = ({ label, checked, onChange }) => {

  return (

    <label className="flex items-center gap-2 cursor-pointer select-none">
      
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 cursor-pointer accent-[brown]"
      />
      
      <span className="normalText text-black">
        {label}
      </span>
      
    </label>
  );
}

export default Checkbox;