/**
 * @constant {function} __helpers         Desde helpers.js
 * @constant {function} __components      Desde components.js
 * @constant {function} __fetchers        Desde fetchers.js
 * @constant {function} _clientSuscribers Desde suscribers.js
 */

/** 
 * @const {function} __app  representa la aplicación cliente
 * 
 **/
const __app = (function(w, d) {
  
  const cart = new Map();

  
  /**
   * loadCategories
   * 
   * carga las categorias desde api en select
   *
   * @param {Object} ui
   */
  async function loadCategories(ui) {
    ui.gridContainer.style.display = 'none';
    ui.loader.style.display = 'block';
    const categories = await __fetchers.fetchCategories();
    const optionsCategories = __components.getCategoriesComponent(categories);
    ui.selectCategories.innerHTML = optionsCategories;   
  }


  /**
   * loadProductos
   *
   * construye grilla de prosuctos
   * 
   * @param {Object} ui
   */
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


  
  /**
   * init
   * 
   * Inicializa la aplicación cliente
   *
   * @param {*} ui
   */
  function init(ui) {
    loadCategories(ui);
    loadProducts(ui);
    __helpers.prepareToast(ui);
  }


  function registerUpdatesUi() {
    
  }


  d.addEventListener("DOMContentLoaded", function() {
    /** @constant {Object} ui  encapsula elementos de interfaz de usuario de uso comun o cuya interacción gatilla eventos */
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