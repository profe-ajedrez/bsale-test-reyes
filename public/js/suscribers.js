/** 
 * @const {function} clientSuscribers  Encapsula los oyentes de eventos de la aplicación cliente 
 **/
const clientSuscribers = (function (w, d) {

  /**
   * updateCart
   *
   * Genera la tabla que muestra info del carro de compras
   * 
   * @param {Object} _app
   * @param {Object} ui
   * @return {String} 
   */
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
            <th></th>
          </tr>
        </thead>
        <tbody>
    ` +
      template.reduce((prev, current) => {
        total += current.price * current.cantidad;
        return `
      ${prev}
        <tr id="line-${current.id}" >
          <td>${current.name}</td>
          <td id="cantidad-${current.id}" >${current.cantidad}</td>
          <td>${current.price}</td>
          <td id="subtotal-${current.id}">${current.price * current.cantidad}</td>
          <td>
            <a href="#" class="remove-onsite" data-id="${current.id}">
              <i class="remove-onsite fas fa-minus" data-id="${current.id}" ></i> 
            </a>
            <a href="#" class="add-onsite" data-id="${current.id}">
              <i class="add-onsite fas fa-plus" data-id="${current.id}"></i>
            </a>  
            <a href="#" class="del-onsite" data-id="${current.id}">
              <i class="del-onsite far fa-trash-alt" data-id="${current.id}"></i>
            </a>
          </td>
        </tr>      
      `;
      }, "") +
      `
      </tbody>
    </table>
    `;

    return ` 
    <div>
      Total: <span id="resumenTotal">${total}</a>
    </div>
    ${resume}
    `;
  }


  function removeProductFromResume(e, ui, _app) {
    const id = parseInt(e.target.dataset.id);

    if (isNaN(id) || !_app.cart.has(id)) {
      return;
    }

    const resumenTotalElem = d.getElementById('resumenTotal');
    const product = _app.cart.get(id);    
    const tableTr = d.getElementById(`line-${id}`);
    ui.contadorProd.textContent = parseInt(ui.contadorProd.textContent) - product.cantidad;
    resumenTotalElem.textContent = parseInt(resumenTotalElem.textContent) - product.cantidad * product.price;
    tableTr.remove();
    _app.cart.delete(id);
  }


  function updateCantidadResumen(e, ui, _app, changeCantidad) {
    const id = parseInt(e.target.dataset.id);

    if (isNaN(id) || !_app.cart.has(id)) {
      return;
    }
    /* obtenemos el signo de changeCantidad para saber si hay que restar o sumar al total el precio del producto */
    const relativeSign = changeCantidad / Math.abs(changeCantidad);
    const product = _app.cart.get(id);

    /* Si estamos restando cantidad, y la cantida llego al mínimo (1) volver. */
    if (product.cantidad === 1 && relativeSign === -1) {
      __helpers.createToast(null, "", "Use el botón eliminar <i class='far fa-trash-alt' ></i> para remover el producto", 2500);
      return;
    }

    const cantidadElem = d.getElementById(`cantidad-${id}`);
    const subTotalElem = d.getElementById(`subtotal-${id}`);
    const resumenTotalElem = d.getElementById('resumenTotal');

    _app.cart.get(id).cantidad = Math.max(1, _app.cart.get(id).cantidad + changeCantidad);
    cantidadElem.textContent = product.cantidad;
    subTotalElem.textContent = product.cantidad * product.price;

    resumenTotalElem.textContent = parseInt(resumenTotalElem.textContent) + (product.price * relativeSign);
    ui.contadorProd.textContent = parseInt(ui.contadorProd.textContent) + relativeSign;
  }


  /**
   * addProductoOnResume
   *
   * @param {HTMLEvent} e
   * @param {Object} ui
   * @param {Object} _app
   * @param {int} idProduct
   */
  function addProductoOnResume(e, ui, _app) {
    updateCantidadResumen(e, ui, _app, 1);
  }

  /**
   * removeProductoOnResume
   *
   * @param {HTMLEvent} e
   * @param {Object} ui
   * @param {Object} _app
   * @param {int} idProduct
   */
  function removeProductoOnResume(e, ui, _app) {
    updateCantidadResumen(e, ui, _app, -1);
  }


  /**
   * showImageDetail
   * 
   * Muestra un lightbox con la imagen del producto
   *
   * @param {HTMLEvent} e
   * @param {Object} ui
   */
  function showImageDetail(e, ui) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const src = e.target.dataset.src;
    if (!!src) {
      ui.lightbox.style.display = "block";
      ui.lightboxImg.src = src;
    }
  }


  /**
   * addProductToCart
   * 
   * Agrega el producto seleccionado al carro de compras
   *
   * @param {HTMLEvent} e
   * @param {Object} ui
   * @param {Object} _app
   */
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


  /**
   * showMenuMobile
   * 
   * Despliega la barra de navegación del menu movil en dispositivos moviles
   * 
   * @params {HTMLEvent} e
   */
  function showMenuMobile(e) {
    e.preventDefault();
    const items = d.querySelectorAll("ul.menu li.item");
    [].forEach.call(items, (elem) => {
      elem.classList.toggle("active");
    });
  }


  /**
   * changeCategorylistener
   * 
   * Registra el listener al evento change del elemento select de categorias
   *
   * @param {Object} __app
   * @param {Object} ui
   */
  function changeCategorylistener(__app, ui) {
    ui.selectCategories.addEventListener("change", function (e) {
      __app.loadProducts(ui);
    });
  }


  /**
   * filterListener
   *
   * Registra el listener para el evento submitir del formulario de filtro
   * 
   * @param {Object} _app
   * @param {Object} ui
   */
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

  

  /**
   * eventDelegationPattern
   *
   * Registra diversos listeners al evento click usando patron delegación de eventos.
   * 
   * @param {Object} _app
   * @param {Object} ui
   */
  function eventDelegationPattern(_app, ui) {
    d.addEventListener("click", function (e) {
      /* Evento click en algun ojito de las tarjetas de producto para ver imagen en detalle  */
      if (e.target.className.indexOf("card-link") > -1) {
        showImageDetail(e, ui);
        return;
      }

      /* evento click en algún boton agregar al carro */
      if (e.target.className.indexOf("add ") > -1) {
        addProductToCart(e, ui, _app);
        return;
      }

      /* evento click en mostrar menu en dipositivos moviles */
      if (e.target.className.indexOf("toggle") > -1) {
        showMenuMobile(e);
        return;
      }

      /*  evento click en botón restar un producto en resumen de carro */
      if (e.target.classList.contains('remove-onsite')) {
        removeProductoOnResume(e, ui, _app);
        return;
      }

      /* evento click en botón agregar un producto en resumen de carro */
      if (e.target.classList.contains('add-onsite')) {
        addProductoOnResume(e, ui, _app);
        return;
      }

      /* evento click en botón remover un producto en resumen de carro */
      if (e.target.classList.contains('del-onsite')) {
        removeProductFromResume(e, ui, _app);
        return;
      }
      
    });
  }


  /**
   * showResumenListener
   * 
   * Registra el evento que muestra el resumen del carro de compra
   *
   * @param {Object} _app
   * @param {Object} ui
   */
  function showResumenListener(_app, ui) {
    ui.verCarro.addEventListener("click", function (e) {
      e.preventDefault();
      ui.resumen.classList.toggle("hidden");
    });
  }


  /**
   * register
   * 
   * Expone un punto para registrar listener para que sea llamado por la aplicación cliente
   *
   * @param {Object} _app
   * @param {Object} ui
   */
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
