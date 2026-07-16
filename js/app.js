///////////////////// DOM ELEMENTS ///////////////////////

const panelType = document.getElementById("feature-type");
const panelTitle = document.getElementById("feature-title");
const panelSubtitle = document.getElementById("feature-subtitle");
const panelMeta = document.getElementById("feature-meta");
const panelDescription = document.getElementById("feature-description");
const panelUsages = document.getElementById("feature-usages");
const panelComment = document.getElementById("feature-comment");
const panelLegendes = document.getElementById("feature-legendes");
const panelNomExplication = document.getElementById("feature-nom-explication");
const panelImages = document.getElementById("feature-images");
const shareButton = document.getElementById("share-button");
const contributeButton = document.getElementById("contribute-button");
const imageViewer = document.getElementById("image-viewer");
const imageViewerImage = document.getElementById("image-viewer-image");
const imageViewerCloseButton = document.getElementById("image-viewer-close");
const searchInput = document.getElementById("search-toponym");
const searchIdInput = document.getElementById("search-id");
const filterType = document.getElementById("filter-type");
const filterTypeSummary = document.getElementById("filter-type-summary");
const filterTypeAll = document.getElementById("filter-type-all");
const filterTypeOptions = document.getElementById("filter-type-options");
const filterStatus = document.getElementById("filter-status");
const filterStatusSummary = document.getElementById("filter-status-summary");
const filterStatusAll = document.getElementById("filter-status-all");
const filterStatusOptions = document.getElementById("filter-status-options");
const filterPrecision = document.getElementById("filter-precision");
const filterPrecisionSummary = document.getElementById("filter-precision-summary");
const filterPrecisionAll = document.getElementById("filter-precision-all");
const filterPrecisionOptions = document.getElementById("filter-precision-options");
const filterSources = document.getElementById("filter-sources");
const filterSourcesSummary = document.getElementById("filter-sources-summary");
const filterSourcesAll = document.getElementById("filter-sources-all");
const filterSourcesOptions = document.getElementById("filter-sources-options");
const filterImages = document.getElementById("filter-images");
const filterImagesSummary = document.getElementById("filter-images-summary");
const filterImagesAll = document.getElementById("filter-images-all");
const filterImagesOptions = document.getElementById("filter-images-options");
const filterAcces = document.getElementById("filter-acces");
const filterAccesSummary = document.getElementById("filter-acces-summary");
const filterAccesAll = document.getElementById("filter-acces-all");
const filterAccesOptions = document.getElementById("filter-acces-options");
const filterEtat = document.getElementById("filter-etat");
const filterEtatSummary = document.getElementById("filter-etat-summary");
const filterEtatAll = document.getElementById("filter-etat-all");
const filterEtatOptions = document.getElementById("filter-etat-options");
const colorMode = document.getElementById("color-mode");
const filtersToggleButton = document.getElementById("filters-toggle");
const mapToolbar = document.getElementById("map-toolbar");
const locateUserButton = document.getElementById("locate-user");
const resetFiltersButton = document.getElementById("filters-reset");
const resultsCount = document.getElementById("results-count");
const dateMajElement = document.getElementById("date-maj");
const referencesContent = document.getElementById("references-content");
const contributorsContent = document.getElementById("contributors-content");
const statsAccordion = document.getElementById("stats-accordion");
const statsTabButtons = Array.from(document.querySelectorAll(".stats-tab[role='tab']"));
const statsTabPanels = Array.from(document.querySelectorAll(".stats-panel[role='tabpanel']"));
const histogramByType = document.getElementById("histogram-by-type");
const histogramByStatut = document.getElementById("histogram-by-statut");
const histogramByPrecision = document.getElementById("histogram-by-precision");

const REFERENCE_TYPE_LABELS = {
	archives: "Sources historiques (archives)",
	"site web": "Sites web",
	these: "Thèses",
	livre: "Livres",
	donnees: "Données"
};

const REFERENCE_TYPE_ORDER = ["archives", "site web", "these", "livre", "donnees"];
const BASE_LAYER_KIND = "points";
const PUITS_LAYER_KIND = "puits";

let currentFeatureId = null;

// Initialize image viewer gallery tracking
if (imageViewer) {
	imageViewer.currentImageUrls = [];
	imageViewer.currentImageIndex = 0;
}

