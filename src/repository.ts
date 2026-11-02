import { NewWizard, Spell, Wizard } from "./types";
import { ValidateSpellPower } from "./decorators";

// Génériques : référentiel réutilisable
export class Repository<T extends { id: number }> {
  protected items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}

export class WizardRepository extends Repository<Wizard> {
  private nextId = 1;

  // Exercice 1 : le référentiel attribue l'identifiant
  public register(newWizard: NewWizard): Wizard {
    const wizard: Wizard = { id: this.nextId++, ...newWizard };
    this.add(wizard);
    return wizard;
  }

  // Exercice 2 : filtrer par maison (type à accès indexé)
  public findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
  // Exercice 4 : validation de la puissance
  @ValidateSpellPower
  public override add(spell: Spell): void {
    super.add(spell);
  }
}
