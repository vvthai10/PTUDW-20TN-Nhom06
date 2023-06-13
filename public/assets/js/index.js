/*
Author: vvthai14
Desc: Handle show/hide navbar tablet and mobile
*/
function HandleShowHideNavbarHeader() {
  const btnNavbar = document.querySelector(".header__navbar-icon");
  const divNavbar = document.querySelector(".header__navbar");
  const divNavbarBox = document.querySelector(".header__navbar-box");
  btnNavbar.addEventListener("click", () => {
    divNavbarBox.classList.remove("slide-out-left");
    divNavbar.classList.remove("transform-out");
    divNavbarBox.classList.add("slide-in-left");
    divNavbar.classList.add("transform-in");
    divNavbar.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  divNavbar.addEventListener("click", (e) => {
    if (e.target.closest(".header__navbar-box")) {
      // Handle
    } else {
      divNavbarBox.classList.remove("slide-in-left");
      divNavbar.classList.remove("transform-in");
      divNavbarBox.classList.add("slide-out-left");
      divNavbar.classList.add("transform-out");
      divNavbar.style.display = "none";
      document.body.style.overflow = "scroll";
    }
  });
}

function HandleShowItemChildNavbarHeader() {
  const parentItem = document.querySelector(".header__navbar-item-have-child");
  const listChild = document.querySelector(".header__navbar-list-child");
  parentItem.addEventListener("click", (e) => {
    if (listChild.style.display == "none") {
      listChild.style.display = "block";
    } else {
      listChild.style.display = "none";
    }
  });
}

HandleShowHideNavbarHeader();
HandleShowItemChildNavbarHeader();

// function HandleLogin(){
//   const formLogin = document.querySelector("#form__signin");
//   if(formLogin){
//     formLogin.onsubmit = function (event) {
//       event.preventDefault();
//       console.log('submit')
//     }
//   }
// }

// HandleShowHideNavbarHeader();
// HandleShowItemChildNavbarHeader();

// HandleLogin();
