
function accordianActive(){

    const accordionItems = document.querySelectorAll('.accordion-item')
    if (accordionItems) {

        accordionItems.forEach((item) =>{
            const accordionHeader = item.querySelector('.accordion-header')
            
            accordionHeader.addEventListener('click', () =>{
                event.preventDefault();
                toggleItem(item)
            })
        })

        const toggleItem = (item) =>{
            const accordionContent = item.querySelector('.accordion-content')
            const isOpen = item.classList.contains('accordion-open')
            
            if(isOpen){
                accordionContent.style.height = 0; // 항목이 닫힐 때 높이를 0으로 설정하여 슬라이드 업 효과를 생성
                item.classList.remove('accordion-open')
            }else{
                accordionContent.style.height = accordionContent.scrollHeight + 'px';
                item.classList.add('accordion-open')
            }
        }
    } 
}

//커스텀 셀렉트박스
const customSelect = document.getElementById("customSelect");
    if(customSelect){
    const selectedOption = customSelect.querySelector(".selected-option");
    const optionsContainer = customSelect.querySelector(".custom-select-options");
    const optionElements = customSelect.querySelectorAll(".custom-select-option");

    // Open/close select box
    customSelect.addEventListener("click", function() {
        customSelect.classList.toggle("open");
    });

    // Select option
    optionElements.forEach(function(option) {
        option.addEventListener("click", function(event) {
        selectedOption.textContent = option.textContent;
        customSelect.classList.remove("open");
        selectedOption.classList.add("selected");
        event.stopPropagation(); // 이벤트 버블링 방지
        });
    });

    // Close select box if clicked outside
    window.addEventListener("click", function(e) {
        if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("open");
        }
    });
}

//서브 네비 fetch 이용
function loadTabContent(page, ele) {
    if (ele) {
        document.querySelectorAll('.sub-navi button').forEach(function(button) {
            button.classList.remove('active');
        });
        ele.classList.add('active');
    }
    
    fetch(page)
    .then(response => response.text())
    .then(data => {
        document.getElementById('tab-content').innerHTML = data;
        accordianActive()
    })
    .catch(error => console.error('파일을 불러오는 동안 오류가 발생했습니다:', error));
}

//서브 네비 변수 이용
function loadTabContent2(page, ele) {
    if (ele) {
        document.querySelectorAll('.sub-navi button').forEach(function(button) {
            button.classList.remove('active');
        });
        ele.classList.add('active');
    }
    document.getElementById('tab-content').innerHTML = page;
    accordianActive();
    
}

// 모달 팝업
function openModalAlert(a) {
	if (a == null) return;
	modalAlert.classList.add('active');
	modalAlert.querySelector(".modal-content").innerHTML = a;
	overlay.classList.add('active');
	html.classList.add('openModal');
	body.classList.add('openModal');
}

function closeModalAlert() {
	modalAlert.classList.remove('active');
	overlay.classList.remove('active');
	body.classList.remove('openModal');
	html.classList.remove('openModal');
}

function openModalConfirm(a) {
	if (a == null) return;
	modalConfirm.classList.add('active');
	modalConfirm.querySelector(".modal-content").innerHTML = a;
	overlay.classList.add('active');
	html.classList.add('openModal');
	body.classList.add('openModal');
}

function closeModalConfirm() {
	modalConfirm.classList.remove('active');
	overlay.classList.remove('active');
	body.classList.remove('openModal');
	html.classList.remove('openModal');
}


//의전진행문자 조회 의전정보 더보기
function toggleRows() {
    
    var additionalInfoRows = document.querySelectorAll('.additionalInfoRow');
    var toggleButton = document.getElementById('toggleButton');

    additionalInfoRows.forEach(function(row) {
      if (row.classList.contains('d-none')) {
        row.classList.remove('d-none');
        toggleButton.textContent = '접기';
        toggleButton.classList.add('total')
        
      } else {
        row.classList.add('d-none');
        toggleButton.textContent = '더보기';
        toggleButton.classList.remove('total')
      }
    });
  }

accordianActive();