const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

$$("li.sidenav__link").forEach((item)=>{
    item.addEventListener("click", ()=> {
        $("li.is-selected").classList.remove("is-selected");
        console.log("is-selected remove")
        item.classList.add("is-selected");
        $(".main h3").innerText = item.firstChild.innerText 
    })
});

// $("table").addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("view article");
//     console.log(e.target.parentNode);
//     location.href='editor_censor.html';
// })

function checkStatus() {
    // Check UI dựa vào query
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const stat = urlParams.get('status');
    const subcat = urlParams.get('subcategory');
    if (stat) {
        document.querySelector("li.is-selected").classList.remove("is-selected");
        item =  document.querySelector(`li#${stat}`);
        item.classList.add("is-selected");
        document.querySelector(".main h3").innerText = item.firstChild.innerText;
    }
    if (subcat && parseInt(subcat) > 0) {
      document.querySelector(".nav-link.active").classList.remove("active");
      tab = "";
      //<!-- Tam thoi, sua sau -->
      if (parseInt(subcat) > 0 && parseInt(subcat) < 7) {
        tab = `.nav-link#tab-${parseInt(subcat)}`;
      } else {
        tab = ".nav-link#all-tab";
      }
      document.querySelector(tab).classList.add("active");
    }

    // Check link table rows
    document.querySelectorAll("tr").forEach((item) => {
        if (['posted', 'approved', 'rejected',].includes(item.getAttribute("data-status"))) {
            let link = item.firstElementChild.firstElementChild;
            link.setAttribute('disabled', true);
            link.addEventListener('click', (event) => {
                event.preventDefault();
            });
            link.style.pointerEvents = 'none';
            link.style.color = 'black';
        }
    });
  }
  window.addEventListener('hashchange', checkStatus);
  window.addEventListener('popstate', checkStatus);
  checkStatus();
