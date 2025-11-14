// 1. title의 btn 클릭하면 story로 넘어가기
// 2. story의 btn 클릭하면 game으로 넘어가기
//3. game의 input.value에 값이 있으면 close버튼 눌렀을 때
// 3-1. 엘베 문 닫히고 올라가기
// 3-2.  random수 값 비교해서 결과에 따라 result의 text, img 교체하고, 남은 기회수 카운트해서 star 교체하기

//1.
let title = document.querySelector('.title');
let titlebtn = document.querySelector('.title .btn');

titlebtn.addEventListener('click', () => {
    title.style.display = 'none';
});

//2
let story = document.querySelector('.story');
let storybtn = document.querySelector('.story .btn');

storybtn.addEventListener('click', () => {
    story.style.display = 'none';
});

//3
random = Math.floor(Math.random() * 50) + 1;
console.log(random);

let user = document.querySelector('.game input');
let userNum;

//3-1
let elevator = document.querySelector('.game');
let elevatorDoor = document.querySelectorAll('.game .door');
let close = document.querySelector('.game .close');
let guide = document.querySelector('.game .textBox p');

close.addEventListener('click', () => {
    move();
    playGame();
});

function move() {
    userNum = user.value;
    if (!userNum == '') {
        elevatorDoor.forEach((door) => {
            door.style.width = '50%';
        });
        setTimeout(() => {
            elevator.style.marginTop = '-100vh';
        }, 1000);
    } else {
        guide.innerHTML =
            '<p>오른쪽 숫자판에 <span>숫자를 입력</span>하고<br>닫기버튼을 눌러줘~~</p>';
    }
}

function resetGame() {
    chances = 5;
    random = Math.floor(Math.random() * 50) + 1;
    console.log('새로운 정답:', random);
    resultStars.textContent = '★'.repeat(chances);
    resultText.textContent = '다시 한 번 출발! 느낌이 오는 층으로 이동해보자!!';
    isGameOver = false;
}

//3-2
let chances = 5;
let resultStars = document.querySelector('.result .stars');
let retry = document.querySelector('.result .top .textBox p');
let retryBtn = document.querySelector('.result .top .btn');
let resultText = document.querySelector('.resultTxtBox p');
let isGameOver;

function playGame() {
    if (!userNum == '') {
        chances--;
    }
    userNum = user.value;

    if (userNum < 1 && userNum > 50) {
        guide.innerHTML = `이 아파트는 <span>1층부터 50층</span>까지만 있엉ㅠㅠ`;
    }
    if (userNum == random) {
        resultText.textContent = '정답이곰~! 우리가 해냈곰!';
        chances = chances + 1;
        isGameOver = true;
    } else if (chances == 0) {
        retry.textContent = '처음부터 다시 해볼까? ';
        resultText.textContent = '으앙! 별을 다 잃었곰...';
        isGameOver = true;
    } else if (!userNum == '' && userNum > random) {
        resultText.textContent = '아까비! 조금 더 아래곰!';
        setTimeout(() => {
            guide.innerHTML = `<span>${userNum}층</span>보다는 아래층이었어!<br>다시 한 번 시도해보자~!!`;
        }, 3000);
        isGameOver = false;
    } else if (!userNum == '' && userNum < random) {
        resultText.textContent = '더 높은 층이곰! Up! Up!';
        setTimeout(() => {
            guide.innerHTML = `<span>${userNum}층</span>보다는 높은 층인가봐!<br>다시 한 번 시도해보자~!!`;
        }, 3000);
        isGameOver = false;
    }
    resultStars.textContent = '★'.repeat(chances);

    user.value = '';
}

retryBtn.addEventListener('click', () => {
    if (isGameOver) {
        resetGame();
    }
    elevator.style.marginTop = '0vh';
    elevatorDoor.forEach((door) => {
        door.style.width = '0%';
    });
});

//엔터
user.addEventListener('keydown', function (e) {
    userNum = user.value;

    if (e.key === 'Enter') {
        if (!userNum == '') {
            move();
            playGame();
        }
    }
});
