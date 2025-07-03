const grid = document.querySelector("ul.showcases-list");

function generateElement(id, name) {
  let li = document.createElement("li");
  li.className = "showcase";
  li.innerHTML = `<video src="https://media.ako-production.com/${id}"></video><h4>${name}</h4>`;
  return li;
}

async function fetchVideos() {
  const resp = await fetch("/api/videos");
  if (!resp.ok) return [];
  return await resp.json();
}

(async () => {
  const data = await fetchVideos();

  for (const [id, name] of Object.entries(data)) {
    grid.appendChild(generateElement(id, name));
  }
})();
