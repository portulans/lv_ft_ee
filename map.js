const map = L.map("map", {
	zoomControl: true,
	preferCanvas: true
});

///////// Plans //////////

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

///////// Images aériennes //////////

var ignaerial1950 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_0_18" +
    "&FORMAT=image/png"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.1950-1965"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        maxZoom : 18,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

var ignaerial1965 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=BDORTHOHISTORIQUE" +
    "&TILEMATRIXSET=PM_3_18" +
    "&FORMAT=image/png"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.1965-1980"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 3,
        maxZoom : 18,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

var ignaerial2000 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/png"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.COAST2000"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2005 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2000-2005"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2009 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2006-2010"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2015 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2011-2015"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2018 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_0_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2018"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2023 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

var ign2023 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_0_19" +
    "&FORMAT=image/png"+
    "&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        maxZoom : 19,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    }).addTo(map);

var lidarhd = L.tileLayer(
	"https://data.geopf.fr/wmts?" +
	"&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
	"&STYLE=normal" +
	"&FORMAT=image/png" +
	"&TILEMATRIXSET=PM_0_18" +
	"&LAYER=IGNF_LIDAR-HD_MNT_ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW" +
	"&TILEMATRIX={z}" +
	"&TILEROW={y}" +
	"&TILECOL={x}",
	
	{
		minZoom : 0,
		maxZoom : 18,
		attribution : "IGN",
	}
);

const baseLayers = {
	"Plan IGN":ign2023,
	"OpenStreetMap": osm,
	"IGN 1950-1965": ignaerial1950,
	"IGN 1965-1980": ignaerial1965,
	"IGN Coast 2000": ignaerial2000,
	"IGN 2000-2005": ignaerial2005,
	"IGN 2006-2010": ignaerial2009,
	"IGN 2011-2015": ignaerial2015,
	"IGN 2018": ignaerial2018,
	"IGN BD Ortho (récente)": ignaerial2023,
	"MNT (relief 1m)": lidarhd
};

const panelType = document.getElementById("feature-type");
const panelTitle = document.getElementById("feature-title");
const panelSubtitle = document.getElementById("feature-subtitle");
const panelMeta = document.getElementById("feature-meta");
const panelDescription = document.getElementById("feature-description");
const panelComment = document.getElementById("feature-comment");
const panelImages = document.getElementById("feature-images");
const shareButton = document.getElementById("share-button");
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
const locateUserButton = document.getElementById("locate-user");
const resetFiltersButton = document.getElementById("filters-reset");
const resultsCount = document.getElementById("results-count");
const dateMajElement = document.getElementById("date-maj");

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

function generatePermalinkUrl(fid) {
	if (!fid) return null;
	const url = new URL(window.location);
	url.hash = `feature=${encodeURIComponent(fid)}`;
	return url.toString();
}

