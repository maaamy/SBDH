import { CATEGORIES, ENTREPRISES, PRODUCTS, SECTIONS } from "../data/products";
import Banner from "../components/layout/Banner";
import Navigation from "../components/layout/Navigation";
import Sidebar from "../components/layout/Sidebar";
import ProductRow from "../components/products/ProductRow";
import Footer from "../components/layout/Footer";

const NAV_LIST = [
  { label: "Accueil", path: "/" },
  { label: "A propos", path: "#" },
  { label: "S'inscrire", path: "/inscription" },
  { label: "Se connecter", path: "/connexion" },
];

const PageAccueil = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-backgroundImg bg-cover">
      
      <Banner />

      <Navigation navList={NAV_LIST} />
     

      <main className="flex items-start gap-0 p-4 w-full flex-1">

        <Sidebar companyList={ENTREPRISES} categoryList={CATEGORIES}/>

        <section className="flex-1 flex flex-col gap-2 px-3 overflow-hidden min-w-0">
          {SECTIONS.map((title) => (
            <ProductRow key={title} title={title} products={PRODUCTS}/>
          ))}
        </section>

      </main>

      <Footer />

    </div>
  );
}

export default PageAccueil