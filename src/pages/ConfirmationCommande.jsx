import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartPayment from "../components/layout/CartPayment";
import Panier from "./Panier";
import { selectCustomer } from "../store/slices/customerSlice";
import * as customerService from "../services/customerService";
import Casque from "../assets/Casque.jpg";

const ConfirmationCommande = () => {
  const { profil } = useSelector(selectCustomer);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (profil?.clientId) {
      customerService.fetchCart(profil.clientId).then((cart) => {
        const items = cart.map((c) => ({
          cartItemId: c.id,
          variantId: c.Variante_produit.id,
          nom: c.Variante_produit.Produit.nom,
          image: c.Variante_produit.Produit.Image_produit?.[0]?.url ?? Casque,
          prix: c.Variante_produit.prix,
          quantity: c.quantite,
          attributes: c.Variante_produit.Variante_valeur_attribut,
        }));
        setCartItems(items);
        setTotal(items.reduce((acc, c) => acc + c.prix * c.quantity, 0));
      });
    }
  }, [profil]);

  return (
    <Panier showButton={false}>
      <CartPayment cartItems={cartItems} total={total} />
    </Panier>
  )
};

export default ConfirmationCommande;