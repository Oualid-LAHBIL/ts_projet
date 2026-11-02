import type { House, Wizard, SpellCastEvent, SpellStats } from "./types";
import { WizardRepository, SpellRepository } from "./repository";
import { Cache } from "./decorators";

// ---------- Exercice 1 : ajouter un sorcier ----------
console.log("=== Exercice 1 : Ajouter un sorcier ===");
const wizards = new WizardRepository();
wizards.register({ name: "Harry Potter", house: "Gryffindor", level: 5, active: true });
wizards.register({ name: "Hermione Granger", house: "Gryffindor", level: 7, active: true });
wizards.register({ name: "Draco Malfoy", house: "Slytherin", level: 5, active: true });
wizards.register({ name: "Luna Lovegood", house: "Ravenclaw", level: 4, active: true });
console.log(wizards.getAll());

// ---------- Exercice 2 : filtrer par maison ----------
console.log("\n=== Exercice 2 : Filtrer par maison ===");
console.log("Gryffindor :", wizards.findByHouse("Gryffindor").map(w => w.name));
console.log("Slytherin  :", wizards.findByHouse("Slytherin").map(w => w.name));
// wizards.findByHouse("Durmstrang"); // ❌ erreur de compilation

// ---------- Exercice 3 : Extract ----------
console.log("\n=== Exercice 3 : Extract ===");
function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}
handleSpellCast({ type: "spell-cast", wizardId: 1, spellName: "Expelliarmus" });
// handleSpellCast({ type: "level-up", wizardId: 1, newLevel: 6 }); // ❌

// ---------- Exercice 4 : décorateur ValidateSpellPower ----------
console.log("\n=== Exercice 4 : ValidateSpellPower ===");
const spells = new SpellRepository();
spells.add({ id: 102, name: "Protego", category: "defense", power: 50 });
console.log("Sort valide ajouté :", spells.getAll());
try {
  spells.add({ id: 103, name: "Invalid Spell", category: "attack", power: -10 });
} catch (e) {
  console.log("Sort refusé :", (e as Error).message);
}

// ---------- Exercice 5 : décorateur Cache ----------
console.log("\n=== Exercice 5 : Cache ===");
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}
const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));

// ---------- Exercice 6 : Type Guards ----------
console.log("\n=== Exercice 6 : Type Guards ===");
const validHouses: readonly House[] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function isHouse(value: unknown): value is House {
  return typeof value === "string" && validHouses.some(house => house === value);
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

const validData: unknown = { id: 1, name: "Harry Potter", house: "Gryffindor", level: 5, active: true };
const invalidData: unknown = { id: 2, name: "Viktor", house: "Durmstrang", level: 5, active: true };
console.log(isWizard(validData));   // true
console.log(isWizard(invalidData)); // false

// ---------- Bonus : Index Signatures ----------
console.log("\n=== Bonus : Index Signatures ===");
const stats: SpellStats = { Lumos: 12, Expelliarmus: 8 };
stats.Alohomora = 3; // nouvelle clé dynamique
console.log(stats);
