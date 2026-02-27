# Story 2.2: Ajouter galerie visuelle et exemples concrets

Status: done

## Story

As a visiteur,  
I want voir des exemples réels de sorties,  
so that je comprenne l'ambiance et le format des événements.

## Acceptance Criteria

1. Given je parcours les sections visuelles, when les médias se chargent, then les contenus sont représentatifs et optimisés.
2. Given je consulte les médias informatifs, when je lis les attributs d'accessibilité, then chaque image dispose d'un texte alternatif non vide.

## Tasks / Subtasks

- [x] Task 1 - Renforcer la représentativité des exemples visuels (AC: 1)
  - [x] Compléter les métadonnées contextuelles par média (format, participants).
  - [x] Vérifier la cohérence entre type d'activité et exemple visuel.
- [x] Task 2 - Sécuriser l'optimisation média (AC: 1)
  - [x] Confirmer `loading="lazy"` et `decoding="async"` sur les images.
  - [x] Confirmer dimensions fixes pour limiter les shifts visuels.
- [x] Task 3 - Garantir l'accessibilité des images informatives (AC: 2)
  - [x] Vérifier présence d'un `alt` non vide pour chaque image informative.
  - [x] Ajouter un script de validation dédié galerie.
- [x] Task 4 - Contrôles qualité
  - [x] Exécuter `npm run lint`.
  - [x] Exécuter `npm run typecheck`.
- [x] Task 5 - Documentation de clôture
  - [x] Mettre à jour Dev Agent Record.
  - [x] Mettre à jour File List.

## Dev Notes

- La galerie est implémentée dans `app/pages/activites.vue`.
- Le travail de cette story renforce surtout la qualité des métadonnées visuelles et les garde-fous anti-régression.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Ajout de métadonnées `format` et `participants` sur chaque item galerie.
- Confirmation des attributs d'optimisation média (`lazy`, `async`, dimensions).
- Ajout de la validation automatisée `validate-activities-gallery`.
- Follow-up review appliquée: galerie alimentée depuis `content/activities` via API.
- Validation `alt` renforcée sur source éditoriale + liaison template.

### Completion Notes List

- Galerie enrichie avec informations contextuelles concrètes.
- Accessibilité image maintenue avec `alt` informatifs non vides.
- Contrôle anti-régression dédié galerie ajouté au lint.
- Les exemples de galerie sont désormais sourcés depuis des contenus éditoriaux réels (`content/activities/*.md`).
- Métadonnées publication/format/participants issues du contenu, plus de placeholders en dur.

### File List

- `app/pages/activites.vue`
- `server/api/activities.get.ts`
- `content/activities/resto-night.md`
- `content/activities/quais-walk.md`
- `content/activities/board-games.md`
- `content/activities/book-club.md`
- `scripts/validate-activities-gallery.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/2-2-ajouter-galerie-visuelle-et-exemples-concrets.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-25: Story 2.2 implémentée et passée en review.
- 2026-02-25: Code review appliquée, story finalisée en done.

## Senior Developer Review (AI)

### Outcome

Approve

### Summary

- Galerie basculée vers une source éditoriale (`content/activities`) exposée via `GET /api/activities`.
- Contrôle anti-régression renforcé pour valider les `alt` non vides côté contenu et la liaison `:alt` côté template.
- AC “exemples réels + contenus optimisés” couverte de manière plus robuste.

### Action Items

- [x] [HIGH] Remplacer les exemples strictement statiques par des entrées éditoriales sourcées.
- [x] [MEDIUM] Renforcer la validation accessibilité de la galerie.
- [x] [MEDIUM] Conserver l’optimisation média (`lazy`, `async`, dimensions`) sur les visuels.
