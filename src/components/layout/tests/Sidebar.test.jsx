import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "../Sidebar";

const mockCompanyList = ["Nike", "Adidas", "Puma"];

const mockCategoryList = [
  {
    nom: "Vêtements",
    sous_categories: ["T-shirts", "Pantalons"],
  },
  {
    nom: "Chaussures",
    sous_categories: ["Baskets", "Sandales"],
  },
];

describe("Sidebar", () => {
  it("affiche 'Filtre'", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    expect(screen.getByText("Filtre")).toBeInTheDocument();
  });

  it("affiche la section 'Entreprises'", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    expect(screen.getByText("Entreprises")).toBeInTheDocument();
  });

  it("affiche la section 'Prix'", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    expect(screen.getByText("Prix")).toBeInTheDocument();
  });

  it("affiche la section 'Catégories'", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    expect(screen.getByText("Catégories")).toBeInTheDocument();
  });

  it("affiche les entreprises quand la section est ouverte", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Entreprises"));
    expect(screen.getByText("Nike")).toBeInTheDocument();
    expect(screen.getByText("Adidas")).toBeInTheDocument();
    expect(screen.getByText("Puma")).toBeInTheDocument();
  });

  it("affiche les catégories quand la section est ouverte", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Catégories"));
    expect(screen.getByText("Vêtements")).toBeInTheDocument();
    expect(screen.getByText("Chaussures")).toBeInTheDocument();
  });

  it("affiche les champs Min et Max pour le prix", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Prix"));
    expect(screen.getByText("Min")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  it("coche une entreprise au clic sur sa checkbox", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Entreprises"));
    const checkbox = screen.getByRole("checkbox", { name: "Nike" });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("change les champs Min/Max pour le prix quand on modifie les champs", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Prix"));
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "10" } });
    fireEvent.change(inputs[1], { target: { value: "90" } });
    expect(inputs[0]).toHaveValue(10); 
    expect(inputs[1]).toHaveValue(90); 
  });

  it("coche toutes les sous-catégories quand on coche la catégorie parente", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Catégories"));
    fireEvent.click(screen.getByRole("checkbox", { name: "Vêtements" }));
    expect(screen.getByRole("checkbox", { name: "T-shirts" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Pantalons" })).toBeChecked();
  });

  it("décoche la catégorie parente si une sous-catégorie est décochée", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Catégories"));
    fireEvent.click(screen.getByRole("checkbox", { name: "Vêtements" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "T-shirts" }));
    expect(screen.getByRole("checkbox", { name: "Vêtements" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "T-shirts" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Pantalons" })).toBeChecked();
});


  it("le bouton Annuler remet les filtres à zéro", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    fireEvent.click(screen.getByText("Prix"));
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "10" } });
    fireEvent.click(screen.getByText("Annuler"));
    
    expect(inputs[0]).toHaveValue(null);
  });

  it("affiche le bouton Valider", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    expect(screen.getByText("Valider")).toBeInTheDocument();
  });

  it("affiche la barre de recherche", () => {
    render(<Sidebar companyList={mockCompanyList} categoryList={mockCategoryList} />);
    expect(screen.getByPlaceholderText("Rechercher")).toBeInTheDocument();
  });
});
