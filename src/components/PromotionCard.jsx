const PromotionCard = ({ discount, description, onUse }) => {
    return(
        <div className="bg-white rounded-xl flex flex-col items-center overflow-hidden">
            <div className="flex flex-col items-center py-4 px-3 gap-1 text-center">
                <span className="text-[25px] font-bold font-global text-product leading-tight">{discount}</span>
                <span className="text-product text-center">{description}</span>
            </div>
            <button
                onClick={onUse}
                className="w-full py-2 bg-color-button text-white buttonText hover:bg-button-hover transition-colors"
            >
                Utiliser
            </button>
    </div>
    );}

export default PromotionCard;