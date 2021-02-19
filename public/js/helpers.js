/** 
 * @const {function} __helpers  Encapsula funciones utiles
 **/
const __helpers = (function (w, d) {

  /**
   * checkResource
   * 
   * Usa peticion ajax para comprobar si existe un recurso del servidor (como una imagen)
   * 
   * @param {String} resource
   * @return {boolean} 
   */
  async function checkResource(resource) {
    const response = await fetch(resource);
    return response.ok;
  }


  /**
   * getImgUrl
   * 
   *
   * @param {String} urlImg
   * @param {String} defaultUrl
   * @return {*} 
   */
  async function getImgUrl(urlImg, defaultUrl) {
    if (await checkResource(urlImg)) {
      return urlImg;
    }
    return defaultUrl;
  }

  /**
   * prepareToast
   * 
   * injerta el contenedor de toast en el DOM
   *
   * @param {Object} ui
   */
  function prepareToast(ui) {
    if(ui.toastContainer.length == 0){        
        const toastContainerContent = '<div class="toast-container"></div>';         
        d.querySelector("body").insertAdjacentHTML('beforeend', toastContainerContent);
    }
  }

  /**
   * createToast
   * 
   * Despliega un toast 
   *
   * @param {string} type
   * @param {string} title
   * @param {string} text
   * @param {int} duration
   */
  function createToast(type, title, text, duration) {
    const toastElem = document.createElement("div");
    toastElem.classList.add("toast");
    if (type) {
      toastElem.classList.add(type);
    }

    const titleElem = document.createElement("p");
    titleElem.classList.add("t-title");

    const iconType = "";
    if (type == "system") {
      iconType = '<span class="material-icons">build</span>';
    } else if (type == "success") {
      iconType = '<span class="material-icons">done</span>';
    } else if (type == "warning") {
      iconType = '<span class="material-icons">report_problem</span>';
    } else if (type == "bug") {
      iconType = '<span class="material-icons">bug_report</span>';
    }

    titleElem.innerHTML += iconType + title;
    toastElem.appendChild(titleElem);

    const closeElem = document.createElement("p");
    closeElem.classList.add("t-close");
    toastElem.appendChild(closeElem);

    const textElement = document.createElement("p");
    textElement.classList.add("t-text");
    textElement.innerHTML = text;
    toastElem.appendChild(textElement);

    const toastContainer = document.querySelector(".toast-container");

    toastContainer.appendChild(toastElem);

    setTimeout(function () {
      toastElem.classList.add("active");
    }, 1);

    if (duration > 0) {
      setTimeout(function () {
        toastElem.classList.remove("active");
        setTimeout(function () {
          toastElem.remove();
        }, 350);
      }, duration);
    } else if (duration == null) {
      setTimeout(function () {
        toastElem.classList.remove("active");
        setTimeout(function () {
          toastElem.remove();
        }, 350);
      }, 3000);
    }
  }

  return {
    checkResource: checkResource,
    getImgUrl: getImgUrl,
    createToast: createToast,
    prepareToast: prepareToast,
  };
})(window, document);
