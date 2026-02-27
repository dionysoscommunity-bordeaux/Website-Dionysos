---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - /Users/paulo/Documents/Projet perso/Website-Dionysos/_bmad-output/planning-artifacts/prd.md
  - /Users/paulo/Documents/Projet perso/Website-Dionysos/_bmad-output/planning-artifacts/architecture.md
  - /Users/paulo/Documents/Projet perso/Website-Dionysos/_bmad-output/planning-artifacts/prd-validation-report.md
workflowType: 'epics-and-stories'
status: 'complete'
completedAt: '2026-02-24'
---

# Website-Dionysos - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Website-Dionysos, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Les visiteurs peuvent voir dès l'arrivée une proposition de valeur claire expliquant ce qu'est Dionysos Bordeaux.
FR2: Les visiteurs peuvent comprendre explicitement que Dionysos est une communauté de rencontres amicales (non dating).
FR3: Les visiteurs peuvent consulter une présentation synthétique du fonctionnement de la communauté ("comment ça marche").
FR4: Les visiteurs peuvent identifier les bénéfices principaux (sortir, rencontrer du monde, participer à des activités conviviales) en moins de 10 secondes après l'arrivée sur la page d'accueil.
FR5: Les visiteurs peuvent accéder à une section expliquant les valeurs de la communauté (inclusion, bienveillance, authenticité).
FR6: Les visiteurs peuvent consulter les types d'activités proposées par Dionysos (restau, balades, bars, jeux, culture) via une liste explicitement publiée et maintenue à jour.
FR7: Les visiteurs peuvent voir des exemples concrets de sorties réalisées.
FR8: Les visiteurs peuvent parcourir des contenus visuels représentatifs de l'ambiance de la communauté.
FR9: Les visiteurs peuvent consulter des contenus éditoriaux communautaires publiés par catégorie (annonces, actualités, événements) avec date de publication visible.
FR10: Les visiteurs peuvent consulter des contenus orientés Bordeaux (contexte local, lieux, communauté locale).
FR11: Les visiteurs peuvent rejoindre la communauté via un lien direct vers Discord.
FR12: Les visiteurs peuvent accéder au compte Instagram officiel depuis des points d'entrée visibles.
FR13: Les visiteurs peuvent voir des appels à l'action de rejoindre la communauté sur l'ensemble des pages clés.
FR14: Les visiteurs peuvent rejoindre la communauté sans création de compte sur le site.
FR15: Les visiteurs peuvent comprendre qu'aucun engagement obligatoire n'est requis avant de rejoindre.
FR16: Les visiteurs peuvent consulter des témoignages membres publiés par Dionysos.
FR17: Les visiteurs peuvent identifier les partenaires locaux actuels de la communauté.
FR18: Les visiteurs peuvent consulter une section dédiée aux partenariats avec contexte de collaboration.
FR19: Les visiteurs peuvent accéder à une section de réassurance incluant explicitement "observer avant de rejoindre" et "intégration progressive" sur au moins les pages Accueil et Rejoindre.
FR20: Les partenaires potentiels peuvent comprendre le positionnement et le public de Dionysos en moins de 20 secondes sur la page Partenaires.
FR21: Les partenaires potentiels peuvent initier un contact via un canal dédié (email direct ou formulaire partenaire léger).
FR22: Les partenaires potentiels peuvent soumettre une demande de partenariat avec informations essentielles.
FR23: Les partenaires potentiels peuvent recevoir une confirmation que leur demande a bien été transmise.
FR24: Les administrateurs peuvent créer, modifier et supprimer les contenus de pages principales.
FR25: Les administrateurs peuvent ajouter, modifier et retirer des témoignages.
FR26: Les administrateurs peuvent ajouter, modifier et retirer des partenaires (logo, description, lien).
FR27: Les administrateurs peuvent publier des annonces ou mises à jour communautaires.
FR28: Les administrateurs peuvent mettre à jour les liens sociaux et points de contact.
FR29: Les administrateurs peuvent gérer les médias publiés (images) avec métadonnées associées.
FR30: Les administrateurs peuvent appliquer un contrôle éditorial avant publication avec checklist minimale (cohérence message, consentement image, absence de données sensibles, présence métadonnées SEO).
FR31: Les visiteurs et moteurs peuvent accéder à des pages avec intention éditoriale claire (une intention principale par page).
FR32: Le système peut exposer un plan de pages indexables par les moteurs de recherche.
FR33: Le système peut exposer un fichier robots.txt configurable.
FR34: Le système peut définir des métadonnées SEO par page (title, description, canonical).
FR35: Le système peut publier des métadonnées de partage social (Open Graph/Twitter).
FR36: Le système peut publier des données structurées pertinentes pour les contenus éligibles (Organization pour les pages institutionnelles, Event uniquement lorsqu'un événement est effectivement publié).
FR37: Les visiteurs peuvent accéder aux mentions légales.
FR38: Les visiteurs peuvent accéder à une politique de confidentialité.
FR39: Les visiteurs peuvent accéder aux informations de gestion des cookies applicables.
FR40: Les administrateurs peuvent mettre à jour les contenus légaux sans modifier le code source.
FR41: Les administrateurs peuvent consulter un tableau de bord KPI SEO mensuel (positions mots-clés cibles, impressions, clics organiques) pour suivre la progression vers les objectifs business.
FR42: Les administrateurs peuvent suivre les conversions d'acquisition communautaire depuis le site (clics Discord/Instagram et provenance des nouveaux membres déclarée).

### NonFunctional Requirements

NFR1: Les pages publiques principales doivent atteindre un LCP <= 2.5s sur mobile en conditions réalistes.
NFR2: Les interactions utilisateur doivent viser INP <= 200ms.
NFR3: La stabilité visuelle doit maintenir CLS <= 0.1.
NFR4: Les pages MVP doivent atteindre Lighthouse mobile: Performance >= 90, SEO >= 95, Best Practices >= 95, Accessibility >= 90.
NFR5: Le chargement initial doit limiter les ressources bloquantes à moins de 150 Ko critiques sur mobile (mesuré via audit Lighthouse en production).
NFR6: Le site doit rediriger 100% des requêtes HTTP vers HTTPS et maintenir une couverture TLS de 100% des pages publiques (vérification mensuelle via scan automatisé).
NFR7: Les zones d'administration doivent exiger une authentification forte et refuser les accès non autorisés avec un taux de blocage attendu de 100% lors des tests de contrôle d'accès trimestriels.
NFR8: Les secrets d'intégration ne doivent jamais être présents dans le code client; 0 secret exposé en build production selon audit de bundle à chaque release.
NFR9: Les données personnelles minimales (emails partenaire, journaux techniques) doivent respecter une politique de minimisation et de rétention documentée (revue mensuelle des champs collectés et purge selon politique active).
NFR10: Les documents légaux (mentions, confidentialité, cookies) doivent être accessibles avec une disponibilité mensuelle >= 99.9% depuis le footer, et versionnés à chaque mise à jour.
NFR11: Le site doit absorber une croissance de trafic x10 par rapport au baseline de lancement avec une dégradation de performance <= 10% sur les Web Vitals clés en test de charge semestriel.
NFR12: En cas de pic de trafic (campagne ou événement), le parcours critique (page d'accueil -> rejoindre) doit rester disponible à 99.9% sur la fenêtre de pic (mesuré par monitoring synthétique).
NFR13: Le flux de publication doit supporter l'ajout de nouveaux contenus éditoriaux sans dépasser un temps de build/deploy de 10 minutes sur l'environnement de production.
NFR14: Le produit doit satisfaire WCAG 2.2 AA sur 100% des pages MVP validées avant mise en production.
NFR15: 100% des composants interactifs des parcours MVP doivent être utilisables au clavier avec focus visible, vérifié par test manuel à chaque release.
NFR16: Les contrastes texte/composants doivent respecter les seuils AA, avec 0 blocage critique remonté par audit d'accessibilité avant publication.
NFR17: 100% des images informatives doivent inclure un texte alternatif non vide, contrôlé par revue éditoriale pré-publication.
NFR18: La structure sémantique (titres, landmarks, langue de page) doit obtenir un taux de conformité >= 95% sur les pages principales lors d'un audit automatisé mensuel, avec 0 erreur critique ouverte avant publication.
NFR19: Les liens Discord et Instagram doivent maintenir un taux de disponibilité de 99.9% (vérification automatique quotidienne des URLs critiques).
NFR20: Le suivi analytics doit remonter les événements clés (clic Discord, clic Instagram, navigation pages MVP) avec un taux de collecte valide >= 95% sur les sessions trackées.
NFR21: Le site doit rester compatible avec les outils d'indexation moteur (Search Console, exploration robots) avec 0 erreur bloquante d'indexation persistante sur plus de 7 jours.
NFR22: Si un CMS est retenu, le pipeline de publication doit imposer les champs SEO obligatoires (title, description, slug) avant autorisation de publication.

### Additional Requirements

- Starter template imposé par Architecture: Nuxt official starter (Nuxt 4) avec commande `npm create nuxt@latest website-dionysos` (à traiter dans Epic 1 Story 1).
- Stack de base confirmée: Nuxt 4 + TypeScript + Tailwind CSS + Docker multi-stage + Docker Compose pour Dockploy.
- Déploiement cible: Dockploy, variables d'environnement gérées par plateforme, healthchecks et logs requis.
- Sécurité baseline: module `nuxt-security` + gestion stricte des secrets (jamais côté client).
- Analytics MVP recommandée: `@nuxtjs/plausible` (privacy-friendly, simple), tracking conversion Discord/Instagram obligatoire.
- Modèle de contenu MVP: Git-based content avec édition via Decap CMS (pas de base SQL applicative au démarrage).
- API pattern imposé: Nitro server routes REST JSON, format de réponse standard `ok/data/meta` et `ok/error`.
- Validation serveur imposée: schémas TypeScript/Zod pour payloads endpoints publics.
- Contraintes transverses de cohérence agents: conventions de nommage, structure, format API, error/loading patterns documentées dans l'architecture.
- Mapping FR -> structure existant: pages, components, composables, server/api, content, legal déjà cadrés (source de vérité technique).
- CI/CD et qualité: lint + typecheck + tests + contrôles SEO/perf dans le pipeline.
- Point QA optionnel issu validation report: isoler le critère "tests utilisateurs 5-10 personnes" dans une section QA dédiée.

### FR Coverage Map

FR1: Epic 1 - Clarifier immédiatement la proposition de valeur.
FR2: Epic 1 - Expliciter le positionnement amical non-dating.
FR3: Epic 1 - Expliquer le fonctionnement "comment ca marche".
FR4: Epic 1 - Garantir compréhension des bénéfices en moins de 10 secondes.
FR5: Epic 1 - Mettre en avant les valeurs de la communauté.
FR6: Epic 2 - Publier une liste maintenue des types d'activités.
FR7: Epic 2 - Montrer des exemples concrets de sorties.
FR8: Epic 2 - Présenter des contenus visuels d'ambiance.
FR9: Epic 2 - Structurer et dater les contenus éditoriaux.
FR10: Epic 2 - Mettre en avant l'ancrage local Bordeaux.
FR11: Epic 1 - Offrir un accès direct à Discord.
FR12: Epic 1 - Offrir un accès visible à Instagram.
FR13: Epic 1 - Rendre les CTA rejoindre visibles sur pages clés.
FR14: Epic 1 - Permettre de rejoindre sans compte site.
FR15: Epic 1 - Réassurer sur l'absence d'engagement obligatoire.
FR16: Epic 2 - Publier des témoignages membres.
FR17: Epic 2 - Identifier les partenaires locaux.
FR18: Epic 2 - Présenter le contexte de collaboration des partenaires.
FR19: Epic 2 - Ajouter une section de réassurance explicite.
FR20: Epic 3 - Permettre la compréhension du positionnement partenaire en <20s.
FR21: Epic 3 - Proposer un canal dédié de contact partenaire.
FR22: Epic 3 - Permettre la soumission d'une demande partenaire.
FR23: Epic 3 - Confirmer la bonne transmission de la demande.
FR24: Epic 4 - Créer/éditer/supprimer les contenus de pages.
FR25: Epic 4 - Gérer les témoignages.
FR26: Epic 4 - Gérer les partenaires.
FR27: Epic 4 - Publier des annonces communautaires.
FR28: Epic 4 - Gérer les liens sociaux.
FR29: Epic 4 - Gérer les médias et métadonnées.
FR30: Epic 4 - Imposer une checklist éditoriale avant publication.
FR31: Epic 5 - Assurer une intention éditoriale claire par page.
FR32: Epic 5 - Exposer un plan de pages indexables.
FR33: Epic 5 - Exposer un robots.txt configurable.
FR34: Epic 5 - Définir les métadonnées SEO par page.
FR35: Epic 5 - Publier les métadonnées social sharing.
FR36: Epic 5 - Publier les données structurées pertinentes.
FR37: Epic 1 - Donner accès aux mentions légales.
FR38: Epic 1 - Donner accès à la politique de confidentialité.
FR39: Epic 1 - Donner accès aux informations cookies.
FR40: Epic 4 - Permettre la mise à jour des contenus légaux sans code.
FR41: Epic 5 - Fournir un suivi KPI SEO mensuel.
FR42: Epic 5 - Suivre les conversions Discord/Instagram.

## Epic List

### Epic 1: Découvrir Dionysos et rejoindre sans friction
Permettre à un visiteur de comprendre immédiatement l'identité de Dionysos, se sentir en confiance, puis rejoindre via Discord/Instagram sans obstacle.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR11, FR12, FR13, FR14, FR15, FR37, FR38, FR39

### Epic 2: Explorer les activités et les preuves sociales
Permettre aux visiteurs de voir la réalité de la communauté (activités, ambiance, témoignages, réassurance) pour se projeter.
**FRs covered:** FR6, FR7, FR8, FR9, FR10, FR16, FR17, FR18, FR19

### Epic 3: Activer le parcours partenaire local
Permettre à un partenaire local de comprendre rapidement la proposition de valeur et de prendre contact simplement.
**FRs covered:** FR20, FR21, FR22, FR23

### Epic 4: Opérer le contenu en autonomie (admin solo)
Permettre aux admins de publier/mettre à jour l'ensemble du contenu de manière sûre et cohérente, sans modifier le code.
**FRs covered:** FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR40

### Epic 5: Assurer la découvrabilité SEO et le pilotage KPI
Permettre au site d'être correctement indexé, partagé et mesuré pour piloter la croissance organique.
**FRs covered:** FR31, FR32, FR33, FR34, FR35, FR36, FR41, FR42

## Epic 1: Découvrir Dionysos et rejoindre sans friction

Permettre à un visiteur de comprendre immédiatement l'identité de Dionysos, se sentir en confiance, puis rejoindre via Discord/Instagram sans obstacle.

### Story 1.1: Initialiser la fondation Nuxt 4 du projet

As a développeur,
I want initialiser le projet avec le starter Nuxt 4 et la stack de base,
So that la base technique soit prête pour implémenter les parcours MVP.

**Acceptance Criteria:**

**Given** un repository vide
**When** j'exécute la commande d'initialisation validée
**Then** le projet Nuxt est créé avec TypeScript activé
**And** Tailwind, Plausible, configuration Docker et `.env.example` sont présents.

### Story 1.2: Construire la home orientée "qui on est"

As a visiteur,
I want voir immédiatement ce qu'est Dionysos et ses valeurs,
So that je sache en moins de 10 secondes si c'est fait pour moi.

**Acceptance Criteria:**

**Given** j'arrive sur la page d'accueil
**When** la page se charge
**Then** la proposition de valeur et la distinction non-dating sont visibles au-dessus de la ligne de flottaison
**And** les bénéfices principaux sont lisibles sans effort.

### Story 1.3: Intégrer les CTA de conversion Discord/Instagram

As a visiteur,
I want rejoindre facilement la communauté,
So that je passe à l'action sans friction.

**Acceptance Criteria:**

**Given** je navigue sur les pages clés
**When** je cherche comment rejoindre
**Then** les CTA Discord et Instagram sont visibles
**And** aucun compte site n'est requis avant redirection.

### Story 1.4: Publier les pages légales MVP

As a visiteur,
I want accéder aux informations légales,
So that je puisse faire confiance au site.

**Acceptance Criteria:**

**Given** je consulte le footer
**When** je clique sur mentions/confidentialité/cookies
**Then** j'accède aux pages légales correspondantes
**And** ces pages sont lisibles sur mobile.

## Epic 2: Explorer les activités et les preuves sociales

Permettre aux visiteurs de voir la réalité de la communauté (activités, ambiance, témoignages, réassurance) pour se projeter.

### Story 2.1: Créer la page Activités avec taxonomie claire

As a visiteur,
I want voir les types d'activités proposées,
So that je me projette dans la communauté.

**Acceptance Criteria:**

**Given** je visite la page Activités
**When** la page s'affiche
**Then** une liste explicite des types d'activités est visible
**And** les contenus associés sont publiés avec métadonnées utiles.

### Story 2.2: Ajouter galerie visuelle et exemples concrets

As a visiteur,
I want voir des exemples réels de sorties,
So that je comprenne l'ambiance et le format des événements.

**Acceptance Criteria:**

**Given** je parcours les sections visuelles
**When** les médias se chargent
**Then** les contenus sont représentatifs et optimisés
**And** chaque image informative dispose d'un texte alternatif.

### Story 2.3: Mettre en place la preuve sociale (avis + partenaires visibles)

As a visiteur,
I want lire des retours membres et voir les partenaires,
So that je sois rassuré sur la crédibilité de Dionysos.

**Acceptance Criteria:**

**Given** je visite Avis et Partenaires
**When** je consulte les blocs de preuve sociale
**Then** témoignages et éléments partenaires sont visibles
**And** une section de réassurance "observer avant de rejoindre" est accessible.

### Story 2.4: Ancrer le contenu sur Bordeaux

As a visiteur local,
I want retrouver des références locales Bordeaux,
So that le site paraisse pertinent pour ma réalité.

**Acceptance Criteria:**

**Given** je lis les contenus activités/éditorial
**When** je navigue dans les pages
**Then** les références locales Bordeaux sont présentes et cohérentes.

## Epic 3: Activer le parcours partenaire local

Permettre à un partenaire local de comprendre rapidement la proposition de valeur et de prendre contact simplement.

### Story 3.1: Concevoir une page Partenaires orientée conversion B2B

As a partenaire potentiel,
I want comprendre rapidement l'intérêt de collaborer,
So that je décide de contacter Dionysos.

**Acceptance Criteria:**

**Given** je visite la page Partenaires
**When** je lis le contenu principal
**Then** je comprends le positionnement et le public en moins de 20 secondes
**And** les preuves de collaboration sont visibles.

### Story 3.2: Implémenter le canal de contact partenaire

As a partenaire potentiel,
I want soumettre une demande facilement,
So that je puisse initier une collaboration.

**Acceptance Criteria:**

**Given** je veux prendre contact
**When** je soumets la demande via le canal dédié
**Then** les champs essentiels sont validés
**And** je reçois une confirmation explicite de transmission.

## Epic 4: Opérer le contenu en autonomie (admin solo)

Permettre aux admins de publier/mettre à jour l'ensemble du contenu de manière sûre et cohérente, sans modifier le code.

### Story 4.1: Mettre en place Decap CMS et workflow éditorial

As an admin,
I want éditer le contenu sans coder,
So that je maintiens le site rapidement en solo.

**Acceptance Criteria:**

**Given** le CMS est configuré
**When** je modifie un contenu autorisé
**Then** la modification suit le workflow Git prévu
**And** les champs SEO obligatoires sont requis avant publication.

### Story 4.2: Gérer témoignages, partenaires et annonces

As an admin,
I want CRUD les sections communautaires,
So that le site reste vivant et à jour.

**Acceptance Criteria:**

**Given** je suis authentifié côté CMS
**When** je crée/modifie/supprime témoignages, partenaires ou annonces
**Then** les changements sont versionnés et publiables sans intervention code.

### Story 4.3: Appliquer la checklist qualité avant publication

As an admin,
I want une checklist éditoriale de publication,
So that je limite les risques message/consentement/données/SEO.

**Acceptance Criteria:**

**Given** une publication est en cours
**When** je finalise le contenu
**Then** la checklist minimale est complétée
**And** une publication incomplète est bloquée.

### Story 4.4: Gérer les contenus légaux via CMS

As an admin,
I want mettre à jour les contenus légaux sans code,
So that conformité et maintenance restent simples.

**Acceptance Criteria:**

**Given** une mise à jour légale est nécessaire
**When** j'édite le contenu légal dédié
**Then** la nouvelle version est publiée et historisée.

## Epic 5: Assurer la découvrabilité SEO et le pilotage KPI

Permettre au site d'être correctement indexé, partagé et mesuré pour piloter la croissance organique.

### Story 5.1: Implémenter le socle SEO technique

As a moteur de recherche,
I want des pages techniquement indexables,
So that le site soit correctement crawlé et classé.

**Acceptance Criteria:**

**Given** le site est déployé
**When** les robots explorent le site
**Then** sitemap, robots et canonical sont disponibles et cohérents
**And** les métadonnées SEO par page sont configurables.

### Story 5.2: Implémenter les métadonnées sociales et schema.org

As a visiteur provenant de recherche/social,
I want des aperçus riches et structurés,
So that je comprenne mieux le contenu avant clic.

**Acceptance Criteria:**

**Given** une page est partagée ou crawlée
**When** ses métadonnées sont analysées
**Then** Open Graph/Twitter et données structurées pertinentes sont présentes.

### Story 5.3: Mettre en place le tracking conversion et KPI SEO

As an admin,
I want suivre les clics de conversion et KPI SEO,
So that je pilote la progression business.

**Acceptance Criteria:**

**Given** un visiteur clique Discord/Instagram
**When** l'événement est envoyé
**Then** il est collecté avec la qualité cible
**And** un tableau de bord mensuel expose positions, impressions, clics et conversions.

### Story 5.4: Intégrer les garde-fous perf/accessibilité/sécurité en pipeline

As a équipe produit,
I want des quality gates automatiques,
So that chaque release reste conforme aux NFR.

**Acceptance Criteria:**

**Given** une release candidate est prête
**When** les contrôles de qualité s'exécutent
**Then** les seuils perf/SEO/accessibilité/sécurité sont vérifiés
**And** un échec critique bloque la mise en production.
