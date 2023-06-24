const scoreEl = document.querySelector('.score-val'),
rulesWrapper = document.querySelector('.game-rules-wrapper'),
rulesBtn = document.querySelector('.rules-btn'),
closeBtn = document.querySelector('.close-btn'),
gameBox = document.querySelector('.game'),
gameCard = document.querySelector('.game-card'),
RPSs = document.querySelectorAll('.img-bg1');


let score = 0;

RPSs.forEach(el => {
    el.addEventListener('click', (e)=>{
        const pickedEl = document.createElement('div');
        const playerClasses = e.target.classList
        pickedEl.classList.add(...playerClasses, 'player-picked');
        pickedEl.innerHTML = e.target.innerHTML;


        const housePicked = document.createElement('div');
        const randomNum = Math.floor(Math.random()*3);
        const classN = randomNum == 0?'first':randomNum == 1?'second':'third';
        housePicked.innerHTML = 
        [...gameCard.children][randomNum].innerHTML;
        housePicked.classList.add('house-picked','img-bg1',classN)

        // pickedEl.style.top='-5rem';
        // pickedEl.style.left = '1rem';
        // pickedEl.style.transform = 'none';
        
        const p = document.createElement('p');
        p.innerText = 'You picked';
        p.classList.add('picked');

        const pHouse = document.createElement('p');
        pHouse.innerText = 'The house picked';
        pHouse.classList.add('house-picked-p');

        const idxPlayer = [...gameCard.children].indexOf(e.target);



        gameCard.classList.toggle('none');
        gameBox.classList.remove('none')
        gameBox.append(p);
        gameBox.append(pickedEl);
        gameBox.append(housePicked);
        gameBox.append(pHouse)

        const resultBox = document.createElement('div');
        resultBox.classList.add('result-container');
        const resultP = document.createElement('h1');
        resultP.classList.add('result-para');
        const resultBtn = document.createElement('button');
        resultBtn.classList.add('result-btn');
        resultBtn.innerText = 'PLAY AGAIN'

        resultBox.append(resultP);
        resultBox.append(resultBtn);
        

        if(idxPlayer == randomNum){
            resultP.innerText= "DRAW";
        }else if(youWin(idxPlayer, randomNum)){
            resultP.innerText='YOU WIN';
            score++;
            scoreEl.innerText = prefix(score);
        }else{
            resultP.innerText = 'YOU LOSE';
            score--;
            scoreEl.innerText = prefix(score);
        }
        gameBox.append(resultBox);
    })
});

function youWin(idxPlayer, idxHouse){
    if(idxPlayer == 0 && idxHouse == 1)return true;
    if(idxPlayer == 0 && idxHouse == 2)return false;
    if(idxPlayer == 1 && idxHouse == 0)return false;
    if(idxPlayer == 1 && idxHouse == 2)return true;
    if(idxPlayer == 2 && idxHouse == 0)return true;
    if(idxPlayer == 2 && idxHouse == 1)return false;

}

gameBox.addEventListener('click', (e)=>{
    if(e.target.classList.contains('result-btn')){
        gameCard.classList.toggle('none');
        gameBox.classList.toggle('none');
        gameBox.innerHTML ='';
    }
})

function prefix(num){
    if(num>=0){
        return num<10?'0'+num:num;
    }else{
        num = -num;
        return num<10?'-0'+num:-num;
    }
}

rulesBtn.addEventListener('click', showRules)

closeBtn.addEventListener('click',showRules)

function showRules(){
    rulesWrapper.classList.toggle('none');
    document.querySelector('.game-wrapper').classList.toggle('blur')
}



























