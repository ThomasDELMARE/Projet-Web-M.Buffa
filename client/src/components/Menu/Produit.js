class Produit {
    constructor(nom, type, cuisine, gastronomique, lien) {
      this.nom = nom;
      this.type = type;
      this.cuisine = cuisine;
      this.gastronomique = gastronomique;
      this.lien = lien;
    }

    getNom(){
      return this.nom
    }
  }


  // TODO : Remove
  let test = new Produit("test", "test", "test", "test", "test");

  test.getNom();