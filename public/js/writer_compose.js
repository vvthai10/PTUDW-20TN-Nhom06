// Multi select
mobiscroll.setOptions({
    locale: mobiscroll.localeEn,                                         // Specify language like: locale: mobiscroll.localePl or omit setting to use default
    theme: 'ios',                                                        // Specify theme like: theme: 'ios' or omit setting to use default
    themeVariant: 'light'                                                // More info about themeVariant: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-themeVariant
});

mobiscroll.select('#demo-multiple-select', {
    inputElement: document.getElementById('demo-multiple-select-input')  // More info about inputElement: https://docs.mobiscroll.com/5-23-2/javascript/select#opt-inputElement
});

// CKeditor
ClassicEditor.create(document.querySelector('#editor'))
    .catch(error => {
        console.error(error);
    }
    );

// Input image
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
    } catch (error) {
        console.error('Error uploading image:', error);
    }
});

// Auto match subcat  
function checkSubcat() {
    document.querySelectorAll("option.cat2").forEach(item => {
        if (item.getAttribute('category') != document.getElementById('input_cat1').value) {
            item.hidden = true;
        }
        else {
            item.hidden = false;
            document.querySelector('#input_cat2').value = item.value;
        }
    })
}
document.querySelector('#input_cat1').addEventListener("change", checkSubcat);
document.querySelector('#input_cat1').addEventListener("load", checkSubcat);
document.querySelector('#input_cat1').value = "1";
checkSubcat();



