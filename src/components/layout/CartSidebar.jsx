import PayPal from "../../assets/Paypal.png";
import ApplePay from "../../assets/Applepay.jpg";
import Visa from "../../assets/Visa.jpg";
import MasterCard from "../../assets/Mastercard.jpg";
import GPay from "../../assets/Googlepay.jpg";
import SearchBar from "../ui/SearchBar";

const CartSidebar = () => { 
  return (
    <aside className="bg-sidebar w-72 shrink-0 self-stretch rounded-3xl overflow-hidden py-10 px-4 flex flex-col gap-5 opacity-80">

      <div className="bg-white mt-10 shrink-0 self-stretch rounded-3xl overflow-hidden py-10 px-4 flex flex-col gap-3 opacity-80">  

        <p className="secondaryTitleText text-color-button text-center">Mon panier</p>

        <SearchBar />

      {/* Paiements */}
        <div className="flex flex-col gap-4 mt-4">

          <p className="secondaryTitleText text-black text-center">
            Nous acceptons:
          </p>

          <div className="flex flex-col gap-3 text-center items-center">

            <img src={PayPal} alt="paypal" className="h-6 object-contain w-20" />
            <img src={ApplePay} alt="applepay" className="h-6 object-contain w-20" />
            <img src={Visa} alt="visa" className="h-6 object-contain w-20" />
            <img src={MasterCard} alt="mastercard" className="h-6 object-contain w-20" />
            <img src={GPay} alt="gpay" className="h-6 object-contain w-20" />

          </div>

        </div>
      </div>
    </aside>
  );
};

export default CartSidebar;