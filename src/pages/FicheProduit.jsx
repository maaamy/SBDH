import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Star } from "lucide-react";
import Banner from "../components/layout/Banner";
import CustomerNavigation from "../components/layout/CustomerNavigation";
import Footer from "../components/layout/Footer";
import { selectCustomer, setCartCount } from "../store/slices/customerSlice";
import * as customerService from "../services/customerService";
import Casque from "../assets/Casque.jpg";

const FicheProduit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { profil, cartCount } = useSelector(selectCustomer);

    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [note, setNote] = useState(5);
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartSuccess, setCartSuccess] = useState(false);
    const [sendingReview, setSendingReview] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    useEffect(() => {
        customerService.fetchProductById(id)
            .then((data) => {
                setProduct(data);
                setSelectedVariant(data.Variante_produit?.[0] ?? null);
            })
            .finally(() => setIsLoading(false));

        customerService.fetchReviews(id).then(setReviews);
    }, [id]);

    const handleAddToCart = async () => {
        if (!profil?.clientId || !selectedVariant) return;
        setAddingToCart(true);
        try {
            await customerService.addToCart(profil.clientId, selectedVariant.id, 1);
            dispatch(setCartCount(cartCount + 1));
            setCartSuccess(true);
            setTimeout(() => setCartSuccess(false), 2000);
        } catch (err) {
            console.error("Error adding to cart", err);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleSendReview = async () => {
        if (!profil?.clientId || !comment.trim()) return;
        setSendingReview(true);
        try {
            const newReview = await customerService.addReview(profil.clientId, id, comment, note);
            setReviews((prev) => [{
                ...newReview,
                Client: { nom: profil.nom, prenom: profil.prenom }
            }, ...prev]);
            setComment("");
            setNote(5);
            setReviewSuccess(true);
            setTimeout(() => setReviewSuccess(false), 2000);
        } catch (err) {
            console.error("Error sending review", err);
        } finally {
            setSendingReview(false);
        }
    };

    const getStockLabel = (stock) => {
        if (stock === 0) return { label: "Rupture de stock", color: "text-red-500" };
        if (stock <= 3) return { label: `Plus que ${stock} en stock !`, color: "text-yellow-600" };
        return { label: "En stock", color: "text-green-600" };
    };

    if (isLoading || !product || !selectedVariant) return <div>Chargement...</div>;

    const stockInfo = getStockLabel(selectedVariant.stock);

    return (
        <div className="flex flex-col min-h-screen w-full bg-backgroundImg bg-cover bg-center">
            <Banner />
            <CustomerNavigation customer={profil} />

            <main className="flex-1 p-6 flex flex-col gap-6">
                <h1 className="titleText text-color-button">Fiche détaillée</h1>

                <div className="bg-white rounded-3xl p-6 flex flex-col gap-6">

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <button className="buttonText h-12 px-8 bg-beige text-black rounded-2xl hover:bg-bg-hover active:scale-95 transition-all"
                            onClick={() => navigate(-1)}      
                        >
                            Retour
                        </button>
                        <button className="buttonText h-12 px-8 bg-color-button text-white rounded-2xl hover:bg-button-hover active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                            disabled={selectedVariant.stock === 0 || addingToCart}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={18} />
                            {cartSuccess ? "Ajouté !" : addingToCart ? "Ajout..." : "Ajouter au panier"}
                        </button>
                    </div>

                    <div className="flex gap-6 flex-wrap items-start">
                        <div className="bg-beige border border-black/20 rounded-2xl flex items-center justify-center w-96 h-96 shrink-0">
                            <img
                                src={product.Image_produit?.[0]?.url ?? Casque}
                                alt={product.nom}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-4 min-w-60">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <p className="titleText text-product">{product.nom}</p>
                                <p className="secondaryTitleText text-black">{selectedVariant.prix.toFixed(2)} €</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                {selectedVariant.Variante_valeur_attribut.map((att) => (
                                    <p key={att.Valeur_attribut.id} className="secondaryTitleText text-color-button">
                                        {att.Valeur_attribut.Attribut.nom} : {att.Valeur_attribut.nom}
                                    </p>
                                ))}
                                <p className="secondaryTitleText text-color-button">
                                    Catégorie : {product.Categorie?.nom}
                                </p>
                                {product.Marque?.nom && (
                                    <p className="secondaryTitleText text-color-button">
                                        Marque : {product.Marque.nom}
                                    </p>
                                )}
                                <p className={`normalText font-bold ${stockInfo.color}`}>{stockInfo.label}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="secondaryTitleText text-color-button">Description du produit</p>
                                <div className="border border-color-button rounded-2xl p-4 min-h-32">
                                    <p className="normalText text-black">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="secondaryTitleText text-color-button">Les variantes</p>
                        <div className="flex flex-wrap gap-3">
                            {product.Variante_produit.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setSelectedVariant(v)}
                                    className={`flex flex-col gap-1 p-3 rounded-2xl border-2 transition-all active:scale-95
                                        ${selectedVariant.id === v.id
                                            ? "border-color-button bg-button-5"
                                            : "border-beige bg-beige hover:bg-bg-hover"
                                        }
                                        ${v.stock === 0 ? "opacity-50" : ""}
                                    `}
                                >
                                    {v.Variante_valeur_attribut.map((att) => (
                                        <p key={att.Valeur_attribut.id} className="normalText text-black">
                                            <span className="font-bold text-color-button">{att.Valeur_attribut.Attribut.nom} :</span> {att.Valeur_attribut.nom}
                                        </p>
                                    ))}
                                    <p className="normalText font-bold text-black">{v.prix.toFixed(2)} €</p>
                                    {v.stock === 0 && <p className="normalText text-red-500">Rupture</p>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="secondaryTitleText text-color-button">Les avis ({reviews.length})</p>
                        <div className="border border-color-button rounded-2xl p-4 flex flex-col gap-4">
                            {reviews.length === 0 ? (
                                <p className="normalText text-grey text-center py-4">Aucun avis pour ce produit.</p>
                            ) : (
                                reviews.map((r) => (
                                    <div key={r.id} className="flex flex-col gap-1 border-b border-beige pb-3 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between">
                                            <p className="normalText font-bold text-product">
                                                {r.Client?.prenom} {r.Client?.nom}
                                            </p>
                                            <p className="normalText text-grey">
                                                {new Date(r.created_at).toLocaleDateString("fr-FR", {
                                                    day: "numeric", month: "long", year: "numeric"
                                                })}
                                            </p>
                                        </div>
                                        {r.note && (
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={16}
                                                        className={star <= r.note ? "text-color-button fill-color-button" : "text-grey"}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <p className="normalText text-black">{r.commentaire}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {profil && (
                        <div className="flex flex-col gap-3">
                            <p className="secondaryTitleText text-color-button">Votre avis</p>

                            <div className="flex items-center gap-2">
                                <p className="normalText text-black">Note :</p>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setNote(star)}
                                    >
                                        <Star
                                            size={24}
                                            className={star <= note ? "text-color-button fill-color-button" : "text-grey"}
                                        />
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 items-end flex-wrap">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={3}
                                    className="flex-1 min-w-60 border border-color-button rounded-2xl p-4 normalText text-black focus:outline-none focus:ring-2 focus:ring-color-button resize-none"
                                    placeholder="Partagez votre expérience..."
                                />
                                <button
                                    onClick={handleSendReview}
                                    disabled={sendingReview || !comment.trim()}
                                    className="buttonText h-14 px-8 bg-color-button text-white rounded-2xl hover:bg-button-hover active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {reviewSuccess ? "Envoyé !" : sendingReview ? "Envoi..." : "Envoyer"}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FicheProduit;