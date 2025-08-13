// export default [
//   { name: 'assureur', label: 'Assureur', col: 3 },
//   { name: 'nCarton', label: 'N° Carton', col: 2 },
//   { name: 'nAssure', label: 'N° Assuré', col: 2 },
//   { name: 'nPolice', label: 'N° Police', required: true, col: 3 },
//   { name: 'souscripteur', label: 'Souscripteur', col: 5 },
//   { name: 'profession', label: 'Profession', col: 3 },
//   { name: 'adresse', label: 'Adresse', col: 3 },
//   { name: 'genre', label: 'Genre', col: 3 },
//   { name: 'marque', label: 'Marque', col: 3 },
//   { name: 'immat_moteur', label: 'Immat./Moteur', col: 3 },
//   { name: 'categorie_usage', label: 'Catégorie / Usage', col: 2 },
//   { name: 'echeance', label: 'Échéance', type: 'number', col: 2 },
//   { name: 'validite_du', label: 'Validité du', type: 'date', col: 3 },
//   { name: 'validite_au', label: 'Validité au', type: 'date', col: 3 },
//   { name: 'prise_effet', label: 'Prise d’effet', type: 'datetime-local', col: 3 },
//   { name: 'prime_ttc', label: 'Prime TTC', type: 'number', col: 3 },
//   { name: 'expirer', label: 'Expiré', type: 'checkbox', col: 2 }
// ]

export default [
      { name: 'assureur', label: 'Assureur', col:3, type:'select', options: [
      { value: 'sunu', label: 'Sunu' },
      { value: 'caren', label: 'Caren' }
    ] },
      { name: 'nCarton', label: 'N° Carton' , col:2 },
      { name: 'nAssure', label: 'N° Assuré' , col:2 },
      { name: 'nPolice', label: 'N° Police', required: true , col:2 },
      { name: 'souscripteur', label: 'Souscripteur', col:5  },
      { name: 'profession', label: 'Profession' , col:3 },
      { name: 'adresse', label: 'Adresse' , col:3 },
      { name: 'genre', label: 'Genre' , col:3 },
      { name: 'marque', label: 'Marque' , col:3 },
      { name: 'immat_moteur', label: 'Immatriculation / Moteur', col:3  },
      { name: 'categorie_usage', label: 'Catégorie / Usage' , col:2 },
      { name: 'echeance', label: 'Échéance / Mois', type: 'number' , col:2 },
      { name: 'validite_du', label: 'Validité / début', type: 'date' , col:3 },
      { name: 'validite_au', label: 'Validité / fin', type: 'date' , col:3 },
      { name: 'prise_effet', label: 'Prise d’effet', type: 'datetime-local', col:3  },
      // { name: 'date_saisie', label: 'Date de saisie', type: 'date' , col:3 },
      // { name: 'qui_saisie', label: 'Qui a saisi ?' , col:4 },
      { name: 'prime_ttc', label: 'Prime TTC', type: 'number' , col:3 },
      // { name: 'nordre', label: 'N° Ordre', col:4 },
  ]
  