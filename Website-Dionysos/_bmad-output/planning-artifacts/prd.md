---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete', 'step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
inputDocuments:
  - /Users/paulo/Documents/Projet perso/Website-Dionysos/_bmad-output/brainstorming/brainstorming-session-2026-02-23.md
  - /Users/paulo/.cursor/projects/Users-paulo-Documents-Projet-perso-Website-Dionysos/assets/image-26d23265-3666-4be2-ab51-f06d58e802eb.png
workflowType: 'prd'
workflow: 'edit'
date: '2026-02-24'
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
lastEdited: '2026-02-24'
editHistory:
  - date: '2026-02-24'
    changes: 'NFR measurability tightening, implementation-leakage cleanup, FR SMART refinements, KPI traceability additions'
---

# Product Requirements Document - Website-Dionysos

**Author:** Paulo
**Date:** 2026-02-24

## Executive Summary

Dionysos Bordeaux est une communauté locale 100% amicale qui facilite les rencontres amicales dans la vraie vie à Bordeaux via des activités variées (restaurants, balades, bars, jeux, culture). Le produit à construire est un site vitrine SEO-first, responsive et performant, dont l'objectif principal est de faire comprendre immédiatement l'identité de la communauté, puis d'orienter naturellement les visiteurs vers le serveur Discord.

Le site ne vise pas un modèle de collecte de leads ni de funnel agressif. L'entrée dans la communauté se fait sans friction : accès direct via Discord et réseaux sociaux, sans formulaire obligatoire. L'expérience doit rassurer rapidement (preuves sociales, partenaires, ton bienveillant), rester légère sur mobile, et maintenir une conversion douce avec des points d'accès permanents mais non intrusifs.

Le besoin adressé dépasse la simple recherche d'activités : le produit répond à un enjeu de lien social réel et de réduction de la solitude, tout en gardant un positionnement festif, inclusif et non thérapeutique. À horizon 12 mois, le succès attendu est une augmentation claire de la notoriété locale de Dionysos et un flux régulier de nouveaux membres qualifiés vers Discord.

### What Makes This Special

La proposition de valeur de Dionysos est différenciante par nature : contrairement aux agendas ou médias locaux, Dionysos n'est pas un diffuseur d'informations mais une communauté active, construite "par ses membres, pour ses membres", où chacun peut proposer et organiser des événements.

Le moment de différenciation utilisateur repose sur la reconnaissance immédiate : "c'est exactement ce que je cherche" - des sorties conviviales, sans engagement, avec une ambiance accueillante et authentique. Le produit gagne en crédibilité grâce à des preuves tangibles (retours membres, partenaires locaux), plutôt qu'à des promesses marketing.

L'insight central est opérationnel : conversion par confiance et identification, pas par pression. Cette logique influence toute la conception (copywriting anti-forceur, parcours simple, CTA Discord toujours disponible, mobile-first, contenu local pertinent pour SEO).

## Project Classification

- **Project Type:** web_app
- **Domain:** general
- **Complexity:** low
- **Project Context:** greenfield

## Success Criteria

### User Success

- Les visiteurs comprennent qui est Dionysos en moins de 10 secondes (message clé visible au-dessus de la ligne de flottaison).
- Le parcours principal est clair : découvrir -> se projeter -> rejoindre.
- La conversion utile est définie comme:
  - clic sur `Rejoindre Discord`
  - clic vers Instagram
  - et idéalement arrivée effective sur le serveur Discord.
- Le site doit inspirer confiance sans friction (pas de formulaire, ton non intrusif, preuves sociales visibles).

### Business Success

- Objectif principal SEO: devenir le premier résultat sur les requêtes coeur (a minima "serveur Discord Bordeaux" et "sorties conviviales Bordeaux").
- Objectif notoriété locale: augmentation continue de la visibilité organique et du trafic qualifié local.
- KPI business prioritaire: croissance des nouveaux membres provenant du site (Discord/Insta).

### Technical Success

