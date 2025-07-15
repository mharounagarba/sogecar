import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function printActeToPDF(assurance) {
  const doc = new jsPDF({ unit: 'cm', format: 'a4' });

  const fontSize = 10;
  const marginTop = 1.6; // décalage vertical en cm
  doc.setFontSize(fontSize);

  const safeText = (text) => text || '';
  const draw = (text, x, y) => doc.text(safeText(text), x, y + marginTop);

  // 🟨 Ajout d’un fond jaune sur toute la page
  doc.setFillColor(255, 255, 150); // couleur jaune pâle
  doc.rect(0, 0, 21, 29.7, 'F'); // A4 : 21 x 29.7 cm, 'F' = filled

  // 🖊️ Écriture des champs (avec margeTop appliquée)
  draw(assurance.nPolice,       12.143, 0.556);
  draw(assurance.nAssure,       12.153, 1.085);
  draw(assurance.souscripteur,  12.169, 1.693);
  draw(assurance.adresse,        4.101, 2.143);
  draw(assurance.profession,    12.196, 2.249);
  draw(assurance.genre,          3.307, 2.725);
  draw(assurance.marque,         6.984, 2.725);
  draw(assurance.immat_moteur,  14.603, 2.725);
  draw(assurance.validite_du,    4.603, 4.947);
  draw(assurance.validite_au,    9.102, 4.947);
  draw(assurance.prise_effet,    3.307, 6.323);

  // 💾 Export
  const filename = `Assurance-${assurance.nPolice || 'fiche'}.pdf`;
  doc.save(filename);
}
