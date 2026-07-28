import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const FOOTER_LIST = [
        { label: "A propos", path: "/apropos" },
        { label: "Contact", path: "/contact" },
        { label: "Carrière", path: "#" },
    ];

    return (
      <footer
        className="w-full h-16 rounded-full flex bg-menu-gradient items-center px-12 gap-6"
      >

        {FOOTER_LIST.map((item) => (
            <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex-1 text-center text-white titleText hover:opacity-80 transition-opacity whitespace-nowrap"
            >
                {item.label}
            </button>
        ))}
      </footer>
    );
}

export default Footer;