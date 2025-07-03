// 상단 버튼 클릭 이벤트
const toTopBtn = document.getElementById("toTopBtn");

if (toTopBtn) {
    window.addEventListener("scroll", () => {
        // 1. 버튼 보이기/숨기기
        toTopBtn.style.display = window.scrollY > 100 ? "block" : "none";


    });

    // 3. 스크롤 맨 위로 이동
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const moreBtn = document.querySelector('.more-btn');
const moreArrow = moreBtn ? moreBtn.querySelector('img') : null;
const infoSection = document.querySelector('.info-section');

function slideToggle(section, open) {
    section.classList.remove('hide');
    if (open) {
        section.classList.add('open');
        section.style.maxHeight = section.scrollHeight + 'px';
        section.style.opacity = '1';
    } else {
        section.classList.remove('open');
        section.style.maxHeight = '0px';
        section.style.opacity = '0';
        section.addEventListener('transitionend', function handler(e) {
            if (!section.classList.contains('open')) {
                section.classList.add('hide');
            }
            section.removeEventListener('transitionend', handler);
        });
    }
}

// 초기 상태에서 hide 클래스 제거
infoSection.classList.remove('hide');

// 초기 상태 설정
if (infoSection.classList.contains('open')) {
    infoSection.style.maxHeight = infoSection.scrollHeight + 'px';
    infoSection.style.opacity = '1';
}

if (moreBtn && infoSection && moreArrow) {
    // 초기 방향 설정
    if (infoSection.classList.contains('open')) {
        moreArrow.style.transform = 'rotate(0deg)';
    } else {
        moreArrow.style.transform = 'rotate(180deg)';
    }
    moreArrow.style.transition = 'transform 0.2s';

    moreBtn.addEventListener('click', function () {
        const isOpen = infoSection.classList.contains('open');
        slideToggle(infoSection, !isOpen);
        // 화살표 방향 토글
        if (isOpen) {
            moreArrow.style.transform = 'rotate(180deg)';
        } else {
            moreArrow.style.transform = 'rotate(0deg)';
        }
    });
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

// 이메일 아이콘 클릭 시 data-email 값 복사
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
        const email = copyEmailBtn.getAttribute('data-email');
        if (email) {
            navigator.clipboard.writeText(email).then(function () {
                alert("이메일 주소가 복사되었습니다: " + email);
            }, function (err) {
                alert("복사에 실패했습니다. 다시 시도해주세요.");
            });
        } else {
            alert("이메일 주소가 없습니다.");
        }
    });
}

// 탭 기능 구현
const tabWrap = document.querySelector('.tab-wrap');
const tabBtns = tabWrap ? tabWrap.querySelectorAll('.tab') : [];
const tabContents = document.querySelectorAll('.tab-content');

if (tabWrap && tabBtns.length && tabContents.length) {
    tabBtns.forEach((btn, idx) => {
        btn.addEventListener('click', function () {
            // 모든 버튼에서 active 제거
            tabBtns.forEach(b => b.classList.remove('active'));
            // 클릭한 버튼에 active 추가
            btn.classList.add('active');
            // 모든 탭 콘텐츠 숨김
            tabContents.forEach((content, cidx) => {
                if (cidx === idx) {
                    content.style.display = '';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
    // 초기 상태: 첫 번째 탭만 보이게
    tabContents.forEach((content, cidx) => {
        if (cidx === 0) {
            content.style.display = '';
        } else {
            content.style.display = 'none';
        }
    });
}
