
export default [
  { name: 'nom', label: "Nom",required: true, col: 4 },
  { name: 'adresse', label: 'Adresse', col: 3 },
  { name: 'contact', label: 'Contact / Pers.',  col: 4 },
  { name: 'telephone', label: 'telephone',  col: 2 },
  {
    name: 'typeClient', label: 'Type', col: 3, type: 'select', options: [
      { value: 'Entreprise', label: 'Entreprise' },
      { value: 'Institution', label: 'Institution' },
      { value: 'ONG', label: 'ONG' },
      { value: 'Particulier', label: 'Particulier' },
      { value: 'Autres', label: 'Autres' },
    ]
  },

]