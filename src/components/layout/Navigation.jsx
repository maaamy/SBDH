import { Link } from "react-router-dom";

const Navigation = ({navList}) => {
    return (
        <nav
            className="w-full h-16 rounded-full flex bg-menu-gradient items-center px-12 gap-6"
            
        >
            {navList.map((item) => (
            <Link
                key={item.label}
                to={item.path}
                className="flex-1 text-center text-white titleText hover:opacity-80 transition-opacity whitespace-nowrap"
            >
                {item.label}
            </Link>
            ))}
        </nav>
    );
}

export default Navigation;

      