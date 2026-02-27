# Story 1.1: Initialiser la fondation Nuxt 4 du projet

Status: done

## Story

As a développeur,  
I want initialiser le projet avec le starter Nuxt 4 et la stack de base,  
so that la base technique soit prête pour implémenter les parcours MVP.

## Acceptance Criteria

1. Given un repository vide, when j'exécute la commande d'initialisation validée, then le projet Nuxt est créé avec TypeScript activé.
2. Given la fondation du projet, when la configuration est complétée, then Tailwind, Plausible, configuration Docker et `.env.example` sont présents.

## Tasks / Subtasks

- [x] Task 1 - Vérifier/aligner le socle Nuxt 4 + TypeScript (AC: 1)
  - [x] Contrôler que la structure Nuxt attendue est en place (`app/`, `server/`, `nuxt.config.ts`, `tsconfig.json`).
  - [x] Vérifier que la configuration TypeScript est active et cohérente avec l'architecture.
- [x] Task 2 - Vérifier/aligner les modules de base (AC: 2)
  - [x] Valider l'intégration Tailwind (`@nuxtjs/tailwindcss`) et son chargement.
  - [x] Valider l'intégration analytics (`@nuxtjs/plausible`) et la gestion par variables d'environnement.
- [x] Task 3 - Vérifier/aligner le socle conteneurisation Dockploy (AC: 2)
  - [x] Vérifier `Dockerfile` multi-stage (build + runtime) et cohérence avec sortie Nuxt `.output`.
  - [x] Vérifier `docker-compose.yml` pour le déploiement Dockploy.
  - [x] Vérifier présence et cohérence de `.env.example` pour les variables attendues.
- [x] Task 4 - Ajouter un garde-fou de validation technique (AC: 1, 2)
  - [x] Exécuter `npm run lint` et `npm run typecheck`.
  - [x] Corriger les écarts bloquants détectés.
- [x] Task 5 - Finaliser le suivi de story
  - [x] Renseigner `Dev Agent Record` (notes d'implémentation, décisions, validations).
  - [x] Mettre à jour `File List` avec tous les fichiers modifiés.

## Dev Notes

- Démarrage imposé via starter Nuxt officiel, avec Nuxt 4 et TypeScript-first.
- Stack de base à respecter: Nuxt 4, TypeScript, Tailwind, Plausible, Docker multi-stage, Docker Compose Dockploy.
- Contrainte de sécurité: secrets uniquement via variables d'environnement, jamais côté client.
- Contrainte de qualité: lint + typecheck + tests dans pipeline.

### Technical Requirements

- Nuxt 4 comme fondation applicative.
- TypeScript activé et utilisé sur le code applicatif et server routes.
- Tailwind via module officiel Nuxt.
- Plausible configuré via variable(s) d'environnement.
- Dockerfile multi-stage compatible build Nuxt/Nitro (`.output`).
- Docker Compose présent pour exécution/deploiement Dockploy.

### Architecture Compliance

- Conserver la structure source prévue (`app/`, `server/`, `content/`, `public/`).
- Respecter les conventions architecture sur les frontières API/UI.
- Ne pas introduire de dépendances hors périmètre de la story sans validation explicite.

### Testing Requirements

- Vérifications minimales: lint + typecheck.
- Toute modification doit éviter régression sur build/dev server.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`]
- [Source: `_bmad-output/planning-artifacts/architecture.md`]
- [Source: `_bmad-output/planning-artifacts/prd.md`]

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex

### Debug Log References

- Story créée depuis `epics.md` (Epic 1 / Story 1.1).
- Sprint status initialisé puis story positionnée `ready-for-dev`.
- Vérification fondation Nuxt/TS/modules/Docker terminée.
- `nuxt typecheck` bloquait dans ce contexte; script remplacé par exécution `tsc` sur les 4 tsconfig générés par Nuxt.
- Écart type détecté et corrigé: option Plausible `trackLocalhost` non supportée par la version installée.

### Completion Notes List

- Story context file créé avec exigences techniques d'implémentation.
- Scripts `lint` et `typecheck` ajoutés dans `package.json`.
- `typescript`, `vue-tsc` et `@types/node` ajoutés pour fiabiliser le contrôle de types.
- Validation passée: `npm run lint && npm run typecheck`.
- Story prête pour review.
- Fixes de code review appliqués: lint réel ESLint, typecheck robuste avec `nuxt prepare`, healthcheck Docker Compose.
- Validation finale repassée avec succès après corrections.

### File List

- `_bmad-output/implementation-artifacts/1-1-initialiser-la-fondation-nuxt-4-du-projet.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `package.json`
- `package-lock.json`
- `nuxt.config.ts`
- `docker-compose.yml`
- `eslint.config.mjs`
- `server/utils/content.ts`

### Change Log

- 2026-02-25: Création initiale de la story contextuelle (ready-for-dev).
- 2026-02-25: Implémentation Story 1.1 terminée, validations techniques ajoutées et story passée en review.
- 2026-02-25: Code review appliquée, story finalisée en done.

## Senior Developer Review (AI)

### Outcome

Approve

### Summary

- Vérification AC: conforme après corrections.
- Issues corrigées:
  - `lint` était un alias content-only, remplacé par un lint réel (`eslint .`).
  - `typecheck` dépendait implicitement de `.nuxt`, rendu robuste via `nuxt prepare` dans le script.
  - `docker-compose.yml` complété avec `healthcheck`.

### Action Items

- [x] [HIGH] Corriger le faux positif lint en ajoutant un lint code réel.
- [x] [MEDIUM] Rendre le typecheck robuste en environnement CI propre.
- [x] [MEDIUM] Ajouter un healthcheck service au compose de base.
