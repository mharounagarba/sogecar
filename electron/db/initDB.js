const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const Database = require('better-sqlite3')
const { app } = require('electron')

function createDB() {
  const isProd = app.isPackaged;
  const dbFolder = isProd
    ? path.join(app.getPath('userData'))
    : path.join(__dirname);

  if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
  }

  const dbPath = path.join(dbFolder, 'sogecar.db');
  const db = new Database(dbPath);

  const hash = bcrypt.hashSync('1234', 10);

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
  `);

  db.prepare(`
    INSERT OR IGNORE INTO users (username, password, role)
    VALUES ('admin', ?, 'admin')
  `).run(hash);

  console.log('📦 Base SQLite initialisée dans :', dbPath);

  return db;
}

module.exports = createDB;
