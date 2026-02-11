fetch("data/products.json")
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("products");

    products.forEach(product => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <a href="${product.link}" 
           class="btn" 
           target="_blank" 
           rel="nofollow noopener">
           Buy on Amazon →
        </a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading products:", error));
