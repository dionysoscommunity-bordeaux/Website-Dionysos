# Story 2.3: Mettre en place la preuve sociale (avis + partenaires visibles)

Status: done

## Story

As a visiteur,  
I want lire des retours membres et voir les partenaires,  
so that je sois rassuré sur la crédibilité de Dionysos.

## Acceptance Criteria

1. Given je visite Avis et Partenaires, when je consulte les blocs de preuve sociale, then témoignages et éléments partenaires sont visibles.
2. Given je consulte la page Communauté, when je cherche de la réassurance, then une section "observer avant de rejoindre" est accessible.

## Tasks / Subtasks

- [x] Task 1 - Consolider la visibilité des témoignages et partenaires (AC: 1)
  - [x] Vérifier l'affichage des témoignages via API.
  - [x] Vérifier l'affichage des partenaires via API avec informations clés.
  - [x] Ajouter un indicateur d'impact partenaire quand disponible.
- [x] Task 2 - Renforcer la réassurance d'entrée progressive (AC: 2)
  - [x] Vérifier la présence du bloc "Observer avant de rejoindre".
  - [x] Ajouter explicitement la notion d'intégration progressive.
- [x] Task 3 - Ajouter un garde-fou anti-régression
  - [x] Créer un script de validation preuve sociale.
  - [x] Intégrer ce script au `lint`.
- [x] Task 4 - Contrôles qualité
  - [x] Exécuter `npm run lint`.
  - [x] Exécuter `npm run typecheck`.
- [x] Task 5 - Documentation de clôture
  - [x] Mettre à jour Dev Agent Record.
  - [x] Mettre à jour File List.

## Dev Notes

- La page cible de la story est `app/pages/communaute.vue`.
- Les sources de vérité restent `content/testimonials` et `content/partners` via API.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Vérification des sections témoignages et partenaires.
- Ajout d'un affichage d'impact partenaire pour renforcer la preuve sociale.
- Réassurance reformulée pour expliciter l'intégration progressive.
- Ajout de `validate-social-proof` dans la chaîne de lint.
- Follow-up review appliquée: wording réassurance renforcé avec "sans engagement".
- Follow-up review appliquée: séparation typage API/UI sur les partenaires.

### Completion Notes List

- Témoignages et partenaires visibles avec données API.
- Réassurance "observer avant de rejoindre" conservée et renforcée.
- Garde-fou anti-régression dédié story 2.3 ajouté.
- Validation preuve sociale couvre désormais aussi `Impact:` et la mention "sans engagement".
- Typage partenaire clarifié (`PartnerApi` -> `PartnerView`) pour une meilleure maintenabilité.

### File List

- `app/pages/communaute.vue`
- `scripts/validate-social-proof.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/2-3-mettre-en-place-la-preuve-sociale-avis-partenaires-visibles.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-25: Story 2.3 implémentée et passée en review.
- 2026-02-25: Code review appliquée, story finalisée en done.

## Senior Developer Review (AI)

### Outcome

Approve

### Summary

- Réassurance alignée avec un message explicite d'observation sans engagement.
- Garde-fou social-proof renforcé pour couvrir les signaux de crédibilité (`Impact:`).
- Modèle de données partenaires clarifié entre API et vue.

### Action Items

- [x] [MEDIUM] Renforcer le wording de réassurance avec la notion d'absence d'engagement.
- [x] [MEDIUM] Ajouter un contrôle anti-régression sur l'affichage d'impact partenaire.
- [x] [LOW] Séparer les types API/UI pour le modèle partenaire.
