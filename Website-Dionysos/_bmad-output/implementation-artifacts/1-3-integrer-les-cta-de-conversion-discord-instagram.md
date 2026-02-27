# Story 1.3: Intégrer les CTA de conversion Discord/Instagram

Status: done

## Story

As a visiteur,  
I want rejoindre facilement la communauté,  
so that je passe à l'action sans friction.

## Acceptance Criteria

1. Given je navigue sur les pages clés, when je cherche comment rejoindre, then les CTA Discord et Instagram sont visibles.
2. Given je clique un CTA de conversion, when je suis redirigé, then aucun compte site n'est requis avant redirection.

## Tasks / Subtasks

- [x] Task 1 - Vérifier la présence des CTA sur les pages clés (AC: 1)
  - [x] Confirmer la présence des CTA sur la home.
  - [x] Ajouter les CTA manquants sur les pages clés pertinentes.
- [x] Task 2 - Clarifier la friction d'entrée (AC: 2)
  - [x] Ajouter un message explicite sur l'absence de création de compte site avant redirection.
  - [x] Harmoniser les liens Discord/Instagram vers les URLs officielles.
- [x] Task 3 - Ajouter une validation automatisée anti-régression (AC: 1, 2)
  - [x] Créer un script de validation des CTA sur les pages clés.
  - [x] Intégrer ce contrôle au script `lint`.
- [x] Task 4 - Contrôles qualité
  - [x] Exécuter `npm run lint`.
  - [x] Exécuter `npm run typecheck`.
- [x] Task 5 - Documentation de clôture
  - [x] Mettre à jour le Dev Agent Record.
  - [x] Mettre à jour la File List.

## Dev Notes

- Les CTA globaux existent déjà dans le header, mais les pages clés doivent aussi expliciter le parcours de conversion.
- Renforcement appliqué sur `activites.vue` et `partenaires.vue`.
- Uniformisation des liens dans `communaute.vue`.
- Message explicite ajouté sur la home: aucun compte site requis.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Story 1.3 créée puis implémentée dans la continuité des stories 1.1/1.2.
- Ajout de sections CTA sur pages clés pour visibilité conversion.
- Script `validate-cta-links` ajouté et intégré au lint.
- Liens CTA harmonisés sur les URLs officielles.
- Fixes de code review appliqués: harmonisation aussi dans `app/app.vue`, script CTA recentré sur le périmètre de la story.

### Completion Notes List

- CTA Discord/Instagram visibles sur les pages clés.
- Mention explicite "Aucun compte site..." ajoutée pour supprimer la friction perçue.
- Contrôle automatisé ajouté pour éviter les régressions CTA.
- Header et footer alignés sur les URLs officielles Discord/Instagram.
- Validation CTA couvre maintenant `app/app.vue` et les pages clés.

### File List

- `app/app.vue`
- `app/pages/index.vue`
- `app/pages/activites.vue`
- `app/pages/partenaires.vue`
- `app/pages/communaute.vue`
- `scripts/validate-cta-links.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/1-3-integrer-les-cta-de-conversion-discord-instagram.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-25: Story 1.3 implémentée et passée en review.
- 2026-02-25: Code review appliquée, story finalisée en done.

## Senior Developer Review (AI)

### Outcome

Approve

### Summary

- Liens CTA officiels harmonisés sur pages clés + shell global (`app/app.vue`).
- Validation automatisée CTA renforcée pour inclure le header/footer.
- Contrôle CTA découplé des vérifications de copy non liées à la story.

### Action Items

- [x] [HIGH] Harmoniser les liens CTA aussi dans `app/app.vue`.
- [x] [MEDIUM] Étendre le contrôle CTA aux CTA globaux.
- [x] [MEDIUM] Supprimer du contrôle CTA les checks non liés au périmètre 1.3.
