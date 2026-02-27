# Story 2.4: Ancrer le contenu sur Bordeaux

Status: done

## Story

As a visiteur local,  
I want retrouver des références locales Bordeaux,  
so that le site paraisse pertinent pour ma réalité.

## Acceptance Criteria

1. Given je lis les contenus activités/éditorial, when je navigue dans les pages, then les références locales Bordeaux sont présentes et cohérentes.

## Tasks / Subtasks

- [x] Task 1 - Renforcer l'ancrage local dans le contenu éditorial (AC: 1)
  - [x] Ajouter des références Bordeaux explicites dans l'annonce éditoriale.
  - [x] Renforcer la mention d'ancrage local dans le contenu home éditable.
- [x] Task 2 - Vérifier la cohérence locale sur la page Activités (AC: 1)
  - [x] Confirmer la présence des repères bordelais clés sur la page.
  - [x] Vérifier la cohérence des lieux affichés dans les exemples.
- [x] Task 3 - Ajouter un garde-fou anti-régression local (AC: 1)
  - [x] Créer script `validate:bordeaux-anchor`.
  - [x] Intégrer ce script au `lint`.
- [x] Task 4 - Contrôles qualité
  - [x] Exécuter `npm run lint`.
  - [x] Exécuter `npm run typecheck`.
- [x] Task 5 - Documentation de clôture
  - [x] Mettre à jour Dev Agent Record.
  - [x] Mettre à jour File List.

## Dev Notes

- L'ancrage local est déjà présent côté UI (`app/pages/activites.vue`) et doit rester cohérent avec les contenus éditoriaux.
- Cette story cible surtout la cohérence inter-sources (page + contenus CMS + validation auto).

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Mise à jour de l'annonce éditoriale avec des repères locaux Bordeaux.
- Mise à jour du contenu home éditable avec repères locaux.
- Ajout du script `validate-bordeaux-anchor` et intégration au lint.

### Completion Notes List

- Références locales explicites présentes dans contenus éditoriaux.
- Cohérence locale maintenue entre contenus éditoriaux et page Activités.
- Garde-fou automatique ajouté pour éviter les régressions d'ancrage local.

### File List

- `content/announcements/lancement-semaine.md`
- `content/pages/home.md`
- `scripts/validate-bordeaux-anchor.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/2-4-ancrer-le-contenu-sur-bordeaux.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-25: Story 2.4 implémentée et passée en review.
- 2026-02-25: Code review validée, auto-fix appliqué sur le validateur d'ancrage local, story clôturée en done.