const TYPE_LABELS = {
	lavoir: "Lavoir",
	fontaine: "Fontaine",
	lavoir_fontaine: "Lavoir et fontaine",
	"lavoir en bordure de greve": "Lavoir en bordure de grève",
	aiguade: "Aiguade",
	"doué":"Douet",
	routoir: "Routoir",
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
	lavoir: { color: "#2f6f95", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	fontaine: { color: "#3f9d68", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	lavoir_fontaine: { color: "#7a5a9c", radius: 7, weight: 2, fillOpacity: 0.88 },
	"lavoir en bordure de greve": { color: "#c95d3a", radius: 8, weight: 2, fillOpacity: 0.88 },
	aiguade: { color: "#1e90ff", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"doué": { color: "#f0c039", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	routoir: { color: "#8f3b2c", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	"marre": { color: "#f27954", radius: 7, weight: 1.5, fillOpacity: 0.85 },
	inconnu: { color: "#7b8790", radius: 7, weight: 1.5, fillOpacity: 0.82 }
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
		{ color: TYPE_STYLE.lavoir.color, label: TYPE_LABELS.lavoir },
		{ color: TYPE_STYLE.fontaine.color, label: TYPE_LABELS.fontaine },
		{ color: TYPE_STYLE.lavoir_fontaine.color, label: TYPE_LABELS.lavoir_fontaine },
		{ color: TYPE_STYLE["lavoir en bordure de greve"].color, label: TYPE_LABELS["lavoir en bordure de greve"] },
		{ color: TYPE_STYLE["aiguade"].color, label: TYPE_LABELS["aiguade"] },
		{ color: TYPE_STYLE["doué"].color, label: TYPE_LABELS["doué"] },
		{ color: TYPE_STYLE["routoir"].color, label: TYPE_LABELS["routoir"] },
		{ color: TYPE_STYLE["marre"].color, label: TYPE_LABELS["marre"] },
		{ color: TYPE_STYLE.inconnu.color, label: TYPE_LABELS.inconnu }
	]
};

let selectedLayer = null;
let defaultStyleByLayer = new WeakMap();
const visibleLayerGroup = L.layerGroup().addTo(map);
const markerEntries = [];
let userLocationMarker = null;
let userAccuracyCircle = null;
let panelImageRequestToken = 0;
let creditsByImageName = new Map();
let imageNamesById = new Map();
const panelImagesCache = new Map();
const featuresWithPhotos = new Set();
const featuresWithPlans = new Set();
const featuresWithAnyMedia = new Set();
let hydroSurfacesLayer = null;
let hydroTronconsLayer = null;

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_PANEL_NUMBERED_IMAGES = 12;
const DEFAULT_COLOR_MODE = "type";
const SOURCE_FILTER_OPTIONS = [
	{ value: "plan-1910", label: "Plan d'ensemble (1910)" },
	{ value: "cadastre-1842", label: "Cadastre parcellaire (1842)" },
	{ value: "no-sources", label: "Aucune source historique" }
];
const MEDIA_FILTER_OPTIONS = [
	{ value: "photos-only", label: "Photos" },
	{ value: "plans-only", label: "Plans cadastraux" },
	/*{ value: "with-media", label: "Avec médias" },*/
	{ value: "without-media", label: "Sans médias" }
];

if (colorMode) {
	colorMode.value = DEFAULT_COLOR_MODE;
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

async function loadImageCredits() {
	try {
		const response = await fetch("./data/credits.json");
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}
		const text = await response.text();
		const entries = parseJsonLoose(text);
		if (!Array.isArray(entries)) return;

		const mapByImage = new Map();
		const mapById = new Map();
		const photosByFeature = new Map();
		const plansByFeature = new Map();
		
		entries.forEach((entry) => {
			const imageId = safeText(entry?.id, "").trim();
			const imageName = safeText(entry?.img, "").trim().toLowerCase();
			const mediaType = safeText(entry?.type, "").trim().toLowerCase();
			const mediaLink = safeText(entry?.lien, "").trim();
			
			if (!imageName) return;
			mapByImage.set(imageName, {
				author: safeText(entry?.author, ""),
				date: safeText(entry?.date, ""),
				type: mediaType,
				lien: mediaLink
			});

			if (!imageId) return;
			
			// Track by feature ID
			if (!mapById.has(imageId)) {
				mapById.set(imageId, []);
			}
			mapById.get(imageId).push(imageName);
			
			// Track media types by feature
			featuresWithAnyMedia.add(imageId);
			
			if (mediaType === "photo") {
				featuresWithPhotos.add(imageId);
				if (!photosByFeature.has(imageId)) {
					photosByFeature.set(imageId, []);
				}
				photosByFeature.get(imageId).push(imageName);
			} else if (mediaType === "plan cadastral") {
				featuresWithPlans.add(imageId);
				if (!plansByFeature.has(imageId)) {
					plansByFeature.set(imageId, []);
				}
				plansByFeature.get(imageId).push(imageName);
			}
		});

		creditsByImageName = mapByImage;
		imageNamesById = mapById;
		
		console.log("Media tracking loaded:");
		console.log("Features with photos:", featuresWithPhotos.size);
		console.log("Features with plans:", featuresWithPlans.size);
		console.log("Features with any media:", featuresWithAnyMedia.size);
	} catch (error) {
		console.warn("Impossible de charger credits.json", error);
	}
}

const layerControl = L.control.layers(
	baseLayers,
	{
		"Points recensés": visibleLayerGroup
	},
	{
		collapsed: false,
		position: "topright"
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

const layerControlContainer = layerControl.getContainer();
if (layerControlContainer) {
	const mobileLayerControlMediaQuery = window.matchMedia("(max-width: 620px)");

	layerControlContainer.classList.add("base-layer-control");
	layerControlContainer.classList.add("base-layer-control--collapsed");

	const controlHeader = document.createElement("div");
	controlHeader.className = "base-layer-control__header";

	const controlTitle = document.createElement("span");
	controlTitle.className = "base-layer-control__title";
	controlTitle.textContent = "Fonds de carte";

	const controlToggle = document.createElement("button");
	controlToggle.type = "button";
	controlToggle.className = "base-layer-control__toggle";
	controlToggle.setAttribute("aria-expanded", "false");
	controlToggle.setAttribute("aria-label", "Afficher les fonds de carte");
	controlToggle.textContent = "Fonds";

	controlHeader.append(controlTitle, controlToggle);
	layerControlContainer.prepend(controlHeader);

	const controlForm = layerControlContainer.querySelector(".leaflet-control-layers-form");

	function shouldAutoCollapseLayerControl() {
		return mobileLayerControlMediaQuery.matches;
	}

	function setLayerControlCollapsed(isCollapsed) {
		layerControlContainer.classList.toggle("base-layer-control--collapsed", isCollapsed);
		controlToggle.setAttribute("aria-expanded", String(!isCollapsed));
		controlToggle.setAttribute(
			"aria-label",
			isCollapsed ? "Afficher les fonds de carte" : "Replier les fonds de carte"
		);
		controlToggle.textContent = isCollapsed ? "Fonds" : "Replier";
		if (controlForm) {
			controlForm.hidden = isCollapsed;
		}
	}

	setLayerControlCollapsed(true);
	controlToggle.addEventListener("click", () => {
		setLayerControlCollapsed(
			!layerControlContainer.classList.contains("base-layer-control--collapsed")
		);
	});

	layerControlContainer.addEventListener("change", (event) => {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (!target.classList.contains("leaflet-control-layers-selector")) return;
		if (!shouldAutoCollapseLayerControl()) return;

		window.setTimeout(() => {
			setLayerControlCollapsed(true);
		}, 0);
	});

	map.on("click", () => {
		if (!shouldAutoCollapseLayerControl()) return;
		if (layerControlContainer.classList.contains("base-layer-control--collapsed")) return;
		setLayerControlCollapsed(true);
	});
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

function safeText(value, fallback = "Non renseigne") {
	if (value === null || value === undefined) {
		return fallback;
	}
	const text = String(value).trim();
	return text.length ? text : fallback;
}

function typeLabel(rawType) {
	return TYPE_LABELS[rawType] || safeText(rawType);
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
	if (typeKey.includes("lavoir") && typeKey.includes("fontaine")) {
		return TYPE_STYLE.lavoir_fontaine;
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

function applyMarkerStyle(layer, feature) {
	const style = markerStyleFromFeature(feature);
	defaultStyleByLayer.set(layer, style);
	layer.setStyle(layer === selectedLayer ? selectedMarkerStyle(style) : style);
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
			? "Type de point"
			: "Statut";
	const entries = LEGEND_ENTRIES[mode];
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
	const cleanedUrl = url.split("?")[0].split("#")[0];
	const parts = cleanedUrl.split("/");
	return decodeURIComponent(parts[parts.length - 1] || "").toLowerCase();
}

function creditFromUrl(url) {
	const imageName = imageNameFromUrl(url);
	return creditsByImageName.get(imageName) || null;
}

function captionTextFromUrl(url) {
	const credit = creditFromUrl(url);
	if (!credit) return "";

	const author = safeText(credit.author, "");
	const date = safeText(credit.date, "");
	if (author && date) {
		return `${author} - ${date}`;
	}
	return author || date || "";
}

function videoLinkFromUrl(url) {
	const credit = creditFromUrl(url);
	if (!credit) return "";
	if (credit.type !== "screenshot") return "";
	return safeText(credit.lien, "").trim();
}

function probeImage(url) {
	return new Promise((resolve) => {
		const image = new Image();
		image.onload = () => resolve(true);
		image.onerror = () => resolve(false);
		image.src = url;
	});
}

async function firstExistingImageUrl(basePath) {
	const candidates = IMAGE_EXTENSIONS.map((extension) => `${basePath}.${extension}`);
	const checks = await Promise.all(candidates.map((url) => probeImage(url)));
	const foundIndex = checks.findIndex(Boolean);
	if (foundIndex >= 0) {
		return candidates[foundIndex];
	}
	return null;
}

async function existingImageUrlFromFileName(fileName) {
	const trimmedName = safeText(fileName, "").trim();
	if (!trimmedName) return null;

	const extensionMatch = trimmedName.match(/\.([a-z0-9]+)$/i);
	if (extensionMatch) {
		const directPath = `./imgs/${encodeURIComponent(trimmedName)}`;
		return (await probeImage(directPath)) ? directPath : null;
	}

	return firstExistingImageUrl(`./imgs/${encodeURIComponent(trimmedName)}`);
}

async function resolvePanelImageUrls(fid) {
	if (panelImagesCache.has(fid)) {
		return panelImagesCache.get(fid);
	}

	const urlsByCredits = [];
	const creditedNames = imageNamesById.get(fid) || [];
	if (creditedNames.length) {
		const resolvedCreditUrls = await Promise.all(
			creditedNames.map((imageName) => existingImageUrlFromFileName(imageName))
		);
		urlsByCredits.push(...resolvedCreditUrls.filter(Boolean));
	}

	const encodedFid = encodeURIComponent(fid);
	const basePaths = [`./imgs/${encodedFid}`];
	for (let index = 1; index <= MAX_PANEL_NUMBERED_IMAGES; index += 1) {
		basePaths.push(`./imgs/${encodedFid}-${index}`);
	}

	const resolvedUrls = await Promise.all(basePaths.map((basePath) => firstExistingImageUrl(basePath)));
	const urlsByPattern = resolvedUrls.filter(Boolean);
	const urls = Array.from(new Set([...urlsByCredits, ...urlsByPattern]));
	panelImagesCache.set(fid, urls);
	return urls;
}

function renderPanelImages(fidValue) {
	if (!panelImages) return;
	clearPanelImages();

	const fid = safeText(fidValue, "").trim();
	if (!fid) return;

	showPanelImagesLoading(fid);

	const currentToken = ++panelImageRequestToken;

	resolvePanelImageUrls(fid).then((urls) => {
		if (!panelImages || currentToken !== panelImageRequestToken) return;
		panelImages.classList.remove("is-loading");
		
		if (!urls.length) {
			clearPanelImages();
			return;
		}

		const title = document.createElement("p");
		title.className = "feature-images__title";
		title.textContent = urls.length > 1 ? "Images" : "Image";

		const gallery = document.createElement("div");
		gallery.className = "feature-images__gallery";

		panelImages.innerHTML = "";
		panelImages.appendChild(title);
		panelImages.appendChild(gallery);

		urls.forEach((url, index) => {
			const image = document.createElement("img");
			image.loading = index < 2 ? "eager" : "lazy";
			image.decoding = "async";
			if (index === 0) {
				image.fetchPriority = "high";
			}
			image.alt =
				urls.length > 1
					? `Illustration ${index + 1} du point ${fid}`
					: `Illustration du point ${fid}`;
			image.src = url;
			image.addEventListener("click", () => {
				openImageViewer(url, image.alt, urls, index);
			});

			const figure = document.createElement("figure");
			figure.className = "feature-images__item";
			figure.appendChild(image);

			const captionText = captionTextFromUrl(url);
			const videoLink = videoLinkFromUrl(url);
			if (captionText || videoLink) {
				const caption = document.createElement("figcaption");
				caption.className = "feature-images__caption";
				if (captionText) {
					const textNode = document.createElement("span");
					textNode.textContent = captionText;
					caption.appendChild(textNode);
				}

				if (videoLink) {
					if (captionText) {
						caption.appendChild(document.createElement("br"));
					}
					const linkNode = document.createElement("a");
					linkNode.className = "feature-images__caption-link";
					linkNode.href = videoLink;
					linkNode.target = "_blank";
					linkNode.rel = "noopener noreferrer";
					linkNode.textContent = "Voir la vidéo";
					caption.appendChild(linkNode);
				}
				figure.appendChild(caption);
			}

			gallery.appendChild(figure);
		});

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
		
		// Ensure the layer is in the visible group
		if (!visibleLayerGroup.hasLayer(entry.layer)) {
			visibleLayerGroup.addLayer(entry.layer);
		}
		
		// Select the layer and update panel
		selectLayer(entry.layer, entry.feature);
		
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

function panelRow(label, value) {
	const dt = document.createElement("dt");
	dt.textContent = label;

	const dd = document.createElement("dd");
	dd.textContent = value;

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

function updatePanel(feature) {
	const props = feature.properties || {};
	const coordinatesText = formatCoordinates(feature);

	panelType.textContent = typeLabel(props.type);
	panelTitle.textContent = safeText(props.nom, "Nom non renseigné");
	panelSubtitle.textContent = safeText(props["alt-name"], "");

	panelMeta.innerHTML = "";
	panelRow("Identifiant", safeText(props.fid));
	panelRow("Statut", safeText(props.statut));

	if (hasPanelValue(props.existant_etat)) {
		panelRow("Etat", safeText(props.existant_etat));
	}

	const accessValueRaw = hasPanelValue(props.acces)
		? props.acces
		: hasPanelValue(props.access)
			? props.access
			: null;

	if (hasPanelValue(accessValueRaw)) {
		const accessValue = safeText(accessValueRaw);
		const { dd } = panelRow("Acces", accessValue);
		if (normalizeText(accessValue) === "terrain prive") {
			dd.style.color = "#b00020";
			dd.style.fontWeight = "600";
		}
	}

	panelRow("Précision des coordonnées", safeText(props.precision_geom));
	panelRow("Source", safeText(props.source));
	if (coordinatesText) {
		panelRow("Coordonnées (lat, lon)", coordinatesText);
	}
	panelRow("Trace sur le plan de 1910 ?", toYesNo(props.src_p1910));
	panelRow("Trace sur le cadastre de 1842 ?", toYesNo(props.src_c1842));

	const description = safeText(props.description, "");
	const comment = safeText(props.commentaire_st, "");

	if (description) {
		panelDescription.style.display = "block";
		panelDescription.textContent = `Description: ${description}`;
	} else {
		panelDescription.style.display = "none";
	}

	if (comment) {
		panelComment.style.display = "block";
		panelComment.textContent = `Commentaire: ${comment}`;
	} else {
		panelComment.style.display = "none";
	}

	renderPanelImages(props.fid);
}

function resetPanel() {
	panelType.textContent = "Sélectionnez un point sur la carte";
	panelTitle.textContent = "Aucun point sélectionné";
	panelSubtitle.textContent = "Cliquez sur un marqueur pour afficher ses informations.";
	panelMeta.innerHTML = "";
	panelDescription.style.display = "none";
	panelComment.style.display = "none";
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
			hydroSurfacesLayer = L.geoJSON(geojson, {
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

			layerControl.addOverlay(hydroSurfacesLayer, "Surfaces hydrographiques");
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
			hydroTronconsLayer = L.geoJSON(geojson, {
				pane: "hydro-troncons",
				style: {
					color: "#1b4d74",
					weight: 2,
					opacity: 0.95
				}
			});

			layerControl.addOverlay(hydroTronconsLayer, "Tronçons hydrographiques");
		})
		.catch((error) => {
			console.warn("Impossible de charger troncons_hydro.geojson", error);
		});
}

function clearSelection() {
	if (selectedLayer && defaultStyleByLayer.has(selectedLayer)) {
		selectedLayer.setStyle(defaultStyleByLayer.get(selectedLayer));
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
	// Convert featureId to string to match the sets (which store string IDs from credits.json)
	const featureId = String(entry.featureId);

	if (selectedMedia.length > 0) {
		hasMedia = selectedMedia.some((selectedMediaOption) => {
			if (selectedMediaOption === "photos-only") {
				return featuresWithPhotos.has(featureId);
			}
			if (selectedMediaOption === "plans-only") {
				return featuresWithPlans.has(featureId);
			}
			/*if (selectedMediaOption === "with-media") {
				return featuresWithAnyMedia.has(featureId);
			}*/
			if (selectedMediaOption === "without-media") {
				return !featuresWithAnyMedia.has(featureId);
			}
			return false;
		});
	}

	return hasType && hasStatus && hasPrecision && hasQuery && hasId && hasSource && hasMedia && hasAcces && hasEtat;
}

function renderVisibleLayers(zoomToVisible) {
	visibleLayerGroup.clearLayers();

	const visibleEntries = markerEntries.filter(matchesCurrentFilters);
	visibleEntries.forEach((entry) => {
		visibleLayerGroup.addLayer(entry.layer);
	});

	resultsCount.textContent = `${visibleEntries.length} / ${markerEntries.length} points affichés`;

	if (selectedLayer && !visibleLayerGroup.hasLayer(selectedLayer)) {
		clearSelection();
	}

	if (zoomToVisible && visibleEntries.length > 0) {
		const group = L.featureGroup(visibleEntries.map((entry) => entry.layer));
		map.fitBounds(group.getBounds(), { padding: [25, 25] });
	}
}

function selectLayer(layer, feature) {
	if (selectedLayer && defaultStyleByLayer.has(selectedLayer)) {
		selectedLayer.setStyle(defaultStyleByLayer.get(selectedLayer));
	}

	selectedLayer = layer;
	layer.setStyle(selectedMarkerStyle(defaultStyleByLayer.get(layer) || markerStyleFromFeature(feature)));

	currentFeatureId = feature.properties?.fid || null;
	updatePanel(feature);
}

fetch("./data/data.geojson")
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}
		return response.json();
	})
	.then((geojson) => {
		const features = geojson.features || [];

		fillCheckboxOptions(filterTypeOptions, uniqueSortedValues(features, "type"));
		fillCheckboxOptions(filterStatusOptions, uniqueSortedValues(features, "statut"));
		fillCheckboxOptions(filterPrecisionOptions, uniqueSortedValues(features, "precision_geom"));
		fillCheckboxOptions(filterAccesOptions, uniqueSortedValuesWithInconnu(features, "acces"));
		fillCheckboxOptions(filterEtatOptions, uniqueSortedValuesWithInconnu(features, "existant_etat"));
		fillCheckboxOptionsFromEntries(filterSourcesOptions, SOURCE_FILTER_OPTIONS);
		fillCheckboxOptionsFromEntries(filterImagesOptions, MEDIA_FILTER_OPTIONS);

		syncDropdownAllCheckboxState(filterTypeAll, filterTypeOptions, filterTypeSummary, "type", "types");
		syncDropdownAllCheckboxState(filterStatusAll, filterStatusOptions, filterStatusSummary, "statut", "statuts");
		syncDropdownAllCheckboxState(filterPrecisionAll, filterPrecisionOptions, filterPrecisionSummary, "niveau", "niveaux");
		syncDropdownAllCheckboxState(filterAccesAll, filterAccesOptions, filterAccesSummary, "accès", "accès");
		syncDropdownAllCheckboxState(filterEtatAll, filterEtatOptions, filterEtatSummary, "état", "états");
		syncDropdownAllCheckboxState(filterSourcesAll, filterSourcesOptions, filterSourcesSummary, "source", "sources");
		syncDropdownAllCheckboxState(filterImagesAll, filterImagesOptions, filterImagesSummary, "média", "médias");

		const pointsLayer = L.geoJSON(geojson, {
			pointToLayer(feature, latlng) {
				const marker = L.circleMarker(latlng, markerStyleFromFeature(feature));

				defaultStyleByLayer.set(marker, markerStyleFromFeature(feature));
				return marker;
			},
			onEachFeature(feature, layer) {
				const title = safeText(feature.properties?.nom, "Nom non renseigne");
				const kind = typeLabel(feature.properties?.type);
				const altName = safeText(feature.properties?.["alt-name"], "");
				layer.bindTooltip(`${title} (${kind})`, {
					direction: "top",
					opacity: 0.95,
					offset: [0, -6]
				});

				markerEntries.push({
					layer,
					feature,
					featureId: feature.properties?.fid,
					idValue: normalizeText(feature.properties?.fid),
					typeValue: normalizeText(feature.properties?.type),
					statusValue: normalizeText(feature.properties?.statut),
					precisionValue: normalizeText(feature.properties?.precision_geom),
					accesValue: normalizeText(feature.properties?.acces),
					etatValue: normalizeText(feature.properties?.existant_etat),
					hasPlan1910: isSourcePresent(feature.properties?.src_p1910),
					hasCadastre1842: isSourcePresent(feature.properties?.src_c1842),
					searchValue: normalizeText(`${title} ${altName}`)
				});

				layer.on("click", () => {
					selectLayer(layer, feature);
				});
			}
		});

		pointsLayer.eachLayer((layer) => {
			visibleLayerGroup.addLayer(layer);
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
