/* ========== �ъ씠�� 硫붾돱 ========== */
(function(){
// Slide In Panel - by CodyHouse.co
const panelTriggers = document.getElementsByClassName('js-cd-panel-trigger');
if( panelTriggers.length > 0 ) {
    for(let i = 0; i < panelTriggers.length; i++) {
        (function(i){
            const panelClass = 'js-cd-panel-'+panelTriggers[i].getAttribute('data-panel'),
                panel = document.getElementsByClassName(panelClass)[0];
            // open panel when clicking on trigger btn
            panelTriggers[i].addEventListener('click', function(event){
                event.preventDefault();
                addClass(panel, 'cd-panel--is-visible');
                const body = document.querySelector('body');
                body.classList.add('openModal');
            });
            //close panel when clicking on 'x' or outside the panel
            panel.addEventListener('click', function(event){
                if( hasClass(event.target, 'js-cd-close') || hasClass(event.target, panelClass)) {
                    event.preventDefault();
                    removeClass(panel, 'cd-panel--is-visible');
                    console.log('2');
                    body.classList.remove('openModal');
                    // 2�곸뒪 硫붾돱 �リ린
                    const hasChildren = document.querySelectorAll(".has-children");
                    hasChildren.forEach(button => {
                        const depthTWoAll = button.querySelector("ul");
                        depthTWoAll.classList.add('is-hidden');
                     console.log(depthTWoAll);
                    });


                }
            });
        })(i);
    }
}

//class manipulations - needed if classList is not supported
//https://jaketrent.com/post/addremove-classes-raw-javascript/
function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
    }
}
})();

const depthOne = document.querySelectorAll(".depthTwoOpen");
const depthTwoClose = document.querySelectorAll(".go-back");
depthOne.forEach(button => {
  button.addEventListener('click', () => {
        event.preventDefault();
        const depthTwo = button.parentNode.querySelector("ul");
        depthTwo.classList.toggle("is-hidden");
    });
});
depthTwoClose.forEach(button => {
  button.addEventListener('click', () => {
        event.preventDefault();
        const depthTwo = button.parentNode;
        depthTwo.classList.toggle("is-hidden")
    });
});
/* ========== �ъ씠�� 硫붾돱 ========== */

/* ========== �щ씪�대뱶 �대룞 ========== */
const dropdown = document.querySelector(".dropdown-trigger");
if (dropdown ){
    dropdown.addEventListener('click', () => {
        if(!dropdown.classList.contains("dropdown-page-move")){
            event.preventDefault();
        }
        dropdown.classList.toggle('dropdown-is-active');
    });
}else {
    console.log('硫붾돱 �놁뼱��');
}



function slideToIndex(moveTo){
     const slideToList = document.querySelectorAll('[data-name]');
     slideToList.forEach(button => {
         const moveUnit = button.dataset;
         const moveName = moveUnit.name;
         const moveNum = Number(moveUnit.swiperSlideIndex) + 1;

        if( moveTo == moveName){
            console.log(moveNum);
             visualSwiper.slideTo(moveNum);
        }
     })

}
/* ========== �щ씪�대뱶 �대룞 ========== */

/* ========== �덈떎�� 硫ㅻ쾭�� �꾪솕�곷떞�섍린 �덉씠�� ========== */
function phoneCall(){
    event.preventDefault();
    window.scrollTo(0,0);
    body.classList.toggle('openModal');
    btnCall.classList.toggle('active');
}


/* ========== 紐⑤떖 �앹뾽 ========== */

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
/* ========== 紐⑤떖 �앹뾽 ========== */





function selectedEmail(){
    /* ========== �대찓�� ���됲듃 諛뺤뒪 ========== */
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
    /* ========== ���됲듃 諛뺤뒪 ========== */
}

// ===== 媛쒖씤(�좎슜)�뺣낫泥섎━ �꾩닔 �숈쓽 =====
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

// ==========  �곷떒 �� �대룞  ==========
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

// �� 硫붾돱
    function openState(evt, tabContentName) {
      let i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
        // console.log(tabcontent);
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabContentName).style.display = "block";
      evt.currentTarget.className += " active";

    }
    function openStateSub(evt, tabContentName) {
      let i, tabcontent, tablinks;
      const tabTarget = evt.currentTarget.parentElement.parentElement
      tabcontent = tabTarget.getElementsByClassName("tabcontentSub");
         // console.log(tabcontent);
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      // tablinks = document.getElementsByClassName("tablinksSub");
      tablinks = tabTarget.querySelectorAll('.tablinksSub');
       // console.log(tablinks);
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabContentName).style.display = "block";
      evt.currentTarget.className += " active";

    }


// ==========  �대깽�� 醫낅즺  ==========
const endEvent = document.querySelectorAll(".end-event");
if (endEvent){
	endEvent.forEach(button => {
	  button.addEventListener('click', () => {
			event.preventDefault();
			alert ('蹂� �대깽�멸� 醫낅즺�섏뿀�듬땲��. \n媛먯궗�⑸땲��.');
		});
	});

}
