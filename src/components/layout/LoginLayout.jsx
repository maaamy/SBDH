import Footer from './Footer'

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-[#b86748]"
  >
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 21V11h14v10" />
  </svg>
)

const LoginLayout = ({ children }) => (
  <div className="min-h-screen px-4 py-10">
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[44px] border border-[#f3d9c8] bg-white/80 px-6 py-8 shadow-[0_60px_65px_rgba(41,21,9,0.25)] backdrop-blur-sm">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.5em] text-[#a56a49]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 shadow-inner">
            <HomeIcon />
          </div>
          Accueil
        </div>
      
      </header>
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#b86748]">Connexion Client</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#2a1811]">Bienvenue ! Connectez-vous pour accéder à votre espace</h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6c564c]">
          Gérer vos commandes, retrouver vos listes préférées et suivre vos livraisons dans un environnement sécurisé.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-10">
  
  {/* GAUCHE */}
  <div className="w-full lg:w-1/2 flex justify-center">
    {children}
  </div>

  {/* DROITE */}
  <div className="hidden lg:flex w-1/2 justify-center">
    <img
      src="/src/assets/cart.png"
      alt="shopping"
      className="rounded-3xl shadow-xl max-h-[400px] object-cover"
    />
  </div>

</div>
      
    </div> 
      <Footer />
    
  </div>
)

export default LoginLayout
