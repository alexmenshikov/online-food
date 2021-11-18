"use strict";

// const burger = () => {
//     const body = document.querySelector("body"); // body для блокировки прокрутки
//     const userName = document.querySelector(".user-name"); // имя пользователя
//     const logoutBtn = document.querySelector(".logout"); // кнопка выйти
//     const burger = document.querySelector(".burger"); // кнопка бургера
//     // const actionWrapper = document.querySelector(".action__wrapper"); // выпадающее меню
//
//     const flag = localStorage.getItem('user');
//
//     const menuAdaptive = () => {
//
//         // if (window.innerWidth >= 560) {
//         // // if (window.screen.width >= 560) {
//         //     if (flag) {
//         //         userName.style.display = "flex";
//         //         logoutBtn.style.display = "flex";
//         //         burger.style.display = "none";
//         //         // actionWrapper.style.display = "flex";
//         //     } else {
//         //         userName.style.display = "none";
//         //         logoutBtn.style.display = "none";
//         //         burger.style.display = "none";
//         //         // actionWrapper.style.display = "flex";
//         //     }
//         // } else {
//         //     if (flag) {
//         //         userName.style.display = "none";
//         //         logoutBtn.style.display = "none";
//         //         burger.style.display = "none";
//         //         // actionWrapper.style.display = "flex";
//         //     } else {
//         //         userName.style.display = "none";
//         //         logoutBtn.style.display = "none";
//         //         burger.style.display = "none";
//         //         // actionWrapper.style.display = "flex";
//         //     }
//         // }
//     }
//
//     menuAdaptive();
//
//     burger.addEventListener('click', () => {
//         burger.classList.toggle("open");
//         // actionWrapper.classList.toggle("open");
//         userName.style.display = "flex";
//         logoutBtn.style.display = "flex";
//         body.classList.toggle("block");
//     });
//
//     window.addEventListener('resize', (event) => {
//         menuAdaptive();
//     });
// }

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

// заполнение корзины
const renderCart = () => {
    const arrayItems = JSON.parse(localStorage.getItem("cart"));
    const cartItems = document.querySelector(".modal-cart__items");
    const cartContent = document.querySelector(".modal-cart__bottom");

    const delDishesBtn = document.querySelector(".modal-cart__bottom-del");

    let sum = 0;

    const item = document.createElement("div");
    item.classList.add("modal-cart__bottom-item");

    if(!arrayItems) {
        const div = document.createElement("div");
        div.classList.add("modal-cart__empty");
        div.innerText = "Купи покушать :)";

        cartItems.append(div);
    } else {
        arrayItems.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("modal-cart__item");

            // реструктуризация
            const {id, name, price, count} = item;

            console.log(`${name} ${price} ${count}`);

            div.innerHTML = `
                <div class="modal-cart__item-title">${name}</div>
                <div class="modal-cart__item-price">${price} &#8381;</div>
                <div class="modal-cart__action">
                    <div class="modal-cart__action-remove">-</div>
                    <div class="modal-cart__action-count">${count}</div>
                    <div class="modal-cart__action-add">+</div>
                </div>
            `;

            sum = sum + (+price * +count);

            cartItems.append(div);
        });

        item.innerHTML = `
                <div class="modal-cart__bottom-sum">Сумма <span>${sum} &#8381;</span></div>
                <div class="modal-cart__bottom-del">Очистить корзину</div>
        `;

        cartContent.append(item);
        // delDishesBtn.addEventListener('click', () => {
        //     delDishes();
        // });
    }
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

// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     // direction: 'vertical',
//     loop: true,
//
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//
//     grabCursor: true,
//     effect: "creative",
//     creativeEffect: {
//         prev: {
//             shadow: true,
//             origin: "left center",
//             translate: ["-5%", 0, -200],
//             rotate: [0, 100, 0],
//         },
//         next: {
//             origin: "right center",
//             translate: ["5%", 0, -200],
//             rotate: [0, -100, 0],
//         },
//     },
//
//     speed: 1000,
//
//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//
//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// });