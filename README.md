# ***Проект Movies-explorer (фронтенд)***
Проект является **дипломной работой** на курсе веб-разработчик ***Яндекс.Практикума***.
## *Описание*
----
### ***О чём проект?***

Данное вэб-приложение является сайтом-портфолио и мини-кинопоиском, открывающимся после регистрации.

![image](https://user-images.githubusercontent.com/62921493/227285003-bde80f4d-53de-4220-889c-ffc046e61d5a.png)


---
## *Функциональность:*
* Защищённость роутов (нельзя перейти к приложению-поисковику, если не выполнен вход)
* Реализована "живая" **валидация** всех форм/полей ввода с использованием регулярных выражений и сторонних библиотек
* Использование собственных **хуков** (универсальный обработчик полей, валидация, контроль разрешения экрана)
* Возможность **поиска** фильмов со стороннего API
* Сохранение/удаление найденных фильмов к себе в аккаунт
* Реализован **фильтр** короткометражных фильмов
* Запоминание состояния полей ввода (в форме поиска фильмов), фильтра и найденных фильмов (при обновлении страницы данные не будут утеряны)
* Поиск фильмов как на русском, так и английском языке
* Полноценый **респонсив** для всех популярных разрешений экрана
* Бургерное меню для мобильной и планшетной версии
* Реализовано закрытие попапа и бургерного меню по **оверлею** или по клавише **Esc**
* Переход к показу трейлера фильма при нажатии на постер
* Показ данных о фильме при наведении курсора на постер
* Приложение свёрстано по **BEM(БЭМ)**, соблюдается **семантичность**
* На странице поиска фильмов по клику на кнопку **"Ещё"** - показываются дополнительные фильмы (на роуте с сохранёнными фильмами показываются сразу **все** фильмы)
* Возможность редактирования своего профиля (почты и имени)
* Запоминание **состояния** входа пользователя (при обновлении страницы будет выполнен автоматический вход)
* Для создания сеток используется **flex** и **grid**
* Все данные хранятся на сервере, использовано сторонее и собственное API

---
## *Используемые технологии:*

* React 17
* JS
* HTML 5
* CSS 3
---

## *Запуск проекта:*
`npm i` — установка зависимостей

`npm run start` — запускает приложение

