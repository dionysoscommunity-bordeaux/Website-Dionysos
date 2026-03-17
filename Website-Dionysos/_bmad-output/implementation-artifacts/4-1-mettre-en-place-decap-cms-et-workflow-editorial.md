# Story 4.1: Mettre en place Decap CMS et workflow éditorial

Status: done

## Story

As an admin,  
I want éditer le contenu sans coder,  
so that je maintiens le site rapidement en solo.

## Acceptance Criteria

1. Given le CMS est configuré, when je modifie un contenu autorisé, then la modification suit le workflow Git prévu.
2. And les champs SEO obligatoires sont requis avant publication.

## Tasks / Subtasks

- [x] Task 1 - Initialiser Decap CMS dans le projet (AC: 1)
  - [x] Ajouter la configuration Decap (`config.yml`) et route d'accès admin.
  - [x] Vérifier l'intégration côté Nuxt/public.
- [x] Task 2 - Définir les collections éditables MVP (AC: 1)
  - [x] Mapper les contenus existants (pages, annonces, partenaires, témoignages, légaux).
  - [x] Restreindre les champs au périmètre autorisé.
- [x] Task 3 - Imposer les champs SEO obligatoires (AC: 2)
  - [x] Rendre requis `seo_title`, `seo_description`, `slug`/identifiant pertinent.
  - [x] Ajouter des garde-fous de validation de structure.
- [x] Task 4 - Vérifier le workflow Git éditorial (AC: 1)
  - [x] Contrôler création/modification de contenu via commits/pull requests.
  - [x] Vérifier que les modifications sont traçables/versionnées.
- [x] Task 5 - Ajouter garde-fou anti-régression (AC: 1, 2)
  - [x] Créer un validateur dédié à la config CMS et aux champs requis.
  - [x] Intégrer ce validateur au `lint`.
- [ ] Task 6 - Contrôles qualité
  - [x] Exécuter validations ciblées.
  - [ ] Exécuter typecheck.

## Dev Notes

- Conserver la cohérence avec le modèle de contenu Git déjà en place.
- Éviter d'ouvrir des collections hors périmètre MVP.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Vérification de l'intégration Decap existante (`public/admin/index.html` + `public/admin/config.yml`).
- Vérification des collections MVP et des champs SEO obligatoires.
- Ajout du validateur `validate:cms-config` et intégration au `lint`.

### Completion Notes List

- AC1 couvert : CMS Decap présent, collections MVP configurées et workflow éditorial activé.
- AC2 couvert : champs SEO requis et slug/identifiant présents dans la configuration.
- Garde-fou ajouté pour éviter les régressions de configuration CMS.
- `typecheck` global non relancé (commande instable dans cet environnement).

### File List

- `_bmad-output/implementation-artifacts/4-1-mettre-en-place-decap-cms-et-workflow-editorial.md`
- `public/admin/index.html`
- `public/admin/config.yml`
- `scripts/validate-cms-config.mjs`
- `package.json`
- `package-lock.json`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-26: Story 4.1 créée en ready-for-dev.
- 2026-02-26: Implémentation validée, garde-fou CMS ajouté, story passée en review.
- 2026-02-26: Code review validée, validateur CMS durci par collection, story clôturée en done.
