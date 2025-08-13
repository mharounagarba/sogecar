
export default [
  { name: 'nom', label: "Nom",required: true, col: 4 },
  { name: 'adresse', label: 'Adresse', col: 3 },
  { name: 'ville', label: 'Ville',  col: 2 },
  { name: 'contact', label: 'contact',  col: 2 },
  {
    name: 'type', label: 'Type', col: 3, type: 'select', options: [
      { value: 'Autres', label: 'Autres' },
      { value: 'Cabinet', label: 'Cabinet' },
      { value: 'Clinique', label: 'Clinique' },
      { value: 'Hôpital', label: 'Hôpital' },
      { value: 'Pharmacie', label: 'Pharmacie' },
    ]
  },
  { name: 'convention', label: 'Convention',type:"checkbox", col: 3 },

]