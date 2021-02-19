/**
 * @constant {function} __components
 * @constant {function} __fetchers
 * 
 */

const __app = (function(w, d) {
  
  const cart = new Map();

  async function loadCategories(ui) {
    ui.gridContainer.style.display = 'none';
    ui.loader.style.display = 'block';
    const categories = await __fetchers.fetchCategories();
    const optionsCategories = __components.getCategoriesComponent(categories);
    ui.selectCategories.innerHTML = optionsCategories;   
  }


  async function loadProducts(ui) {
    ui.loader.style.display = 'block';
    ui.gridContainer.style.display = 'none';
    const categoryId = ui.selectCategories.options[ui.selectCategories.selectedIndex].value;
    const filterBy = ui.qText.value;

    const dataProducts = await __fetchers.fetchProductos(categoryId, filterBy);
    const componentProducts = __components.getGridProducts(dataProducts, __fetchers.getDefaultImgUrl());
    ui.gridContainer.innerHTML = componentProducts;
    ui.loader.style.display = 'none';
    ui.gridContainer.style.display = 'block';
  }


  function prepareToast(ui) {
    if(ui.toastContainer.length == 0){        
        const toastContainerContent = '<div class="toast-container"></div>';         
        document.querySelector("body").insertAdjacentHTML('beforeend', toastContainerContent);
    }
  }


  function init(ui) {
    loadCategories(ui);
    loadProducts(ui);
    prepareToast(ui);
  }

  d.addEventListener("DOMContentLoaded", function() {

    const ui = {
      selectCategories : d.getElementById('categories_sel'),
      gridContainer : d.getElementById('grid-container'),
      qText: d.getElementById('q'),
      qBtn: d.getElementById('q-button'),
      querier: d.getElementById('querier'),
      reseter: d.querySelectorAll('.reset-filter'),
      loader: d.getElementById('loader'),
      lightbox: d.getElementById('myModal'),
      lightboxImg: d.getElementById('lightboxImg'),
      closeLightbox: d.getElementById('closeLightbox'),
      toastContainer: d.querySelectorAll(".toast-container"),
      contadorProd: d.getElementById('contadorProd'),
      verCarro: d.getElementById('verCarro'),
      resumen: d.getElementById('resumen'),
      cartConta: d.getElementById('cart-container'),
    };


    init(ui);
    clientSuscribers.register(__app, ui);

  });

  return {
    loadCategories: loadCategories,
    loadProducts: loadProducts,
    cart: cart,
  };

})(window, document);