"use strict";

// аутентефикация
const auth = () => {
    const body = document.querySelector("body"); // body для блокировки прокрутки
    const loginBtn = document.querySelector(".login"); // кнопка войти
    const logoutBtn = document.querySelector(".logout"); // кнопка выйти
    const cartBtn = document.querySelector(".cart"); // кнопка корзины
    const userName = document.querySelector(".user-name"); // имя пользователя

    const modalAuth = document.querySelector(".modal"); // модальное окно

    const close = document.querySelector(".modal__content-close"); // кнопка закрыть

    const inputLogin = document.getElementById("login"); // поле логин
    const inputPassword = document.getElementById("password"); // поле пароль

    const loginForm = document.getElementById("login-form"); // форма авторизации

    // const actionWrapper = document.querySelector(".action__wrapper"); // выпадающее меню

    // открываем модальное окно, при нажатии на кнопку войти
    loginBtn.addEventListener('click', () => {
        body.classList.add("block");
        modalAuth.style.display = "flex";
    })

    // закрываем модальное окно при нажатии на крестик
    close.addEventListener('click', () => {
        body.classList.remove("block");
        modalAuth.style.display = "none";
    })

    // проверка полей авторизации
    const validation = (user, login, password) => {
        let flagLogin = false;
        let flagPassword = false;

        if (user.login) {
            login.classList.remove("error");
            flagLogin = true;
        } else {
            login.classList.add("error");
            flagLogin = false;
        }

        if (user.password) {
            password.classList.remove("error");
            flagPassword = true;
        } else {
            password.classList.add("error");
            flagPassword = false;
        }

        return (flagLogin && flagPassword);
    };

    // действия при входе
    const login = (user) => {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "flex";
        cartBtn.style.display = "flex";
        userName.style.display = "flex";
        userName.textContent = user.login;

        modalAuth.style.display = "none";
        body.classList.remove("block");

        // вызываем чтобы убрать лишние кнопки
        // burger();
    }

    // действия при выходе
    const logout = () => {
        loginBtn.style.display = "flex";
        logoutBtn.style.display = "none";
        cartBtn.style.display = "none";
        userName.style.display = "none";
        // actionWrapper.style.display = "none";
        userName.textContent = "";

        localStorage.removeItem("user");

        // вызываем чтобы убрать лишние кнопки
        // burger();
    }

    logoutBtn.addEventListener('click', () => {
        logout();
    })

    // проверяем событие авторизации
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const user = {
            login: inputLogin.value.trim(),
            password: inputPassword.value,
        };

        let flag = validation(user, inputLogin, inputPassword);

        // если логин и пароль введены, заносим пользователя в localStorage
        if (flag) {
            localStorage.setItem("user", JSON.stringify(user));
            login(user);
        }
    });

    // проверяем, если в localStorage был пользователь, сразу его авторизируем
    if (localStorage.getItem("user")) {
        login(JSON.parse(localStorage.getItem("user")));
    }
};
auth();

// вывод числа заказов в корзине
const countingDish = () => {
    const cartCount = document.querySelector(".cart__count");
    const cartSpan = cartCount.querySelector("span");

    const cart = JSON.parse(localStorage.getItem("cart"));

    let sumCount = 0;

    if (cart) {
        cart.forEach((item) => {
            sumCount += Number(item.count);
        });
    }

    cartSpan.innerText = sumCount;
};
countingDish();

// очистка корзины
const cleanCart = () => {
    const body = document.querySelector("body");
    const modalCart = document.querySelector(".modal-cart");

    const delDishesBtn = document.querySelector(".modal-cart__bottom-del");

    if (delDishesBtn) {
        delDishesBtn.addEventListener('click', () => {
            localStorage.removeItem('cart');

            body.classList.remove("block");
            modalCart.style.display = "none";

            removeCart();
            countingDish();
        });
    }
};

