import BagMoney from "../../assets/BagMoney.png";

const CustomerKPICards = ({ dashboard }) => {
    return (
        <div className="flex items-center gap-4 mt-2">
            <div className="w-20 h-20 shrink-0">
                <img src={BagMoney} alt="Bag" />
            </div>
            <div className="flex-1 grid grid-cols-2 border border-beige">
                <div className="flex items-center justify-center p-4 border border-beige">
                    <span className="titleText">{dashboard?.nb_commandes ?? 0}</span>
                </div>
                <div className="flex items-center justify-center p-4 border border-beige">
                    <span className="titleText">{dashboard?.montant_total ?? 0} €</span>
                </div>
                <div className="flex items-center justify-center p-4 border border-beige">
                    <span className="secondaryTitleText">Commandes</span>
                </div>
                <div className="flex items-center justify-center p-4 border border-beige">
                    <span className="secondaryTitleText">Dépensés</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerKPICards;