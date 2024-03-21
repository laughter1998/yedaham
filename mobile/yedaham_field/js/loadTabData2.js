const receipt = `
        <div class="accordion message-accordion" >
            <div class="accordion-item">
                <article class="accordion-header">
                    <div class="header-wrap">
                        <span>회원정보</span>
                    </div>
                </article>
                <article class="accordion-content">
                <table class="table-receipt">
                        <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                        <tbody>
                            <tr>
                                <th>계약자명<br />(연락처)</th>
                                <td>윤*자 <a href="tel:02-123-1234" class="tel">(02-123-1234)</a></td>
                            </tr>
                            <tr>
                                <th>상주명<br />(연락처)</th>
                                <td>윤*자 <a href="tel:02-123-1234" class="tel">(02-123-1234)</a></td>
                            </tr>
                            <tr>
                                <th>담당팀장<br />(연락처)</th>
                                <td>윤*자 <a href="tel:02-123-1234" class="tel">(02-123-1234)</a></td>
                            </tr>
                        </tbody>
                </table>
                </article>
            </div>
            <div class="accordion-item">
                <article class="accordion-header">
                    <div class="header-wrap">
                        <span>장례식장 정보</span>
                    </div>
                </article>
                <article class="accordion-content">
                <table class="table-receipt">
                        <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                        <tbody>
                            <tr>
                                <th>협력등급</th>
                                <td>협력등급</td>
                            </tr>
                            <tr>
                                <th>시설등급</th>
                                <td>시설등급</td>
                            </tr>
                            <tr>
                                <th>무료이송</th>
                                <td>무료이송</td>
                            </tr>
                        </tbody>
                </table>
                </article>
            </div>

            <div class="accordion-item">
                <article class="accordion-header">
                    <div class="header-wrap">
                        <span>강매 내역</span>
                    </div>
                </article>
                <article class="accordion-content">
                <table class="table-receipt">
                        <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                        <tbody>
                            <tr>
                                <th>1. 관</th>
                                <td>관</td>
                            </tr>
                            <tr>
                                <th>2. 제단</th>
                                <td>제단</td>
                            </tr>
                            <tr>
                                <th>3. 차량</th>
                                <td>차량</td>
                            </tr>
                            <tr>
                                <th>4. 입관용품</th>
                                <td>입관용품</td>
                            </tr>
                        </tbody>
                </table>
                </article>
            </div>

            <div class="accordion-item">
                <article class="accordion-header">
                    <div class="header-wrap">
                        <span>협약 내역</span>
                    </div>
                </article>
                <article class="accordion-content">
                <table class="table-receipt">
                        
                        <tbody>
                            <tr>
                                <td>협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역 협약내역</td>
                            </tr>
                        </tbody>
                </table>
                </article>
            </div>

            <div class="accordion-item">
                <article class="accordion-header">
                    <div class="header-wrap">
                        <span>특이 및 참고 사항</span>
                    </div>
                </article>
                <article class="accordion-content">
                <table class="table-receipt">
                        <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                        <tbody>
                            <tr>
                                <th>특이사항</th>
                                <td>특이사항 특이사항 특이사항 특이사항 특이사항 특이사항</td>
                            </tr>
                            <tr>
                                <th>참고사항</th>
                                <td>참고사항</td>
                            </tr>
                        </tbody>
                </table>
                </article>
            </div>
        </div>
        `;

const product = `
<div class="accordion message-accordion" >
    <div class="accordion-item">
        <article class="accordion-header">
            <div class="header-wrap">
                <span>품목 정보</span>
            </div>
        </article>
        <article class="accordion-content">
            <div class="accordion-etc ">
                ※ 예다함 1호, 2호의 경우 일부 품목이 다르게 구성된 상품이 있음. 자세한 사항은 ERP에서 확인하시길 바랍니다.
            </div>
            <table class="table-product">
                <colgroup><col style="width:auto;"><col style="width:auto;"><col style="width:100px;"></colgroup>
                <thead>
                    <tr>
                        <th>항목</th>
                        <th>품목명</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>의전인력</td>
                        <td>장례진행</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>도우미</td>
                        <td>장례도우미</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>입관용품</td>
                        <td>입관용품</td>
                        <td>1</td>
                    </tr>
                </tbody>
        </table>
        </article>
    </div>
    <div class="accordion-item">
        <article class="accordion-header">
            <div class="header-wrap">
                <span>만기케어 제공 가능 품목</span>
            </div>
        </article>
        <article class="accordion-content">
            <table class="table-product">
                <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                <thead>
                    <tr>
                        <th>분류</th>
                        <th>제공내역</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>품목변경</td>
                        <td>5만원 할인</td>
                    </tr>
                    <tr>
                        <td>버스거리연장</td>
                        <td>최대 50km</td>
                    </tr>
                    <tr>
                        <td>관꽃장식 제공</td>
                        <td>5만원 이내</td>
                    </tr>
                    <tr>
                        <td>추억액자 제공</td>
                        <td>추억액자 제공</td>
                    </tr>
                    <tr>
                        <td>상주편의용품 제공</td>
                        <td>상주편의용품 제공</td>
                    </tr>
                </tbody>
        </table>
        <div class="accordion-etc ">
            ※ 가전할부대금=할부대금 명칭에서 변경됨.
            </div>
        </article>
    </div>

    <div class="accordion-item">
        <article class="accordion-header">
            <div class="header-wrap">
                <span>부가서비스 가능 품목</span>
            </div>
        </article>
        <article class="accordion-content">
            <table class="table-product">
                <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                <thead>
                    <tr>
                        <th>분류</th>
                        <th>제공내역</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>추억액자 제공</td>
                        <td>추억액자 제공</td>
                    </tr>
                    <tr>
                        <td>기타</td>
                        <td>관꽃장식</td>
                    </tr>
                </tbody>
        </table>
        </article>
    </div>

    <div class="accordion-item">
        <article class="accordion-header">
            <div class="header-wrap">
                <span>납입 내역</span>
            </div>
        </article>
        <article class="accordion-content">
            <table class="table-product">
                <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                <tbody>
                    <tr>
                        <td>상품금액</td>
                        <td>5,000,000</td>
                    </tr>
                    <tr>
                        <td>할인금액</td>
                        <td>100,000</td>
                    </tr>
                    <tr>
                        <td>계약금액</td>
                        <td>4,900,000</td>
                    </tr>
                    <tr>
                        <td>납입금액</td>
                        <td>3,000,000</td>
                    </tr>
                    <tr>
                        <td>잔여금액</td>
                        <td>1,900,000</td>
                    </tr>
                    <tr>
                        <td>기타내용</td>
                        <td class="text-start">기타기타기타기타기타기타기타
                            기타기타기타</td>
                    </tr>
                </tbody>
        </table>
        </article>
    </div>

    <div class="accordion-item">
        <article class="accordion-header">
            <div class="header-wrap">
                <span>결합상품 내역</span>
            </div>
        </article>
        <article class="accordion-content">
        <table class="table-receipt">
                <colgroup><col style="width:120px;"><col style="width:auto;"></colgroup>
                <tbody>
                    <tr>
                        <th>가전할부대금</th>
                        <td>5,000,000</td>
                    </tr>
                    <tr>
                        <th>기 납입금액</th>
                        <td>100,000</td>
                    </tr>
                    <tr>
                        <th>잔여금액</th>
                        <td>4,900,000</td>
                    </tr>
                </tbody>
        </table>
        <div class="accordion-etc ">
            ※ 가전할부대금=할부대금 명칭에서 변경됨.
            </div>
        </article>
    </div>
    </div>
`;

const partner = `
<table class="table-partner">
    <colgroup><col style="width:100px;"></colgroup>
    <thead>
        <tr>
            <th rowspan="2">품목</th>
            <th>업체명</th>
        </tr>
        <tr>
            <th>연락처(정/부)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2" class="text-center">앰블란스</td>
            <td>0 특수여객00 특수여객00 특수여객</td>
        </tr>
        <tr>
            <td>
                <p><a href="tel:02-123-1234" class="tel">02-123-1234</a> (정)</p>
                <p><a href="tel:02-123-1234" class="tel">02-123-1234</a> (부)</p>
            </td>
        </tr>
    
        <tr>
            <td rowspan="2" s="text-center">상복</td>
            <td>부산 상례복</td>
        </tr>
        <tr>
            <td><a href="tel:02-123-1234" class="tel">02-123-1234</a> (정)</td>
        </tr>
        <tr>
            <td rowspan="2" s="text-center">입관용품</td>
            <td>영광토탈써비스</td>
        </tr>
        <tr>
            <td><a href="tel:02-123-1234" class="tel">02-123-1234</a> (정)</td>
        </tr>
        <tr>
            <td rowspan="3" s="text-center">제단</td>
            <td>제단</td>
        </tr>
        <tr>
            <td><a href="tel:02-123-1234" class="tel">02-123-1234</a> (정)</td>
        </tr>
        <tr>
            <td><a href="tel:02-123-1234" class="tel">02-123-1234</a> (부)</td>
        </tr>
    </tbody>
</table>
`;

const corporation = `
<dl class="corporation-info">
    <dt>근조화환 문구</dt>
    <dd>두산그룹 (특) 근조화환문구(20220329)<br />: 두산에너빌리티 대표이사 회장 박지원</dd>
    <dt>일회용품</dt>
    <dd>법인일회용품(법인로고), FD배송, 두산일회용품 400인분, 지부별 보관중</dd>
    <dt>결제방법</dt>
    <dd>상품가까지 법인부담,<br />
        3,060,000원 상품가까지만 법인부담,<br />
        지원범위 외 행사 접수 시 개인부담(3,300,000원)
    </dd>
</dl>
`;