import jsPDF from 'jspdf'

export function printAssuranceToPDF(assurance) {
  const doc = new jsPDF({ unit: 'cm', format: 'a4' });

  const fontSize = 10;
  const marginTop = 2; // marge haute

  doc.setFontSize(fontSize);
  doc.setFont('helvetica', 'bold'); // Helvetica gras

  const safeText = (text) => text || '';

  // 🔧 Utilitaire : dessine fond + texte pour chaque champ
  const drawField = (text, x, y, width = 6, height = 0.8) => {
    const adjustedY = y + marginTop;

    // 🟨 Fond jaune autour du champ
    doc.setFillColor(255, 255, 180);
    doc.rect(x, adjustedY - height + 0.2, width, height, 'F'); // rectangle sous le texte

    // 🖊️ Texte par-dessus
    doc.setTextColor(0, 0, 0);
    doc.text(safeText(text), x + 0.2, adjustedY);
  };

  // 🧾 Champs à remplir (coordonnées et dimensions modifiables)
  drawField(assurance.nPolice,       12.143, 0.556);
  drawField(assurance.nAssure,       12.153, 1.085);
  drawField(assurance.souscripteur,  12.169, 1.693, 10);
  drawField(assurance.adresse,        4.101, 2.143, 12);
  drawField(assurance.profession,    12.196, 2.249, 6);
  drawField(assurance.genre,          3.307, 2.725, 3);
  drawField(assurance.marque,         6.984, 2.725, 4);
  drawField(assurance.immat_moteur,  14.603, 2.725, 5.5);
  drawField(assurance.validite_du,    4.603, 4.947, 4);
  drawField(assurance.validite_au,    9.102, 4.947, 4);
  drawField(assurance.prise_effet,    3.307, 6.323, 6);

  // 💾 Export
  const filename = `Assurance-${assurance.nPolice || 'fiche'}.pdf`;
  doc.save(filename);
}

