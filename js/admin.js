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
        $$("li.sidenav__sublink.is-selected").forEach((li)=>{
            li.classList.remove("is-selected");
        })
        item.classList.add("is-selected");
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
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        var modalTitle = modal.querySelector('.modal-title');
        //var modalBodyInput = exampleModal.querySelector('.modal-body input')
      
        modalTitle.textContent = func + " [dữ liệu ABC]"
        //modalBodyInput.value = recipient
      })
})



function pageState() {
    let selectedLinks = $$("li.is-selected");
    let length = selectedLinks.length;
    if (length == 2) {
        if (selectedLinks[0].id == "category-manage") {
            if (selectedLinks[1].id == "category-manage-1") return "00";
            else if (selectedLinks[1].id == "category-manage-2") return "01";
            else return null;
        } 
        else if (selectedLinks[0].id == "user-manage") {
            if (selectedLinks[1].id == "user-manage-1") return "30";
            else if (selectedLinks[1].id == "user-manage-2") return "31";
            else if (selectedLinks[1].id == "user-manage-3") return "32";
            else return null;
        }
        else return null;
    }
    else if (length == 1) {
        if (selectedLinks[0].id == "tag-manage") return "10";
        if (selectedLinks[0].id == "article-manage") return "20";
    }
    else return 0;
}


    

