
export default [
  { name: 'matriculeAssure', label: 'Assuré', required: true, col: 2 },
  { name: 'nom', label: "Nom",required: true, col: 4 },
  { name: 'prenom', label: 'Prénom', col: 2 },
  { name: 'dateNais', label: 'Date de Naissance', type: 'date', col: 3 },
  {
    name: 'lienFamille', label: 'Lien / Famille', col: 3, type: 'select', options: [
      { value: 'Conjoint', label: 'Conjoint' },
      { value: 'Enfant', label: 'Enfant' },
      { value: 'Parent', label: 'Parent' },
    ]
  },
  {
    name: 'sitFamille', label: 'Sitution', col: 3, type: 'select', options: [
      { value: 'Célibataire', label: 'Célibataire' },
      { value: 'Marié', label: 'Marié' },
      { value: 'Divorcé', label: 'Divorcé' },
    ]
  },
  { name: 'categorie', label: 'Catégorie', col: 2 },

]