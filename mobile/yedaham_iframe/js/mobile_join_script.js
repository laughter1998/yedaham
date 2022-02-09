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

/* 추가*/
function openModalConfirm(a) {
	console.log(a);
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

/* ========== 모달 팝업 ========== */







// ===== 개인(신용)정보처리 필수 동의 =====

const selectAll = document.querySelector("#all-check01");
if (selectAll != null) {
	selectAll.addEventListener('click', function () {
		let objs = document.querySelectorAll(".chk1");
		for (let i = 0; i < objs.length; i++) {
			objs[i].checked = selectAll.checked;
		};
	}, false);

	let objs = document.querySelectorAll(".chk1");
	for (let i = 0; i < objs.length; i++) {
		objs[i].addEventListener('click', function () {
			let selectAll = document.querySelector("#all-check01");
			for (let j = 0; j < objs.length; j++) {
				if (objs[j].checked === false) {
					selectAll.checked = false;
					return;
				};
			};
			selectAll.checked = true;
		}, false);
	}
}

const selectAll02 = document.querySelector("#all-check02");
if (selectAll02 != null) {
	selectAll02.addEventListener('click', function () {
		let objs02 = document.querySelectorAll(".chk2");
		console.log(objs02);
		for (let i = 0; i < objs02.length; i++) {
			objs02[i].checked = selectAll02.checked;
		};
	}, false);

	let objs02 = document.querySelectorAll(".chk2");
	for (let i = 0; i < objs02.length; i++) {
		objs02[i].addEventListener('click', function () {
			let selectAll02 = document.querySelector("#all-check02");
			for (let j = 0; j < objs02.length; j++) {
				if (objs02[j].checked === false) {
					selectAll02.checked = false;
					return;
				};
			};
			selectAll02.checked = true;
		}, false);
	}
}


function familySite() {
	const selectLink = document.querySelector(".selectLink-wrap");
	selectLink.classList.toggle('on');
}

// ==========  상단 탑 이동  ==========
function backToTop() {
	window.scrollTo(0, 0);
}

const backToTopButton = document.querySelector("#top-btn");
if (backToTopButton != null) {
	window.onscroll = function () {
		myFunction()
	};
}

function myFunction() {
	if (window.pageYOffset > 100) { // top button
		if (!backToTopButton.classList.contains("btnEntrance")) {
			backToTopButton.classList.remove("btnExit");
			backToTopButton.classList.add("btnEntrance");
			backToTopButton.style.display = "block";
		}
	} else {
		if (backToTopButton.classList.contains("btnEntrance")) {
			backToTopButton.classList.remove("btnEntrance");
			backToTopButton.classList.add("btnExit");
			setTimeout(function () {
				backToTopButton.style.display = "none";
			}, 250);
		}
	}
}


/* ==========  셀렉트 박스 ==========  23일 추가 수정 */
const selectWrap = document.querySelectorAll(".custom-select");
if (selectWrap != null) {
	selectWrap.forEach(selectBox => {

		const optionsContainer = selectBox.querySelector(".options-container");
		const optionsList = optionsContainer.querySelectorAll(".option");
		const selected = selectBox.querySelector(".selected");
		const selectedValue = selected.querySelector("input");
		if (!selectedValue.readOnly) {
			selected.addEventListener("click", () => {
				optionsContainer.classList.toggle("active");
			});
		}

		optionsList.forEach(o => {
			o.addEventListener("click", () => {
				selectedValue.value = o.querySelector("label").innerHTML;
				optionsContainer.classList.remove("active");
				const labelFor = o.querySelector("label").getAttribute('for');
				// 이메일일 경우 선택된 값 넣기
				if (selectBox.classList.contains('email-select')) {
					console.log(selectBox);
					if (labelFor == 'r0') {
						document.getElementById("email02").value = '';
						document.getElementById("email02").focus();
					} else {
						document.getElementById("email02").value = o.querySelector("label").innerHTML;
					}
				}


			});
		});

	})
}
/* ==========  셀렉트 박스 ========== */

/* ==========  칭찬하기 글 수정할때 약관 토글 ========== */

function agreeOpen(id) {
	const agreeBox = document.getElementById(id);
	agreeBox.querySelector('button').classList.toggle("active");
	agreeBox.querySelector('.agreeBox').classList.toggle("show");
}


// 내용 바이트 체크
function fnChkByte(obj, maxByte) {
	const str = obj.value;
	let rbyte = 0;
	let rlen = 0;
	let oneCharLeng = "";
	let str2 = "";

	for (let i = 0; i < str.length; i++) {
		oneCharLeng = escape(str.charAt(i)).length;
		if (oneCharLeng > 4)	rbyte += 2; //한글 2Byte
		else 					rbyte++;	//영문 등 나머지 1Byte

		if (rbyte <= maxByte) rlen = i + 1; //return할 문자열 갯수
	}

	if (rbyte > maxByte) {
		openModalAlert(`내용은 ${maxByte}byte 이내로 작성해주세요.`);
		str2 = str.substr(0, rlen); //문자열 자르기
		obj.value = str2;
		fnChkByte(obj, maxByte);
	} else {
		document.getElementById('lengthValue').innerText = rbyte;
	}
}

// input length 제한
function maxLengthCheck(object) {
	if (object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}