async function copyPermalinkToClipboard(fid) {
	if (!fid) return;
	
	const url = new URL(window.location);
	url.hash = `feature=${encodeURIComponent(fid)}`;
	const permalink = url.toString();
	
	try {
		await navigator.clipboard.writeText(permalink);
		
		// Visual feedback
		if (shareButton) {
			shareButton.classList.add("copied");
			const originalLabel = shareButton.getAttribute("aria-label");
			shareButton.setAttribute("aria-label", "Lien copié!");
			shareButton.textContent = "✓";
			
			window.setTimeout(() => {
				shareButton.classList.remove("copied");
				shareButton.setAttribute("aria-label", originalLabel);
				// Restore SVG icon
				shareButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="18" cy="5" r="3"></circle>
					<circle cx="6" cy="12" r="3"></circle>
					<circle cx="18" cy="19" r="3"></circle>
					<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
					<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
				</svg>`;
			}, 2000);
		}
	} catch (error) {
		console.warn("Impossible de copier le lien dans le presse-papiers", error);
	}
}

function featurePermalink(fid) {
	if (!fid) return "";
	const url = new URL(window.location);
	url.hash = `feature=${encodeURIComponent(fid)}`;
	return url.toString();
}

function inferGithubRepoSlug() {
	const host = window.location.hostname || "";
	if (!host.endsWith("github.io")) {
		return "";
	}

	const owner = host.split(".")[0] || "";
	const segments = window.location.pathname.split("/").filter(Boolean);
	const repo = segments[0] || "";

	if (!owner || !repo) {
		return "";
	}

	return `${owner}/${repo}`;
}

function githubRepoSlug() {
	const htmlRepo = document.body?.dataset?.githubRepo;
	const text = safeText(htmlRepo, "").trim();
	return text || inferGithubRepoSlug();
}

function contributionIssueBaseUrl() {
	const slug = githubRepoSlug();
	if (!slug) return "";
	return `https://github.com/${slug}/issues/new`;
}

function isLocalPreview() {
	const host = (window.location.hostname || "").toLowerCase();
	return host === "localhost" || host === "127.0.0.1";
}

function buildContributionIssueUrl(feature) {
	const props = feature?.properties || {};
	const fid = safeText(props.fid, "").trim();
	if (!fid) return "";

	const baseUrl = contributionIssueBaseUrl();
	if (!baseUrl) return "";

	const name = safeText(props.nom, "Sans nom").trim();
	const permalink = featurePermalink(fid);

	const title = `[Contribution] ID ${fid} - ${name}`;
	const body = [
		`ID existant: ${fid}`,
		`Nom actuel: ${name}`,
		permalink ? `Permalien: ${permalink}` : "",
		"",
		"Type de contribution:",
		"- [ ] correction",
		"- [ ] ajout d'information",
		"",
		"Description:"
	]
		.filter(Boolean)
		.join("\n");

	const issueUrl = new URL(baseUrl);
	issueUrl.searchParams.set("template", "contribution-lavoir-existant.yml");
	issueUrl.searchParams.set("title", title);
	issueUrl.searchParams.set("body", body);
	return issueUrl.toString();
}

function updateContributeButton(feature) {
	if (!contributeButton) return;

	const issueUrl = buildContributionIssueUrl(feature);
	if (!issueUrl) {
		contributeButton.disabled = true;
		if (!githubRepoSlug()) {
			if (isLocalPreview()) {
				contributeButton.title = "Contribution indisponible en local: publiez le depot sur GitHub puis configurez data-github-repo";
			} else {
				contributeButton.title = "Configurer data-github-repo dans la balise body";
			}
		} else {
			contributeButton.title = "Selectionnez un point pour contribuer";
		}
		return;
	}

	const fid = safeText(feature?.properties?.fid, "").trim();
	contributeButton.disabled = false;
	contributeButton.title = `Contribuer sur le point ${fid}`;
}

const TYPE_LABELS = {
	fontaine: "Fontaine",
	source: "Source",
	lavoir_fontaine: "Lavoir avec fontaine",
	"lavoir en bordure de greve": "Lavoir en bordure de grève",
	aiguade: "Aiguade",
	"doué":"Douët",
	routoir: "Routoir",
	puit: "Puit",
	puits: "Puits",
	lavoir: "Lavoir",
	lavoir_puit: "Lavoir avec puit",
	abreuvoir: "Abreuvoir",
	"puit sureleve": "Puit surélevé",
	"puits sureleve": "Puits surélevé",
	"puit au sol": "Puit au sol",
	citerne:"Citerne",
	pompe: "Pompe",
	"pompe à eau": "Pompe à eau",
	"pompe manuelle": "Pompe manuelle",
	"autre type de pompe": "Autre type de pompe",
	marre: "Mare",
	inconnu: "Type inconnu"
};

const STATUS_CLASS = {
	exists: "#007f73",
	uncertain: "#ca6a2a",
	removed: "#8f3b2c"
};

const PRECISION_CLASS = {
	exact: "#0b7a75",
	refined: "#3f9d68",
	approximate: "#d8a021",
	veryApproximate: "#c95d3a",
	unknown: "#7b8790"
};

const TYPE_STYLE = {
	fontaine: { color: "#097b2d", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	source: { color: "#7cc450", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	abreuvoir: { color: "#8ecef6", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	aiguade: { color: "#1e90ff", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	lavoir: { color: "#bc2a4a", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	lavoir_fontaine: { color: "#7a5a9c", radius: 7, weight: 2, fillOpacity: 0.88 },
	"lavoir en bordure de greve": { color: "#ea7294", radius: 8, weight: 2, fillOpacity: 0.88 },
	lavoir_puit: { color: "#e8a6e8", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"doué": { color: "#f0c039", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	routoir: { color: "#8f3b2c", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"marre": { color: "#f27954", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	inconnu: { color: "#7b8790", radius: 7, weight: 1.5, fillOpacity: 0.82 },
	// Styles for puits types (used in legend)
	puit: { color: "#1c70ca", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"puit sureleve": { color: "#1c70ca", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"puit au sol": { color: "#1c70ca", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	pompe: { color: "#f99908", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"pompe manuelle": { color: "#f99908", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"autre type de pompe": { color: "#f99908", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"pompe à eau": { color: "#f99908", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	citerne: { color: "#01583b", radius: 7, weight: 1.5, fillOpacity: 0.85 }
};

const TYPE_STYLE_DEFAULT = { color: "#7b8790", radius: 6.5, weight: 1.5, fillOpacity: 0.82 };

const LEGEND_ENTRIES = {
	status: [
		{ color: STATUS_CLASS.exists, label: "Existant" },
		{ color: STATUS_CLASS.uncertain, label: "À déterminer" },
		{ color: STATUS_CLASS.removed, label: "Détruit / Ruiné" }
	],
	precision: [
		{ color: PRECISION_CLASS.exact, label: "Exacte" },
		{ color: PRECISION_CLASS.refined, label: "Affinée" },
		{ color: PRECISION_CLASS.approximate, label: "Approximative" },
		{ color: PRECISION_CLASS.veryApproximate, label: "Très imprécise" },
		{ color: PRECISION_CLASS.unknown, label: "Inconnue" }
	],
	type: [
		{ color: TYPE_STYLE.source.color, label: TYPE_LABELS.source },
		{ color: TYPE_STYLE.fontaine.color, label: TYPE_LABELS.fontaine },
		{ color: TYPE_STYLE.lavoir.color, label: TYPE_LABELS.lavoir },
		{ color: TYPE_STYLE.lavoir_fontaine.color, label: TYPE_LABELS.lavoir_fontaine },
		{ color: TYPE_STYLE.lavoir_puit.color, label: TYPE_LABELS.lavoir_puit },
		{ color: TYPE_STYLE["lavoir en bordure de greve"].color, label: TYPE_LABELS["lavoir en bordure de greve"] },
		{ color: TYPE_STYLE["doué"].color, label: TYPE_LABELS["doué"] },
		{ color: TYPE_STYLE["aiguade"].color, label: TYPE_LABELS["aiguade"] },
		{ color: TYPE_STYLE.abreuvoir.color, label: TYPE_LABELS.abreuvoir },
		{ color: TYPE_STYLE["routoir"].color, label: TYPE_LABELS["routoir"] },
		{ color: TYPE_STYLE["marre"].color, label: TYPE_LABELS["marre"] },
		{ color: TYPE_STYLE.inconnu.color, label: TYPE_LABELS.inconnu }
	]
};

let selectedLayer = null;
let defaultStyleByLayer = new WeakMap();
const visibleLayerGroup = L.layerGroup().addTo(map);
const puitsLayerGroup = L.layerGroup();
const markerEntries = [];
const markerEntryByLayer = new WeakMap();
let userLocationMarker = null;
let userAccuracyCircle = null;
let panelImageRequestToken = 0;
let creditsByImageName = new Map();
let imageNamesById = new Map();
const panelImagesCache = new Map();
const featuresWithPhotos = new Set();
const featuresWithAerialPhotos = new Set();
const featuresWithPlans = new Set();
const featuresWithPanoramax = new Set();
const featuresWithAnyMedia = new Set();
const hydroSurfacesLayer = L.layerGroup();
const hydroTronconsLayer = L.layerGroup();

const DEFAULT_COLOR_MODE = "type";
const SOURCE_FILTER_OPTIONS = [
	{ value: "plan-1910", label: "Plan d'ensemble (1910)" },
	{ value: "cadastre-1842", label: "Cadastre parcellaire (1842)" },
	{ value: "no-sources", label: "Aucune source historique" }
];
const MEDIA_FILTER_OPTIONS = [
	{ value: "photos-only", label: "Photographies" },
	{ value: "aerial-photos", label: "Photographies aériennes" },
	{ value: "plans-only", label: "Plans cadastraux" },
	{ value: "panoramax", label: "Vue 360°" },
	{ value: "without-media", label: "Sans médias" }
];

const STATS_CHART_STYLE = {
	text: "#24333b",
	grid: "rgba(36, 51, 59, 0.12)",
	barType: "#2f6f95",
	barStatus: "#ca6a2a"
};

function createPuitsIcon(typeValue, isSelected = false) {
	const size = isSelected ? 14 : 12;
	const normalizedType = normalizeText(typeValue);
	const isPompe = normalizedType.includes("pompe");

	const baseFill = isPompe ? "#f99908" : "#1c70ca";
	const selectedFill = isPompe ? "#d57c07" : "#036def";
	const baseBorder = isPompe ? "#3a062b" : "#081f3c";
	const selectedBorder = "#c8dcff";

	const borderColor = isSelected ? selectedBorder : baseBorder;
	const fillColor = isSelected ? selectedFill : baseFill;

	return L.divIcon({
		className: "puits-marker-icon",
		html:
			`<span style="display:block;width:${size}px;height:${size}px;` +
			`background:${fillColor};border:1px solid ${borderColor};` +
			`box-sizing:border-box;border-radius:2px;"></span>`,
		iconSize: [size, size],
		iconAnchor: [Math.floor(size / 2), Math.floor(size / 2)]
	});
}

if (colorMode) {
	colorMode.value = DEFAULT_COLOR_MODE;
}

function setupMobileFiltersToggle() {
	if (!mapToolbar || !filtersToggleButton || !window.matchMedia) return;

	const mobileFiltersMediaQuery = window.matchMedia("(max-width: 620px)");

	function setFiltersCollapsed(isCollapsed) {
		if (!mobileFiltersMediaQuery.matches) {
			mapToolbar.classList.remove("is-collapsed");
			filtersToggleButton.classList.add("is-active");
			filtersToggleButton.setAttribute("aria-expanded", "true");
			filtersToggleButton.setAttribute("aria-label", "Masquer les filtres");
			const toggleLabelDesktop = filtersToggleButton.querySelector(".filters-toggle__label");
			if (toggleLabelDesktop) {
				toggleLabelDesktop.textContent = "Masquer les filtres";
			}
			return;
		}

		mapToolbar.classList.toggle("is-collapsed", isCollapsed);
		filtersToggleButton.classList.toggle("is-active", !isCollapsed);
		filtersToggleButton.setAttribute("aria-expanded", String(!isCollapsed));
		filtersToggleButton.setAttribute(
			"aria-label",
			isCollapsed ? "Afficher les filtres" : "Masquer les filtres"
		);

		const toggleLabel = filtersToggleButton.querySelector(".filters-toggle__label");
		if (toggleLabel) {
			toggleLabel.textContent = isCollapsed ? "Afficher les filtres" : "Masquer les filtres";
		}
	}

	setFiltersCollapsed(mobileFiltersMediaQuery.matches);

	filtersToggleButton.addEventListener("click", () => {
		const isCollapsed = mapToolbar.classList.contains("is-collapsed");
		setFiltersCollapsed(!isCollapsed);
	});

	mobileFiltersMediaQuery.addEventListener("change", (event) => {
		setFiltersCollapsed(event.matches);
	});
}

setupMobileFiltersToggle();

function hasPlotly() {
	return typeof window.Plotly !== "undefined" && typeof window.Plotly.react === "function";
}

function getStatsLabel(propertyKey, value) {
	if (propertyKey === "type") {
		return typeLabel(value);
	}

	if (propertyKey === "statut") {
		return safeText(value, "Inconnu");
	}

	return safeText(value, "Inconnu");
}

function countVisibleEntriesByProperty(entries, propertyKey) {
	const counts = new Map();

	entries.forEach((entry) => {
		const rawValue = safeText(entry.feature?.properties?.[propertyKey], "Inconnu");
		const label = getStatsLabel(propertyKey, rawValue);
		const previous = counts.get(label) || 0;
		counts.set(label, previous + 1);
	});

	return Array.from(counts.entries())
		.map(([label, count]) => ({ label, count }))
		.sort((a, b) => {
			if (b.count !== a.count) {
				return b.count - a.count;
			}
			return a.label.localeCompare(b.label, "fr", { sensitivity: "base" });
		});
}

function renderStatsHistogram(container, items, chartTitle, barColor) {
	if (!container) return;

	if (!hasPlotly()) {
		container.innerHTML = "<p>Plotly n'est pas disponible pour afficher cet histogramme.</p>";
		return;
	}

	if (!Array.isArray(items) || items.length === 0) {
		container.innerHTML = "<p>Aucune donnée à afficher avec les filtres actuels.</p>";
		return;
	}

	const labels = items.map((item) => item.label);
	const values = items.map((item) => item.count);
	const chartHeight = Math.max(240, items.length * 34 + 90);

	window.Plotly.react(
		container,
		[
			{
				type: "bar",
				orientation: "h",
				x: values,
				y: labels,
				marker: {
					color: barColor,
					line: {
						color: "rgba(23, 35, 40, 0.2)",
						width: 1
					}
				},
				hovertemplate: "%{y}<br>%{x} points<extra></extra>",
				text: values,
				textposition: "outside",
				cliponaxis: false
			}
		],
		{
			title: {
				text: chartTitle,
				font: {
					size: 15,
					color: STATS_CHART_STYLE.text
				},
				x: 0,
				xanchor: "left"
			},
			paper_bgcolor: "rgba(0,0,0,0)",
			plot_bgcolor: "rgba(0,0,0,0)",
			margin: { t: 42, r: 20, b: 36, l: 150 },
			height: chartHeight,
			autosize: true,
			xaxis: {
				tickformat: ",d",
				showgrid: true,
				gridcolor: STATS_CHART_STYLE.grid,
				zeroline: false,
				title: {
					text: "Nombre de points"
				}
			},
			yaxis: {
				automargin: true,
				tickfont: {
					size: 12,
					color: STATS_CHART_STYLE.text
				}
			},
			font: {
				family: "Manrope, Segoe UI, sans-serif",
				color: STATS_CHART_STYLE.text,
				size: 12
			}
		},
		{
			responsive: true,
			displayModeBar: false
		}
	);
}

function updateStatsHistograms(visibleBaseEntries, visiblePuitsEntries) {
	if (!histogramByType || !histogramByStatut) return;

	const baseEntries = Array.isArray(visibleBaseEntries) ? visibleBaseEntries : [];
	const puitsEntries = Array.isArray(visiblePuitsEntries) ? visiblePuitsEntries : [];
	
	// Combine base and puits entries for type histogram
	const allEntries = [...baseEntries, ...puitsEntries];
	const typeCounts = countVisibleEntriesByProperty(allEntries, "type");
	
	// Use only base entries for status histogram (as before)
	const statusCounts = countVisibleEntriesByProperty(baseEntries, "statut");
	
	// Create precision counts from all visible entries
	const precisionCounts = countVisibleEntriesByProperty(allEntries, "precision_geom");

	renderStatsHistogram(
		histogramByType,
		typeCounts,
		`Répartition par type (${allEntries.length})`,
		STATS_CHART_STYLE.barType
	);
	renderStatsHistogram(
		histogramByStatut,
		statusCounts,
		`Répartition par statut (${baseEntries.length})`,
		STATS_CHART_STYLE.barStatus
	);
	
	// Render precision histogram if container exists
	if (histogramByPrecision) {
		renderStatsHistogram(
			histogramByPrecision,
			precisionCounts,
			`Répartition par précision (${allEntries.length})`,
			STATS_CHART_STYLE.barType
		);
	}
}

function getActiveStatsTabButton() {
	return statsTabButtons.find((button) => button.getAttribute("aria-selected") === "true") || statsTabButtons[0] || null;
}

function getStatsPanelByButton(button) {
	if (!button) return null;
	const panelId = button.getAttribute("aria-controls");
	if (!panelId) return null;
	return document.getElementById(panelId);
}

function resizePlotlyInPanel(panel) {
	if (!panel || !hasPlotly()) return;
	const chart = panel.querySelector(".stats-histogram");
	if (!chart) return;
	window.setTimeout(() => {
		window.Plotly.Plots.resize(chart);
	}, 0);
}

function activateStatsTab(targetButton, moveFocus) {
	if (!targetButton) return;

	statsTabButtons.forEach((button) => {
		const isSelected = button === targetButton;
		button.setAttribute("aria-selected", isSelected ? "true" : "false");
		button.setAttribute("tabindex", isSelected ? "0" : "-1");
	});

	statsTabPanels.forEach((panel) => {
		if (!panel) return;
		panel.hidden = true;
	});

	const targetPanel = getStatsPanelByButton(targetButton);
	if (targetPanel) {
		targetPanel.hidden = false;
		resizePlotlyInPanel(targetPanel);
	}

	if (moveFocus) {
		targetButton.focus();
	}
}

function setupStatsTabs() {
	if (!statsTabButtons.length || !statsTabPanels.length) return;

	statsTabButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			activateStatsTab(button, false);
		});

		button.addEventListener("keydown", (event) => {
			const lastIndex = statsTabButtons.length - 1;
			let nextIndex = index;

			if (event.key === "ArrowRight") {
				nextIndex = index === lastIndex ? 0 : index + 1;
			} else if (event.key === "ArrowLeft") {
				nextIndex = index === 0 ? lastIndex : index - 1;
			} else if (event.key === "Home") {
				nextIndex = 0;
			} else if (event.key === "End") {
				nextIndex = lastIndex;
			} else {
				return;
			}

			event.preventDefault();
			activateStatsTab(statsTabButtons[nextIndex], true);
		});
	});

	activateStatsTab(getActiveStatsTabButton(), false);

	if (statsAccordion) {
		statsAccordion.addEventListener("toggle", () => {
			if (!statsAccordion.open) return;
			const activeButton = getActiveStatsTabButton();
			const activePanel = getStatsPanelByButton(activeButton);
			resizePlotlyInPanel(activePanel);
		});
	}

	window.addEventListener("resize", () => {
		const activeButton = getActiveStatsTabButton();
		const activePanel = getStatsPanelByButton(activeButton);
		resizePlotlyInPanel(activePanel);
	});
}

setupStatsTabs();

function normalizeReferenceType(typeValue) {
	return normalizeText(typeValue || "");
}

function isNonEmptyText(value) {
	return safeText(value, "").length > 0;
}

function renderBibliographyReferences(entries) {
	if (!referencesContent) return;
	referencesContent.innerHTML = "";

	if (!Array.isArray(entries) || entries.length === 0) {
		referencesContent.textContent = "Aucune référence disponible.";
		return;
	}

	const sortedEntries = [...entries].sort((a, b) => {
		const idA = Number(a?.id);
		const idB = Number(b?.id);
		if (Number.isFinite(idA) && Number.isFinite(idB)) {
			return idA - idB;
		}
		return safeText(a?.title, "").localeCompare(safeText(b?.title, ""), "fr", { sensitivity: "base" });
	});

	const groupedByType = new Map();
	sortedEntries.forEach((entry) => {
		const typeKey = normalizeReferenceType(entry?.type) || "autres";
		if (!groupedByType.has(typeKey)) {
			groupedByType.set(typeKey, []);
		}
		groupedByType.get(typeKey).push(entry);
	});

	const orderedTypes = [
		...REFERENCE_TYPE_ORDER.filter((type) => groupedByType.has(type)),
		...Array.from(groupedByType.keys())
			.filter((type) => !REFERENCE_TYPE_ORDER.includes(type))
			.sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }))
	];

	orderedTypes.forEach((typeKey) => {
		const heading = document.createElement("h3");
		heading.textContent = REFERENCE_TYPE_LABELS[typeKey] || `Autres (${typeKey})`;
		referencesContent.appendChild(heading);

		const list = document.createElement("ul");
		const typeEntries = groupedByType.get(typeKey) || [];

		typeEntries.forEach((entry) => {
			const item = document.createElement("li");

			const author = safeText(entry?.author, "");
			const title = safeText(entry?.title, "Sans titre");
			const editor = safeText(entry?.editor, "");
			const year = safeText(entry?.year, "");
			const comment = safeText(entry?.comment, "");
			const url = safeText(entry?.url, "");

			let mainLabel = title;
			if (isNonEmptyText(author)) {
				mainLabel = `${author}, ${mainLabel}`;
			}

			if (isNonEmptyText(url)) {
				const link = document.createElement("a");
				link.href = url;
				link.target = "_blank";
				link.rel = "noopener noreferrer";
				link.textContent = mainLabel;
				item.appendChild(link);
			} else {
				item.appendChild(document.createTextNode(mainLabel));
			}

			const metadataParts = [];
			if (isNonEmptyText(editor)) {
				metadataParts.push(editor);
			}
			if (isNonEmptyText(year)) {
				metadataParts.push(year);
			}

			if (metadataParts.length > 0) {
				item.appendChild(document.createTextNode(` (${metadataParts.join(", ")})`));
			}

			if (isNonEmptyText(comment)) {
				item.appendChild(document.createTextNode(`. ${comment}`));
			}

			list.appendChild(item);
		});

		referencesContent.appendChild(list);
	});
}

async function loadBibliographyReferences() {
	if (!referencesContent) return;

	try {
		const response = await fetch("./data/bibliographie.json");
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}

		const entries = await response.json();
		renderBibliographyReferences(entries);
	} catch (error) {
		console.warn("Impossible de charger bibliographie.json", error);
		referencesContent.textContent = "Impossible de charger les références.";
	}
}

function renderContributors(entries) {
	if (!contributorsContent) return;
	contributorsContent.innerHTML = "";

	if (!Array.isArray(entries) || entries.length === 0) {
		contributorsContent.textContent = "Aucun contributeur disponible.";
		return;
	}

	const visibleEntries = entries.filter((entry) => {
		if (entry?.display === true) return true;
		if (entry?.display === false) return false;
		return true;
	});

	if (visibleEntries.length === 0) {
		contributorsContent.textContent = "Aucun contributeur à afficher.";
		return;
	}

	const sortedEntries = [...visibleEntries].sort((a, b) => {
		const idA = Number(a?.id);
		const idB = Number(b?.id);
		if (Number.isFinite(idA) && Number.isFinite(idB)) {
			return idA - idB;
		}
		return safeText(a?.name, "").localeCompare(safeText(b?.name, ""), "fr", { sensitivity: "base" });
	});

	const list = document.createElement("ul");
	sortedEntries.forEach((entry) => {
		const item = document.createElement("li");
		const name = safeText(entry?.name, "Nom non renseigné");
		const role = safeText(entry?.role, "");
		item.textContent = role ? `${name} — ${role}` : name;
		list.appendChild(item);
	});

	contributorsContent.appendChild(list);

	const message = document.createElement("p");
	message.className = "references-accordion__note";
	message.textContent = "Vous souhaitez ajouter une information ou une illustration ou alors signaler une erreur ? Contactez-nous";
	contributorsContent.appendChild(message);
}

async function loadContributors() {
	if (!contributorsContent) return;

	try {
		const response = await fetch("./data/contributeurs.json");
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}

		const entries = await response.json();
		renderContributors(entries);
	} catch (error) {
		console.warn("Impossible de charger contributeurs.json", error);
		contributorsContent.textContent = "Impossible de charger les contributeurs.";
	}
}

function parseJsonLoose(text) {
	const cleaned = text
		.replace(/,\s*]/g, "]")
		.replace(/,\s*}/g, "}");
	return JSON.parse(cleaned);
}

function parseGithubRepoFromLocation() {
	const host = window.location.hostname || "";
	if (!host.endsWith(".github.io")) {
		return null;
	}

	const owner = host.replace(/\.github\.io$/i, "").trim();
	const repo = (window.location.pathname || "")
		.split("/")
		.filter(Boolean)[0] || "";

	if (!owner || !repo) {
		return null;
	}

	return { owner, repo };
}

function formatFrenchDateTime(isoDate) {
	const date = new Date(isoDate);
	if (!Number.isFinite(date.getTime())) {
		return null;
	}

	const datePart = new Intl.DateTimeFormat("fr-FR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		timeZone: "Europe/Paris"
	}).format(date);

	const timePart = new Intl.DateTimeFormat("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: "Europe/Paris"
	}).format(date);

	return `${datePart} à ${timePart}`;
}

async function updateDateMajFromGithub() {
	if (!dateMajElement) return;

	const repoFromUrl = parseGithubRepoFromLocation();
	if (!repoFromUrl) {
		return;
	}

	const commitsUrl =
		`https://api.github.com/repos/${repoFromUrl.owner}/${repoFromUrl.repo}/commits` +
		`?per_page=1`;

	try {
		const response = await fetch(commitsUrl, {
			headers: { Accept: "application/vnd.github+json" }
		});
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}

		const commits = await response.json();
		if (!Array.isArray(commits) || commits.length === 0) {
			return;
		}

		const lastCommitDate = commits[0]?.commit?.committer?.date || commits[0]?.commit?.author?.date;
		const formattedDate = formatFrenchDateTime(lastCommitDate);
		if (formattedDate) {
			dateMajElement.textContent = formattedDate;
		}
	} catch (error) {
		console.warn("Impossible de mettre à jour automatiquement la date de mise à jour", error);
	}
}

function mediaKeyForFeature(layerKind, featureId) {
	return `${layerKind}:${safeText(featureId, "").trim()}`;
}

function imageFolderForLayer(layerKind) {
	return layerKind === PUITS_LAYER_KIND ? "imgs-puits" : "imgs";
}

function imageKeyFromUrl(url) {
	const cleanedUrl = safeText(url, "")
		.split("?")[0]
		.split("#")[0]
		.replace(/\\/g, "/")
		.replace(/^\.\//, "");

	const decoded = decodeURIComponent(cleanedUrl).toLowerCase();
	if (decoded.startsWith("imgs/")) {
		return decoded.slice("imgs/".length);
	}
	return decoded;
}

function buildImageUrlForLayer(layerKind, imageName) {
	const trimmedName = safeText(imageName, "").trim();
	if (!trimmedName) return null;

	const folder = imageFolderForLayer(layerKind);
	const path = `./${folder}/${encodeURIComponent(trimmedName)}`;

	return path;
}

async function loadImageCreditsFile(filePath, layerKind) {
	const response = await fetch(filePath);
	if (!response.ok) {
		throw new Error(`Erreur HTTP ${response.status}`);
	}

	const text = await response.text();
	if (!text.trim()) {
		return;
	}

	const entries = parseJsonLoose(text);
	if (!Array.isArray(entries)) return;

	entries.forEach((entry) => {
		const imageId = safeText(entry?.id, "").trim();
		const imageName = safeText(entry?.img, "").trim();
		const mediaType = safeText(entry?.type, "").trim().toLowerCase();
		const mediaLink = safeText(entry?.url, "").trim();

		const imageUrl = buildImageUrlForLayer(layerKind, imageName);
		if (!imageUrl) return;

		const imageKey = imageKeyFromUrl(imageUrl);
		creditsByImageName.set(imageKey, {
			author: safeText(entry?.author, ""),
			date: safeText(entry?.date, ""),
			caption: safeText(entry?.caption, ""),
			type: mediaType,
			url: mediaLink
		});

		if (!imageId) return;
		const key = mediaKeyForFeature(layerKind, imageId);

		if (!imageNamesById.has(key)) {
			imageNamesById.set(key, []);
		}
		imageNamesById.get(key).push(imageName);

		featuresWithAnyMedia.add(key);

		if (mediaType === "photo") {
			featuresWithPhotos.add(key);
		} else if (mediaType === "photo aerienne" || mediaType === "photo aérienne") {
			featuresWithAerialPhotos.add(key);
		} else if (mediaType === "plan cadastral") {
			featuresWithPlans.add(key);
		}
	});
}

async function loadImageCredits() {
	creditsByImageName = new Map();
	imageNamesById = new Map();
	featuresWithPhotos.clear();
	featuresWithAerialPhotos.clear();
	featuresWithPlans.clear();
	featuresWithAnyMedia.clear();

	try {
		await Promise.all([
			loadImageCreditsFile("./data/credits.json", BASE_LAYER_KIND),
			loadImageCreditsFile("./data/credits-puits.json", PUITS_LAYER_KIND)
		]);
		
		console.log("Media tracking loaded:");
		console.log("Features with photos:", featuresWithPhotos.size);
		console.log("Features with plans:", featuresWithPlans.size);
		console.log("Features with any media:", featuresWithAnyMedia.size);
	} catch (error) {
		console.warn("Impossible de charger credits.json", error);
	}
}

//var markerclusterLavoirs = L.markerClusterGroup();
//markerclusterLavoirs.addLayer(visibleLayerGroup);

const advancedLayersControl = L.control.advancedLayers(
	[
		{
			name: "Cartes et relief",
			collapsed: true,
			layers: [
				{ name: "Plan IGN", layer: ign2023, active: true },
				{ name: "OpenStreetMap", layer: osm, active: false },
				{ name: "Plan cadastral", layer: pciexpress, active: false },
				{ name: "MNT (relief 1m, IGN)", layer: lidarhd, active: false }
			]
		},
		{
			name: "Photographies aériennes",
			collapsed: true,
			layers: [
				{ name: "1952 (IGN 1950-1965)", layer: ignaerial1950, active: false },
				{ name: "1975 (IGN 1965-1980)", layer: ignaerial1965, active: false },
				{ name: "2000 (IGN Coast)", layer: ignaerial2000, active: false },
				{ name: "2005 (IGN 2000-2005)", layer: ignaerial2005, active: false },
				{ name: "2009 (IGN 2006-2010)", layer: ignaerial2009, active: false },
				{ name: "2015 (IGN 2011-2015)", layer: ignaerial2015, active: false },
				{ name: "2018 (IGN)", layer: ignaerial2018, active: false },
				{ name: "2021 (IGN)", layer: ignaerial2023, active: false },
				
			]
		},
		{
			name: "Données vectorielles",
			collapsed: true,
			layers: [
				{ name: "Fontaines et lavoirs", layer: visibleLayerGroup, active: true },
				{ name: "Puits", layer: puitsLayerGroup, active: false },
				{ name: "Surfaces hydrographiques (IGN)", layer: hydroSurfacesLayer, active: false },
				{ name: "Tronçons hydrographiques (IGN)", layer: hydroTronconsLayer, active: false }
			]
		}
	],
	{
		position: "topright",
		collapsible: true,
		collapsed: true,
		color: "#d5c5b4",
		title: ""
	}
).addTo(map);

const hydroSurfacePane = map.createPane("hydro-surfaces");
const hydroTronconPane = map.createPane("hydro-troncons");
if (hydroSurfacePane) {
	hydroSurfacePane.style.zIndex = "390";
}
if (hydroTronconPane) {
	hydroTronconPane.style.zIndex = "395";
}

if (advancedLayersControl?.getContainer) {
	const controlContainer = advancedLayersControl.getContainer();
	if (controlContainer) {
		L.DomEvent.disableClickPropagation(controlContainer);
		L.DomEvent.disableScrollPropagation(controlContainer);
	}
}

function normalizeText(value) {
	return safeText(value, "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();
}

function toYesNo(value) {
	if (value === true) return "Oui";
	if (value === false) return "Non";
	return "Inconnu";
}

function isSourcePresent(value) {
	if (value === true) return true;
	if (value === false || value === null || value === undefined) return false;
	if (typeof value === "number") return value === 1;
	if (typeof value === "string") {
		const normalized = normalizeText(value);
		return normalized === "true" || normalized === "1" || normalized === "oui";
	}
	return false;
}

function safeText(value, fallback = "Non renseigné") {
	if (value === null || value === undefined) {
		return fallback;
	}
	const text = String(value).trim();
	return text.length ? text : fallback;
}

function typeLabel(rawType) {
	const directMatch = TYPE_LABELS[rawType];
	if (directMatch) return directMatch;

	const normalizedMatch = TYPE_LABELS[normalizeText(rawType)];
	if (normalizedMatch) return normalizedMatch;

	return safeText(rawType);
}

function accessValueFromProps(props) {
	if (!props) return "";
	if (hasPanelValue(props.acces)) return props.acces;
	if (hasPanelValue(props.access)) return props.access;
	return "";
}

function accessClass(accessValueRaw) {
	const accessValue = normalizeText(accessValueRaw);
	if (!accessValue) return "";

	const isPrivate = accessValue.includes("terrain prive");
	const isVisibleFromRoad = accessValue.includes("visible depuis la route");
	const isDifficult =
		accessValue.includes("traversee de terrains prives") ||
		accessValue.includes("pente raide") ||
		accessValue.includes("falaise") ||
		accessValue.includes("difficile");
	const isFree = accessValue.includes("libre") || accessValue.includes("bordure de route") || accessValue.includes("bord de route") || accessValue.includes("visible depuis la route");

	if (isPrivate && !isVisibleFromRoad && !isFree) {
		return "private";
	}
	if (isDifficult || (isPrivate && isVisibleFromRoad)) {
		return "caution";
	}
	if (isFree) {
		return "free";
	}

	return "";
}

function markerColorFromStatus(statusRaw) {
	const status = safeText(statusRaw, "").toLowerCase();
	if (status.includes("détruit") || status.includes("ruine")) {
		return STATUS_CLASS.removed;
	}
	if (status.includes("à déterminer") || status.includes("a déterminer")) {
		return STATUS_CLASS.uncertain;
	}
	return STATUS_CLASS.exists;
}

function markerColorFromPrecision(precisionRaw) {
	const precision = normalizeText(precisionRaw);
	if (precision.includes("exacte")) {
		return PRECISION_CLASS.exact;
	}
	if (precision.includes("affinee") || precision.includes("affinée")) {
		return PRECISION_CLASS.refined;
	}
	if (precision.includes("approximative")) {
		return PRECISION_CLASS.approximate;
	}
	if (precision.includes("tres imprecise") || precision.includes("très imprécise")) {
		return PRECISION_CLASS.veryApproximate;
	}
	return PRECISION_CLASS.unknown;
}

function markerStyleFromType(typeRaw) {
	const typeKey = normalizeText(typeRaw).replace(/_/g, " ");
	// Handle combined lavoir + puit (and common misspelling 'lavoit')
	if ((typeKey.includes("lavoir") || typeKey.includes("lavoit")) && typeKey.includes("puit")) {
		return TYPE_STYLE.lavoir_puit;
	}
	if (typeKey.includes("abreuvoir")) {
		return TYPE_STYLE.abreuvoir;
	}
	if (typeKey.includes("lavoir") && typeKey.includes("fontaine")) {
		return TYPE_STYLE.lavoir_fontaine;
	}
	if (typeKey.includes("source")) {
		return TYPE_STYLE.source;
	}
	if (typeKey.includes("bordure") && typeKey.includes("greve")) {
		return TYPE_STYLE["lavoir en bordure de greve"];
	}
	if (typeKey.includes("fontaine")) {
		return TYPE_STYLE.fontaine;
	}
	if (typeKey.includes("lavoir")) {
		return TYPE_STYLE.lavoir;
	}
	if (typeKey.includes("dou")) {
		return TYPE_STYLE["doué"];
	}
	if (typeKey.includes("routoir")) {
		return TYPE_STYLE["routoir"];
	}
	if (typeKey.includes("aiguade")) {
		return TYPE_STYLE["aiguade"];
	}
	if (typeKey.includes("marre")) {
		return TYPE_STYLE["marre"];
	}
	// Handle puits types - use the specific puits colors from TYPE_STYLE
	if (typeKey.includes("puit")) {
		if (typeKey.includes("sureleve") || typeKey.includes("surelevé")) {
			return TYPE_STYLE["puit sureleve"] || TYPE_STYLE.puit;
		}
		if (typeKey.includes("au sol")) {
			return TYPE_STYLE["puit au sol"] || TYPE_STYLE.puit;
		}
		return TYPE_STYLE.puit || TYPE_STYLE.inconnu;
	}
	if (typeKey.includes("citerne")) {
		return TYPE_STYLE.citerne || TYPE_STYLE.inconnu; // Use citerne color for cisterns
	}
	if (typeKey.includes("pompe")) {
		// Check for specific pompe types first
		if (typeKey.includes("manuelle")) {
			return TYPE_STYLE["pompe manuelle"] || TYPE_STYLE.pompe;
		}
		if (typeKey.includes("à eau") || typeKey.includes("a eau")) {
			return TYPE_STYLE["pompe à eau"] || TYPE_STYLE.pompe;
		}
		if (typeKey.includes("autre type")) {
			return TYPE_STYLE["autre type de pompe"] || TYPE_STYLE.pompe;
		}
		return TYPE_STYLE.pompe || TYPE_STYLE.inconnu; // Use pompe color for pumps
	}
	if (typeKey.includes("inconnu")) {
		return TYPE_STYLE.inconnu;
	}
	return TYPE_STYLE_DEFAULT;
}

function markerStyleFromFeature(feature) {
	if (colorMode?.value === "type") {
		const typeStyle = markerStyleFromType(feature.properties?.type);
		return {
			radius: typeStyle.radius,
			color: typeStyle.color,
			weight: typeStyle.weight,
			fillColor: typeStyle.color,
			fillOpacity: typeStyle.fillOpacity
		};
	}

	const color = colorMode?.value === "precision"
		? markerColorFromPrecision(feature.properties?.precision_geom)
		: markerColorFromStatus(feature.properties?.statut);

	return {
		radius: 7,
		color,
		weight: 1.5,
		fillColor: color,
		fillOpacity: 0.85
	};
}

function selectedMarkerStyle(baseStyle) {
	return {
		...baseStyle,
		color: "#172328",
		weight: 2,
		radius: 10,
		fillOpacity: 1
	};
}

function getPuitsColor(feature) {
	if (!colorMode) return null;
	
	if (colorMode.value === "type") {
		const typeStyle = markerStyleFromType(feature.properties?.type);
		return typeStyle.color;
	}
	
	const color = colorMode.value === "precision"
		? markerColorFromPrecision(feature.properties?.precision_geom)
		: markerColorFromStatus(feature.properties?.statut);
	
	return color;
}

function createPuitsIconWithColor(typeValue, isSelected = false, color = null) {
	const size = isSelected ? 14 : 12;
	const normalizedType = normalizeText(typeValue);
	const isPompe = normalizedType.includes("pompe");

	// Use provided color if available, otherwise use TYPE_STYLE colors
	const baseFill = color || (isPompe ? TYPE_STYLE.pompe?.color : TYPE_STYLE.puit?.color) || "#1c70ca";
	const selectedFill = color || (isPompe ? "#d57c07" : "#036def");
	const baseBorder = color ? "#081f3c" : (isPompe ? "#3a062b" : "#081f3c");
	const selectedBorder = "#c8dcff";

	const borderColor = isSelected ? selectedBorder : baseBorder;
	const fillColor = isSelected ? selectedFill : baseFill;

	return L.divIcon({
		className: "puits-marker-icon",
		html:
			`<span style="display:block;width:${size}px;height:${size}px;` +
			`background:${fillColor};border:1px solid ${borderColor};` +
			`box-sizing:border-box;border-radius:2px;"></span>`,
		iconSize: [size, size],
		iconAnchor: [Math.floor(size / 2), Math.floor(size / 2)]
	});
}

function applyMarkerStyle(layer, feature) {
	const markerEntry = markerEntryByLayer.get(layer);
	if (markerEntry?.layerKind === PUITS_LAYER_KIND && typeof layer.setIcon === "function") {
		const color = getPuitsColor(feature);
		layer.setIcon(createPuitsIconWithColor(feature?.properties?.type, layer === selectedLayer, color));
		return;
	}

	const style = markerStyleFromFeature(feature);
	defaultStyleByLayer.set(layer, style);
	layer.setStyle(layer === selectedLayer ? selectedMarkerStyle(style) : style);
}

function getDynamicTypeLegendEntries() {
	const baseEntries = LEGEND_ENTRIES.type;
	const puitsVisible = map.hasLayer(puitsLayerGroup);
	
	if (!puitsVisible) {
		return baseEntries;
	}
	
	// Regrouper les types de puits par couleur pour la légende - utiliser les couleurs de TYPE_STYLE
	const puitsEntries = [
		{ color: TYPE_STYLE.puit?.color || "#1c70ca", label: "Puits" },
		{ color: TYPE_STYLE.pompe?.color || "#f99908", label: "Pompes" },
		{ color: TYPE_STYLE.citerne?.color || "#01583b", label: "Citerne" }
	];
	
	return [...baseEntries, ...puitsEntries];
}

function updateLegend() {
	const container = document.getElementById("map-legend");
	if (!container) return;
	const mode = colorMode?.value === "precision"
		? "precision"
		: colorMode?.value === "type"
			? "type"
			: "status";
	const title = mode === "precision"
		? "Précision de localisation"
		: mode === "type"
			? "Type d'entité géographique"
			: "Statut";
	
	// Use dynamic entries for type mode
	const entries = mode === "type" ? getDynamicTypeLegendEntries() : LEGEND_ENTRIES[mode];
	
	const items = entries
		.map(
			(e) =>
				`<li class="map-legend__item">` +
				`<span class="map-legend__dot" style="background:${e.color}"></span>` +
				`<span>${e.label}</span>` +
				`</li>`
		)
		.join("");
	container.innerHTML =
		`<p class="map-legend__title">${title}</p>` +
		`<ul class="map-legend__list">${items}</ul>`;
}

function refreshMarkerColors() {
	markerEntries.forEach((entry) => {
		applyMarkerStyle(entry.layer, entry.feature);
	});
	updateLegend();
}

function setLocateButtonState(isLoading, label) {
	if (!locateUserButton) return;
	locateUserButton.disabled = isLoading;
	locateUserButton.textContent = label;
}

function showLocationFeedback(message) {
	if (!resultsCount) return;
	resultsCount.textContent = message;
	window.clearTimeout(showLocationFeedback.timeoutId);
	showLocationFeedback.timeoutId = window.setTimeout(() => {
		renderVisibleLayers(false);
	}, 2500);
}

showLocationFeedback.timeoutId = null;

function drawUserLocation(latlng, accuracy) {
	if (userLocationMarker) {
		map.removeLayer(userLocationMarker);
	}
	if (userAccuracyCircle) {
		map.removeLayer(userAccuracyCircle);
	}

	userLocationMarker = L.circleMarker(latlng, {
		radius: 8,
		color: "#0b4f95",
		weight: 2,
		fillColor: "#2c7edb",
		fillOpacity: 0.9
	}).addTo(map);

	userAccuracyCircle = L.circle(latlng, {
		radius: Math.max(accuracy || 0, 10),
		color: "#2c7edb",
		weight: 1,
		fillColor: "#2c7edb",
		fillOpacity: 0.15
	}).addTo(map);

	map.fitBounds(userAccuracyCircle.getBounds(), {
		padding: [24, 24],
		maxZoom: 17
	});

	if (locateUserButton) {
		locateUserButton.classList.add("is-active");
	}
	setLocateButtonState(false, "Ma position");
	showLocationFeedback("Position affichée sur la carte");
}

function clearUserLocation(showFeedback) {
	if (userLocationMarker) {
		map.removeLayer(userLocationMarker);
		userLocationMarker = null;
	}
	if (userAccuracyCircle) {
		map.removeLayer(userAccuracyCircle);
		userAccuracyCircle = null;
	}
	if (locateUserButton) {
		locateUserButton.classList.remove("is-active");
	}
	setLocateButtonState(false, "Ma position");
	if (showFeedback) {
		showLocationFeedback("Position masquée");
	}
}

function clearPanelImages() {
	if (!panelImages) return;
	panelImages.classList.remove("is-visible");
	panelImages.classList.remove("is-loading");
	panelImages.innerHTML = "";
}

function showPanelImagesLoading(fid) {
	if (!panelImages) return;

	panelImages.innerHTML =
		`<p class="feature-images__title">Images</p>` +
		`<p class="feature-images__loading" role="status" aria-live="polite">` +
		`<span class="feature-images__spinner" aria-hidden="true"></span>` +
		`Chargement des images du point ${fid}...` +
		`</p>`;
	panelImages.classList.add("is-visible");
	panelImages.classList.add("is-loading");
}

function openImageViewer(src, altText, imageUrls = [], currentIndex = 0) {
	if (!imageViewer || !imageViewerImage) return;
	
	// Store the gallery info for navigation
	imageViewer.currentImageUrls = imageUrls;
	imageViewer.currentImageIndex = currentIndex;
	
	// Update image
	imageViewerImage.src = src;
	imageViewerImage.alt = altText || "Image agrandie";
	
	// Update caption
	const captionElement = document.getElementById("image-viewer-caption");
	if (captionElement) {
		const captionText = captionTextFromUrl(src);
		captionElement.textContent = captionText;
	}
	
	// Update nav button states
	updateImageViewerNavigation();
	
	imageViewer.classList.add("is-open");
	imageViewer.setAttribute("aria-hidden", "false");
}

function navigateImageViewer(direction) {
	if (!imageViewer || imageViewer.currentImageUrls.length === 0) return;
	
	let newIndex = imageViewer.currentImageIndex + direction;
	
	// Wrap around
	if (newIndex < 0) {
		newIndex = imageViewer.currentImageUrls.length - 1;
	} else if (newIndex >= imageViewer.currentImageUrls.length) {
		newIndex = 0;
	}
	
	const newUrl = imageViewer.currentImageUrls[newIndex];
	const newAlt = `Image ${newIndex + 1} sur ${imageViewer.currentImageUrls.length}`;
	
	openImageViewer(newUrl, newAlt, imageViewer.currentImageUrls, newIndex);
}

function updateImageViewerNavigation() {
	if (!imageViewer) return;
	
	const prevBtn = document.getElementById("image-viewer-prev");
	const nextBtn = document.getElementById("image-viewer-next");
	const hasMultiple = imageViewer.currentImageUrls && imageViewer.currentImageUrls.length > 1;
	
	if (prevBtn) {
		prevBtn.style.display = hasMultiple ? "flex" : "none";
	}
	if (nextBtn) {
		nextBtn.style.display = hasMultiple ? "flex" : "none";
	}
}

function closeImageViewer() {
	if (!imageViewer || !imageViewerImage) return;
	imageViewer.classList.remove("is-open");
	imageViewer.setAttribute("aria-hidden", "true");
	imageViewerImage.src = "";
}

function imageNameFromUrl(url) {
	return imageKeyFromUrl(url);
}

function creditFromUrl(url) {
	const imageName = imageNameFromUrl(url);
	return creditsByImageName.get(imageName) || null;
}

function captionTextFromUrl(url) {
	const credit = creditFromUrl(url);
	if (!credit) return "";

	const caption = safeText(credit.caption, "");
	const author = safeText(credit.author, "");
	const date = safeText(credit.date, "");

	const parts = [caption, author, date].filter(Boolean);
	return parts.join(" - ");
}

function captionLinkFromUrl(url) {
	const credit = creditFromUrl(url);
	if (!credit) return null;

	const link = safeText(credit.url, "").trim();
	if (!link) return null;

	if (credit.type === "screenshot") {
		return { href: link, label: "Voir la vidéo" };
	}

	if (credit.type === "photo") {
		return { href: link, label: "Voir l'image" };
	}

	if (credit.type === "photo aerienne" || credit.type === "photo aérienne") {
		return { href: link, label: "Voir sur Remonter le temps" };
	}

	return null;
}

function createPanelImageFigure(url, altText, urls, index) {
	const image = document.createElement("img");
	image.loading = index < 2 ? "eager" : "lazy";
	image.decoding = "async";
	if (index === 0) {
		image.fetchPriority = "high";
	}
	image.alt = altText;
	image.src = url;
	image.addEventListener("click", () => {
		openImageViewer(url, altText, urls, index);
	});

	const figure = document.createElement("figure");
	figure.className = "feature-images__item";
	figure.appendChild(image);

	const captionText = captionTextFromUrl(url);
	const captionLink = captionLinkFromUrl(url);
	if (captionText || captionLink) {
		const caption = document.createElement("figcaption");
		caption.className = "feature-images__caption";
		if (captionText) {
			const textNode = document.createElement("span");
			textNode.textContent = captionText;
			caption.appendChild(textNode);
		}

		if (captionLink) {
			if (captionText) {
				caption.appendChild(document.createElement("br"));
			}
			const linkNode = document.createElement("a");
			linkNode.className = "feature-images__caption-link";
			linkNode.href = captionLink.href;
			linkNode.target = "_blank";
			linkNode.rel = "noopener noreferrer";
			linkNode.textContent = captionLink.label;
			caption.appendChild(linkNode);
		}
		figure.appendChild(caption);
	}

	return figure;
}

async function resolvePanelImageUrls(mediaKey, layerKind, onUrlResolved) {
	if (panelImagesCache.has(mediaKey)) {
		const cachedUrls = panelImagesCache.get(mediaKey);
		if (typeof onUrlResolved === "function") {
			cachedUrls.forEach((url, index) => onUrlResolved(url, index, cachedUrls));
		}
		return cachedUrls;
	}

	const urls = [];
	const seenUrls = new Set();
	const appendUrl = (url) => {
		if (!url || seenUrls.has(url)) {
			return false;
		}
		seenUrls.add(url);
		urls.push(url);
		if (typeof onUrlResolved === "function") {
			onUrlResolved(url, urls.length - 1, urls);
		}
		return true;
	};

	const creditedNames = imageNamesById.get(mediaKey) || [];
	for (const imageName of creditedNames) {
		appendUrl(buildImageUrlForLayer(layerKind, imageName));
	}

	panelImagesCache.set(mediaKey, urls);
	return urls;
}

function renderPanelImages(fidValue, layerKind = BASE_LAYER_KIND) {
	if (!panelImages) return;
	clearPanelImages();

	const fid = safeText(fidValue, "").trim();
	if (!fid) return;
	const mediaKey = mediaKeyForFeature(layerKind, fid);

	showPanelImagesLoading(fid);

	const currentToken = ++panelImageRequestToken;
	const resolvedUrls = [];

	const title = document.createElement("p");
	title.className = "feature-images__title";
	title.textContent = "Images";

	const gallery = document.createElement("div");
	gallery.className = "feature-images__gallery";

	panelImages.innerHTML = "";
	panelImages.appendChild(title);
	panelImages.appendChild(gallery);
	panelImages.classList.add("is-visible");

	resolvePanelImageUrls(mediaKey, layerKind, (url, index, urls) => {
		if (!panelImages || currentToken !== panelImageRequestToken || !url) return;

		resolvedUrls[index] = url;
		const altText =
			urls.length > 1
				? `Illustration ${index + 1} du point ${fid}`
				: `Illustration du point ${fid}`;
		gallery.appendChild(createPanelImageFigure(url, altText, resolvedUrls, index));
		panelImages.classList.remove("is-loading");
	}).then((urls) => {
		if (!panelImages || currentToken !== panelImageRequestToken) return;
		panelImages.classList.remove("is-loading");
		
		if (!urls.length) {
			clearPanelImages();
			return;
		}
		title.textContent = urls.length > 1 ? "Images" : "Image";

		panelImages.classList.add("is-visible");
	});
}

function requestUserLocation() {
	if (!navigator.geolocation) {
		showLocationFeedback("Géolocalisation non supportée par ce navigateur");
		return;
	}

	if (locateUserButton?.classList.contains("is-active")) {
		clearUserLocation(true);
		return;
	}

	setLocateButtonState(true, "Localisation...");
	map.locate({
		setView: false,
		watch: false,
		enableHighAccuracy: true,
		maximumAge: 0,
		timeout: 12000
	});
}

map.on("locationfound", (event) => {
	drawUserLocation(event.latlng, event.accuracy);
});

map.on("locationerror", (e) => {
	clearUserLocation(false);
	let msg;
	if (location.protocol !== "https:" && location.hostname !== "localhost") {
		msg = "La géolocalisation nécessite HTTPS. Accédez à la page via https://…";
	} else if (e.code === 1) {
		msg = "Accès à la position refusé. Autorisez la localisation dans les réglages de votre navigateur puis réessayez.";
	} else if (e.code === 2) {
		msg = "Position indisponible (GPS ou réseau inaccessible).";
	} else if (e.code === 3) {
		msg = "Délai dépassé pour obtenir la position. Réessayez.";
	} else {
		msg = "Impossible d'obtenir votre position.";
	}
	showLocationFeedback(msg);
});

if (locateUserButton) {
	locateUserButton.addEventListener("click", requestUserLocation);
}

if (shareButton) {
	shareButton.addEventListener("click", () => {
		if (currentFeatureId) {
			copyPermalinkToClipboard(currentFeatureId);
		}
	});
}

if (contributeButton) {
	contributeButton.addEventListener("click", () => {
		if (!selectedLayer) return;
		const selectedEntry = markerEntryByLayer.get(selectedLayer);
		const issueUrl = buildContributionIssueUrl(selectedEntry?.feature);
		if (!issueUrl) return;
		window.open(issueUrl, "_blank", "noopener,noreferrer");
	});
}

if (imageViewerCloseButton) {
	imageViewerCloseButton.addEventListener("click", closeImageViewer);
}

const imageViewerPrevButton = document.getElementById("image-viewer-prev");
const imageViewerNextButton = document.getElementById("image-viewer-next");

if (imageViewerPrevButton) {
	imageViewerPrevButton.addEventListener("click", () => {
		navigateImageViewer(-1);
	});
}

if (imageViewerNextButton) {
	imageViewerNextButton.addEventListener("click", () => {
		navigateImageViewer(1);
	});
}

if (imageViewer) {
	imageViewer.addEventListener("click", (event) => {
		if (event.target === imageViewer) {
			closeImageViewer();
		}
	});
}

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeImageViewer();
	} else if (imageViewer && imageViewer.classList.contains("is-open")) {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			navigateImageViewer(-1);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			navigateImageViewer(1);
		}
	}
});

function selectLayerByFeatureId(fid) {
	if (!fid) return false;
	
	console.log("Looking for feature ID:", fid);
	console.log("Available entries:", markerEntries.length);
	
	const entry = markerEntries.find((e) => {
		const entryFid = safeText(e.feature.properties?.fid, "");
		if (entryFid === fid) {
			return true;
		}
		return false;
	});
	
	if (entry) {
		console.log("Found feature:", entry.feature.properties?.nom);
		
		// Ensure the layer is in the right visible group
		if (entry.layerKind === PUITS_LAYER_KIND) {
			if (!puitsLayerGroup.hasLayer(entry.layer)) {
				puitsLayerGroup.addLayer(entry.layer);
			}
		} else if (!visibleLayerGroup.hasLayer(entry.layer)) {
			visibleLayerGroup.addLayer(entry.layer);
		}
		
		// Select the layer and update panel
		selectLayer(entry.layer, entry.feature, entry);
		
		// Zoom to the feature with good zoom level
		const latlng = entry.layer.getLatLng();
		if (latlng) {
			console.log("Setting map view to:", latlng);
			map.setView(latlng, 15, { animate: true });
		}
		return true;
	}
	
	console.log("Feature not found");
	return false;
}

function handlePermalinkHash() {
	const hash = window.location.hash;
	if (!hash) return;
	
	const params = new URLSearchParams(hash.substring(1));
	const featureId = params.get("feature");
	
	if (featureId) {
		// Decode the feature ID in case it was encoded
		const decodedId = decodeURIComponent(featureId);
		return selectLayerByFeatureId(decodedId);
	}
	return false;
}

window.addEventListener("hashchange", handlePermalinkHash);

updateDateMajFromGithub();
loadImageCredits();
loadHydroLayers();
loadBibliographyReferences();
loadContributors();

function panelRow(label, value) {
	const dt = document.createElement("dt");
	dt.textContent = label;

	const dd = document.createElement("dd");
	dd.textContent = value;

	panelMeta.appendChild(dt);
	panelMeta.appendChild(dd);

	return { dt, dd };
}

function panelRowWithLink(label, value, url) {
	const dt = document.createElement("dt");
	dt.textContent = label;

	const dd = document.createElement("dd");
	if (url) {
		const link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		link.textContent = value;
		dd.appendChild(link);
	}

	panelMeta.appendChild(dt);
	panelMeta.appendChild(dd);

	return { dt, dd };
}

function hasPanelValue(value) {
	if (value === null || value === undefined) return false;
	const text = String(value).trim();
	return text.length > 0;
}

function formatCoordinates(feature) {
	const coordinates = feature?.geometry?.coordinates;
	if (!Array.isArray(coordinates) || coordinates.length < 2) {
		return "";
	}

	const [longitude, latitude] = coordinates;
	if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
		return "";
	}

	return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}

function setPanelTextBlock(element, label, value) {
	if (!element) return;

	if (hasPanelValue(value)) {
		element.style.display = "block";
		element.innerHTML = `<b>${label}:</b> ${safeText(value, "")}`;
	} else {
		element.style.display = "none";
	}
}

function updatePanel(feature, markerEntry) {
	const props = feature.properties || {};
	const coordinatesText = formatCoordinates(feature);
	updateContributeButton(feature);

	panelType.textContent = typeLabel(props.type);
	panelTitle.textContent = safeText(props.nom, "Nom non renseigné");
	panelSubtitle.textContent = safeText(props["alt-name"], "");

	panelMeta.innerHTML = "";
	panelRow("Identifiant", safeText(props.fid));
	panelRow("Statut", safeText(props.statut));

	if (hasPanelValue(props.existant_etat)) {
		panelRow("Etat", safeText(props.existant_etat));
	}

	const accessValueRaw = accessValueFromProps(props);

	if (hasPanelValue(accessValueRaw)) {
		const accessValue = safeText(accessValueRaw);
		const { dd } = panelRow("Accès", accessValue);
		const accessLevel = accessClass(accessValue);
		if (accessLevel === "private") {
			dd.style.color = "#b00020";
			dd.style.fontWeight = "600";
		} else if (accessLevel === "caution") {
			dd.style.color = "#ed7a0f";
			dd.style.fontWeight = "600";
		} else if (accessLevel === "free") {
			dd.style.color = "#4caf50";
			dd.style.fontWeight = "600";
		}
	}

	const precisionValue = hasPanelValue(props.precision_geom)
		? props.precision_geom
		: hasPanelValue(props.precision)
			? props.precision
			: null;
	const sourceValue = hasPanelValue(props.src_geom)
		? props.src_geom
		: hasPanelValue(props.source)
			? props.source
			: hasPanelValue(props.src)
				? props.src
				: null;

	panelRow("Précision des coordonnées", safeText(precisionValue));
	panelRow("Source", safeText(sourceValue));
	if (coordinatesText) {
		panelRow("Coordonnées (lat, lon)", coordinatesText);
	}
	panelRow("Traces sur le plan de 1910 ?", toYesNo(props.src_p1910));
	panelRow("Trace sur le cadastre de 1842 ?", toYesNo(props.src_c1842));
	if (props.panoramax != null && props.panoramax !== undefined && props.panoramax.trim() !== "") {
		panelRowWithLink("Vue 360°", "Voir sur Panoramax", props.panoramax);
	}

	const historiqueValue = hasPanelValue(props.commentaire_st)
		? props.commentaire_st
		: props["commentaire-st"];
	const nomExplicationValue = hasPanelValue(props["nom-explication"])
		? props["nom-explication"]
		: props.nom_explication;

	setPanelTextBlock(panelDescription, "Description", props.description);
	setPanelTextBlock(panelUsages, "Traditions et usages", props.usages);
	setPanelTextBlock(panelComment, "Historique", historiqueValue);
	setPanelTextBlock(panelLegendes, "Légendes", props.legendes);
	setPanelTextBlock(panelNomExplication, "Explication du nom", nomExplicationValue);

	const layerKind = markerEntry?.layerKind || BASE_LAYER_KIND;
	renderPanelImages(props.fid, layerKind);
}

function resetPanel() {
	panelType.textContent = "Sélectionnez un point sur la carte";
	panelTitle.textContent = "Aucun point sélectionné";
	panelSubtitle.textContent = "Cliquez sur un marqueur pour afficher ses informations.";
	updateContributeButton(null);
	panelMeta.innerHTML = "";
	panelDescription.style.display = "none";
	panelUsages.style.display = "none";
	panelComment.style.display = "none";
	panelLegendes.style.display = "none";
	panelNomExplication.style.display = "none";
	clearPanelImages();
}

function isExplicitFalse(value) {
	if (value === false) return true;
	if (typeof value === "string") {
		const normalized = normalizeText(value);
		return normalized === "false";
	}
	return false;
}

function shouldDisplayHydroSurface(feature) {
	const properties = feature?.properties || {};
	const displayValue = properties.display ?? properties.disply;
	return !isExplicitFalse(displayValue);
}

function loadHydroLayers() {
	fetch("./data/surfaces_hydro.geojson")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Erreur HTTP ${response.status}`);
			}
			return response.json();
		})
		.then((geojson) => {
			const surfacesGeojsonLayer = L.geoJSON(geojson, {
				pane: "hydro-surfaces",
				filter: shouldDisplayHydroSurface,
				style: {
					color: "#2f6f95",
					weight: 1,
					opacity: 0.8,
					fillColor: "#8fc2df",
					fillOpacity: 0.35
				}
			});
			hydroSurfacesLayer.clearLayers();
			hydroSurfacesLayer.addLayer(surfacesGeojsonLayer);
		})
		.catch((error) => {
			console.warn("Impossible de charger surfaces_hydro.geojson", error);
		});

	fetch("./data/troncons_hydro.geojson")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Erreur HTTP ${response.status}`);
			}
			return response.json();
		})
		.then((geojson) => {
			const tronconsGeojsonLayer = L.geoJSON(geojson, {
				pane: "hydro-troncons",
				style: {
					color: "#1b4d74",
					weight: 2,
					opacity: 0.95
				}
			});
			hydroTronconsLayer.clearLayers();
			hydroTronconsLayer.addLayer(tronconsGeojsonLayer);
		})
		.catch((error) => {
			console.warn("Impossible de charger troncons_hydro.geojson", error);
		});
}

