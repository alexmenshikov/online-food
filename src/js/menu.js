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

// при создание массива, проверим есть ли массив в localStorage или нет, если да, мы его добавим в массив, если нет, просто создадим пустой массив.
// const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

// добавление блюд в корзину
const addCart = (cartItem) => {
    // при создание массива, проверим есть ли массив в localStorage или нет, если да, мы его добавим в массив, если нет, просто создадим пустой массив.
    const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    if(cartArray.some((item) => item.id === cartItem.id)) {
        cartArray.map((item) => {
            if(item.id === cartItem.id) {
                item.count++;
            }
            return item;
        });
    } else {
        cartArray.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cartArray));

    countingDish();
};

// заполнение карточек с блюдами
const dishes = () => {
    const foodItems = document.querySelector(".food__items");

    const restourant = JSON.parse(localStorage.getItem("restaurant"));

    const cartArray = [];

    const renderItems = (data) => {
        data.forEach((item) => {
            // реструктуризация
            const {id, name, description, price, weight, image} = item;

            const div = document.createElement("div");

            div.classList.add("food__card");

            div.innerHTML = `
                <div class="food__card-img">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="food__text">
                    <div class="food__card-title">${name}</div>
                    <div class="food__card-description">${description}</div>
                    <div class="food__card-weight">${weight} г</div>
                    <div class="food__card-info">
                        <div class="food__card-price">${price} ₽</div>
                        <div class="food__card-cart">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path fill-rule="evenodd"
                                      d="M33.5 38.25a.75.75 0 0 1 0 1.5.75.75 0 0 1 0-1.5zm-3 .75c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM9 39.891a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm0-3.9c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm27.953-10.715l-5.166.163.205-5.939h6.575l-.235 4.381c-.052.755-.66 1.354-1.379 1.395zm-21.05-1.439l-.932-4.337h6.53v6.264l-5.49.173c.057-.695.03-1.4-.108-2.1zM19 13h2.5v5h-6.853l-1.224-5.696C14.791 12.696 16.61 13 19 13zm11.49 6.5l-.206 5.986-7.284.23V19.5h7.49zm.225-6.5l-.173 5H23v-5h7.715zm7.933 5h-6.604l.172-5h6.701l-.269 5zm2.941-7.532A1.5 1.5 0 0 0 40.5 10H19c-3.474 0-5.422-.717-6.328-1.187l-.085-.395A3.077 3.077 0 0 0 9.595 6H6v3l3.653.048 3.312 15.392a4.502 4.502 0 0 1-.803 3.551l-1.836 2.361a3.478 3.478 0 0 0-.382 3.686A3.479 3.479 0 0 0 13.09 36h23.36v-3H13.09a.479.479 0 0 1-.45-.28.482.482 0 0 1 .053-.527l1.852-2.381c.202-.269.378-.554.541-.845l21.997-.694a4.512 4.512 0 0 0 4.243-4.21l.672-12.482a1.503 1.503 0 0 0-.409-1.113z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `;

            div.querySelector(".food__card-cart").addEventListener('click', () => {
                const cartItem = {
                    id: id,
                    name: name,
                    price: price,
                    count: 1
                };

                addCart(cartItem);
            });

            foodItems.append(div);
        })
    };

    if(localStorage.getItem("restaurant")) {
        // из файлы *.json достаём данные о блюдах
        fetch(`../online-food/db/${restourant.products}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data); // получим массив с объектами
                renderItems(data);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        window.location.href = "/";
    }
};

dishes();