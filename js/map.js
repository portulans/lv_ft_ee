///////////////////////// MAIN MAP PART //////////////////////////
const map = L.map("map", {
	zoomControl: true,
	preferCanvas: true,
  fullscreenControl: true,
  fullscreenControlOptions: {
      position: 'topleft'
  },
});

L.control.locate({
    setViw:true,
    strings: {
    title: "Me situer sur la carte !"
  }}).addTo(map);
