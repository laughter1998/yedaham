

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

/*
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal)
  })
})
*/
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

function openModalAlert(modal) {
    console.log(modal);

  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
  html.classList.add('openModal');
  body.classList.add('openModal');


}

function closeModalAlert(modal) {
  if (modal == null) return
  modal.classList.remove('active');
  overlay.classList.remove('active');
   body.classList.remove('openModal');
   html.classList.remove('openModal');
}
/* ========== 모달 팝업 ========== */





function selectedEmail(){
    /* ========== 이메일 셀렉트 박스 ========== */
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
      optionsContainer.classList.toggle("active");
    });

    optionsList.forEach(o => {
      o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
        const labelFor = o.querySelector("label").getAttribute('for');
        if (labelFor == 'r0'){
            document.getElementById("email02").value = '';
        }else {
            document.getElementById("email02").value = o.querySelector("label").innerHTML;
        }
      });
    });
    /* ========== 셀렉트 박스 ========== */
}

// ===== 개인(신용)정보처리 필수 동의 =====
function check_agree() {
   const selectAll = document.querySelector("#all-check01");
   selectAll.addEventListener('click', function(){

       var objs = document.querySelectorAll(".chk1");
       for (var i = 0; i < objs.length; i++) {
         objs[i].checked = selectAll.checked;
       };
   }, false);

   var objs = document.querySelectorAll(".chk1");
   for(var i=0; i<objs.length ; i++){
     objs[i].addEventListener('click', function(){
       var selectAll = document.querySelector("#all-check01");
       for (var j = 0; j < objs.length; j++) {
         if (objs[j].checked === false) {
           selectAll.checked = false;
           return;
         };
       };
       selectAll.checked = true;
   }, false);
   }

   const selectAll02 = document.querySelector("#all-check02");
   selectAll02.addEventListener('click', function(){

       var objs02 = document.querySelectorAll(".chk2");
       console.log(objs02);
       for (var i = 0; i < objs02.length; i++) {
         objs02[i].checked = selectAll02.checked;
       };
   }, false);

   var objs02 = document.querySelectorAll(".chk2");
   for(var i=0; i<objs02.length ; i++){
     objs02[i].addEventListener('click', function(){
       var selectAll02 = document.querySelector("#all-check02");
       for (var j = 0; j < objs02.length; j++) {
         if (objs02[j].checked === false) {
           selectAll02.checked = false;
           return;
         };
       };
       selectAll02.checked = true;
   }, false);
   }

}


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
