const API_KEY="1e67a63cf77b481fbf32ed6e233e5cf8";
const recipeListEl= document.getElementById('recipe-list');
function displayRecipes(recipes){
  recipeListEl.innerHTML="";
  recipes.forEach((recipe) => {
    const recipeitem=document.createElement('li');
    recipeitem.classList.add('recipe-item');
    const recipeimg=document.createElement('img');
    recipeimg.src=recipe.image;
    recipeimg.alt="Recipe Image";

    const recipetitle=document.createElement('h2');
    recipetitle.innerText=recipe.title;

    recipeIng=document.createElement('p');
    recipeIng.innerHTML=`<strong>Ingredients: </strong> ${recipe.extendedIngredients.map((ingredient)=>ingredient.original).join(",")}`

    recipelink =document.createElement('a');
    recipelink.href=recipe.sourceUrl;
    recipelink.innerText="View Recipe"
    


    recipeitem.appendChild(recipeimg);
    recipeitem.appendChild(recipetitle);
    recipeitem.appendChild(recipeIng);
    recipeitem.appendChild(recipelink);

    recipeListEl.appendChild(recipeitem);

   
    

  });
}
async  function getRecipes(){
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);

  const data = await response.json()
  return data.recipes
}



 async function init(){
    const recipes  = await getRecipes()
    displayRecipes(recipes)

}
init();