import {TemplateService} from './services/TemplateService.js';

let isGameRunning = false;
let canSelect = false;
let selectedCards = [];
let cardList = [];
let score = 0; 

function startLogoList(logoList){
    return logoList.flatMap(name => [name, name])
    .map(name => ({name, position: Math.random()}))
    .sort((a,b) => a.position - b.position)
    .map((item, index) => ({
        name: item.name,
        index,
        canSelect: true
    }))
}

function gameOver(){
    isGameRunning = false;
    TemplateService.showResetButton();
}

export const Game = {
    start(logoList){
        isGameRunning = true;
        canSelect = true;
        selectedCards = [];
        cardList = startLogoList(logoList);
        score = 0;
        TemplateService.setCardList(cardList.map(card => card.name));
        TemplateService.hideResetButton();
    },
    selectCard(cardIndex){
        if(isGameRunning && canSelect && cardList[cardIndex].canSelect){
            if(selectedCards.length < 2){
                selectedCards.push(cardList[cardIndex]);
                TemplateService.show(cardIndex, cardList[cardIndex].name);
                cardList[cardIndex].canSelect = false;
            }
            if(selectedCards.length === 2){
                canSelect = false;
                const [first, second] = selectedCards;
                if(first.name === second.name){
                    canSelect = true;
                    selectedCards = [];
                    score += 2;
                }else{
                    setTimeout(() => {
                        selectedCards.forEach(item => {
                            TemplateService.hide(item.index);
                        })
                        setTimeout(()=>{
                            selectedCards = [];
                            canSelect = true;
                            first.canSelect = true;
                            second.canSelect = true;
                        }, 1000)
                    }, 1500)
                }

                if(score === cardList.length){
                    gameOver();
                }
            }
        }
    }
}