// увеличение и уменьшение товаров в корзине
const editPositionCart = (arrayCart) => {
    const cartItem = document.querySelectorAll(".modal-cart__item");
    // const add = document.querySelector(".modal-cart__action-add");
    // const remove = document.querySelector(".modal-cart__action-remove");
    const sumHTML = document.querySelector(".modal-cart__bottom-sum");
    const sumHTMLspan = sumHTML.querySelector("span");
    // console.log(sumHTMLspan);

    let sumPrice = 0;

    cartItem.forEach((item) => {
        const add = item.querySelector(".modal-cart__action-add");
        const remove = item.querySelector(".modal-cart__action-remove");
        const itemHTML = item.querySelector(".modal-cart__item-title").innerText;

        add.addEventListener('click', () => {
            sumPrice = 0;

            if (arrayCart.some((elem) => elem.name === itemHTML)) {
                arrayCart.map((elem) => {
                    if (elem.name === itemHTML) {
                        elem.count++;
                        // console.log(`Добавил ${elem.name}`);
                        item.querySelector(".modal-cart__action-count").innerHTML = elem.count;

                    }

                    // return elem;
                });
            }

            // item.querySelector(".modal-cart__action-count").innerHTML = arrayCart.count;
            // console.log(arrayCart);
            localStorage.setItem("cart", JSON.stringify(arrayCart));

            arrayCart.forEach((item) => {
                // console.log(`Цена: ${item.price} - Кол-во: ${item.count}`);
                sumPrice += (item.price * item.count);
            });

            // console.log("сумма " + sumPrice);
            sumHTMLspan.innerText = `${sumPrice} ₽`;
        });

        remove.addEventListener('click', () => {
            sumPrice = 0;

            if (arrayCart.some((elem) => elem.name === itemHTML)) {
                arrayCart.map((elem) => {
                    if (elem.name === itemHTML) {
                        elem.count--;
                        // console.log(`Убрал ${elem.name}`);
                        item.querySelector(".modal-cart__action-count").innerHTML = elem.count;
                    }

                    // return elem;
                });
            }

            // console.log(arrayCart);
            localStorage.setItem("cart", JSON.stringify(arrayCart));

            // sumPrice = 0;
            arrayCart.forEach((item) => {
                // console.log(`Цена: ${item.price} - Кол-во: ${item.count}`);
                sumPrice += (item.price * item.count);
            });

            // console.log("сумма " + sumPrice);
            sumHTMLspan.innerText = `${sumPrice} ₽`;
        });
    });
};

// заполнение корзины
const renderCart = () => {
    const arrayItems = JSON.parse(localStorage.getItem("cart"));
    const cartItems = document.querySelector(".modal-cart__items");
    const cartContent = document.querySelector(".modal-cart__bottom");

    // const delDishesBtn = document.querySelector(".modal-cart__bottom-del");

    let sum = 0;

    const item = document.createElement("div");
    item.classList.add("modal-cart__bottom-item");

    if (!arrayItems) {
        const div = document.createElement("div");
        div.classList.add("modal-cart__empty");
        div.innerText = "Ой, тут пока пусто";

        cartItems.append(div);
    } else {
        arrayItems.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("modal-cart__item");

            // реструктуризация
            const {id, name, price, count} = item;

            // console.log(`${name} ${price} ${count}`);

            div.innerHTML = `
                <div class="modal-cart__item-title">${name}</div>
                <div class="modal-cart__item-price">${price} ₽</div>
                <div class="modal-cart__action">
                    <div class="modal-cart__action-remove">-</div>
                    <div class="modal-cart__action-count">${count}</div>
                    <div class="modal-cart__action-add">+</div>
                </div>
            `;

            sum = sum + (+price * +count);

            cartItems.append(div);
        });

        // const returnFunc = renderItemCart(arrayItems, sum, cartItems);
        // editPositionCart(arrayItems);

        // if(editPositionCart(arrayItems)) {
        //     console.log("true");
        // } else {
        //     console.log("false");
        // }

        item.innerHTML = `
                <div class="modal-cart__bottom-sum">Сумма <span>${sum} ₽</span></div>
                <div class="modal-cart__bottom-del">Очистить корзину</div>
        `;

        cartContent.append(item);
    }

    editPositionCart(arrayItems);

    cleanCart();
};

// очистка корзины, при закрытии
const removeCart = () => {
    const cartItems = document.querySelector(".modal-cart__items");
    cartItems.innerHTML = ``;

    const cartBottom = document.querySelector(".modal-cart__bottom");
    cartBottom.innerHTML = ``;
};

// удаление блюд из корзины
const delDishes = () => {
    const body = document.querySelector("body"); // body для блокировки прокрутки
    const modalCart = document.querySelector(".modal-cart");

    localStorage.removeItem("cart");

    body.classList.add("block");
    modalCart.style.display = "flex";

    // removeCart();
};

// открытие корзины
const openCart = () => {
    const body = document.querySelector("body"); // body для блокировки прокрутки
    const cart = document.querySelector(".cart");
    const modalCart = document.querySelector(".modal-cart");
    const close = document.querySelector(".modal-cart-close"); // кнопка закрыть

    // открываем модальное окно, при нажатии на кнопку корзина
    cart.addEventListener('click', () => {
        body.classList.add("block");
        modalCart.style.display = "flex";

        renderCart();
    })

    // закрываем модальное окно при нажатии на крестик
    close.addEventListener('click', () => {
        body.classList.remove("block");
        modalCart.style.display = "none";

        removeCart();
    })
};
openCart();