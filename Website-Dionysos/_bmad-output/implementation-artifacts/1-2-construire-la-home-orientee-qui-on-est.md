# Story 1.2: Construire la home orientée "qui on est"

Status: done

## Story

As a visiteur,  
I want voir immédiatement ce qu'est Dionysos et ses valeurs,  
so that je sache en moins de 10 secondes si c'est fait pour moi.

## Acceptance Criteria

1. Given j'arrive sur la page d'accueil, when la page se charge, then la proposition de valeur et la distinction non-dating sont visibles au-dessus de la ligne de flottaison.
2. Given j'arrive sur la page d'accueil, when je lis la hero section, then les bénéfices principaux sont lisibles sans effort.

## Tasks / Subtasks

- [x] Task 1 - Valider la proposition de valeur de la home (AC: 1)
  - [x] Vérifier la présence d'un message "qui on est" visible dès l'arrivée.
  - [x] Vérifier la mention explicite du positionnement non-dating.
- [x] Task 2 - Rendre les bénéfices principaux immédiatement lisibles (AC: 2)
  - [x] Ajouter/valider des éléments explicites "sortir / rencontrer / activités conviviales".
  - [x] Vérifier la lisibilité rapide dans la section hero.
- [x] Task 3 - Contrôles qualité
  - [x] Exécuter `npm run lint`.
  - [x] Exécuter `npm run typecheck`.
- [x] Task 4 - Documentation de clôture
  - [x] Mettre à jour le Dev Agent Record.
  - [x] Compléter la File List.

## Dev Notes

- Implémentation concentrée sur `app/pages/index.vue`.
- Le message non-dating est maintenu en hero: "Ici, pas de dating...".
- Les bénéfices clés sont rendus explicites via chips visibles dans la zone hero.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Story créée à partir de l'Epic 1 / Story 1.2.
- Hero home auditée contre AC 1 et AC 2.
- Ajout d'une liste de bénéfices explicites au-dessus de la ligne de flottaison.
- Validation qualité exécutée avec succès (`lint`, `typecheck`).
- Fixes de review appliqués : valeurs explicites ajoutées, bénéfices remontés dans la hero, garde-fou de copie home ajouté.

### Completion Notes List

- Proposition de valeur déjà présente et conservée.
- Distinction non-dating confirmée et conservée.
- Bénéfices principaux rendus lisibles sans effort via trois chips explicites.
- Valeurs explicites ajoutées dans la hero : inclusion, bienveillance, authenticité.
- Contrôle automatisé ajouté pour verrouiller les textes clés de la home.

### File List

- `app/pages/index.vue`
- `scripts/validate-home-copy.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/1-2-construire-la-home-orientee-qui-on-est.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-25: Story 1.2 implémentée et passée en review.
- 2026-02-25: Code review appliquée, story finalisée en done.

## Senior Developer Review (AI)

### Outcome

Approve

### Summary

- Valeurs manquantes ajoutées explicitement dans la hero.
- Lisibilité des bénéfices améliorée dans la zone haute de page.
- Validation automatisée de la copie home ajoutée pour prévenir les régressions.

### Action Items

- [x] [HIGH] Ajouter les valeurs explicites dans la section hero.
- [x] [MEDIUM] Garantir la lisibilité immédiate des bénéfices principaux.
- [x] [MEDIUM] Ajouter un contrôle automatisé de non-régression des textes clés.
