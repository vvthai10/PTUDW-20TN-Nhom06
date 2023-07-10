mobiscroll.setOptions({
    locale: mobiscroll.localeEn,                                         // Specify language like: locale: mobiscroll.localePl or omit setting to use default
    theme: 'ios',                                                        // Specify theme like: theme: 'ios' or omit setting to use default
    themeVariant: 'light'                                                // More info about themeVariant: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-themeVariant
});

mobiscroll.select('#demo-multiple-select', {
    inputElement: document.getElementById('demo-multiple-select-input'),  // More info about inputElement: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-inputElement
});

mobiscroll.select('#demo-multiple-select1', {
    inputElement: document.getElementById('demo-multiple-select-input1'),  // More info about inputElement: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-inputElement
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
                $(".modal-body__add__image").setAttribute("style", "display: block;");
                break;
            case "Chuyên mục cấp 2":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                $(".modal-body__add__cat1").setAttribute("style", "display: block;");
                break;
            case "Nhãn":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                break;
            case "Bài viết":
                $(".modal-body__modify__article").setAttribute("style", "display: block;");
                break;
            case "tài khoản Phóng viên":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                $(".modal-body__add__email").setAttribute("style", "display: block;");
                break;
            case "tài khoản Biên tập viên":
                $(".modal-body__add__name").setAttribute("style", "display: block;");
                $(".modal-body__add__email").setAttribute("style", "display: block;");
                $(".modal-body__add__cat2").setAttribute("style", "display: block;");
                $(".modal-body__modify__cat2").setAttribute("style", "display: block;");
                break;
            case "tài khoản Độc giả":
                $(".modal-body__modify__premium").setAttribute("style", "display: block;");
                break;
        }
    })
});

var remove_button = $('#remove-button').addEventListener('click', () => {
    let option = $('tr.selected').firstChild.nextSibling.nextSibling;
    console.log(option);
    $('#exampleModal1 .modal-body').textContent = 'Xác nhận xóa: ' + option.innerText;
    $('#input-name').value = option.innerText;
});

var modify_button = $('#modify-button').addEventListener('click', () => {
    let option = $('tr.selected').firstChild.nextSibling.nextSibling;
    console.log(option);
    $('.modal-body__modify__premium').firstChild.textContent = 'Gia hạn tài khoản độc giả ' + option.innerText + ":";
    $('.modal-body__modify__cat2').firstChild.textContent = 'Danh sách chuyên mục phân công cho editor ' + option.innerText + ":";
    $('.modal-body__modify__article__message').textContent = `Xuất bản bài viết `;
    $('.modal-body__modify__article__title').textContent =  option.innerText + `.`;
    $('#input-id').value = $('tr.selected').firstChild.nextSibling.innerText;
});

//var form_delete = $('#exampleModal1 .modal-footer form').onsubmit= async () => {$('#exampleModal1 .modal-footer form').firstChild.value = $('tr.selected').firstChild.nextSibling.nextSibling.innerText;};

// Input image icon
const inputElement = document.getElementById('input_post_avatar');
inputElement.addEventListener('change', async (event) => {
    const file = event.target.files[0]; // Lấy file từ sự kiện change
    const formData = new FormData(); // Tạo formData để chứa file

    formData.append('image', file); // Đặt tên của field là 'image' (phải giữ nguyên)

    try {
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID 90819d07ed4839d', // Thay YOUR_CLIENT_ID bằng Client ID của bạn từ Imgur
            },
            body: formData,
        });

        const data = await response.json();
        const imageUrl = data.data.link; // Lấy đường dẫn ảnh từ phản hồi JSON
        console.log(data.data.deletehash); // In ra hash để xóa ảnh, nên lưu lại  
        console.log(imageUrl); // In ra đường dẫn ảnh
        document.getElementById('input_post_avatar_link').value = imageUrl;
        document.getElementById('input_post_avatar_deleteHash').value = data.data.deletehash;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
});




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
    const f1 = ["Chuyên mục cấp 1", "Chuyên mục cấp 2", "Nhãn", "tài khoản Phóng viên"];
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
    $("#input-type2").value = pageState();
    $("#input-type3").value = pageState();
    $$(".input-url").forEach(item => {item.value = window.location.href;});
}
window.addEventListener('hashchange', checkAllowedFunctions);
window.addEventListener('popstate', checkAllowedFunctions);
checkAllowedFunctions();


    