function clearSelection() {
	if (selectedLayer) {
		const selectedEntry = markerEntryByLayer.get(selectedLayer);
		if (selectedEntry?.layerKind === PUITS_LAYER_KIND && typeof selectedLayer.setIcon === "function") {
			const color = getPuitsColor(selectedEntry.feature);
			selectedLayer.setIcon(createPuitsIconWithColor(selectedEntry.feature?.properties?.type, false, color));
		} else if (defaultStyleByLayer.has(selectedLayer)) {
			selectedLayer.setStyle(defaultStyleByLayer.get(selectedLayer));
		}
	}
	selectedLayer = null;
	currentFeatureId = null;
	resetPanel();
}

function uniqueSortedValues(features, propertyKey) {
	const values = features
		.map((feature) => safeText(feature.properties?.[propertyKey], ""))
		.filter((value) => value.length > 0);

	return Array.from(new Set(values)).sort((a, b) =>
		a.localeCompare(b, "fr", { sensitivity: "base" })
	);
}

function uniqueSortedValuesWithInconnu(features, propertyKey) {
	const values = [];
	let hasEmpty = false;

	features.forEach((feature) => {
		const value = feature.properties?.[propertyKey];
		const safeValue = safeText(value, "");
		if (safeValue.length > 0) {
			values.push(safeValue);
		} else {
			hasEmpty = true;
		}
	});

	if (hasEmpty) {
		values.push("inconnu");
	}

	return Array.from(new Set(values)).sort((a, b) =>
		a.localeCompare(b, "fr", { sensitivity: "base" })
	);
}

