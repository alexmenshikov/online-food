document.addEventListener("DOMContentLoaded", () => {
    const menu = () => {
        const menuTitle = document.querySelector(".menu__title");
        const menuRating = document.querySelector(".menu__info-rating");
        const menuPrice = document.querySelector(".menu__info-price");
        const menuKitchen = document.querySelector(".menu__info-category");

        const restaurant = JSON.parse(localStorage.getItem("restaurant"));

        menuTitle.textContent = restaurant.name;
        menuRating.textContent = restaurant.stars;
        menuPrice.textContent = `От ${restaurant.price} ₽`;
        menuKitchen.textContent = restaurant.kitchen;
    };

    menu();
});