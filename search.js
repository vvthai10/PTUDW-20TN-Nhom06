const product = [
    {id:1 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:2 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:3 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:4 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:5 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:6 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:7 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:8 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},
    {id:9 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:10 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:11 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:12 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:13 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:14 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:15 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."},    
    {id:16 , title: "7 lối sống tàn phá sức khỏe sinh sản nam giới", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png", text: "Thói quen ăn uống thiếu khoa học, tập luyện quá sức, hút thuốc, lạm dụng bia rượu,... đều có ảnh hưởng không tốt tới sức khỏe sinh sản ở nam giới."}    
]

let perPage = 6;
let currentPage = 1;
let start = 0;
let end = perPage;
const totalPages = Math.ceil(product.length / perPage);

const btnNext = document.querySelector('#btn-next');

const btnPrev = document.querySelector('#btn-prev');

function renderNews() {
    html = '';
    const content = product.map((item, index) => {
        if (index >= start && index < end) {
            html += '<div class="card card__search--extend">';
            html += '<h3>' + item.id + '</h3>';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">' + item.title + '</h5>';
            html += '<p class="card-text">' + item.text + '</p>';
            html += '</div>';
            html += '<img src="' + item.image + '" class="card-img-top" alt="...">'; 
            html += '</div>';
            html += '<hr style="border-width: 2px; border-color: black; text-align: center;">';
            return html;
        }
    })

    document.getElementById('list_product').innerHTML = html;
}

renderNews();
renderListPage();

function renderListPage() {
    let html = "";
    html += `<li class="active"><a>${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a>${i}</a></li>`;
    }
    document.getElementById('number-page').innerHTML = html;
}

function changePage() {
    const currentPages = document.querySelectorAll('.number-page li');
    console.log(currentPages);
    for (let i = 0; i < currentPages.length; i++) {
        currentPages[i].addEventListener('click', () => {
            const value = i + 1;
            const current = document.getElementsByClassName('active');
            current[0].className = current[0].className.replace('active', '');
            const numberPage = document.getElementById('number-page');
            const li = numberPage.getElementsByTagName('li');
            for (let i = 0; i < li.length; i++) {
                if (i == value - 1) {
                    console.log(li[i].classList);
                    li[i].classList.add('active');
                    console.log(li[i].classList)
                    break;
                }
            }
            currentPage = value;
            start = (currentPage - 1) * perPage;
            end = currentPage * perPage;
            renderNews();
        })
    }
}

changePage();

function btnNextClick() {
    currentPage++;
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
    console.log(start, end);

    renderNews();
}

function btnPrevClick() {
    currentPage--;
    if (currentPage <= 1) {
        currentPage = 1;
    }
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;

    renderNews();
}