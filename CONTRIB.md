# Contributions participatives via GitHub

Ce dépôt est configuré pour permettre des contributions sans infrastructure backend dédiée.

## Formulaires disponibles

- `Completer un lavoir existant`:
	- force la séléction d'un ID existant (`fid`) via une liste deroulante
	- sert à corriger/enrichir un point déjà présent
- `Proposer un nouveau point`:
	- sert à déclarer un point non référence

Les formulaires se trouvent dans `.github/ISSUE_TEMPLATE/`.

## Source de verite pour les IDs

La liste des IDs provient de `data/data.geojson`, champ `properties.fid`.

Le fichier genéré est:

- `.github/ISSUE_TEMPLATE/contribution-lavoir-existant.yml`

## Regénération de la liste des IDs

### En local (Windows / PowerShell)

```powershell
./scripts/generate-issue-template-existing-fids.ps1
```

### En local (Node.js)

```bash
node scripts/generate-issue-template-existing-fids.js
```

## Automatisation GitHub Actions

Le workflow `.github/workflows/update-issue-template-fids.yml` regénère automatiquement le formulaire quand `data/data.geojson` change, puis commit le fichier genéré.