function uniqueSortedAccessValuesWithInconnu(features) {
	const values = [];
	let hasEmpty = false;

	features.forEach((feature) => {
		const safeValue = safeText(accessValueFromProps(feature.properties || {}), "");
		if (safeValue.length > 0) {
			values.push(safeValue);
		} else {
			hasEmpty = true;
		}
	});

	if (hasEmpty) {
		values.push("inconnu");
	}

	return Array.from(new Set(values)).sort((a, b) =>
		a.localeCompare(b, "fr", { sensitivity: "base" })
	);
}

function fillCheckboxOptions(container, values) {
	if (!container) return;
	container.innerHTML = "";
	const containerId = container.id || "filter-options";

	values.forEach((value) => {
		const normalizedValue = normalizeText(value);
		const optionId = `${containerId}-${normalizedValue.replace(/[^a-z0-9]+/g, "-") || "value"}`;

		const optionLabel = document.createElement("label");
		optionLabel.className = "checkbox-option";
		optionLabel.setAttribute("for", optionId);

		const optionInput = document.createElement("input");
		optionInput.type = "checkbox";
		optionInput.id = optionId;
		optionInput.name = "filter-type-option";
		optionInput.value = value;
		optionInput.checked = true;

		const optionText = document.createElement("span");
		optionText.textContent = value;

		optionLabel.append(optionInput, optionText);
		container.appendChild(optionLabel);
	});
}

