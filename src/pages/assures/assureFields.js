
export default [
  { name: 'matricule', label: 'Matricule', required: true, col: 2 },
  { name: 'nom', label: "Nom",required: true, col: 4 },
  { name: 'prenom', label: 'Prénom', col: 2 },
  { name: 'dateNais', label: 'Date de Naissance', type: 'date', col: 3 },
  {
    name: 'sexe', label: 'Sexe', col: 3, type: 'select', options: [
      { value: 'Masculin', label: 'Masculin' },
      { value: 'Féminin', label: 'Féminin' }
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