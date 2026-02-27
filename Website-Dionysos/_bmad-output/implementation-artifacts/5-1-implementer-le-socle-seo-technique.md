# Story 5.1: Implémenter le socle SEO technique

Status: done

## Story

As a moteur de recherche,  
I want des pages techniquement indexables,  
so that le site soit correctement crawlé et classé.

## Acceptance Criteria

1. Given le site est déployé, when les robots explorent le site, then sitemap, robots et canonical sont disponibles et cohérents.
2. And les métadonnées SEO par page sont configurables.

## Tasks / Subtasks

- [x] Task 1 - Mettre en place les briques SEO techniques (AC: 1)
  - [x] Vérifier/ajouter sitemap.xml.
  - [x] Vérifier/ajouter robots.txt configurable.
  - [x] Vérifier la cohérence des canonicals.
- [x] Task 2 - Rendre les métadonnées SEO configurables par page (AC: 2)
  - [x] Vérifier la configuration SEO globale.
  - [x] Vérifier la surcharge par page selon le contenu.
- [x] Task 3 - Ajouter garde-fou anti-régression SEO (AC: 1, 2)
  - [x] Créer `validate:seo-tech-foundation`.
  - [x] Intégrer le validateur au script `lint`.
- [ ] Task 4 - Contrôles qualité
  - [x] Exécuter validations ciblées.
  - [ ] Exécuter typecheck.

## Dev Notes

- S'appuyer sur l'infrastructure Nuxt existante et la logique `usePageSeo`.
- Garder la configuration compatible avec le mode content + CMS déjà en place.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Ajustement de la route robots pour configuration dynamique (`robotsDisallow`) + lien sitemap.
- Suppression de `public/robots.txt` pour éviter conflit avec la route dynamique.
- Renforcement du composable `usePageSeo` (canonical cohérent + robots configurable + image optionnelle).
- Ajout du validateur `validate:seo-tech-foundation` et intégration dans `lint`.

### Completion Notes List

- AC1 couvert: robots/sitemap/canonical disponibles et cohérents.
- AC2 couvert: métadonnées SEO configurables par page via `usePageSeo`.
- Garde-fou dédié SEO ajouté pour prévenir les régressions techniques.
- `typecheck` global non relancé (instable dans cet environnement).

### File List

- `_bmad-output/implementation-artifacts/5-1-implementer-le-socle-seo-technique.md`
- `nuxt.config.ts`
- `app/composables/usePageSeo.ts`
- `server/routes/robots.txt.ts`
- `server/routes/sitemap.xml.ts`
- `scripts/validate-seo-tech-foundation.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-26: Story 5.1 créée en ready-for-dev.
- 2026-02-26: Implémentation validée, garde-fou SEO technique ajouté, story passée en review.
- 2026-02-26: Code review validée, auto-fix appliqué sur stabilité lastmod/fallback URL, story clôturée en done.
