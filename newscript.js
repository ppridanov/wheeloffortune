let wheel = document.querySelector('.wheel-img');
let button = document.querySelector('.btn');
let animate;
let speed = 15;
let degrees = 0;
const angle = 2 * Math.PI / 12; //Делим 360 на секции по 12 шт

function start() {
    degrees = 0;
    loop();
}

function loop() {
    animate = requestAnimationFrame(loop);
    wheel.style.transform = `rotate(${degrees}deg)`;
    degrees += speed;
    while (degrees > 360) {
        degrees = 0;
    }

}

let result = 11;
let resRotate = result * angle;

function stop() {

    resRotate += 4 * Math.PI; //Ускорение
    resRotate = (180 / Math.PI) * resRotate; //Магия превращения в градусы.
    console.log(resRotate)
    TweenLite.to(wheel, 2, { rotation: resRotate, onComplete: () => { cancelAnimationFrame(animate) } });
}



button.addEventListener('click', (e) => {
    start();
    setTimeout(() => {
        stop();
    }, 3000)
})