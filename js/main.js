document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products");

  // Show loading state
  container.innerHTML = `<p class="loading">Loading products...</p>`;

  fetch("data/products.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then(products => {
      container.innerHTML = ""; // Clear loading message

      products.forEach(product => {
        container.appendChild(createProductCard(product));
      });
    })
    .catch(error => {
      container.innerHTML = `
        <p class="error">
          ⚠️ Sorry, products could not be loaded.
        </p>
      `;
      console.error("Error loading products:", error);
    });
});


function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-image">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="card-content">
      <h2>${product.name}</h2>
      <p>${product.description}</p>

      <div class="card-footer">
        <a class="btn" href="${product.link}">
  Read Full Review →
</a>
      </div>
    </div>
  `;

  return card;
}
