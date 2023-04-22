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



    

