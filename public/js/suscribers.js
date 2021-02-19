const clientSuscribers = (function (w, d) {


  function updateCart(_app, ui) {
    const template = Array.from(_app.cart.values());
    let total = 0;
    const resume =
      `
    <table class="table-cart">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Valor</th>
            <th>Total</th>            
          </tr>
        </thead>
        <tbody>
    ` +
      template.reduce((prev, current) => {
        total += current.price * current.cantidad;
        return `
      ${prev}
        <tr id="line-${current.id}">
          <td>${current.name}</td>
          <td>${current.cantidad}</td>
          <td>${current.price}</td>
          <td>${current.price * current.cantidad}</td>          
        </tr>      
      `;
      }, "") +
      `
      </tbody>
    </table>
    `;

    return ` 
    <div>
      Total: ${total}
    </div>
    ${resume}
    `;
  }


  function showImageDetail(e, ui) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const src = e.target.dataset.src;
    if (!!src) {
      ui.lightbox.style.display = "block";
      ui.lightboxImg.src = src;
    }
  }


  function addProductToCart(e, ui, _app) {
    e.preventDefault();
    e.stopImmediatePropagation();

    ui.contadorProd.textContent = parseInt(ui.contadorProd.textContent) + 1;
    __helpers.createToast(null, "", "Articulo agregado al carrito", 2500);
    const product = JSON.parse(e.target.dataset.product);
    product.cantidad = 1;
    if (_app.cart.has(product.id)) {
      _app.cart.get(product.id).cantidad++;      
    } else {
      _app.cart.set(product.id, product);
    }
    ui.cartConta.innerHTML = updateCart(_app, ui);
  }

  function showMenuMobile(e) {
    e.preventDefault();
    const items = d.querySelectorAll("ul.menu li.item");
    [].forEach.call(items, (elem) => {
      elem.classList.toggle("active");
    });
  }

  function changeCategorylistener(__app, ui) {
    ui.selectCategories.addEventListener("change", function (e) {
      __app.loadProducts(ui);
    });
  }

  function filterListener(_app, ui) {
    ui.querier.addEventListener("submit", function (e) {
      e.preventDefault();
      _app.loadProducts(ui);
    });

    ui.reseter.forEach(function (element) {
      element.addEventListener("click", function () {
        ui.qText.value = "";
        ui.selectCategories.selectedIndex = 0;
        __app.loadProducts(ui);
      });
    });

    ui.closeLightbox.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      ui.lightbox.style.display = "none";
      ui.lightboxImg.src = "#";
    });
  }

  

  function eventDelegationPattern(_app, ui) {
    d.addEventListener("click", function (e) {
      if (e.target.className.indexOf("card-link") > -1) {
        showImageDetail(e, ui);
        return;
      }

      if (e.target.className.indexOf("add") > -1) {
        addProductToCart(e, ui, _app);
        return;
      }

      if (e.target.className.indexOf("toggle") > -1) {
        showMenuMobile(e);
      }
    });
  }

  function showResumenListener(_app, ui) {
    ui.verCarro.addEventListener("click", function (e) {
      e.preventDefault();
      ui.resumen.classList.toggle("hidden");
    });
  }

  function register(_app, ui) {
    changeCategorylistener(_app, ui);
    filterListener(_app, ui);
    showResumenListener(_app, ui);
    eventDelegationPattern(_app, ui);
  }

  return {
    register: register,
  };
})(window, document);
