mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
  center: thisIdea.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(thisIdea.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${thisIdea.title}</h3><p>${thisIdea.location}</p>`
    )
  )
  .addTo(map);
