

window.onload = function() {
  event.preventDefault();
  let alphabet = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y',
    'z',
  ]

  let topDiv = document.querySelector('.ingr-descr')
  topDiv.style.display = 'none';

  //name, alcOrNot, Category, Glass

function makeCards(letter) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
  .then(res => res.json()) 
  .then(data => {
    if (data.drinks !== null) {
      // array of objects
      console.log(data.drinks);
    
      data.drinks.forEach(drink => {
        if (drink['strAlcoholic'] === 'Non alcoholic') {
          let drinkIdCard = drink['idDrink'];
          let drinkName = drink['strDrink'];
          let drinkType = drink['strAlcoholic'];
          let drinkCategory = drink['strCategory'];
          let drinkGlass = drink['strGlass'];
          let drinkImg = drink['strDrinkThumb'];

          let createCard = document.createElement('div');
          createCard.classList.add("card");
          createCard.style.width = '18rem';
          createCard.setAttribute("id", drinkIdCard);

          let createImage = document.createElement("img");
          createImage.src = drinkImg;
          createImage.classList.add('card-img-top');

          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          // drink type alcoholic or not
          // h5 element
          let createDrinkType = document.createElement('h5');
          createDrinkType.classList.add("card-title");
          createDrinkType.classList.add("drink-type");
          let createDrinkTypeContent = document.createTextNode(`♦${drinkType}♦`);
          createDrinkType.appendChild(createDrinkTypeContent);

          cardBody.appendChild(createDrinkType);

          // drink link
          let createDrinkTitleLink = document.createElement('a');
          // drink title, 
          // h5 element
          let createDrinkTitle = document.createElement('h5');
          createDrinkTitle.classList.add('card-title');
          createDrinkTitle.classList.add('drink-title');
          titleId = drinkName.toLowerCase().replaceAll(' ','-');
          createDrinkTitle.setAttribute("id", titleId);
          let createDrinkTitleContent = document.createTextNode(drinkName);
          createDrinkTitle.appendChild(createDrinkTitleContent);

          createDrinkTitleLink.classList.add('drink-link');
          createDrinkTitleLink.appendChild(createDrinkTitle);

          // drink category
          let createSpanDiv = document.createElement('div');
          createSpanDiv.classList.add('card-text');
          createSpanDiv.classList.add('drink-category');
          
          //drink category span
          let createSpan = document.createElement('span');
          let createSpanContent = document.createTextNode(`⟢${drinkCategory}⟣`);
          createSpan.appendChild(createSpanContent);

          createSpanDiv.appendChild(createSpan);

          //drink glass 
          let createGlassDiv = document.createElement('div');
          createGlassDiv.classList.add('card-text');
          createGlassDiv.classList.add('drink-glass');

          //drink glass span
          let createGlassSpan = document.createElement('span');
          let createGlassSpanContent = document.createTextNode(drinkGlass);
          createGlassSpan.appendChild(createGlassSpanContent);

          createGlassDiv.appendChild(createGlassSpan);

          //createCard append each part
          createCard.appendChild(createImage);
          createCard.appendChild(cardBody);
          createCard.appendChild(createSpanDiv);
          createCard.appendChild(createGlassDiv);
          cardBody.appendChild(createDrinkTitleLink);

          let eachCard = document.getElementById("id-all-drinks-container");
          eachCard.appendChild(createCard);

          let button = document.getElementById(titleId);
          //click "link"
          button.addEventListener('click', function handleClick() {
            console.log('element clicked');
            console.log(drinkName);
            topDiv.style.display = 'flex';
            let drink = drinkName;
            

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
            .then(res => res.json()) 
            .then(data => {
              console.log(data);
              console.log(data.drinks[0].strInstructions);

              //remove all elements within cards
              eachCard.style.display = 'none';

              //add title, image, instruction
              document.querySelector('.name-of-drink').innerText = data.drinks[0].strDrink;
              document.querySelector('.drink-img').src = data.drinks[0].strDrinkThumb;
              let instr = data.drinks[0].strInstructions;
              let myNode = document.getElementById('id-ingredient-list');
              document.querySelector('.instructions').innerText = instr.split('.').join('.\n');
              // document.querySelector('.instructions').innerText = instr;


              //add ingredient list
              let keyPairNestedArray2 = Object.entries(data.drinks[0]);

              let ingredientsArray2 = keyPairNestedArray2.filter(arr => {
                return arr[0].includes('strIngredient') && arr[1] !== null;
              }).map(arr => arr[1]);
              
              let quantityArray2 = keyPairNestedArray2.filter(arr => {
                return arr[0].includes('strMeasure') && arr[1] !== null;
              }).map(arr => arr[1]);
              
              let fullIngredientsArray2 = [];
              console.log(ingredientsArray2);
              console.log(quantityArray2);
              
              for (let i = 0; i < quantityArray2.length; i++) {
                if (quantityArray2[i] !== null && ingredientsArray2[i] !== null) {
                  fullIngredientsArray2.push(quantityArray2[i] + ' ' + ingredientsArray2[i]);
                }
              }

              for (let i = 0; i < ingredientsArray2.length; i++) {
                if (ingredientsArray2[i] !== null && quantityArray2[i] === undefined) {
                  fullIngredientsArray2.push(ingredientsArray2[i]);
              }}

              let fullIngredients = fullIngredientsArray2.join('\n\n');

              document.querySelector('.list-of-ingredient').innerText = fullIngredients;

              //back to normal cards
              document.addEventListener('click', function handleClick() {
                eachCard.style.display = 'flex';
              });
            })
            .catch(err => {
              console.log(`error ${err}`);
            });

          }); // end of event listener
        }
       
      })
    }
});
}

alphabet.forEach(letter => {
  makeCards(letter);
});

}//end of onload function



