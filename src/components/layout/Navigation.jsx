import { Link } from "react-router-dom";

const Navigation = ({navList, children}) => {
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
                
                {item.icon ? (
                    <span className="flex items-center gap-2 justify-center">{item.icon} {item.label}</span>
                ) : (
                    item.label
                )}
            </Link>
            ))}

            {children}
        </nav>
    );
}

export default Navigation;

      