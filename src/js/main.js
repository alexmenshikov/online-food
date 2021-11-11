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
document.addEventListener("DOMContentLoaded", () => {
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

});

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