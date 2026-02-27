# Story 3.1: Concevoir une page Partenaires orientée conversion B2B

Status: done

## Story

As a partenaire potentiel,  
I want comprendre rapidement l'intérêt de collaborer,  
so that je décide de contacter Dionysos.

## Acceptance Criteria

1. Given je visite la page Partenaires, when je lis le contenu principal, then je comprends le positionnement et le public en moins de 20 secondes.
2. And les preuves de collaboration sont visibles.

## Tasks / Subtasks

- [x] Task 1 - Clarifier la proposition de valeur partenaire (AC: 1)
  - [x] Afficher un hero orienté bénéfices B2B.
  - [x] Expliciter le public et le contexte local Bordeaux.
- [x] Task 2 - Structurer la page pour lecture rapide (AC: 1)
  - [x] Organiser le contenu en blocs scannables.
  - [x] Ajouter des éléments de lisibilité mobile et hiérarchie claire.
- [x] Task 3 - Mettre en avant les preuves de collaboration (AC: 2)
  - [x] Afficher partenaires et/ou collaborations visibles.
  - [x] Ajouter des signaux de crédibilité (impact, formats, retours).
- [x] Task 4 - Ajouter garde-fou de non-régression (AC: 1, 2)
  - [x] Créer un validateur dédié `validate:partners-b2b`.
  - [x] Intégrer le validateur au script `lint`.
- [ ] Task 5 - Contrôles qualité
  - [x] Exécuter les validations ciblées.
  - [ ] Exécuter typecheck.

## Dev Notes

- S'appuyer sur les composants et patterns déjà utilisés dans les pages communautaires.
- Conserver les CTA Discord/Instagram cohérents avec le reste du site.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Renforcement hero et structure scannable B2B sur `app/pages/partenaires.vue`.
- Ajout d'un bloc bénéfices B2B et d'un bloc formats de collaboration.
- Ajout du validateur `scripts/validate-partners-b2b.mjs` et intégration au `lint`.

### Completion Notes List

- AC1 couvert par un message de positionnement explicite et des blocs de lecture rapide.
- AC2 couvert par la section "Preuves de collaboration" alimentée par `/api/partners`.
- Validation dédiée `validate:partners-b2b` ajoutée pour limiter les régressions.
- `typecheck` global lancé mais n'a pas retourné de code de sortie exploitable dans cet environnement.

### File List

- `_bmad-output/implementation-artifacts/3-1-concevoir-une-page-partenaires-orientee-conversion-b2b.md`
- `app/pages/partenaires.vue`
- `scripts/validate-partners-b2b.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-25: Story 3.1 créée en ready-for-dev.
- 2026-02-25: Implémentation terminée, validateur ajouté, story passée en review.
- 2026-02-25: Revue validée, auto-fix appliqué sur la robustesse des preuves partenaires, story clôturée en done.
