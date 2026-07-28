import { Star } from "lucide-react";

const ReviewsChart = ({ reviews }) => {

    if (!reviews.length) return <p className="normalText text-grey">Aucun avis.</p>;

    return (
        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
            {reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-xl px-3 py-2 shadow flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="normalText font-bold text-product truncate">{review.produit}</p>
                        <p className="normalText text-button-hover">
                            {review.nb_avis} avis - Min: {review.note_min} / Max: {review.note_max}
                        </p>
                        <p className="normalText text-grey">
                            {new Date(review.dernier_avis).toLocaleDateString("fr-FR")}
                        </p>
                    </div>
                    <span className="normalText text-yellow-500 font-bold shrink-0">
                        <Star className="w-5 h-5" /> {review.note_moyenne?.toFixed(1)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ReviewsChart;