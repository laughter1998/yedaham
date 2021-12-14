

/* ========== 모달 팝업 ========== */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const body = document.querySelector('body');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
	/*console.log(button.dataset.modalTarget);*/
	/*const modalId = button.dataset;*/
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
  body.classList.add('openModal');
  const modalContent = document.querySelector('#'+modalTarget+' .modal-body');
   const modalbtns = document.querySelector('#'+modalTarget+' .modal-btn-agree');
  modalContent.addEventListener('scroll', function(e) {

	  const contentHeight = modalContent.offsetHeight;
	  const contentScroll = document.querySelector('#'+modalTarget+' .content').offsetHeight - contentHeight;
	  var x = modalContent.scrollLeft;
	  var y = modalContent.scrollTop;
	  if (y > contentScroll) {
		  console.log("끝");
		  console.log(y + "px" + contentScroll , contentHeight);
		  modalbtns.classList.add('active');
	  } else {
		  /* modalbtns.classList.remove('abc');*/
	  }


	});
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active');
  overlay.classList.remove('active');
   body.classList.remove('openModal');
}
/* ========== 모달 팝업 ========== */


/* ========== 셀렉트 박스 ========== */
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
