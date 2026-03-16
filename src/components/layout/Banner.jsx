import banner from "../../assets/banner.jpg";
const Banner = () => {

    return (
        <header className="w-full h-16 shrink-0 overflow-hidden">
            <img src={banner} alt="bannière" className="w-full h-full object-cover" />
        </header>
    );
}

export default Banner;


 
