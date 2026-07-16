#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const puitsPath = path.join(repoRoot, "data", "puits.geojson");
const outputPath = path.join(
	repoRoot,
	".github",
	"ISSUE_TEMPLATE",
	"contribution-puit-existant.yml"
);

function escapeYamlSingleQuoted(value) {
	return String(value).replace(/'/g, "''");
}

function normalizeName(name) {
	const text = typeof name === "string" ? name.trim() : "";
	return text || "Puit sans nom";
}

function getTypeLabel(properties) {
	const type = (properties && properties.type) || "";
	const normalizedType = type.toLowerCase();
	
	if (normalizedType.includes("puit") || normalizedType.includes("puits")) {
		return "Puit";
	}
	if (normalizedType.includes("pompe")) {
		return "Pompe";
	}
	if (normalizedType.includes("citerne")) {
		return "Citerne";
	}
	return "Puit";
}

function getPuitsEntries(geojson) {
	const features = Array.isArray(geojson && geojson.features) ? geojson.features : [];
	const entries = [];

	for (const feature of features) {
		const properties = feature && typeof feature === "object" ? feature.properties || {} : {};
		const fid = Number(properties.fid);
		if (!Number.isFinite(fid)) continue;

		const name = normalizeName(properties.nom);
		const typeLabel = getTypeLabel(properties);
		
		entries.push({
			fid: String(fid),
			name: `${fid} - ${name} (${typeLabel})`
		});
	}

	return entries;
}

function buildPuitsIssueTemplate(entries) {
	const optionsYaml = entries
		.map(({ name }) => `        - '${escapeYamlSingleQuoted(name)}'`)
		.join("\n");

	return `name: Completer un puit existant
description: Proposer une correction, precision ou ajout d'information pour un puit deja reference
title: "[Contribution] Puit ID <a choisir> - <resume>"\nlabels:\n  - contribution\n  - puit\n  - id-existant\n  - a-verifier\nbody:\n  - type: markdown\n    attributes:\n      value: |\n        Merci pour votre contribution.\n\n        Ce formulaire sert uniquement a completer un puit deja present dans la base.\n        Si le puit n'existe pas encore dans la liste, utilisez le formulaire "Nouveau point".\n\n  - type: dropdown\n    id: fid\n    attributes:\n      label: ID du puit (obligatoire)\n      description: Choisissez un ID existant dans la liste des puits\n      options:\n${optionsYaml}\n    validations:\n      required: true\n\n  - type: checkboxes\n    id: update_type\n    attributes:\n      label: Type de contribution\n      options:\n        - label: Correction de nom / toponyme\n        - label: Correction de position\n        - label: Correction de type (puit, pompe, citerne, etc.)\n        - label: Mise a jour du statut (existant, detruit, a determiner)\n        - label: Ajout de description / usage\n        - label: Ajout de source bibliographique\n        - label: Ajout de photo / media\n        - label: Ajout d'information sur la profondeur\n        - label: Ajout d'information sur l'accès à l'eau\n    validations:\n      required: true\n\n  - type: textarea\n    id: proposition\n    attributes:\n      label: Information proposee\n      description: Decrivez precisement ce qui doit etre modifie\n      placeholder: |\n        Exemple:\n        - Nouveau nom: ...\n        - Correction proposee: ...\n        - Contexte: ...\n        - Profondeur: ...\n        - Niveau d'eau: ...\n    validations:\n      required: true\n\n  - type: textarea\n    id: source\n    attributes:\n      label: Source(s)\n      description: Indiquez une source (archive, temoignage date, releve terrain, photo, etc.)\n      placeholder: Auteur, date, lien, reference\n    validations:\n      required: true\n\n  - type: input\n    id: contact\n    attributes:\n      label: Nom ou pseudo (optionnel)\n      description: Pour les credits si votre contribution est integree\n\n  - type: checkboxes\n    id: rights\n    attributes:\n      label: Autorisation\n      options:\n        - label: J'autorise l'utilisation des informations transmises dans ce depot\n          required: true\n`;
}

function main() {
	if (!fs.existsSync(puitsPath)) {
		throw new Error(`Fichier introuvable: ${puitsPath}`);
	}

	const raw = fs.readFileSync(puitsPath, "utf8");
	const geojson = JSON.parse(raw);
	const entries = getPuitsEntries(geojson);

	if (entries.length === 0) {
		throw new Error("Aucun fid valide trouve dans data/puits.geojson");
	}

	const template = buildPuitsIssueTemplate(entries);
	fs.writeFileSync(outputPath, template, "utf8");

	process.stdout.write(
		`Template genere: ${path.relative(repoRoot, outputPath)} (${entries.length} IDs)\n`
	);
}

main();
