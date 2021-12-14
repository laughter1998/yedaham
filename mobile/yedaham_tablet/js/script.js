// 법인정보  테이블 토글
(function(){
    const btnDropdown = document.querySelectorAll(".btn-dropdown");
    console.log(btnDropdown);
    btnDropdown.forEach(button => {
      button.addEventListener('click', () => {
            event.preventDefault();
            const sectionTable = button.parentNode;
            sectionTable.classList.toggle("show");
        });
    });
})();

function openAllTable(){
    const corporation = document.querySelector("#corporation");
    const dropdownBox = corporation.querySelectorAll(".box");
    dropdownBox.forEach(box => {
        box.classList.add("show");
    });
}
function closeAllTable(){
    const corporation = document.querySelector("#corporation");
    const dropdownBox = corporation.querySelectorAll(".box");
    dropdownBox.forEach(box => {
        box.classList.remove("show");
    });
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
