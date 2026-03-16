const Navigation = ({navList}) => {
    return (
        <nav
            className="w-full h-16 rounded-full flex bg-menu-gradient items-center px-12 gap-6"
            
        >
            {navList.map((item) => (
            <a
                key={item}
                href="#"
                className="flex-1 text-center text-white titleText hover:opacity-80 transition-opacity whitespace-nowrap"
            >
                {item}
            </a>
            ))}
        </nav>
    );
}

export default Navigation;

      