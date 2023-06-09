const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

$$("li.sidenav__link").forEach((item) => {
    item.addEventListener("click", () => {
        $("li.is-selected").classList.remove("is-selected");
        item.classList.add("is-selected");
        $(".main h3").innerText = item.firstChild.innerText
    })
});

$("table").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("view article");
    console.log(e.target.parentNode);
    location.href = 'writer_edit.html';
});







