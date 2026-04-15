const RoleCard = ({ title, primaryLabel, primaryAction, secondaryLabel, secondaryAction, linkLabel, linkAction }) => {

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl flex flex-col items-center gap-4 px-8 py-6 w-64 shadow-sm">
      
      <h3 className="secondaryTitleText text-black text-center">
        {title}
      </h3>

      <button
        onClick={primaryAction}
        className="buttonText w-full h-11 bg-color-button text-white rounded-full hover:bg-button-hover active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {primaryLabel} →
      </button>

      <button
        onClick={secondaryAction}
        className="buttonText w-full h-11 bg-button-5 text-white rounded-full hover:bg-button-5-hover active:scale-95 transition-all"
      >
        {secondaryLabel}
      </button>

      <button
        onClick={linkAction}
        className="text-color-button normalText underline hover:text-button-hover transition-colors"
      >
        {linkLabel}
      </button>

    </div>
  );
};

export default RoleCard;
