mobiscroll.setOptions({
    locale: mobiscroll.localeEn,                                         // Specify language like: locale: mobiscroll.localePl or omit setting to use default
    theme: 'ios',                                                        // Specify theme like: theme: 'ios' or omit setting to use default
    themeVariant: 'light'                                                // More info about themeVariant: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-themeVariant
});

mobiscroll.select('#demo-multiple-select', {
    inputElement: document.getElementById('demo-multiple-select-input'),  // More info about inputElement: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-inputElement
});

let editor;
    ClassicEditor.create(document.querySelector('#editor'))
        .then(newEditor => {
            editor = newEditor;
        })
        .catch(error => {
            console.error(error);
        }); 

function getArticleId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = parseInt(urlParams.get('id'));
    if (id) {
      document.querySelector("#input_id").value = id;
    }
}
window.addEventListener('hashchange', getArticleId);
window.addEventListener('popstate', getArticleId);
getArticleId();