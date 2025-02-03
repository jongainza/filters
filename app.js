const productsContainer = document.querySelector(".products-container");
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");
const btnsContainer = document.querySelector(".companies");
const companyBtn = document.querySelector(".company-btn");

function productsInfo(p) {
  let info = p
    .map(({ id, company, image, price, title }) => {
      return `<article class="product">
          <img
            src=${image}
            alt=${title}
            class="product-img img"
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>`;
    })
    .join("");

  return (productsContainer.innerHTML = info);
}
productsInfo(products);

let displayButtons = (p) => {
  let filteredCompanies = new Set();
  p.forEach(({ company }) => filteredCompanies.add(company));

  let companieBtns = ["All", ...filteredCompanies]
    .map((company) => {
      return `<button class="company-btn" data-id="${company}">${company}</button>`;
    })
    .join("");

  btnsContainer.innerHTML = companieBtns;
};
displayButtons(products);

form.addEventListener("keyup", () => {
  let input = searchInput.value.toLowerCase();
  let displayProducts = products.filter(({ title }) => {
    return title.toLowerCase().includes(input);
  });
  if (displayProducts.length <= 0) {
    productsContainer.innerHTML = `<h6>No matches for <span class='red'>"${input}"</span></h6>`;
  } else {
    productsInfo(displayProducts);
  }
});

btnsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("company-btn")) {
    let compa = e.target.dataset.id;
    console.log(compa);
    console.log("All");

    if (compa == "All") {
      productsInfo(products);
    } else {
      let companyProfucts = products.filter(({ company }) => company === compa);
      productsInfo(companyProfucts);
    }
  }
});
