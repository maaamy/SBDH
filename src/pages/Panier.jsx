import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import CartItem from "../components/layout/CartItem";
import CartSummary from "../components/layout/CartSummary";
import Banner from "../components/layout/Banner";
import CartSidebar from "../components/layout/CartSidebar";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import { selectCustomer, setCartCount } from "../store/slices/customerSlice";
import * as customerService from "../services/customerService";
import Casque from "../assets/Casque.jpg";

const Panier = ( { showButton=true, children } ) => {
  const dispatch = useDispatch();
  const { profil } = useSelector(selectCustomer);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      handleRemove(cartItemId);
      return;
    }
    await customerService.updateCartItem(cartItemId, quantity);
    setCartItems((prev) =>
      prev.map((c) => c.cartItemId === cartItemId ? { ...c, quantity } : c)
    );
    dispatch(setCartCount(cartItems.reduce((acc, c) =>
      acc + (c.cartItemId === cartItemId ? quantity : c.quantity), 0)
    ));
  };

  useEffect(() => {
    if (profil?.clientId) {
      customerService.fetchCart(profil.clientId)
        .then((cart) => {
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
          dispatch(setCartCount(items.reduce((acc, c) => acc + c.quantity, 0)));
        })
        .finally(() => setIsLoading(false));
    }
  }, [profil]);

  const handleRemove = async (cartItemId) => {
    await customerService.removeCartItem(cartItemId);
    const updated = cartItems.filter((c) => c.cartItemId !== cartItemId);
    setCartItems(updated);
    dispatch(setCartCount(updated.reduce((acc, c) => acc + c.quantity, 0)));
  };

  const total = cartItems.reduce((acc, c) => acc + c.prix * c.quantity, 0);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">

      <Banner />

      <CustomerNavigation customer={profil} />

      <main className="flex items-start gap-0 p-4 w-full flex-1">

        <CartSidebar /> 

        <section className="flex-1 flex flex-col gap-2 px-3 overflow-hidden min-w-0">
           <h1 className="titleText text-color-button">Panier</h1>
           <p className="text-button text-black font-bold">
              Il y a {cartItems.length} article(s) dans votre panier
           </p>
            {cartItems.length === 0 ? (
              <p className="normalText text-grey text-center py-16">Votre panier est vide.</p>
              ) : (
              cartItems.map((item) => (
                <CartItem
                    key={item.cartItemId}
                    item={item}
                    onUpdate={(_, qty) => handleUpdate(item.cartItemId, qty)}
                    onRemove={() => handleRemove(item.cartItemId)}
                />
            )))}
        </section>

        <div className="flex flex-col gap-6 w-80 ml-auto">

          <CartSummary total={total} showButton={showButton} />
          { children }

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Panier;