function fillCheckboxOptionsFromEntries(container, entries) {
	if (!container) return;
	container.innerHTML = "";
	const containerId = container.id || "filter-options";

	entries.forEach((entry) => {
		const normalizedValue = normalizeText(entry.value);
		const optionId = `${containerId}-${normalizedValue.replace(/[^a-z0-9]+/g, "-") || "value"}`;

		const optionLabel = document.createElement("label");
		optionLabel.className = "checkbox-option";
		optionLabel.setAttribute("for", optionId);

		const optionInput = document.createElement("input");
		optionInput.type = "checkbox";
		optionInput.id = optionId;
		optionInput.name = "filter-option";
		optionInput.value = entry.value;
		optionInput.checked = true;

		const optionText = document.createElement("span");
		optionText.textContent = entry.label;

		optionLabel.append(optionInput, optionText);
		container.appendChild(optionLabel);
	});
}

function getSelectedDropdownValues(container, shouldNormalize = true) {
	if (!container) return [];
	return Array.from(
		container.querySelectorAll('input[type="checkbox"]:checked')
	).map((input) => (shouldNormalize ? normalizeText(input.value) : input.value));
}

function setAllDropdownCheckboxes(container, checked) {
	if (!container) return;
	container
		.querySelectorAll('input[type="checkbox"]')
		.forEach((input) => {
			input.checked = checked;
		});
}

