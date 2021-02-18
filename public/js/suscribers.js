const clientSuscribers = (function(w,d,) {

  function changeCategorylistener(__app, ui) {
    ui.selectCategories.addEventListener('change', function(e) {
      __app.loadProducts(ui);
    });
  }

  function filterListener(_app, ui) {
    ui.querier.addEventListener('submit', function(e) {
      e.preventDefault();
      _app.loadProducts(ui);
    });

    ui.reseter.forEach(function(element) {
      element.addEventListener("click", function() {
        ui.qText.value = '';
        ui.selectCategories.selectedIndex = 0;
        __app.loadProducts(ui);
      });
    });
  }


  function register(_app, ui) {
    changeCategorylistener(_app, ui);
    filterListener(_app, ui);
  }
  

  return {
    register: register
  };
})(window, document);