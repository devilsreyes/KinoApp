// KinoApp – Preisberechnung
// Gibt den Ticketpreis in Euro zurück.
// Kinder unter 14 und Senioren ab 65 zahlen weniger.

const NORMALPREIS = 11.50;
const KINDERPREIS = 7.00;
const SENIORENPREIS = 8.50;

function berechnePreis(alter) {
  if (alter < 14) {
    return KINDERPREIS;
  }
  if (alter >= 65) {
    return SENIORENPREIS;
  }
  return NORMALPREIS;
}
