const providerMeta = {
  google: {
    bg: 'bg-white',
    icon: (
      <span className="text-[10px] font-bold text-[#3c7dff]">G</span>
    ),
  },
  facebook: {
    bg: 'bg-[#1877f2]',
    icon: (
      <span className="text-sm font-bold text-white">f</span>
    ),
  },
}

const SocialButton = ({ provider = 'google', label, onClick }) => {
  const meta = providerMeta[provider] ?? providerMeta.google

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-3 rounded-full border border-[#d6ccc0] bg-white px-5 py-3 text-sm font-semibold text-[#3d2a22] shadow-[0_10px_25px_rgba(61,42,34,0.13)] transition hover:-translate-y-0.5 hover:border-transparent"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border border-white ${meta.bg}`}
      >
        {meta.icon}
      </span>
      {label}
    </button>
  )
}

export default SocialButton
