import CartPayment from "../components/layout/CartPayment";
import Panier from "./Panier";

const ConfirmationCommande = () => {

  return (
    <Panier showButton={false}>
      <CartPayment />
    </Panier>
  )
};

export default ConfirmationCommande;