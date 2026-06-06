$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$dataPath = Join-Path $repoRoot 'data/data.geojson'
$outPath = Join-Path $repoRoot '.github/ISSUE_TEMPLATE/contribution-lavoir-existant.yml'

if (-not (Test-Path $dataPath)) {
    throw "Fichier introuvable: $dataPath"
}

$geojson = Get-Content -Raw -Path $dataPath | ConvertFrom-Json
if (-not $geojson.features) {
    throw 'Aucune feature dans data.geojson'
}

$items = @{}
foreach ($feature in $geojson.features) {
    $fid = $null
    try {
        $fid = [int]$feature.properties.fid
    } catch {
        continue
    }

    $name = ''
    if ($feature.properties.nom) {
        $name = [string]$feature.properties.nom
    }

    $name = $name.Trim()
    if ([string]::IsNullOrWhiteSpace($name)) {
        $name = 'Sans nom'
    }

    if (-not $items.ContainsKey($fid)) {
        $items[$fid] = $name
    } elseif ($items[$fid] -eq 'Sans nom' -and $name -ne 'Sans nom') {
        $items[$fid] = $name
    }
}

if ($items.Count -eq 0) {
    throw 'Aucun fid valide trouve dans data/data.geojson'
}

$sortedFids = $items.Keys | Sort-Object
$optionsLines = @()
foreach ($fid in $sortedFids) {
    $label = "$fid - $($items[$fid])" -replace "'", "''"
    $optionsLines += "        - '$label'"
}

$template = @"
name: Completer un lavoir existant
description: Proposer une correction, precision ou ajout d'information pour un point deja reference
title: "[Contribution] ID <a choisir> - <resume>"
labels:
  - contribution
  - id-existant
  - a-verifier
body:
  - type: markdown
    attributes:
      value: |
        Merci pour votre contribution.

        Ce formulaire sert uniquement a completer un point deja present dans la base.
        Si le lavoir n'existe pas encore dans la liste, utilisez le formulaire "Nouveau point".

  - type: dropdown
    id: fid
    attributes:
      label: ID du lavoir (obligatoire)
      description: Choisissez un ID existant dans la liste
      options:
$($optionsLines -join "`n")
    validations:
      required: true

  - type: checkboxes
    id: update_type
    attributes:
      label: Type de contribution
      options:
        - label: Correction de nom / toponyme
        - label: Correction de position
        - label: Correction de type (lavoir, fontaine, etc.)
        - label: Mise a jour du statut (existant, detruit, a determiner)
        - label: Ajout de description / usages / legendes
        - label: Ajout de source bibliographique
        - label: Ajout de photo / media
    validations:
      required: true

  - type: textarea
    id: proposition
    attributes:
      label: Information proposee
      description: Decrivez precisement ce qui doit etre modifie
      placeholder: |
        Exemple:
        - Nouveau nom: ...
        - Correction proposee: ...
        - Contexte: ...
    validations:
      required: true

  - type: textarea
    id: source
    attributes:
      label: Source(s)
      description: Indiquez une source (archive, temoignage date, releve terrain, photo, etc.)
      placeholder: Auteur, date, lien, reference
    validations:
      required: true

  - type: input
    id: contact
    attributes:
      label: Nom ou pseudo (optionnel)
      description: Pour les credits si votre contribution est integree

  - type: checkboxes
    id: rights
    attributes:
      label: Autorisation
      options:
        - label: J'autorise l'utilisation des informations transmises dans ce depot
          required: true
"@

Set-Content -Path $outPath -Value $template -Encoding UTF8
Write-Output "Template genere: .github/ISSUE_TEMPLATE/contribution-lavoir-existant.yml ($($sortedFids.Count) IDs)"
