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

    ui.closeLightbox.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      ui.lightbox.style.display = 'none';
      ui.lightboxImg.src = '#';
    });

    d.addEventListener('click', function(e) {
      if (e.target.className.indexOf('card-link') > -1) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const src = e.target.dataset.src;
        if (!!src)  {
          ui.lightbox.style.display = 'block';
          ui.lightboxImg.src = src;
        }
      }
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