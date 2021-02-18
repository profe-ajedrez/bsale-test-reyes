/**
 * @constant {function} __components
 * @constant {function} __fetchers
 * 
 */

const __app = (function(w, d) {
  
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


  function init(ui) {
    loadCategories(ui);
    loadProducts(ui);
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
    };


    init(ui);
    clientSuscribers.register(__app, ui);

  });

  return {
    loadCategories: loadCategories,
    loadProducts: loadProducts,
  };

})(window, document);