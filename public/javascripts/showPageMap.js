mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
  center: thisPost.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(thisPost.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${thisPost.title}</h3><p>${thisPost.location}</p>`
    )
  )
  .addTo(map);
