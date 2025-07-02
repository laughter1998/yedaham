// 상단 버튼 클릭 이벤트
const toTopBtn = document.getElementById("toTopBtn");
const footer = document.querySelector("footer");

if (toTopBtn) {
    window.addEventListener("scroll", () => {
        // 1. 버튼 보이기/숨기기
        toTopBtn.style.display = window.scrollY > 100 ? "block" : "none";

        // 2. 푸터와 겹치면 버튼을 위로 이동
        const footerRect = footer?.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect && footerRect.top < windowHeight) {
            // footer가 화면에 들어온 경우
            const overlap = windowHeight - footerRect.top;
            const bottomValue = Math.min(160, 20 + overlap); // 최대 160px
            toTopBtn.style.bottom = `${bottomValue}px`;
        } else {
            // footer가 아직 아래에 있는 경우
            toTopBtn.style.bottom = "20px";
        }
    });

    // 3. 스크롤 맨 위로 이동
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const moreBtn = document.querySelector('.more-btn');
const moreArrow = moreBtn ? moreBtn.querySelector('img') : null;
const consultSection = document.querySelector('.consult-section');
const infoSection = document.querySelector('.info-section');

if (moreBtn && consultSection && infoSection && moreArrow) {
    moreBtn.addEventListener('click', function () {
        const isOpen = consultSection.classList.contains('open');
        if (isOpen) {
            consultSection.classList.remove('open');
            infoSection.classList.add('open');
            moreArrow.style.transform = 'rotate(0deg)';
        } else {
            consultSection.classList.add('open');
            infoSection.classList.remove('open');
            moreArrow.style.transform = 'rotate(180deg)';
        }
    });
    // 초기 상태 설정
    consultSection.classList.remove('open');
    infoSection.classList.add('open');
    moreArrow.style.transition = 'transform 0.2s';
}

// 개인정보 동의 모달 관련
const agreeLinkBtn = document.querySelector('.agree-link');
const agreeModal = document.getElementById('agreeModal');

const agreeRadio = document.querySelector('input[type="radio"][name="agree"]');
const submitBtn = document.querySelector('.submit-btn');

// 범용 모달 오픈/클로즈
function openModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
    }
}
// data-modal-target 속성이 있는 모든 버튼에 이벤트 등록
const modalOpenBtns = document.querySelectorAll('[data-modal-target]');
modalOpenBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = btn.getAttribute('data-modal-target');
        if (modalId) openModalById(modalId);
    });
});
// 모든 모달 닫기 버튼에 이벤트 등록
const modalCloseBtns = document.querySelectorAll('.btn.agree-modal-close');

modalCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        // 가장 가까운 .agree-modal 또는 .modal 클래스를 찾아 닫기
        let modal = btn.closest('.agree-modal, .modal');
        closeModal(modal);
    });
});


const agreeModalConfirm = document.querySelector('.agree-modal-confirm');
if (agreeModalConfirm) {
    agreeModalConfirm.addEventListener('click', function () {
        closeModal(document.getElementById('agreeModal'));
        if (agreeRadio) {
            agreeRadio.disabled = false;
            agreeRadio.checked = true;
        }
        if (submitBtn) {
            submitBtn.disabled = false;

        }
    });
}


// 체크박스 동기화 로직
function syncAgreeCheckboxes() {
    const agree1 = document.getElementById('agree1');
    const agree2 = document.getElementById('agree2');
    const agreeAll = document.getElementById('agreeAll');
    const nextBtn = document.getElementById('nextBtn');
    if (agree1.checked && agree2.checked) {
        agreeAll.checked = true;
        nextBtn.classList.remove('disabled-link');
    } else {
        agreeAll.checked = false;
        nextBtn.classList.add('disabled-link');
    }
}


const agree1 = document.getElementById('agree1');
const agree2 = document.getElementById('agree2');
const agreeAll = document.getElementById('agreeAll');
const nextBtn = document.getElementById('nextBtn');
if (agree1 && agree2 && agreeAll && nextBtn) {
    agree1.addEventListener('change', syncAgreeCheckboxes);
    agree2.addEventListener('change', syncAgreeCheckboxes);
    agreeAll.addEventListener('change', function () {
        if (agreeAll.checked) {
            agree1.checked = true;
            agree2.checked = true;
        } else {
            agree1.checked = false;
            agree2.checked = false;
        }
        syncAgreeCheckboxes();
    });
    // 초기 상태 동기화
    syncAgreeCheckboxes();
}
