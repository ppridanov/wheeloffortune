let wheel, logo, ligth, timeline, myReq, isStopped = false, result, resRotate, currPosition; //Объявил вспомогательные переменные.
let wheelTexture = new PIXI.Texture.fromImage("../wheel/wheel.png", undefined, undefined, 1.0);
const angle = 2 * Math.PI / 12; //Делим 360 на секции по 12 шт
PIXI.utils.skipHello(); //Убираем с консоли всякую дичь.
let Application = PIXI.Application, // Создаем приложение
    Container = PIXI.Container, //Создаем контейнер
    loader = PIXI.loader, //Создаем загрузчик
    resources = PIXI.loader.resources, //Подключение ресурсов
    Sprite = PIXI.Sprite; //Для создания спрайтов
let app = new Application({ //Создаем переменную всей игры.
    width: 800, //ширина поля.
    height: 800, //высота поля.
    antialias: true, //Сглаживание шрифтов и картинок.
    transparent: true, //прозрачность фона. Если тру то прозрачный.
    resolution: 0.5 //Разрешение. Надо разобраться как оно работает.
});

document.body.appendChild(app.view); //Добавляем канвас элемент на страницу
const test = {
    winSector: 9,
    winHeader: 'TEST',
    winText: 'TEST TEST TEST'
}

const test1 = {
    wheetInterval: 3
}
function initWheel() {
    setup();
    isStopped = false; //Сбрасываем чтобы крутилось.
}

//This `setup` function will run when the image has loaded
function setup() { //Функция установки... Я так думаю для sprites.
    if (wheelInterval != 0) {
        return
    }
    wheel = new PIXI.Sprite(wheelTexture);
    wheel.anchor.set(0.5);
    wheel.x = (app._options.width / 2)
    wheel.rotation = Math.random() * (Math.PI * 2); //Каждый раз рандом колеса.
    wheel.y = (app._options.height / 2)
    timeline = {
        rotate: 0.5 //Задаем rotate;
    };
    app.stage.addChild(wheel);
    app.render();
    start();
}

function start() {
    myReq = requestAnimationFrame(start); // Перезапускаем анимацию
    if (!isStopped) {
        wheel.rotation += 0.32; //Здесь задаем скорость
        speedLimit(); //Ограничение по увеличении wheel.rotate;
    }
}

function update() { //Для остановки там где надо.
    wheel.rotation = timeline.rotate;
    speedLimit();
}

function speedLimit() { //Если не поставим то значение станет больше чем 360 градусов или 6.4 радианта!
    while (wheel.rotation > 2 * Math.PI) { //Когда значение больше уменьшаем до нормального.
        wheel.rotation -= 2 * Math.PI;
    }
}

function stop() {
    resRotate = 8 * angle;
    resRotate += (0.6 * Math.random() - 0.3) * angle;
    resRotate += 8 * Math.PI;
    anime({
        targets: wheel,
        rotation: resRotate,
        duration: 3000,
        easing: 'easeOutQuad',
        complete: () => {
            isStopped = true;
            cancelAnimationFrame(myReq);
        }
    })

    console.log(wheel.rotation)
}
initWheel();

setTimeout(() => {
    stop();
}, 3000);