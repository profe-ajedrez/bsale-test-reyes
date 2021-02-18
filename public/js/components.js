
const __components = (function(w, d) {

  function getCategoriesComponent(categories) {
    const template = '<option value="%value%">%label%</option>';

    const strTemplate = categories.reduce((prevValue, current) => {
      return prevValue + template.replace('%value%', current.id).replace('%label%', current.name);
    }, '');

    return template.replace('%value%', 'ALL').replace('%label%', 'Todas') + strTemplate;
  }


  function getGridProducts(dataProducts, defaultImgUrl) {
    if (dataProducts.length === 0) {
      return '<div class="alert">No se encontraron productos</div>';
    }


    const grid = '<div class="row">' +
    dataProducts.data.productos.reduce((prev, current, idx) => {
      const closeRow = (idx !== 0 && idx % 3 === 0 ? '</div><div class="row">' : '');
      const imgUrl = current.url_image || defaultImgUrl;

      const discount = (!!current.discount ? `
      <div class="card-oferta">        
        $ ${current.discount}  <span class="card-text-oferta">Desc.!</span>     
      </div>` : '');

      return `${prev} ${closeRow} 
      <div class="column _25">
        <div class="card">
          <div class="img-card-container" style='background: url(${imgUrl});background-repeat: no-repeat;
          background-size: cover;'>
            <div class='product-data'>${discount}</div>
          </div>
          <div class='product-name'>${current.name}</div>
          <div class="card-data">
            
            <div class='product-price'>
              <i class="fa fa-tag fa-lg"></i> Precio unitario: $ ${current.price}               
            </div>
            <div class='card-controls'>
              <button data-product='${current.id}' class='w100 btn btn-round btn-lg btn-filled-orange' title="Agregar al carro"><i class="fas fa-shopping-cart"></i></button>
            </div>
          </div>
        </div>
      </div>  
      `;
    }, '') + '</div>';

    return grid;
  }

  return {
    getCategoriesComponent : getCategoriesComponent,
    getGridProducts: getGridProducts,
  };
})(window, document);