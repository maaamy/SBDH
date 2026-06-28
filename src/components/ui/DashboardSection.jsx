const GraphiquePlaceholder = () => (
    <div className="bg-beige border border-black/10 rounded-xl w-52 h-32 flex items-center justify-center shrink-0">
        <div className="flex flex-col items-center gap-1 text-grey">
            <p className="normalText text-center">Graphique Power BI</p>
        </div>
    </div>
);

const DashboardSection = ({ label, stat, description }) => (
    <div className="flex flex-col gap-3 border-b border-white pb-4 last:border-0 last:pb-0">
        {label && <p className="secondaryTitleText text-color-button">{label}</p>}
        <div className="flex gap-5 items-center flex-wrap">
            <GraphiquePlaceholder />
            <div className="flex-1 min-w-40 flex flex-col gap-2">
                {stat && <p className="normalText text-product whitespace-pre-line">{stat}</p>}
                {description && <p className="normalText text-product whitespace-pre-line">{description}</p>}
            </div>
        </div>
    </div>
);

export default DashboardSection;