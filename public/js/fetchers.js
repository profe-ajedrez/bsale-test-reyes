/** 
 * @const {function} __fetchers  Encapsula funciones que realizan llamadas a api
 **/
const __fetchers = (function(w, d) {

  const api = '/api/v1';
  const defaultImgUrl = '/img/no-available.png';
  
  const settings = {
    limit : 3,
    offset: 1
  };


  /**
   * fetchCategories
   * 
   * Realiza una petición contra la api para traer las categorías de producto
   *
   * @return {Array} 
   */
  async function fetchCategories() {
    try {
      const response = await fetch(`${api}/categories`);

      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();
      return json.data.categories;
    } catch (err) {
      console.log(err);
      return [];
    }
  }


  /**
   * fetchProductos
   * 
   * Realiza petición ajax contra api para obtener los productos a mostrar
   *
   * @param {int} categoryId
   * @param {String} filterBy
   * @param {int} limit
   * @param {int} offset
   * @return {Object} 
   */
  async function fetchProductos(categoryId, filterBy, limit, offset) {
    let entryPoint = `${api}/productos`;

    if (!!categoryId && categoryId !== 'ALL' && !isNaN(parseInt(categoryId)) ) {
      entryPoint += `/category/${categoryId}`;
    }

    if (!!filterBy && filterBy.replace(/\s/g, '') !== '') {
      entryPoint += `/filter/${filterBy}`;
    }

    if (!!limit || !isNaN(limit)) {
      entryPoint += `/limit/${limit}`;
    }

    if (!!offset || !isNaN(offset)) {
      entryPoint += `/offset/${offset}`;
    }

    const response = await fetch(entryPoint);
    const json = await response.json();

    return {
      status: response.status,
      data: json.data
    };
  }


  return {
    fetchCategories: fetchCategories,
    fetchProductos: fetchProductos,
    getEntryPoint: () => { return api; },
    getDefaultImgUrl: () => { return defaultImgUrl; },
    settings: settings,
  };

})(window, document);