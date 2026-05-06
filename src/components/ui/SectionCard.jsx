const SectionCard = ({ title, subtitle, children, className = "" }) => {

    return(
        <div className={`bg-bg rounded-3xl flex flex-col overflow-hidden ${className}`}>
            <div className="flex items-center gap-6 flex-wrap">
                <div className="bg-color-button px-6 py-3 rounded-br-3xl rounded-tl-3xl shrink-0">
                    <span className="titleText text-white">{title}</span>
                </div>
                {subtitle && (
                    <span className="secondaryTitleText text-black">{subtitle}</span>
                )}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );}

export default SectionCard;