// заполнение карточек с ресторанами
const restaurants = () => {
    const restaurantsItems = document.querySelector(".restaurants__items");

    const modalAuth = document.querySelector(".modal"); // модальное окно

    const renderItems = (data) => {
        data.forEach((item) => {
            // реструктуризация
            const {image, kitchen, name, price, products, stars, time_of_delivery} = item;

            const a = document.createElement("a");

            a.setAttribute("href", "/online-food/restaurant.html");
            a.classList.add("restaurants__card");

            a.dataset.product = products;

            a.innerHTML = `
                <div class="restaurants__card-img">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="restaurants__text">
                    <div class="restaurants__card-heading">
                        <div class="restaurants__card-title">${name}</div>
                        <div class="restaurants__card-time">${time_of_delivery} мин</div>
                    </div>
                    <div class="restaurants__card-info">
                        <div class="restaurants__card-rating">${stars}</div>
                        <div class="restaurants__card-price">От ${price} &#8381;</div>
                        <div class="restaurants__card-category">${kitchen}</div>
                    </div>
                </div>
            `;

            a.addEventListener('click', (event) => {
                event.preventDefault();

                if (localStorage.getItem('user')) {
                    localStorage.setItem(("restaurant"), JSON.stringify(item));
                    window.location.href = "../online-food/restaurant.html";
                } else {
                    modalAuth.style.display = "flex";
                }
            })

            restaurantsItems.append(a);
        })
    };

    // из файлы restaurants.json достаём данные о ресторанах
    fetch("../online-food/db/restaurants.json")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data); // получим массив с объектами
            renderItems(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

restaurants();