function syncDropdownAllCheckboxState(allCheckbox, optionsContainer, summaryElement, singularLabel, pluralLabel) {
	if (!allCheckbox || !optionsContainer) return;

	const checkboxes = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]'));
	if (!checkboxes.length) {
		allCheckbox.checked = false;
		allCheckbox.indeterminate = false;
		if (summaryElement) {
			summaryElement.textContent = "Aucun";
		}
		return;
	}

	const checkedCount = checkboxes.filter((input) => input.checked).length;
	allCheckbox.checked = checkedCount === checkboxes.length;
	allCheckbox.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;

	if (summaryElement) {
		if (checkedCount === checkboxes.length) {
			summaryElement.textContent = "Tous";
		} else if (checkedCount === 0) {
			summaryElement.textContent = "Aucun";
		} else {
			const label = checkedCount > 1 ? pluralLabel : singularLabel;
			summaryElement.textContent = `${checkedCount} ${label}`;
		}
	}
}

function matchesTextPattern(text, pattern) {
	if (!pattern) return true;
	
	try {
		// Try to use pattern as a regex
		const regex = new RegExp(pattern, "i");
		return regex.test(text);
	} catch (error) {
		// If regex is invalid, fall back to substring matching
		return text.includes(pattern);
	}
}

function matchesCurrentFilters(entry) {
	const queryInput = searchInput.value.trim();
	const queryIdInput = searchIdInput?.value.trim();
	const selectedTypes = getSelectedDropdownValues(filterTypeOptions, true);
	const selectedStatuses = getSelectedDropdownValues(filterStatusOptions, true);
	const selectedPrecisions = getSelectedDropdownValues(filterPrecisionOptions, true);
	const selectedSources = getSelectedDropdownValues(filterSourcesOptions, false);
	const selectedMedia = getSelectedDropdownValues(filterImagesOptions, false);
	const selectedAcces = getSelectedDropdownValues(filterAccesOptions, true);
	const selectedEtat = getSelectedDropdownValues(filterEtatOptions, true);

	const hasType = selectedTypes.length === 0 || selectedTypes.includes(entry.typeValue);
	const hasStatus = selectedStatuses.length === 0 || selectedStatuses.includes(entry.statusValue);
	const hasPrecision = selectedPrecisions.length === 0 || selectedPrecisions.includes(entry.precisionValue);
	const hasQuery = !queryInput || matchesTextPattern(entry.searchValue, queryInput);
	const hasId = !queryIdInput || matchesTextPattern(entry.idValue, queryIdInput);
	const accesValue = normalizeText(entry.accesValue || "inconnu");
	const etatValue = normalizeText(entry.etatValue || "inconnu");
	const hasAcces = selectedAcces.length === 0 || selectedAcces.includes(accesValue);
	const hasEtat = selectedEtat.length === 0 || selectedEtat.includes(etatValue);

	const hasSource = selectedSources.length === 0 || selectedSources.some((selectedSource) => {
		if (selectedSource === "plan-1910") {
			return entry.hasPlan1910;
		}
		if (selectedSource === "cadastre-1842") {
			return entry.hasCadastre1842;
		}
		if (selectedSource === "no-sources") {
			return !entry.hasPlan1910 && !entry.hasCadastre1842;
		}
		return false;
	});
	
	let hasMedia = selectedMedia.length === 0;
	const mediaKey = entry.mediaKey;

	if (selectedMedia.length > 0) {
		hasMedia = selectedMedia.some((selectedMediaOption) => {
			if (selectedMediaOption === "photos-only") {
				return featuresWithPhotos.has(mediaKey);
			}
			if (selectedMediaOption === "aerial-photos") {
				return featuresWithAerialPhotos.has(mediaKey);
			}
			if (selectedMediaOption === "plans-only") {
				return featuresWithPlans.has(mediaKey);
			}
			if (selectedMediaOption === "panoramax") {
				return entry.hasPanoramax;
			}
			/*if (selectedMediaOption === "with-media") {
				return featuresWithAnyMedia.has(mediaKey);
			}*/
			if (selectedMediaOption === "without-media") {
				return !featuresWithAnyMedia.has(mediaKey);
			}
			return false;
		});
	}

	return hasType && hasStatus && hasPrecision && hasQuery && hasId && hasSource && hasMedia && hasAcces && hasEtat;
}

