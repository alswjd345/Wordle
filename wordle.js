const button=document.getElementsByTagName('button');
let inputs=document.querySelectorAll('.input');
const section=document.querySelector('section');


//실패스코어
let failScore=0;
//유저가 입력한 값을 변수에 담음
let input='';

//정답 리스트
let answerList=['blank','chair','cheek','title'];
//오늘의 정답
let answer= answerList[Math.floor(Math.random()*(answerList.length-1))];

//버튼 이벤트
button[0].addEventListener('click',colorChange);



//input의 색 변경하기
function colorChange() {
        inputs=document.querySelectorAll('.input');
        //공백이 있는지 확인하는 함수
        if(!Check_Blank()){
          return;
        }

        for (let i = 0; i < 5; i++) {
            //위치랑 단어 맞으면 초록
            if (inputs[i].value == answer[i]) {
                inputs[i].style.backgroundColor = 'green';
            }//공백이면 하얀색
            else if(inputs[i].value==''){
                inputs[i].style.backgroundColor = 'white';
            }
            //위치 안맞으면 노란
            else if (answer.includes(inputs[i].value)) {
                inputs[i].style.backgroundColor = 'yellow';
            }
            //다 안맞으면 회색
            else {
                inputs[i].style.backgroundColor = 'lightgray';
            }
            inputs[i].classList.remove('input');

        }
        failScore++;
        Template_Add();
        Failure_Success();
}

//공백이 있는지 확인하는 함수
function Check_Blank() {
    for (let i = 0; i < 5; i++) {
        //빈칸이 있으면 경고창 띄우기
        if (inputs[i].value == '') {
            alert('단어를 전부 입력해주세요');
            return false;
        }
    }
    return true;
}

//다음 input 추가하는 함수
    function Template_Add(){
      let template=`<div>
          <input type="text" class="input" maxlength="1" onkeydown="onKeyDownEvent(event);" autofocus>
          <input type="text" class="input" maxlength="1" onkeydown="onKeyDownEvent(event);">
          <input type="text" class="input" maxlength="1" onkeydown="onKeyDownEvent(event);">
          <input type="text" class="input" maxlength="1" onkeydown="onKeyDownEvent(event);">
          <input type="text"  class="input" maxlength="1" onkeydown="onKeyDownEvent(event);">
      </div>`;
        document.querySelector('div').insertAdjacentHTML('beforeend',template);
    }

    //성공 실패 여부
    //전부 맞으면 정답,7번 못맞출시 실패
    function Failure_Success() {
        for (let i = 0; i < 5; i++) {
            input+=inputs[i].value;
        }
        if(failScore==7){
           alert("실패ㅜㅜㅜ 다시 시작해주세여");
           Reset();
           return;
        }
       else if(input==answer){
            alert('정답!!오늘의 단어는'+answer+'입니다');
            failScore=0;
            Reset();
            return;
        }else{
            input='';
            return;
        }
    }


    //성공하면 리셋
    function Reset() {
      section.innerHTML='';
      let firsttemplate=`<div>
          <input type="text"  class="input" maxlength="1" pattern="[a-zA-Z]" onkeydown="onKeyDownEvent(event);" autofocus>
          <input type="text" class="input" maxlength="1" pattern="[a-zA-Z]" onkeydown="onKeyDownEvent(event);">
          <input type="text" class="input" maxlength="1" pattern="[a-zA-Z]" onkeydown="onKeyDownEvent(event);">
          <input type="text" class="input" maxlength="1" pattern="[a-zA-Z]" onkeydown="onKeyDownEvent(event);">
          <input type="text"  class="input" maxlength="1" pattern="[a-zA-Z]" onkeydown="onKeyDownEvent(event);">
          <button>Enter</button>
      </div>`
        section.insertAdjacentHTML('beforeend',firsttemplate);
        button[0].addEventListener('click',colorChange
      );
    }

    //영어만 입력 받기
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((inputElement) => {
      inputElement.oninput = (event) => {
        const validated = inputElement.validity.valid;
        if(!validated){
          inputElement.value = '';
          alert("영어만 적어주세요");
          event.preventDefault();
        }
      }
    });


    //키보드 이벤트
    const onKeyDownEvent=(event)=>{

      //backspace
      if(event.keyCode==8){
          if(event.target.value.length!==event.target.maxLength){
              event.target.previousElementSibling.focus();
              console.log("back");
          }
      }
        //next input
        else if(event.target.value.length===event.target.maxLength){
            event.target.nextElementSibling.focus();
            console.log("keydown");
        }


 }
