


const __fetchers = (function(w, d) {
  
  const devEntryPoint  = "http://localhost:5000";
  const prodEntryPoint = "https://bsale-test-andres-reyes.herokuapp.com";
  const api = prodEntryPoint + '/api/v1';
  const defaultImgUrl = prodEntryPoint + '/img/no-available.png';
  
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


  async function fetchProductos(categoryId, filterBy) {
    let entryPoint = `${api}/productos`;

    if (!!categoryId && categoryId !== 'ALL' && !isNaN(parseInt(categoryId)) ) {
      entryPoint += `/category/${categoryId}`;
    }

    if (!!filterBy && filterBy.replace(/\s/g, '') !== '') {
      entryPoint += `/filter/${filterBy}`;
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
  };

})(window, document);