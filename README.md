# TP TypeScript – TAF (Wizards & Spells)

Projet réalisé dans le cadre du cours TypeScript – G2IG5 – 2026/2027.

## Exercices
1. `NewWizard = Omit<Wizard, "id">` + `WizardRepository.register()`
2. `findByHouse(house: Wizard["house"])`
3. `SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>`
4. Décorateur `@ValidateSpellPower`
5. Décorateur `@Cache` (WeakMap + Map)
6. Type guards `isHouse()` et `isWizard()`

## Lancer
```bash
npm install
npm run dev
```
