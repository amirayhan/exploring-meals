// load all meals from api
const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayMeals(data.meals));
};

// display all meals in html
const displayMeals = (meals) => {
    const mealContainer = document.getElementById("meals_container");
    mealContainer.innerHTML = ``;
    meals.forEach((meal) => {
        const mealsDiv = document.createElement("div");
        mealsDiv.classList.add("col");
        mealsDiv.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
            <button onclick="loadMealsDetails(${meal.idMeal})" class="btn btn-danger">More Details</button>
        </div>
        `;
        mealContainer.appendChild(mealsDiv);
    });
};

// search button click to search meals - onclick function use
searchMeals = () => {
    const inputField = document.getElementById("input_id");
    searchText = inputField.value;
    loadMeals(searchText);
    inputField.value = "";
};

// load meals details
const loadMealsDetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayMealDetails(data.meals[0]));
};

// show meal details in html
const displayMealDetails = (mealDetails) => {
    console.log(mealDetails);
    const mealDetailsContainer = document.getElementById("meals_details_container");
    mealDetailsContainer.innerHTML = ``;
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("card");
    detailsDiv.innerHTML = `
        <div class="card" style="width: 100%;">
            <img class="card-img-top" src="${mealDetails.strMealThumb}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${mealDetails.strMeal}</h5>
                <p class="card-text">${mealDetails.strInstructions.slice(0, 400)}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Area: ${mealDetails.strArea}</li>
                <li class="list-group-item">Category: ${mealDetails.strCategory}</li>
                <li class="list-group-item">Quantity: ${mealDetails.strMeasure1}</li>
            </ul>
        </div>
    `;
    mealDetailsContainer.appendChild(detailsDiv);
};

// function called by empty string for all meal show in html
loadMeals("");
