

/* ========== 모달 팝업 ========== */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const body = document.querySelector('body');
const html = document.querySelector('html');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
	const modalTarget = modal.getAttribute('id');


  if (modal == null) return
  modal.classList.add('active');
  overlay.classList.add('active');
  html.classList.add('openModal');
  body.classList.add('openModal');


}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active');
  overlay.classList.remove('active');
   body.classList.remove('openModal');
   html.classList.remove('openModal');
}

function openModalAlert(a) {
    console.log(a);
  if (a == null) return;
  modalAlert.classList.add('active');
  // console.log (modalAlert.querySelector(".modal-content"));
  modalAlert.querySelector(".modal-content").innerHTML = a;
  overlay.classList.add('active');
  html.classList.add('openModal');
  body.classList.add('openModal');


}

function closeModalAlert() {
  // if (modal == null) return
  modalAlert.classList.remove('active');
  overlay.classList.remove('active');
   body.classList.remove('openModal');
   html.classList.remove('openModal');
}


function openModalinfo(a) {

if (a == null) return;
modalAlert.classList.add('active');
// modalAlert.querySelector(".getInfo").innerHTML = a;
overlay.classList.add('active');
html.classList.add('openModal');
body.classList.add('openModal');


}

/* ========== 모달 팝업 ========== */








function familySite(){
    const selectLink = document.querySelector(".selectLink-wrap");
    selectLink.classList.toggle('on');
}

// ==========  상단 탑 이동  ==========
function backToTop(){
    window.scrollTo(0,0);
}

const backToTopButton = document.querySelector("#top-btn");
if (backToTopButton != null) {
    window.onscroll = function() {myFunction()};
}
function myFunction() {
  if (window.pageYOffset > 100 ){ // top button
      if(!backToTopButton.classList.contains("btnEntrance")){
          backToTopButton.classList.remove("btnExit");
          backToTopButton.classList.add("btnEntrance");
          backToTopButton.style.display = "block";
      }
  }
  else {
       if(backToTopButton.classList.contains("btnEntrance")){
           backToTopButton.classList.remove("btnEntrance");
           backToTopButton.classList.add("btnExit");
           setTimeout(function(){
               backToTopButton.style.display = "none";
           }, 250);
       }
  }
}




/* ==========  셀렉트 박스 ========== */
const selectWrap = document.querySelectorAll(".custom-select");
if (selectWrap != null) {
    selectWrap.forEach(selectBox => {

        const optionsContainer = selectBox.querySelector(".options-container");
        const optionsList = optionsContainer.querySelectorAll(".option");
        const selected = selectBox.querySelector(".selected");
        const selectedValue = selected.querySelector("input");
        selected.addEventListener("click", () => {
            optionsContainer.classList.toggle("active");
        });

        optionsList.forEach(o => {
            o.addEventListener("click", () => {

                // selected.innerHTML = o.querySelector("label").innerHTML;
                selectedValue.value = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
                const labelFor = o.querySelector("label").getAttribute('for');
                // 이메일일 경우 선택된 값 넣기
                if (selectBox.classList.contains('email-select')) {
                    console.log(selectBox);
                    if (labelFor == 'r0'){
                        document.getElementById("email02").value = '';
                    }else {
                        document.getElementById("email02").value = o.querySelector("label").innerHTML;
                    }
            }


            });
        });

    })
}
/* ==========  셀렉트 박스 ========== */



// ===== 변경 상품 체크 =====

 const selectAll = document.querySelector("#all-check");

if (selectAll != null) {
   selectAll.addEventListener('click', function(){

       var objs = document.querySelectorAll(".prd-items");
       for (var i = 0; i < objs.length; i++) {
         objs[i].checked = selectAll.checked;
       };
   }, false);

   var objs = document.querySelectorAll(".prd-items");
   for(var i=0; i<objs.length ; i++){
     objs[i].addEventListener('click', function(){
       var selectAll = document.querySelector("#all-check");
       for (var j = 0; j < objs.length; j++) {
         if (objs[j].checked === false) {
           selectAll.checked = false;
           return;
         };
       };
       selectAll.checked = true;
   }, false);
   }
}

// ===== 결제방법 선택 =====
function openTab( tabName1, tabName2) {
  let i, tabcontent1,tabcontent2
  tabcontent1 = document.getElementsByClassName("tabcontent1");
  for (i = 0; i < tabcontent1.length; i++) {
    tabcontent1[i].style.display = "none";
  }
  tabcontent2 = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent2.length; i++) {
    tabcontent2[i].style.display = "none";
  }

  document.getElementById(tabName1).style.display = "block";
  document.getElementById(tabName2).style.display = "block";

}


