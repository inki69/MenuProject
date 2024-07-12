var options = ['carrot','broccoli','asparagus','cauliflower','corn','cucumber','green pepper', 'lettuce','mushrooms', 'onion','potato','pumpkin','red pepper','tomato','beetroot','brussel sprouts','peas','zucchini','radish','sweet potato','artichoke','leek','cabbage','celery','chili','garlic','basil','coriander','parsley','dill','rosemary','oregano','cinnamon','saffron','green bean','bean','chickpea','lentil','apple','apricot','avocado','banana','blackberry','blackcurrant','blueberry','boysenberry','cherry','coconut','fig','grape','grapefruit','kiwifruit','lemon','lime','lychee','mandarin','mango','melon','nectarine','orange','papaya','passion fruit','peach','pear','pineapple','plum','pomegranate','quince','raspberry','strawberry','watermelon','salad','pizza','pasta','popcorn','lobster','steak','bbq','pudding' ,'hamburger','pie','cake','sausage' ,'tacos' ,'kebab' ,'poutine' ,'seafood' ,'chips' ,'fries' ,'masala','paella','som tam','chicken','toast','marzipan','tofu','ketchup','hummus','chili','maple syrup','parma ham','fajitas','champ','lasagna','poke','chocolate','croissant','arepas','bunny chow','pierogi','donuts','rendang','sushi','ice cream','duck','curry','beef','goat','lamb','turkey','pork','fish','crab','bacon','ham','pepperoni','salami','ribs'];

var controlMenu = document.querySelector('#control-menu');
var menu = document.querySelector('#menu')
var menuList = document.querySelector('#menu ul')

var recipesContainer = document.querySelector('#recipes-container')
var recipeOrederBox = document.querySelector('#recipeOreder-box')
var closeBtn = document.querySelector('#close-btn')

var recipeOrederContainer = document.querySelector('#recipe-oreder-container')


controlMenu.addEventListener('click', function(){
    if(menu.style.left === '-100%'){
        menu.style.left = '0';
        controlMenu.classList.replace('text-white-50', 'text-white')
    }else{
        menu.style.left = '-100%';
        controlMenu.classList.replace('text-white', 'text-white-50')
    }
})

for(var i = 0; i < options.length; i++){
    var optionEle = document.createElement('li');
    optionEle.classList.add('py-3', 'ps-3', 'border-bottom', 'fs-3');
    optionEle.setAttribute('id', options[i]);
    optionEle.innerHTML =`<span></span> <p>${options[i]}</p>`;
    menuList.appendChild(optionEle);
}

menuList.addEventListener('click', function(e){
    if(e.target.innerText != ''){
        getApi(e.target.innerText)
    }
    menu.style.left = '-100%';
})

function getApi(query){
    var api = new XMLHttpRequest();
    api.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${query}`);
    api.send();
    api.addEventListener('readystatechange', function(){
        if(api.readyState == 4 && api.status == 200){
            display(JSON.parse(api.response).recipes);
        }
    })
}
getApi('pizza');

function display(response){
   var str = '';

    for(var i=0;i<response.length;i++){
        str += 
        `<div class="col-md-4" id=${response[i].recipe_id }>
            <div class="recipe-box make-pointer bg-light shadow-lg border rounded">
            <div class="recipe-img">
            <img src=${response[i].image_url} class='w-100' alt="">
            </div>
            <div class="content px-2">
                <h3 class="my-3">${response[i].title}</h3>
                <p>${response[i].publisher}</p>
            </div>
            </div>
        </div>`
    }
    recipesContainer.innerHTML = str;
    console.log(response);
}

function getRecipeDescription(req){
    var api = new XMLHttpRequest();
    api.open('GET', `https://forkify-api.herokuapp.com/api/get?rId=${req}`);
    api.send();
    api.addEventListener('readystatechange', function(){
        if(api.readyState == 4 && api.status == 200){
            showOrder(JSON.parse(api.response));
        }
    })
}
recipesContainer.addEventListener('click', function(e){
    if(e.path[3].id != ''){
        getRecipeDescription(e.path[3].id);
        recipeOrederContainer.classList.replace('d-none', 'd-flex')
    }
    
});
closeBtn.addEventListener('click', function(e){
    recipeOrederContainer.classList.replace('d-flex', 'd-none')
});
recipeOrederContainer.addEventListener('click', function(e){
    recipeOrederContainer.classList.replace('d-flex', 'd-none')
});
recipeOrederBox.addEventListener('click', function(e){
    e.stopPropagation()
})
var recipBoxImg = document.querySelector('#recip-box-img');
var recipTitle = document.querySelector('#recip-title');
var recipPublisher = document.querySelector('#recip-publisher');
var ingredinetsMenu = document.querySelector('#ingredinets-menu')


function showOrder(req){
    console.log(req)
    for(var i = 0; i < req.recipe.ingredients.length; i++){
       var li = document.createElement('li');
       li.innerHTML = req.recipe.ingredients[i];
       li.classList.add('py-3');
       ingredinetsMenu.appendChild(li);
    }
    recipBoxImg.src = req.recipe.image_url;
    recipTitle.innerText = req.recipe.title;
    recipPublisher.innerText = req.recipe.publisher;
}