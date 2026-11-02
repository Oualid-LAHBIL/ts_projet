export type House = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

// Exercice 1 : l'appelant ne fournit pas d'identifiant
export type NewWizard = Omit<Wizard, "id">;

export interface Spell {
  id: number;
  name: string;
  category: string;
  power: number;
}

export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };

// Exercice 3 : on ne garde que les événements de lancement de sort
export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;

// Index signature : statistiques de sorts flexibles
export type SpellStats = {
  [spellName: string]: number;
};
