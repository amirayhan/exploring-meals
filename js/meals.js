const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayMeals(data.meals));
};

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
        </div>
        `;
        mealContainer.appendChild(mealsDiv);
    });
};

searchMeals = () => {
    const inputField = document.getElementById("input_id");
    searchText = inputField.value;
    loadMeals(searchText);
    inputField.value = "";
};
loadMeals();
