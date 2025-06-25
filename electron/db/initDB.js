const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const Database = require('better-sqlite3')
const { app } = require('electron')

function createDB() {
  // 1. Déterminer le chemin du dossier
  const isProd = app.isPackaged
  const dbFolder = isProd
    ? path.join(app.getPath('userData'))
    : path.join(__dirname, '..', 'db') // mieux pour le dev

  // 2. S'assurer que le dossier existe
  if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true })
  }

  // 3. Définir le chemin complet vers le fichier
  const dbPath = path.join(dbFolder, 'sogecar.db')

  // 4. Créer la connexion
  let db
  try {
    db = new Database(dbPath)
  } catch (error) {
    console.error('❌ Erreur ouverture DB :', error.message)
    throw error
  }

  // 5. Créer les tables
  db.exec(`
    
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );

    CREATE TABLE IF NOT EXISTS actes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      centre TEXT,
      typePEC TEXT,
      montant REAL,
      date TEXT,
      matricule TEXT
    );

    CREATE TABLE IF NOT EXISTS assures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matricule TEXT UNIQUE NOT NULL,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      dateNais TEXT,
      categorie TEXT,
      sitFamille TEXT,
      sexe TEXT
    );

    CREATE TABLE IF NOT EXISTS beneficiaires (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matriculeAssure TEXT NOT NULL,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      dateNais TEXT,
      lienFamille TEXT,
      FOREIGN KEY (matriculeAssure) REFERENCES assures(matricule)
    );

     CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    contact TEXT,
    telephone TEXT,
    adresse TEXT,
    typeClient TEXT,
    dateAjout TEXT
  );
  
CREATE TABLE IF NOT EXISTS centres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    type TEXT,
    convention BOOLEAN,
    adresse TEXT,
    ville TEXT,
    contact TEXT
  );

  CREATE TABLE IF NOT EXISTS assurances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nordre INTEGER,
    nCarton TEXT,
    nAssure TEXT,
    nPolice TEXT,
    souscripteur TEXT,
    profession TEXT,
    adresse TEXT,
    echeance INTEGER,
    validite_du TEXT,
    validite_au TEXT,
    prise_effet TEXT,
    genre TEXT,
    marque TEXT,
    immat_moteur TEXT,
    categorie_usage TEXT,
    expirer BOOLEAN,
    date_saisie TEXT,
    qui_saisie TEXT,
    assureur TEXT,
    prime_ttc REAL
  );
  
  `)

  // 6. Ajouter un admin par défaut
  const hash = bcrypt.hashSync('1234', 10)
  db.prepare(`
    INSERT OR IGNORE INTO users (username, password, role)
    VALUES ('admin', ?, 'admin')
  `).run(hash)

  console.log('✅ Base SQLite initialisée dans :', dbPath)

  return db
}

module.exports = createDB
