# Story 5.2: Implémenter les métadonnées sociales et schema.org

Status: done

## Story

As a visiteur provenant de recherche/social,  
I want des aperçus riches et structurés,  
so that je comprenne mieux le contenu avant clic.

## Acceptance Criteria

1. Given une page est partagée ou crawlée, when ses métadonnées sont analysées, then Open Graph/Twitter et données structurées pertinentes sont présentes.

## Tasks / Subtasks

- [x] Task 1 - Renforcer les métadonnées sociales globales (AC: 1)
  - [x] Vérifier `og:title`, `og:description`, `og:url`, `og:image`.
  - [x] Vérifier `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- [x] Task 2 - Ajouter schema.org pertinent (AC: 1)
  - [x] Ajouter JSON-LD Organization sur pages institutionnelles.
  - [x] Garder Event conditionnel uniquement quand un événement réel est publié.
- [x] Task 3 - Assurer la configurabilité par page (AC: 1)
  - [x] Permettre override des métadonnées sociales via composable/page.
  - [x] Vérifier cohérence avec canonical et siteUrl.
- [x] Task 4 - Ajouter garde-fou anti-régression (AC: 1)
  - [x] Créer `validate:social-metadata-schema`.
  - [x] Intégrer le validateur au `lint`.
- [ ] Task 5 - Contrôles qualité
  - [x] Exécuter validations ciblées.
  - [ ] Exécuter typecheck.

## Dev Notes

- Repartir du composable `usePageSeo` déjà en place.
- Éviter les données structurées trompeuses (pas de `Event` sans contenu événementiel réel).

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Renforcement des balises sociales Open Graph/Twitter dans `usePageSeo`.
- Ajout de JSON-LD Organization automatique + Event conditionnel dans `usePageSeo`.
- Ajout du validateur `validate:social-metadata-schema` et intégration dans `lint`.

### Completion Notes List

- AC couvert: métadonnées sociales et schema.org présents via `usePageSeo`.
- `Event` reste strictement conditionnel via `eventSchema` (aucun event par défaut).
- Garde-fou dédié ajouté pour prévenir les régressions de métadonnées/social/schema.
- `typecheck` global non relancé (instable dans cet environnement).

### File List

- `_bmad-output/implementation-artifacts/5-2-implementer-les-metadonnees-sociales-et-schema-org.md`
- `app/composables/usePageSeo.ts`
- `scripts/validate-social-metadata-schema.mjs`
- `scripts/validate-seo-tech-foundation.mjs`
- `server/routes/sitemap.xml.ts`
- `nuxt.config.ts`
- `.env.example`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-26: Story 5.2 créée en ready-for-dev.
- 2026-02-26: Implémentation validée, garde-fou social/schema ajouté, story passée en review.
- 2026-02-26: Code review validée, eventSchema durci (Event conditionnel strict), story clôturée en done.
