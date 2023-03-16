const trunkWrappers = document.getElementsByClassName("trunkWrapper");
const buttons = document.querySelectorAll('div.trunk button');
const mainLearnings = document.querySelectorAll('.mainLearning');


const datasetElements = [trunkWrappers, buttons, mainLearnings]

let indexA= 0;
let indexB= 0;
let indexC= 0;

for (const elem of trunkWrappers) {
  elem.setAttribute('data-number',indexA);
  indexA++;
}

for (const elem of buttons) {
  elem.setAttribute('data-number',indexB);
  indexB++
}

for (const elem of mainLearnings) {
  elem.setAttribute('data-number',indexC);
  indexC++;
}


mainLearnings.forEach(mainLearning => {
  mainLearning.addEventListener("click", (event) => {

    let clickedNum = event.target.dataset.number;
      
    Array.prototype.forEach.call(buttons, (x) => {
            
      if(clickedNum === x.dataset.number){
        x.classList.toggle("style1")  
      }
    });  

    Array.prototype.forEach.call(trunkWrappers, (x) => {
 
      if(clickedNum === x.dataset.number){
        x.classList.toggle("style1")  
      } 
    });       
  })  
});

const heirachyButtons = document.querySelectorAll(".hierachy")

for (const button of heirachyButtons) {

  button.addEventListener("click", (event) => {


  })
}



