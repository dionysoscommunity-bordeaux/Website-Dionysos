# Story 1.1: Initialiser la fondation Nuxt 4 du projet

Status: ready-for-dev

## Story

As a developpeur,
I want initialiser le projet avec le starter Nuxt 4 et la stack de base,
so that la base technique soit prete pour implementer les parcours MVP.

## Acceptance Criteria

1. **Given** un repository vide  
   **When** j'execute la commande d'initialisation validee  
   **Then** le projet Nuxt est cree avec TypeScript active.

2. **Given** la fondation technique est en place  
   **When** je verifie la stack MVP  
   **Then** Tailwind, Plausible, configuration Docker et `.env.example` sont presents.

## Tasks / Subtasks

- [ ] Task 1 - Verifier et aligner la fondation Nuxt 4 (AC: 1)
  - [ ] Subtask 1.1 - Verifier que la base Nuxt + TypeScript est operationnelle (`npm run build`)
  - [ ] Subtask 1.2 - Confirmer la presence des modules `@nuxtjs/tailwindcss` et `@nuxtjs/plausible`
  - [ ] Subtask 1.3 - Integrer le durcissement de base `nuxt-security` si absent (conformite architecture)

- [ ] Task 2 - Valider la baseline container et environnement (AC: 2)
  - [ ] Subtask 2.1 - Verifier `Dockerfile` multi-stage compatible Nuxt `.output`
  - [ ] Subtask 2.2 - Verifier `docker-compose.yml` pour execution locale/Dockploy
  - [ ] Subtask 2.3 - Verifier `.env.example` avec variables publiques MVP necessaires

- [ ] Task 3 - Ajouter les controles minimaux de non-regression (AC: 1, 2)
  - [ ] Subtask 3.1 - Ajouter/valider un test de fumee build (commande reproductible)
  - [ ] Subtask 3.2 - Verifier que les commandes npm documentees fonctionnent (`dev`, `build`, `preview`)
  - [ ] Subtask 3.3 - Mettre a jour la documentation minimale de demarrage si necessaire

## Dev Notes

### Contexte produit et architecture

- Story source: `epics.md` -> `Story 1.1`.
- Stack cible imposee: Nuxt 4 + TypeScript + Tailwind + Plausible + Docker multi-stage.
- Durcissement baseline attendu par architecture: `nuxt-security`.
- Cible de deploiement: Dockploy (Compose + variables d'environnement plateforme).

### Contraintes techniques a respecter

- Ne pas introduire de secret cote client.
- Garder les variables publiques sous prefixe `NUXT_PUBLIC_`.
- Conserver la sortie build Nuxt dans `.output` pour le conteneur runtime.
- Eviter toute dependance non necessaire a la story 1.1.

### Fichiers probablement touches

- `package.json`
- `nuxt.config.ts`
- `Dockerfile`
- `docker-compose.yml`
- `.env.example`
- `README.md` (si mise a jour necessaire)

### Tests et verification

- Verification minimale attendue:
  - `npm run build` passe sans erreur.
  - Les fichiers de base de stack sont presents et coherents.
  - Le projet reste lancable localement via Docker/Compose.

### References

- `/_bmad-output/planning-artifacts/epics.md` (Story 1.1, AC)
- `/_bmad-output/planning-artifacts/architecture.md` (stack, security baseline, Docker/Dockploy)
- `/.env.example`
- `/nuxt.config.ts`
- `/Dockerfile`

## Dev Agent Record

### Agent Model Used

- TBD

### Debug Log References

- TBD

### Completion Notes List

- TBD

### File List

- `_bmad-output/implementation-artifacts/1-1-initialiser-la-fondation-nuxt-4-du-projet.md`

## Change Log

- 2026-02-25: Story creee via workflow create-story, contexte de dev consolide pour execution dev-story.