- Site mobile-first et responsive sur toutes tailles d'écran.
- Performance cible (mobile):
  - Lighthouse Performance >= 90
  - Accessibility >= 90
  - SEO >= 95
  - Best Practices >= 90
- Core Web Vitals cibles:
  - LCP <= 2.5s
  - CLS <= 0.1
  - INP <= 200ms
- SEO technique en place: sitemap, robots.txt, metas, Open Graph, schema.org adapté.
- Conformité RGPD minimale: mentions légales, politique confidentialité, gestion cookies sobre.

### Measurable Outcomes

- Compréhension en 10 secondes validée par tests utilisateurs rapides (5-10 personnes cibles).
- CTR vers Discord/Insta suivi mensuellement (objectif: progression continue post-lancement).
- SEO rankings suivis sur un set de mots-clés Bordeaux (objectif final: position #1 sur mots-clés prioritaires).
- Entrées communauté: nombre de nouveaux arrivants déclarant venir du site.
- Engagement site: rebond en baisse et sessions qualifiées en hausse sur 3 mois.

## Product Scope

### MVP - Minimum Viable Product

- Pages: `Accueil`, `Activités`, `Avis`, `Partenaires`, `Rejoindre`.
- CTA Discord sticky/disponible en permanence (non agressif).
- Liens sociaux clés (Discord + Instagram) visibles globalement.
- Responsive mobile-first.
- SEO technique de base complet (sitemap, robots, meta, schema, titles/descriptions).
- Pages légales RGPD (mentions, confidentialité, cookies).
- Contenu initial: positionnement clair, preuves sociales, partenaires, promesse "sans engagement".

### Growth Features (Post-MVP)

- Optimisation continue SEO éditoriale (pages piliers enrichies, FAQ locale, maillage interne).
- A/B tests légers sur wording hero et CTA.
- Ajout de blocs "sorties mises en avant" dynamiques.
- Enrichissement progressif des témoignages et partenaires.
- Dashboard simple de suivi KPI (SEO + conversions Discord/Insta).

### Vision (Future)

- Référence locale incontournable pour les sorties conviviales à Bordeaux.
- Ecosystème de contenu local vivant autour de la communauté (sans devenir média générique).
- Mécaniques de personnalisation légères selon profils visiteurs (sans friction ni pression).
- Croissance durable de la notoriété et de la communauté via acquisition organique.

## User Journeys

### 1) Utilisateur principal - Chemin succès (découverte -> adhésion)

**Scène d'ouverture**  
Nouvelle personne à Bordeaux, sur mobile, cherche "sorties Bordeaux" et arrive sur la home Dionysos.

**Montée**  
Le visiteur voit un message clair ("qui on est"), des preuves sociales, et un CTA visible (`Rejoindre la communauté` / `Voir les prochaines sorties`).

**Climax**  
En moins de 10 secondes, il/elle comprend que Dionysos est une vraie communauté locale active, avec sorties concrètes et accès direct via Discord/Instagram.

**Résolution**  
Clic vers Discord/Instagram, adhésion à la communauté, puis participation à une première sortie.

### 2) Utilisateur principal - Cas limite (timide/méfiant/confusion dating)

**Scène d'ouverture**  
Personne timide ou méfiante arrive via Google, scrolle vite, craint de ne pas avoir sa place ou confond avec un site de dating.

**Montée**  
Elle cherche des signaux de sécurité : ton inclusif, cadre bienveillant, diversité d'activités, fonctionnement concret.

**Climax**  
La section `Comment ça marche ?` + charte d'inclusion + exemples réels (sorties variées) + possibilité d'observer avant de rejoindre réduisent la peur.

**Résolution**  
Pas d'adhésion immédiate : abonnement Instagram / bookmark, puis retour ultérieur et clic `Rejoindre`.

### 3) Partenaire local - Validation rapide puis prise de contact

**Scène d'ouverture**  
Un bar/resto/lieu entend parler de Dionysos et veut valider rapidement le sérieux de la communauté.

**Montée**  
Il/elle vérifie en 20 secondes : identité de la communauté, crédibilité locale, type de sorties, compatibilité d'image.

**Climax**  
La page `Partenariats` apporte les preuves nécessaires (positionnement, partenaires existants, exemples de collaboration).

**Résolution**  
Le partenaire contacte Dionysos (formulaire léger ou email direct), reçoit confirmation, puis échange commercial/opérationnel.

### 4) Admin Dionysos - Mise à jour rapide, sûre, SEO-friendly

**Scène d'ouverture**  
Un·e admin doit mettre à jour le site après une sortie, un nouveau partenariat, ou une évolution de présentation.

**Montée**  
Il/elle édite contenus récurrents (photos, mini-récaps, partenaires, liens sociaux, actus), avec contrainte de rapidité.

**Climax**  
Le risque principal est maîtrisé : SEO non cassé, consentement photo respecté, infos sensibles non publiées.

**Résolution**  
Mise à jour complète en <15 min via un workflow simple, rendu mobile propre, contenu indexable par Google.

### Journey Requirements Summary

- **Acquisition & conversion douce** : message instantané, CTA permanent, preuves sociales.
- **Réassurance & confiance** : distinction non-dating, cadre inclusif, parcours "observer avant agir".
- **Partenariats** : page dédiée, éléments de crédibilité, point de contact structuré.
- **Ops contenu** : mise à jour rapide, sûre, mobile-first, SEO-safe.
- **Mesure** : suivi clics Discord/Insta, retours d'origine, performance mobile et SEO.

## Web App Specific Requirements

### Project-Type Overview

Le produit est un site vitrine web_app orienté acquisition organique locale, avec une stratégie SEO-first et une expérience mobile-first.
L'architecture retenue est MPA statique (SSG) avec Astro, afin de maximiser performance, indexabilité et simplicité opérationnelle, avec interactivité limitée à des îlots ciblés.

### Technical Architecture Considerations

- **Architecture front**
  - MPA statique (SSG) type Astro.
  - Pas de routing SPA global ni de state management applicatif complexe.
  - JavaScript client en opt-in uniquement (îlots).

- **Structure de pages cible**
  - Accueil
  - À propos
  - Réalisations / Sorties
  - Membres / Communauté
  - Partenariats
  - Contact / Réseaux (sans formulaire membre)

- **Temps réel**
  - Aucun besoin de temps réel.
  - Modèle de publication périodique (édition contenu + rebuild) suffisant.

### Browser Support Matrix

- Chrome (desktop + Android): 2 dernières versions.
- Safari iOS: 2 dernières versions majeures iOS.
- Firefox (desktop, Android si pertinent): 2 dernières versions.
- Edge (desktop): 2 dernières versions.
- Internet Explorer: hors périmètre (non supporté).
- Validation manuelle prioritaire sur iPhone récent + Android Chrome récent.

### Responsive Design Requirements

- Approche mobile-first.
- Breakpoints de référence: 320 / 768 / 1024 / 1280.
- Navigation simple et actionnable au pouce.
- CTA clés visibles rapidement sur mobile.
- Contenu court, scannable, orienté preuve sociale.
- Liens Discord/Instagram accessibles en 1 clic.

### Performance & Quality Targets

- Lighthouse (production, mobile en priorité):
  - Performance >= 90
  - SEO >= 95
  - Best Practices >= 95
  - Accessibility >= 90
- Core Web Vitals cibles:
  - LCP < 2.5s
  - INP < 200ms
  - CLS < 0.1
- Discipline technique:
  - JS minimal
  - Images optimisées (formats modernes, lazy loading)
  - CSS maîtrisé
  - Polices optimisées

### SEO Strategy Requirements

- SEO = priorité absolue.
- Top 3 mots-clés de pilotage:
  1. sorties Bordeaux
  2. rencontres Bordeaux
  3. communauté Bordeaux

- On-page:
  - Une intention par page.
  - Alignement Title/H1.
  - Maillage interne lisible.
  - Contenu localisé (Bordeaux, lieux, contextes).
  - FAQ courte orientée requêtes.

- Technique:
  - Pré-rendu HTML (SSG).
  - sitemap.xml, robots.txt, canonical.
  - Open Graph / Twitter Cards.
  - schema.org pertinent (Organization, Event si événements publiés).

- Off-page:
  - Backlinks locaux (partenaires, annuaires, relais éditoriaux).
  - Cohérence des signaux d'identité locale.

### Accessibility Requirements

- Cible: WCAG 2.2 AA.
- Exigences minimales:
  - navigation clavier complète
  - focus visible
  - contrastes AA
  - structure sémantique (titres/landmarks)
  - alternatives textuelles pour médias
  - lisibilité et redimensionnement du texte
  - langue de page correctement déclarée

### Out-of-Scope for This Project Type

- Fonctionnalités natives mobile (push, capteurs, etc.): hors scope.
- Commandes / interface CLI: hors scope.

### Implementation Considerations

- Priorité à la simplicité de maintenance pour une équipe réduite.
- Publication de contenu orientée efficacité (workflow éditorial court, sans surcharge).
- Garde-fous pour éviter les régressions SEO/performance lors des mises à jour.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving MVP (A)  
L'objectif prioritaire est de résoudre immédiatement le besoin principal : faire comprendre clairement ce qu'est Dionysos et transformer cette compréhension en passage à l'action (Discord/Instagram), sans friction.

**Resource Requirements:**  
- Équipe minimale : 1 personne (fondateur + développeur)
- Modèle d'exécution : scope strict, stack simple, priorité au contenu essentiel et à la performance.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Visiteur principal (découverte -> compréhension en <10s -> clic Discord/Instagram)
- Visiteur prudent/timide (réassurance -> observation -> retour -> adhésion)
- Partenaire local (validation crédibilité -> prise de contact)
- Admin solo (mise à jour rapide du contenu sans casser SEO/perf)

**Must-Have Capabilities:**
- Pages essentielles : Accueil, Activités, Avis, Partenaires, Rejoindre
- Message de marque clair au-dessus de la ligne de flottaison
- CTA Discord/Instagram visibles en permanence (non agressifs)
- Responsive mobile-first
- SEO technique de base complet (sitemap, robots, metas, canonical, OG)
- Accessibilité cible WCAG 2.2 AA
- Pages légales RGPD minimales
- Workflow de mise à jour contenu compatible "solo founder"

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Ajout progressif de témoignages
- Enrichissement de la section partenaires
- Analyse d'activité du site (SEO + parcours + clics clés)

**Phase 3 (Expansion):**
- Bloc annonces hebdomadaires automatisé (événements de la semaine)
- Automatisation des communications autour des gros événements organisés
- Montée en maturité du pilotage contenu/performance

### Risk Mitigation Strategy

**Technical Risks:**  
- Risque : surcharge technique pour un solo dev.  
- Mitigation : architecture SSG simple, interactivité minimale, backlog strict MVP.

**Market Risks:**  
- Risque principal identifié : les visiteurs ne comprennent pas clairement ce qu'est Dionysos.  
- Mitigation : proposition de valeur explicite en 10 secondes, wording anti-ambiguïté (amical, non dating), tests utilisateurs rapides et itérations copy.

**Resource Risks:**  
- Risque : capacité limitée (1 personne).  
- Mitigation : réduire le scope au strict must-have, automatiser uniquement après MVP validé, cadence éditoriale réaliste.

## Functional Requirements

### Découverte & Positionnement

- FR1: Les visiteurs peuvent voir dès l'arrivée une proposition de valeur claire expliquant ce qu'est Dionysos Bordeaux.
- FR2: Les visiteurs peuvent comprendre explicitement que Dionysos est une communauté de rencontres amicales (non dating).
- FR3: Les visiteurs peuvent consulter une présentation synthétique du fonctionnement de la communauté ("comment ça marche").
- FR4: Les visiteurs peuvent identifier les bénéfices principaux (sortir, rencontrer du monde, participer à des activités conviviales) en moins de 10 secondes après l'arrivée sur la page d'accueil.
- FR5: Les visiteurs peuvent accéder à une section expliquant les valeurs de la communauté (inclusion, bienveillance, authenticité).

### Activités & Contenu Communautaire

- FR6: Les visiteurs peuvent consulter les types d'activités proposées par Dionysos (restau, balades, bars, jeux, culture) via une liste explicitement publiée et maintenue à jour.
- FR7: Les visiteurs peuvent voir des exemples concrets de sorties réalisées.
- FR8: Les visiteurs peuvent parcourir des contenus visuels représentatifs de l'ambiance de la communauté.
- FR9: Les visiteurs peuvent consulter des contenus éditoriaux communautaires publiés par catégorie (annonces, actualités, événements) avec date de publication visible.
- FR10: Les visiteurs peuvent consulter des contenus orientés Bordeaux (contexte local, lieux, communauté locale).

### Conversion Communautaire (Discord & Réseaux)

- FR11: Les visiteurs peuvent rejoindre la communauté via un lien direct vers Discord.
- FR12: Les visiteurs peuvent accéder au compte Instagram officiel depuis des points d'entrée visibles.
- FR13: Les visiteurs peuvent voir des appels à l'action de rejoindre la communauté sur l'ensemble des pages clés.
- FR14: Les visiteurs peuvent rejoindre la communauté sans création de compte sur le site.
- FR15: Les visiteurs peuvent comprendre qu'aucun engagement obligatoire n'est requis avant de rejoindre.

### Preuves Sociales & Confiance

- FR16: Les visiteurs peuvent consulter des témoignages membres publiés par Dionysos.
- FR17: Les visiteurs peuvent identifier les partenaires locaux actuels de la communauté.
- FR18: Les visiteurs peuvent consulter une section dédiée aux partenariats avec contexte de collaboration.
- FR19: Les visiteurs peuvent accéder à une section de réassurance incluant explicitement "observer avant de rejoindre" et "intégration progressive" sur au moins les pages Accueil et Rejoindre.

### Partenariats (Parcours B2B local)

- FR20: Les partenaires potentiels peuvent comprendre le positionnement et le public de Dionysos en moins de 20 secondes sur la page Partenaires.
- FR21: Les partenaires potentiels peuvent initier un contact via un canal dédié (email direct ou formulaire partenaire léger).
- FR22: Les partenaires potentiels peuvent soumettre une demande de partenariat avec informations essentielles.
- FR23: Les partenaires potentiels peuvent recevoir une confirmation que leur demande a bien été transmise.

### Administration & Gestion de Contenu

- FR24: Les administrateurs peuvent créer, modifier et supprimer les contenus de pages principales.
- FR25: Les administrateurs peuvent ajouter, modifier et retirer des témoignages.
- FR26: Les administrateurs peuvent ajouter, modifier et retirer des partenaires (logo, description, lien).
- FR27: Les administrateurs peuvent publier des annonces ou mises à jour communautaires.
- FR28: Les administrateurs peuvent mettre à jour les liens sociaux et points de contact.
- FR29: Les administrateurs peuvent gérer les médias publiés (images) avec métadonnées associées.
- FR30: Les administrateurs peuvent appliquer un contrôle éditorial avant publication avec checklist minimale (cohérence message, consentement image, absence de données sensibles, présence métadonnées SEO).

### SEO Fonctionnel & Diffusion

- FR31: Les visiteurs et moteurs peuvent accéder à des pages avec intention éditoriale claire (une intention principale par page).
- FR32: Le système peut exposer un plan de pages indexables par les moteurs de recherche.
- FR33: Le système peut exposer un fichier robots.txt configurable.
- FR34: Le système peut définir des métadonnées SEO par page (title, description, canonical).
- FR35: Le système peut publier des métadonnées de partage social (Open Graph/Twitter).
- FR36: Le système peut publier des données structurées pertinentes pour les contenus éligibles (Organization pour les pages institutionnelles, Event uniquement lorsqu'un événement est effectivement publié).

- FR41: Les administrateurs peuvent consulter un tableau de bord KPI SEO mensuel (positions mots-clés cibles, impressions, clics organiques) pour suivre la progression vers les objectifs business.
- FR42: Les administrateurs peuvent suivre les conversions d'acquisition communautaire depuis le site (clics Discord/Instagram et provenance des nouveaux membres déclarée).

### Conformité & Informations légales

- FR37: Les visiteurs peuvent accéder aux mentions légales.
- FR38: Les visiteurs peuvent accéder à une politique de confidentialité.
- FR39: Les visiteurs peuvent accéder aux informations de gestion des cookies applicables.
- FR40: Les administrateurs peuvent mettre à jour les contenus légaux sans modifier le code source.

## Non-Functional Requirements

### Performance

- Les pages publiques principales doivent atteindre un LCP <= 2.5s sur mobile en conditions réalistes.
- Les interactions utilisateur doivent viser INP <= 200ms.
- La stabilité visuelle doit maintenir CLS <= 0.1.
- Les pages MVP doivent atteindre Lighthouse mobile: Performance >= 90, SEO >= 95, Best Practices >= 95, Accessibility >= 90.
- Le chargement initial doit limiter les ressources bloquantes à moins de 150 Ko critiques sur mobile (mesuré via audit Lighthouse en production).

### Security

- Le site doit rediriger 100% des requêtes HTTP vers HTTPS et maintenir une couverture TLS de 100% des pages publiques (vérification mensuelle via scan automatisé).
- Les zones d'administration doivent exiger une authentification forte et refuser les accès non autorisés avec un taux de blocage attendu de 100% lors des tests de contrôle d'accès trimestriels.
- Les secrets d'intégration ne doivent jamais être présents dans le code client; 0 secret exposé en build production selon audit de bundle à chaque release.
- Les données personnelles minimales (emails partenaire, journaux techniques) doivent respecter une politique de minimisation et de rétention documentée (revue mensuelle des champs collectés et purge selon politique active).
- Les documents légaux (mentions, confidentialité, cookies) doivent être accessibles avec une disponibilité mensuelle >= 99.9% depuis le footer, et versionnés à chaque mise à jour.

### Scalability

- Le site doit absorber une croissance de trafic x10 par rapport au baseline de lancement avec une dégradation de performance <= 10% sur les Web Vitals clés en test de charge semestriel.
- En cas de pic de trafic (campagne ou événement), le parcours critique (page d'accueil -> rejoindre) doit rester disponible à 99.9% sur la fenêtre de pic (mesuré par monitoring synthétique).
- Le flux de publication doit supporter l'ajout de nouveaux contenus éditoriaux sans dépasser un temps de build/deploy de 10 minutes sur l'environnement de production.

### Accessibility

- Le produit doit satisfaire WCAG 2.2 AA sur 100% des pages MVP validées avant mise en production.
- 100% des composants interactifs des parcours MVP doivent être utilisables au clavier avec focus visible, vérifié par test manuel à chaque release.
- Les contrastes texte/composants doivent respecter les seuils AA, avec 0 blocage critique remonté par audit d'accessibilité avant publication.
- 100% des images informatives doivent inclure un texte alternatif non vide, contrôlé par revue éditoriale pré-publication.
- La structure sémantique (titres, landmarks, langue de page) doit obtenir un taux de conformité >= 95% sur les pages principales lors d'un audit automatisé mensuel, avec 0 erreur critique ouverte avant publication.

### Integration

- Les liens Discord et Instagram doivent maintenir un taux de disponibilité de 99.9% (vérification automatique quotidienne des URLs critiques).
- Le suivi analytics doit remonter les événements clés (clic Discord, clic Instagram, navigation pages MVP) avec un taux de collecte valide >= 95% sur les sessions trackées.
- Le site doit rester compatible avec les outils d'indexation moteur (Search Console, exploration robots) avec 0 erreur bloquante d'indexation persistante sur plus de 7 jours.
- Si un CMS est retenu, le pipeline de publication doit imposer les champs SEO obligatoires (title, description, slug) avant autorisation de publication.
