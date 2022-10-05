

// 부고 전화
const bereavedFamily = document.querySelectorAll (".bereaved-family > .row > div");
if(bereavedFamily.length !== 0){

    const baseDiv = document.querySelector (".bereaved-family > .row");
    const baseWidth = Math.ceil(baseDiv.clientWidth / 3);
    bereavedFamily.forEach( e => {
        
        if(e.innerHTML.includes("tel")){
            e.children[0].classList.add("active");
        }
        if(e.clientWidth > baseWidth){
            e.classList.add("col-8");
        }
    })
}
// 부고 전화

//클립보드 복사
function copy_clipboard(id) {
	const copyText = document.querySelector(`#${id.dataset.copyId}`);
	// var copyText = document.getElementById(`${elementId}`);
	copyText.select();
	document.execCommand("Copy");
	// alert('주소가 복사되었습니다.');
	var toast = document.getElementById(`${id.dataset.toastId}`);
	console.log(toast);
	toast.classList.add("active");
	setTimeout(function(){
	  toast.classList.remove("active");
	},1000)
  }
//클립보드 복사

/* ========== 모달 팝업 ========== */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
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
  html.classList.add('openModal');
  body.classList.add('openModal');


}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active');
   body.classList.remove('openModal');
   html.classList.remove('openModal');
}

function openModalAlert(a) {
  if (a == null) return;
//   console.log(modalAlert);
  modalAlert.classList.add('active');
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
function openModalAlert2(a) {
  if (a == null) return;
//   console.log(modalAlert);
  modalAlert2.classList.add('active');
  modalAlert2.querySelector(".modal-content").innerHTML = a;
  overlay.classList.add('active');
  html.classList.add('openModal');
  body.classList.add('openModal');
}

function closeModalAlert2() {
  // if (modal == null) return
  modalAlert2.classList.remove('active');
  overlay.classList.remove('active');
   body.classList.remove('openModal');
   html.classList.remove('openModal');
}
/* ========== 모달 팝업 ========== */

// 모달2
function madalShow(id){
  const currentModal = document.querySelector(`#${id.dataset.modalId}`);
  if (currentModal == null) return
  currentModal.classList.add('active');
  overlay.classList.add('active');
  html.classList.add('openModal');
  body.classList.add('openModal');
}

function modalHide(id){
	const currentModal = document.querySelector(`#${id.dataset.modalId}`);
	if (currentModal == null) return
	currentModal.classList.remove('active');
	overlay.classList.remove('active');
	html.classList.remove('openModal');
	body.classList.remove('openModal');
  }
// 모달2

// 계좌정보받기 모달
function madalAccountShow(id){
	
	const currentModal = document.querySelector(`#${id.dataset.modalId}`);

	const infoId = document.querySelector("#infoId");
	const infoAccount = document.querySelector("#accountName");

	// input:hidden에 값넣기
	infoId.value = `${id.dataset.num}`;

	// 모달에 이름표시
	infoCla = `[${id.dataset.cla}]`;
	infoName = `${id.dataset.name}`;
	infoAccount.innerText = `${infoCla}${infoName}`;
	
	if (currentModal == null) return
	currentModal.classList.add('active');
	overlay.classList.add('active');
	html.classList.add('openModal');
	body.classList.add('openModal');
	
  }
  
  function modalAccountHide(id){
	  const currentModal = document.querySelector(`#${id.dataset.modalId}`);
	  if (currentModal == null) return
	  currentModal.classList.remove('active');
	  overlay.classList.remove('active');
	  html.classList.remove('openModal');
	  body.classList.remove('openModal');
	}
// 계좌정보받기 모달

//index accodian
const accodians = document.querySelectorAll("section.box h5 > span");
if(accodians){
	accodians.forEach(accodian => {
		accodian.addEventListener("click",function(e){
			console.log(e.target.closest("section"));
			e.target.closest("section").classList.toggle("active");
		})
	})
}


//index accodian


// 폼 미입력시 에러 메시지 출력
function setErrorFor(input, message) {
	if(input.type == "checkbox"){
		const formControl = input.closest(".form-group");
		formControl.classList.add('error');
		formControl.dataset.error = message;
	}
	const formControl = input.closest(".form-group");
	formControl.classList.add('error');
	formControl.dataset.error = message;
}

function setErrorFor2(input, message) {
	const formControl = input.closest(".form-group");
		formControl.classList.add('error');
		formControl.dataset.error = message;
}

document.querySelectorAll('.form-group[data-error] input').forEach(inpEl => {
	
  const formGroup = inpEl.closest(".form-group");
  const formCheck = formGroup.classList.contains("form-check");
  if(formCheck){
    inpEl.addEventListener('change', function(){
		this.checked && formGroup.removeAttribute('data-error');
	});
    return;
  }
	inpEl.addEventListener('input', function(){
		inpEl.closest(".form-group").removeAttribute('data-error')
	})
})

// 폼 미입력시 에러 메시지 출력


// 상주정보 기타입력칸 보이기
const relationList = document.getElementsByName('relationship');
if(relationList){
	const etcInput = document.querySelector("#etc");
	relationList.forEach(relation=>{
		relation.addEventListener("click", function(e){
			if(e.target.value === "7"){
				etcInput.classList.remove("hide");
				return;
			}
			etcInput.classList.add("hide");
			etcInput.value = "";
		})
	})
}
// 상주정보 기타입력칸 보이기

//계좌정보 입력칸 보이기
const accountShow = document.querySelector("#accountShow");
if(accountShow){
	accountShow.addEventListener("click", function(){
		const accountWrap = document.querySelector(".account-form-wrap");
		accountWrap.classList.toggle("hide");
	})
}
//계좌정보 입력칸 보이기


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


