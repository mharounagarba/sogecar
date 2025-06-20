const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')


const bcrypt = require('bcryptjs')
const hash = bcrypt.hashSync('1234', 10)



function createDB() {
  const dbPath = path.join(__dirname, 'sogecar.db')
  const db = new Database(dbPath)

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );
  `)

  db.exec(`CREATE TABLE IF NOT EXISTS actes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  centre TEXT,
  typePEC TEXT,
  montant REAL,
  date TEXT,
  matricule TEXT
);
`)

db.exec(`CREATE TABLE IF NOT EXISTS assures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  matricule TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  dateNais TEXT,
  categorie TEXT,
  sitFamille TEXT,
  sexe TEXT
);
`)


db.exec(`CREATE TABLE IF NOT EXISTS beneficiaires (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  matriculeAssure TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  dateNais TEXT,
  lienFamille TEXT,
  FOREIGN KEY (matriculeAssure) REFERENCES assures(matricule)
);
`)


  console.log('📦 Base SQLite initialisée')

  db.prepare(`
  INSERT OR IGNORE INTO users (username, password, role)
  VALUES ('admin', ?, 'admin')
`).run(hash)


  return db
}


module.exports = createDB