function renderVisibleLayers(zoomToVisible) {
	visibleLayerGroup.clearLayers();
	puitsLayerGroup.clearLayers();

	const visibleEntries = markerEntries.filter(matchesCurrentFilters);
	const visibleBaseEntries = visibleEntries.filter((entry) => entry.layerKind !== PUITS_LAYER_KIND);
	const visiblePuitsEntries = visibleEntries.filter((entry) => entry.layerKind === PUITS_LAYER_KIND);
	const totalBaseEntries = markerEntries.filter((entry) => entry.layerKind !== PUITS_LAYER_KIND).length;
	const totalPuitsEntries = markerEntries.filter((entry) => entry.layerKind === PUITS_LAYER_KIND).length;
	visibleEntries.forEach((entry) => {
		if (entry.layerKind === PUITS_LAYER_KIND) {
			puitsLayerGroup.addLayer(entry.layer);
		} else {
			visibleLayerGroup.addLayer(entry.layer);
		}
	});
	updateStatsHistograms(visibleBaseEntries, visiblePuitsEntries);

	const puitsVisible = map.hasLayer(puitsLayerGroup);
	if (puitsVisible) {
		resultsCount.textContent = `${visibleBaseEntries.length} / ${totalBaseEntries} points affichés (lavoirs, fontaines) | ${visiblePuitsEntries.length} / ${totalPuitsEntries} points affichés (puits)`;
	} else {
		resultsCount.textContent = `${visibleBaseEntries.length} / ${totalBaseEntries} points affichés`;
	}

	if (
		selectedLayer &&
		!visibleLayerGroup.hasLayer(selectedLayer) &&
		!puitsLayerGroup.hasLayer(selectedLayer)
	) {
		clearSelection();
	}

	if (zoomToVisible && visibleEntries.length > 0) {
		const group = L.featureGroup(visibleEntries.map((entry) => entry.layer));
		map.fitBounds(group.getBounds(), { padding: [25, 25] });
	}
}

function selectLayer(layer, feature, markerEntry = markerEntryByLayer.get(layer)) {
	if (selectedLayer) {
		const selectedEntry = markerEntryByLayer.get(selectedLayer);
		if (selectedEntry?.layerKind === PUITS_LAYER_KIND && typeof selectedLayer.setIcon === "function") {
			const color = getPuitsColor(selectedEntry.feature);
			selectedLayer.setIcon(createPuitsIconWithColor(selectedEntry.feature?.properties?.type, false, color));
		} else if (defaultStyleByLayer.has(selectedLayer)) {
			selectedLayer.setStyle(defaultStyleByLayer.get(selectedLayer));
		}
	}

	selectedLayer = layer;
	if (markerEntry?.layerKind === PUITS_LAYER_KIND && typeof layer.setIcon === "function") {
		const color = getPuitsColor(feature);
		layer.setIcon(createPuitsIconWithColor(feature?.properties?.type, true, color));
	} else {
		layer.setStyle(selectedMarkerStyle(defaultStyleByLayer.get(layer) || markerStyleFromFeature(feature)));
	}

	currentFeatureId = feature.properties?.fid || null;
	updatePanel(feature, markerEntry);
}

