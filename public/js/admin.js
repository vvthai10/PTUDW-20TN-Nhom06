mobiscroll.setOptions({
    locale: mobiscroll.localeEn,                                         // Specify language like: locale: mobiscroll.localePl or omit setting to use default
    theme: 'ios',                                                        // Specify theme like: theme: 'ios' or omit setting to use default
    themeVariant: 'light'                                                // More info about themeVariant: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-themeVariant
});

mobiscroll.select('#demo-multiple-select', {
    inputElement: document.getElementById('demo-multiple-select-input'),  // More info about inputElement: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-inputElement
});

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

$$("li.sidenav__link").forEach((item)=>{
    item.addEventListener("click", ()=> {
        // Hiển thị section được chọn
        $$("li.is-selected").forEach((li)=>{
            li.classList.remove("is-selected");
        })
        item.classList.add("is-selected");
        $(".main h3").innerText = item.firstChild.innerText 
        if (item.nextElementSibling.classList.contains('sidenav__sublink')) {
            item.nextElementSibling.classList.add("is-selected");
        }
        
        // Hiển thị bảng
        $$(".manage-table").forEach((table) => {
            table.style.display = "none";
        })
        if ($('#'+item.id+'-1-table') == null) {
            $('#'+item.id+'-table').style.display="block";
        }
        else {
            $('#'+item.id+'-1-table').style.display="block";
        }        
    })
});

$$("li.sidenav__sublink").forEach((item)=>{
    item.addEventListener("click", ()=> {
        // Hiển thị section được chọn
        $$("li.is-selected").forEach((li)=>{
            li.classList.remove("is-selected");
        })
        item.classList.add("is-selected");
        $('#'+item.id.slice(0, -2)).classList.add("is-selected"); 
        // Hiển thị bảng
        $$(".manage-table").forEach((table) => {
            table.style.display = "none";
        })    
        $('#'+item.id+'-table').style.display="block";
    })    
});   

var exampleModal = $$('.modal').forEach((modal) => {
    modal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget
        // Extract info from data-bs-* attributes
        var func = button.getAttribute('data-bs-function')
        // Update the modal's content.
        var modalTitle = modal.querySelector('.modal-title');
        modalTitle.textContent = func + " " + pageState();

        switch (pageState()) {
            case "Chuyên mục cấp 1":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                break;
            case "Chuyên mục cấp 2":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                $(".modal-body__add__cat1").setAttribute("style", "display: block;");
                break;
            case "Nhãn":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                break;
            case "tài khoản Phóng viên":
            case "tài khoản Biên tập viên":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                $(".modal-body__add__email").setAttribute("style", "display: block;");
                $(".modal-body__add__cat2").setAttribute("style", "display: block;");
                break;
        }
    })
});
// var exampleModal2 = $$('.modal').forEach((modal) => {
//     modal.addEventListener('hide.bs.modal', function (event) {
//         modal.querySelectorAll('div[class^="modal-body__"]').forEach(item => {
//             item.setAttribute("style", "display: none;");
//         })
//     })
// });





function pageState() {
    let selectedLinks = $$("li.is-selected");
    let length = selectedLinks.length;
    if (length == 2) {
        if (selectedLinks[0].id == "category-manage") {
            if (selectedLinks[1].id == "category-manage-1") return "Chuyên mục cấp 1";
            else if (selectedLinks[1].id == "category-manage-2") return "Chuyên mục cấp 2";
            else return null;
        } 
        else if (selectedLinks[0].id == "user-manage") {
            if (selectedLinks[1].id == "user-manage-1") return "tài khoản Phóng viên";
            else if (selectedLinks[1].id == "user-manage-2") return "tài khoản Biên tập viên";
            else if (selectedLinks[1].id == "user-manage-3") return "tài khoản Độc giả";
            else return null;
        }
        else return null;
    }
    else if (length == 1) {
        if (selectedLinks[0].id == "tag-manage") return "Nhãn";
        if (selectedLinks[0].id == "article-manage") return "Bài viết";
    }
    else return 0;
}


function checkAllowedFunctions() {
    const f1 = ["Chuyên mục cấp 1", "Chuyên mục cấp 2", "Nhãn"];
    const f2 = ["Bài viết", "tài khoản Độc giả"];

    if (f1.includes(pageState())) {
        $('#modify-button').setAttribute("disabled", true);
        $('#modify-button').setAttribute("style", "pointer-events: none;");
    }
    else if (f2.includes(pageState())) {
        $('#add-button').setAttribute("disabled", true);
        $('#add-button').setAttribute("style", "pointer-events: none;");
    }
    else {
        $('#modify-button').removeAttribute("disabled");
        $('#modify-button').removeAttribute("style");
        $('#add-button').removeAttribute("disabled");
        $('#add-button').removeAttribute("style");
    }

    $("#input-type").value = pageState();
}
window.addEventListener('hashchange', checkAllowedFunctions);
window.addEventListener('popstate', checkAllowedFunctions);
checkAllowedFunctions();


    

