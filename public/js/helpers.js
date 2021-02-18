const __helpers = (function(w,d) {

  async function checkResource(resource) {
    const response = await fetch(resource);
    return response.ok;
  }

  async function getImgUrl(urlImg, defaultUrl) {
    if (await checkResource(urlImg)) {
      return urlImg;
    }
    return defaultUrl;
  }


  return {
    checkResource: checkResource,
    getImgUrl: getImgUrl,
  };
})(window, document);