fetch("./data/data.geojson")
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}
		return response.json();
	})
	.then((baseGeojson) =>
		fetch("./data/puits.geojson")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Erreur HTTP ${response.status}`);
				}
				return response.json();
			})
			.then((puitsGeojson) => ({ baseGeojson, puitsGeojson }))
	)
	.then(({ baseGeojson, puitsGeojson }) => {
		const baseFeatures = baseGeojson.features || [];
		const puitsFeatures = puitsGeojson.features || [];

		// Populate featuresWithPanoramax from feature properties
		baseFeatures.forEach((feature) => {
			const fid = safeText(feature.properties?.fid, "").trim();
			if (!fid) return;
			const hasPanoramaxUrl = feature.properties?.panoramax != null && 
				feature.properties.panoramax !== undefined && 
				String(feature.properties.panoramax).trim() !== "";
			if (hasPanoramaxUrl) {
				const mediaKey = mediaKeyForFeature(BASE_LAYER_KIND, fid);
				featuresWithPanoramax.add(mediaKey);
				featuresWithAnyMedia.add(mediaKey);
			}
		});
		puitsFeatures.forEach((feature) => {
			const fid = safeText(feature.properties?.fid, "").trim();
			if (!fid) return;
			const hasPanoramaxUrl = feature.properties?.panoramax != null && 
				feature.properties.panoramax !== undefined && 
				String(feature.properties.panoramax).trim() !== "";
			if (hasPanoramaxUrl) {
				const mediaKey = mediaKeyForFeature(PUITS_LAYER_KIND, fid);
				featuresWithPanoramax.add(mediaKey);
				featuresWithAnyMedia.add(mediaKey);
			}
		});

		const baseTypeValues = uniqueSortedValues(baseFeatures, "type");
		const puitsTypeValues = uniqueSortedValues(puitsFeatures, "type");
		const baseStatusValues = uniqueSortedValues(baseFeatures, "statut");
		const puitsStatusValues = uniqueSortedValues(puitsFeatures, "statut");
		const basePrecisionValues = uniqueSortedValues(baseFeatures, "precision_geom");
		const puitsPrecisionValues = uniqueSortedValues(puitsFeatures, "precision_geom");
		const baseAccesValues = uniqueSortedAccessValuesWithInconnu(baseFeatures);
		const puitsAccesValues = uniqueSortedAccessValuesWithInconnu(puitsFeatures);
		const baseEtatValues = uniqueSortedValuesWithInconnu(baseFeatures, "existant_etat");
		const puitsEtatValues = uniqueSortedValuesWithInconnu(puitsFeatures, "existant_etat");
		
		// Store all types separately for dynamic filtering
		const allBaseTypes = baseTypeValues;
		const allPuitsTypes = puitsTypeValues;
		const allBaseStatus = baseStatusValues;
		const allPuitsStatus = puitsStatusValues;
		const allBasePrecision = basePrecisionValues;
		const allPuitsPrecision = puitsPrecisionValues;
		const allBaseAcces = baseAccesValues;
		const allPuitsAcces = puitsAccesValues;
		const allBaseEtat = baseEtatValues;
		const allPuitsEtat = puitsEtatValues;
		
		// Function to update type filter options based on layer visibility
		function updateTypeFilterOptions() {
			const puitsVisible = map.hasLayer(puitsLayerGroup);
			let combinedTypeValues = [...new Set([...allBaseTypes])];
			
			if (puitsVisible) {
				// Include puits types when layer is visible
				combinedTypeValues = [...new Set([...allBaseTypes, ...allPuitsTypes])];
			}
			
			// Check if "All" was selected before (meaning all types were checked)
			const allWasSelected = filterTypeAll.checked;
			const previouslySelectedTypes = getSelectedDropdownValues(filterTypeOptions, true);
			
			const typeEntries = combinedTypeValues.sort().map((v) => {
				const normalizedV = normalizeText(v);
				return { value: v, label: TYPE_LABELS[normalizedV] || v };
			});
			fillCheckboxOptionsFromEntries(filterTypeOptions, typeEntries);
			
			// Restore previously selected types
			// When puits layer becomes visible, check all new puits types by default
			const newCheckboxes = filterTypeOptions.querySelectorAll('input[type="checkbox"]');
			const allPuitsTypeValues = new Set(allPuitsTypes.map(v => normalizeText(v)));
			const allBaseTypeValues = new Set(allBaseTypes.map(v => normalizeText(v)));
			
			newCheckboxes.forEach((checkbox) => {
				const normalizedValue = normalizeText(checkbox.value);
				const isPuitsType = allPuitsTypeValues.has(normalizedValue);
				const isBaseType = allBaseTypeValues.has(normalizedValue);
				
				// Check if: all was selected, or type was previously selected, or it's a newly added puits type
				if (allWasSelected || 
				    previouslySelectedTypes.includes(normalizedValue) ||
				    (puitsVisible && isPuitsType && !isBaseType)) {
					checkbox.checked = true;
				}
			});
			
			// Re-sync the "All" checkbox state
			syncDropdownAllCheckboxState(filterTypeAll, filterTypeOptions, filterTypeSummary, "type", "types");
		}
		
		// Function to update status filter options based on layer visibility
		function updateStatusFilterOptions() {
			const puitsVisible = map.hasLayer(puitsLayerGroup);
			let combinedStatusValues = [...new Set([...allBaseStatus])];
			
			if (puitsVisible) {
				// Include puits status values when layer is visible
				combinedStatusValues = [...new Set([...allBaseStatus, ...allPuitsStatus])];
			}
			
			// Check if "All" was selected before (meaning all statuses were checked)
			const allWasSelected = filterStatusAll.checked;
			const previouslySelectedStatuses = getSelectedDropdownValues(filterStatusOptions, true);
			
			fillCheckboxOptions(filterStatusOptions, combinedStatusValues);
			
			// Restore previously selected statuses
			// When puits layer becomes visible, check all new puits statuses by default
			const newCheckboxes = filterStatusOptions.querySelectorAll('input[type="checkbox"]');
			const allPuitsStatusValues = new Set(allPuitsStatus.map(v => normalizeText(v)));
			const allBaseStatusValues = new Set(allBaseStatus.map(v => normalizeText(v)));
			
			newCheckboxes.forEach((checkbox) => {
				const normalizedValue = normalizeText(checkbox.value);
				const isPuitsStatus = allPuitsStatusValues.has(normalizedValue);
				const isBaseStatus = allBaseStatusValues.has(normalizedValue);
				
				// Check if: all was selected, or status was previously selected, or it's a newly added puits status
				if (allWasSelected || 
				    previouslySelectedStatuses.includes(normalizedValue) ||
				    (puitsVisible && isPuitsStatus && !isBaseStatus)) {
					checkbox.checked = true;
				}
			});
			
			// Re-sync the "All" checkbox state
			syncDropdownAllCheckboxState(filterStatusAll, filterStatusOptions, filterStatusSummary, "statut", "statuts");
		}
		
		// Function to update precision filter options based on layer visibility
		function updatePrecisionFilterOptions() {
			const puitsVisible = map.hasLayer(puitsLayerGroup);
			let combinedPrecisionValues = [...new Set([...allBasePrecision])];
			
			if (puitsVisible) {
				// Include puits precision values when layer is visible
				combinedPrecisionValues = [...new Set([...allBasePrecision, ...allPuitsPrecision])];
			}
			
			// Check if "All" was selected before (meaning all precisions were checked)
			const allWasSelected = filterPrecisionAll.checked;
			const previouslySelectedPrecisions = getSelectedDropdownValues(filterPrecisionOptions, true);
			
			fillCheckboxOptions(filterPrecisionOptions, combinedPrecisionValues);
			
			// Restore previously selected precisions
			// When puits layer becomes visible, check all new puits precisions by default
			const newCheckboxes = filterPrecisionOptions.querySelectorAll('input[type="checkbox"]');
			const allPuitsPrecisionValues = new Set(allPuitsPrecision.map(v => normalizeText(v)));
			const allBasePrecisionValues = new Set(allBasePrecision.map(v => normalizeText(v)));
			
			newCheckboxes.forEach((checkbox) => {
				const normalizedValue = normalizeText(checkbox.value);
				const isPuitsPrecision = allPuitsPrecisionValues.has(normalizedValue);
				const isBasePrecision = allBasePrecisionValues.has(normalizedValue);
				
				// Check if: all was selected, or precision was previously selected, or it's a newly added puits precision
				if (allWasSelected || 
				    previouslySelectedPrecisions.includes(normalizedValue) ||
				    (puitsVisible && isPuitsPrecision && !isBasePrecision)) {
					checkbox.checked = true;
				}
			});
			
			// Re-sync the "All" checkbox state
			syncDropdownAllCheckboxState(filterPrecisionAll, filterPrecisionOptions, filterPrecisionSummary, "niveau", "niveaux");
		}
		
		// Function to update acces filter options based on layer visibility
		function updateAccesFilterOptions() {
			const puitsVisible = map.hasLayer(puitsLayerGroup);
			let combinedAccesValues = [...new Set([...allBaseAcces])];
			
			if (puitsVisible) {
				// Include puits acces values when layer is visible
				combinedAccesValues = [...new Set([...allBaseAcces, ...allPuitsAcces])];
			}
			
			// Check if "All" was selected before (meaning all acces were checked)
			const allWasSelected = filterAccesAll.checked;
			const previouslySelectedAcces = getSelectedDropdownValues(filterAccesOptions, true);
			
			fillCheckboxOptions(filterAccesOptions, combinedAccesValues);
			
			// Restore previously selected acces
			// When puits layer becomes visible, check all new puits acces by default
			const newCheckboxes = filterAccesOptions.querySelectorAll('input[type="checkbox"]');
			const allPuitsAccesValues = new Set(allPuitsAcces.map(v => normalizeText(v)));
			const allBaseAccesValues = new Set(allBaseAcces.map(v => normalizeText(v)));
			
			newCheckboxes.forEach((checkbox) => {
				const normalizedValue = normalizeText(checkbox.value);
				const isPuitsAcces = allPuitsAccesValues.has(normalizedValue);
				const isBaseAcces = allBaseAccesValues.has(normalizedValue);
				
				// Check if: all was selected, or acces was previously selected, or it's a newly added puits acces
				if (allWasSelected || 
				    previouslySelectedAcces.includes(normalizedValue) ||
				    (puitsVisible && isPuitsAcces && !isBaseAcces)) {
					checkbox.checked = true;
				}
			});
			
			// Re-sync the "All" checkbox state
			syncDropdownAllCheckboxState(filterAccesAll, filterAccesOptions, filterAccesSummary, "accès", "accès");
		}
		
		// Function to update etat filter options based on layer visibility
		function updateEtatFilterOptions() {
			const puitsVisible = map.hasLayer(puitsLayerGroup);
			let combinedEtatValues = [...new Set([...allBaseEtat])];
			
			if (puitsVisible) {
				// Include puits etat values when layer is visible
				combinedEtatValues = [...new Set([...allBaseEtat, ...allPuitsEtat])];
			}
			
			// Check if "All" was selected before (meaning all etats were checked)
			const allWasSelected = filterEtatAll.checked;
			const previouslySelectedEtats = getSelectedDropdownValues(filterEtatOptions, true);
			
			fillCheckboxOptions(filterEtatOptions, combinedEtatValues);
			
			// Restore previously selected etats
			// When puits layer becomes visible, check all new puits etats by default
			const newCheckboxes = filterEtatOptions.querySelectorAll('input[type="checkbox"]');
			const allPuitsEtatValues = new Set(allPuitsEtat.map(v => normalizeText(v)));
			const allBaseEtatValues = new Set(allBaseEtat.map(v => normalizeText(v)));
			
			newCheckboxes.forEach((checkbox) => {
				const normalizedValue = normalizeText(checkbox.value);
				const isPuitsEtat = allPuitsEtatValues.has(normalizedValue);
				const isBaseEtat = allBaseEtatValues.has(normalizedValue);
				
				// Check if: all was selected, or etat was previously selected, or it's a newly added puits etat
				if (allWasSelected || 
				    previouslySelectedEtats.includes(normalizedValue) ||
				    (puitsVisible && isPuitsEtat && !isBaseEtat)) {
					checkbox.checked = true;
				}
			});
			
			// Re-sync the "All" checkbox state
			syncDropdownAllCheckboxState(filterEtatAll, filterEtatOptions, filterEtatSummary, "état", "états");
		}
		
		// Initialize with base types only (puits layer is hidden by default)
		updateTypeFilterOptions();
		updateStatusFilterOptions();
		updatePrecisionFilterOptions();
		updateAccesFilterOptions();
		updateEtatFilterOptions();
		fillCheckboxOptionsFromEntries(filterSourcesOptions, SOURCE_FILTER_OPTIONS);
		fillCheckboxOptionsFromEntries(filterImagesOptions, MEDIA_FILTER_OPTIONS);

		syncDropdownAllCheckboxState(filterSourcesAll, filterSourcesOptions, filterSourcesSummary, "source", "sources");
		syncDropdownAllCheckboxState(filterImagesAll, filterImagesOptions, filterImagesSummary, "média", "médias");

		const pointsLayer = L.geoJSON(baseGeojson, {
			pointToLayer(feature, latlng) {
				const marker = L.circleMarker(latlng, markerStyleFromFeature(feature));

				defaultStyleByLayer.set(marker, markerStyleFromFeature(feature));
				return marker;
			},
			onEachFeature(feature, layer) {
				const title = safeText(feature.properties?.nom);
				const kind = typeLabel(feature.properties?.type);
				const altName = safeText(feature.properties?.["alt-name"], "");
				const fid = safeText(feature.properties?.fid, "");
				const mediaKey = mediaKeyForFeature(BASE_LAYER_KIND, fid);
				const toolTipLabel = '';
				if (title !== null && title.length > 0) {
					tooltiplabel = `${title}`;
				} else {
					tooltiplabel = `${kind}`;
				}
				layer.bindTooltip(tooltiplabel, {
					direction: "top",
					opacity: 0.95,
					offset: [0, -6]
				});

				const hasPanoramaxUrl = feature.properties?.panoramax != null && 
					feature.properties.panoramax !== undefined && 
					String(feature.properties.panoramax).trim() !== "";

				const markerEntry = {
					layer,
					feature,
					layerKind: BASE_LAYER_KIND,
					mediaKey,
					featureId: feature.properties?.fid,
					idValue: normalizeText(feature.properties?.fid),
					typeValue: normalizeText(feature.properties?.type),
					statusValue: normalizeText(feature.properties?.statut),
					precisionValue: normalizeText(feature.properties?.precision_geom),
					accesValue: normalizeText(accessValueFromProps(feature.properties || {})),
					etatValue: normalizeText(feature.properties?.existant_etat),
					hasPlan1910: isSourcePresent(feature.properties?.src_p1910),
					hasCadastre1842: isSourcePresent(feature.properties?.src_c1842),
					hasPanoramax: hasPanoramaxUrl,
					searchValue: normalizeText(`${title} ${altName}`)
				};
				markerEntries.push(markerEntry);
				markerEntryByLayer.set(layer, markerEntry);

				layer.on("click", () => {
					selectLayer(layer, feature, markerEntry);
				});
			}
		});

		const puitsLayer = L.geoJSON(puitsGeojson, {
			pointToLayer(feature, latlng) {
				const marker = L.marker(latlng, { icon: createPuitsIconWithColor(feature?.properties?.type, false) });
				return marker;
			},
			onEachFeature(feature, layer) {
				const rawName = safeText(feature.properties?.nom, "");
				const title = rawName || "Puit sans nom";
				const kind = typeLabel(feature.properties?.type);
				const altName = safeText(feature.properties?.["alt-name"], "");
				const fid = safeText(feature.properties?.fid, "");
				const mediaKey = mediaKeyForFeature(PUITS_LAYER_KIND, fid);
				const tooltipText = rawName ? `${title} (${kind})` : kind;
				layer.bindTooltip(tooltipText, {
					direction: "top",
					opacity: 0.95,
					offset: [0, -6]
				});

				const hasPanoramaxUrl = feature.properties?.panoramax != null && 
					feature.properties.panoramax !== undefined && 
					String(feature.properties.panoramax).trim() !== "";

				const markerEntry = {
					layer,
					feature,
					layerKind: PUITS_LAYER_KIND,
					mediaKey,
					featureId: feature.properties?.fid,
					idValue: normalizeText(feature.properties?.fid),
					typeValue: normalizeText(feature.properties?.type),
					statusValue: normalizeText(feature.properties?.statut),
					precisionValue: normalizeText(feature.properties?.precision_geom),
					accesValue: normalizeText(accessValueFromProps(feature.properties || {})),
					etatValue: normalizeText(feature.properties?.existant_etat),
					hasPlan1910: isSourcePresent(feature.properties?.src_p1910),
					hasCadastre1842: isSourcePresent(feature.properties?.src_c1842),
					hasPanoramax: hasPanoramaxUrl,
					searchValue: normalizeText(`${title} ${altName}`)
				};
				markerEntries.push(markerEntry);
				markerEntryByLayer.set(layer, markerEntry);

				layer.on("click", () => {
					selectLayer(layer, feature, markerEntry);
				});
			}
		});

		pointsLayer.eachLayer((layer) => {
			visibleLayerGroup.addLayer(layer);
		});
		puitsLayer.eachLayer((layer) => {
			puitsLayerGroup.addLayer(layer);
		});

		renderVisibleLayers(true);
		refreshMarkerColors();
		
		// Handle permalink if present in URL (with fallback timing)
		let permalinkHandled = false;
		const attemptHandlePermalink = () => {
			if (!permalinkHandled) {
				permalinkHandled = handlePermalinkHash();
			}
		};
		window.setTimeout(attemptHandlePermalink, 50);
		window.setTimeout(attemptHandlePermalink, 300);

		const checkboxDropdownConfigs = [
			{ details: filterType, all: filterTypeAll, options: filterTypeOptions, summary: filterTypeSummary, singular: "type", plural: "types" },
			{ details: filterStatus, all: filterStatusAll, options: filterStatusOptions, summary: filterStatusSummary, singular: "statut", plural: "statuts" },
			{ details: filterPrecision, all: filterPrecisionAll, options: filterPrecisionOptions, summary: filterPrecisionSummary, singular: "niveau", plural: "niveaux" },
			{ details: filterAcces, all: filterAccesAll, options: filterAccesOptions, summary: filterAccesSummary, singular: "accès", plural: "accès" },
			{ details: filterEtat, all: filterEtatAll, options: filterEtatOptions, summary: filterEtatSummary, singular: "état", plural: "états" },
			{ details: filterSources, all: filterSourcesAll, options: filterSourcesOptions, summary: filterSourcesSummary, singular: "source", plural: "sources" },
			{ details: filterImages, all: filterImagesAll, options: filterImagesOptions, summary: filterImagesSummary, singular: "média", plural: "médias" }
		];

		checkboxDropdownConfigs.forEach((config) => {
			if (!config.details || !config.all || !config.options) return;
			config.details.addEventListener("change", (event) => {
				const target = event.target;
				if (!(target instanceof HTMLInputElement)) return;

				if (target === config.all) {
					setAllDropdownCheckboxes(config.options, target.checked);
				}

				syncDropdownAllCheckboxState(
					config.all,
					config.options,
					config.summary,
					config.singular,
					config.plural
				);
				renderVisibleLayers(false);
			});
		});

		[searchInput, searchIdInput].forEach((element) => {
			if (!element) return;
			element.addEventListener("input", () => {
				renderVisibleLayers(false);
			});
			element.addEventListener("change", () => {
				renderVisibleLayers(false);
			});
		});

		[colorMode].forEach((element) => {
			element.addEventListener("input", refreshMarkerColors);
			element.addEventListener("change", refreshMarkerColors);
		});

		resetFiltersButton.addEventListener("click", () => {
			searchInput.value = "";
			if (searchIdInput) {
				searchIdInput.value = "";
			}

			[
				{ all: filterTypeAll, options: filterTypeOptions, summary: filterTypeSummary, singular: "type", plural: "types" },
				{ all: filterStatusAll, options: filterStatusOptions, summary: filterStatusSummary, singular: "statut", plural: "statuts" },
				{ all: filterPrecisionAll, options: filterPrecisionOptions, summary: filterPrecisionSummary, singular: "niveau", plural: "niveaux" },
				{ all: filterAccesAll, options: filterAccesOptions, summary: filterAccesSummary, singular: "accès", plural: "accès" },
				{ all: filterEtatAll, options: filterEtatOptions, summary: filterEtatSummary, singular: "état", plural: "états" },
				{ all: filterSourcesAll, options: filterSourcesOptions, summary: filterSourcesSummary, singular: "source", plural: "sources" },
				{ all: filterImagesAll, options: filterImagesOptions, summary: filterImagesSummary, singular: "média", plural: "médias" }
			].forEach((config) => {
				setAllDropdownCheckboxes(config.options, true);
				syncDropdownAllCheckboxState(config.all, config.options, config.summary, config.singular, config.plural);
			});

			colorMode.value = DEFAULT_COLOR_MODE;
			refreshMarkerColors();
			renderVisibleLayers(true);
		});

		// Listen for layer visibility changes to update the counter and type filter
		// This must be outside the reset button handler
		map.on('layeradd layerremove', function(e) {
			if (e.layer === puitsLayerGroup) {
				// Update type filter options based on layer visibility
				updateTypeFilterOptions();
				// Update status filter options based on layer visibility
				updateStatusFilterOptions();
				// Update precision filter options based on layer visibility
				updatePrecisionFilterOptions();
				// Update acces filter options based on layer visibility
				updateAccesFilterOptions();
				// Update etat filter options based on layer visibility
				updateEtatFilterOptions();
				// Update legend to show/hide puits types
				updateLegend();
				// Re-render to update the counter display
				renderVisibleLayers(false);
			}
		});
	})
	.catch((error) => {
		panelType.textContent = "Chargement impossible";
		panelTitle.textContent = "Erreur de lecture";
		panelSubtitle.textContent = "Le fichier data.geojson n'a pas pu etre charge.";
		panelMeta.innerHTML = "";
		panelDescription.style.display = "none";
		panelComment.style.display = "none";
		resultsCount.textContent = "0 / 0 points affichés";
		console.error(error);
	});
