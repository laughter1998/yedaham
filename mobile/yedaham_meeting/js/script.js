

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


/* ==========  상담 문의 내용  바이트 체크 ========== */
function fnChkByte(obj, maxByte){
    var str = obj.value;
    var str_len = str.length;
    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for(var i=0; i<str_len; i++){
         one_char = str.charAt(i);
         if(escape(one_char).length > 4)
         {
             rbyte += 3;  //한글3Byte
        } else {
         rbyte++;  //영문 등 나머지 1Byte
        }
     if(rbyte <= maxByte) {
         rlen = i+1;  //return할 문자열 갯수
        }
    }


    if(rbyte > maxByte){

        alert("내용은 " + maxByte + "byte 이내로 작성해주세요.")
        str2 = str.substr(0,rlen);                                  //문자열 자르기
        obj.value = str2;
        fnChkByte(obj, maxByte);
    } else {
        document.getElementById('lengthValue').innerText = rbyte;
    }
}


/* ==========  상담시간 변경 ========== */
function timeSelect(a){
    const selectedTime = document.querySelector("#selectedTime");
    selectedTime.innerHTML = a;
}
