import { useState } from 'react'

const EyeIcon = ({ open = true }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    {open ? (
      <>
        <path d="M1 1l22 22" stroke="none" />
        <path d="M2 12c2.5-4.5 7-7 10-7s7.5 2.5 10 7c-2.5 4.5-7 7-10 7s-7.5-2.5-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M12 5c3.3 0 6 2 8.1 6-2.1 4-4.8 6-8.1 6s-6-2-8.1-6c2.1-4 4.8-6 8.1-6Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
)

const FormField = ({
  label,
  type = 'text',
  placeholder,
  name,
  icon,
}) => {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const fieldType = isPassword ? (visible ? 'text' : 'password') : type

  return (
    <label className="block text-sm font-semibold text-[#4c392f]">
      <span className="inline-block mb-2 text-base text-[#3d2a22]">{label}</span>
      <div className="flex items-center gap-3 rounded-full border border-[#e0d3cb] bg-white/80 px-4 py-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
        <span className="text-[#b86748]">{icon}</span>
        <input
          name={name}
          type={fieldType}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-[#4c3a32] placeholder:text-[#c2b2aa] focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            className="text-[#a57c68]"
            onClick={() => setVisible((prev) => !prev)}
            aria-label="Afficher ou masquer le mot de passe"
          >
            <EyeIcon open={!visible} />
          </button>
        )}
      </div>
    </label>
  )
}

export default FormField
