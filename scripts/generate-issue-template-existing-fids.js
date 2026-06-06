#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const dataPath = path.join(repoRoot, "data", "data.geojson");
const outputPath = path.join(
	repoRoot,
	".github",
	"ISSUE_TEMPLATE",
	"contribution-lavoir-existant.yml"
);

function escapeYamlSingleQuoted(value) {
	return String(value).replace(/'/g, "''");
}

function normalizeName(name) {
	const text = typeof name === "string" ? name.trim() : "";
	return text || "Sans nom";
}

function getFidEntries(geojson) {
	const features = Array.isArray(geojson && geojson.features) ? geojson.features : [];
	const byFid = new Map();

	for (const feature of features) {
		const properties = feature && typeof feature === "object" ? feature.properties || {} : {};
		const fid = Number(properties.fid);
		if (!Number.isFinite(fid)) continue;

		if (!byFid.has(fid)) {
			byFid.set(fid, normalizeName(properties.nom));
			continue;
		}

		const currentName = byFid.get(fid);
		if (currentName === "Sans nom") {
			byFid.set(fid, normalizeName(properties.nom));
		}
	}

	return Array.from(byFid.entries())
		.sort((a, b) => a[0] - b[0])
		.map(([fid, name]) => ({ fid, name }));
}

function buildIssueTemplate(entries) {
	const optionsYaml = entries
		.map(({ fid, name }) => `        - '${escapeYamlSingleQuoted(`${fid} - ${name}`)}'`)
		.join("\n");

	return `name: Completer un lavoir existant\ndescription: Proposer une correction, precision ou ajout d'information pour un point deja reference\ntitle: "[Contribution] ID <a choisir> - <resume>"\nlabels:\n  - contribution\n  - id-existant\n  - a-verifier\nbody:\n  - type: markdown\n    attributes:\n      value: |\n        Merci pour votre contribution.\n\n        Ce formulaire sert uniquement a completer un point deja present dans la base.\n        Si le lavoir n'existe pas encore dans la liste, utilisez le formulaire \"Nouveau point\".\n\n  - type: dropdown\n    id: fid\n    attributes:\n      label: ID du lavoir (obligatoire)\n      description: Choisissez un ID existant dans la liste\n      options:\n${optionsYaml}\n    validations:\n      required: true\n\n  - type: checkboxes\n    id: update_type\n    attributes:\n      label: Type de contribution\n      options:\n        - label: Correction de nom / toponyme\n        - label: Correction de position\n        - label: Correction de type (lavoir, fontaine, etc.)\n        - label: Mise a jour du statut (existant, detruit, a determiner)\n        - label: Ajout de description / usages / legendes\n        - label: Ajout de source bibliographique\n        - label: Ajout de photo / media\n    validations:\n      required: true\n\n  - type: textarea\n    id: proposition\n    attributes:\n      label: Information proposee\n      description: Decrivez precisement ce qui doit etre modifie\n      placeholder: |\n        Exemple:\n        - Nouveau nom: ...\n        - Correction proposee: ...\n        - Contexte: ...\n    validations:\n      required: true\n\n  - type: textarea\n    id: source\n    attributes:\n      label: Source(s)\n      description: Indiquez une source (archive, temoignage date, releve terrain, photo, etc.)\n      placeholder: Auteur, date, lien, reference\n    validations:\n      required: true\n\n  - type: input\n    id: contact\n    attributes:\n      label: Nom ou pseudo (optionnel)\n      description: Pour les credits si votre contribution est integree\n\n  - type: checkboxes\n    id: rights\n    attributes:\n      label: Autorisation\n      options:\n        - label: J'autorise l'utilisation des informations transmises dans ce depot\n          required: true\n`;
}

function main() {
	if (!fs.existsSync(dataPath)) {
		throw new Error(`Fichier introuvable: ${dataPath}`);
	}

	const raw = fs.readFileSync(dataPath, "utf8");
	const geojson = JSON.parse(raw);
	const entries = getFidEntries(geojson);

	if (entries.length === 0) {
		throw new Error("Aucun fid valide trouve dans data/data.geojson");
	}

	const template = buildIssueTemplate(entries);
	fs.writeFileSync(outputPath, template, "utf8");

	process.stdout.write(
		`Template genere: ${path.relative(repoRoot, outputPath)} (${entries.length} IDs)\n`
	);
}

main();
