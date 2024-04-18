const html = document.querySelector('html');
const body = document.querySelector('body');

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
