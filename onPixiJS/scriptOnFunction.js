let wheel = document.querySelector('.wheel-img');
let button = document.querySelector('.btn');
let animate, result;
let speed = 20;
let degrees = 0;
const angle = 2 * Math.PI / 12; //Делим 360 на секции по 12 шт
wheel.style.transform = `rotate(${Math.random() * 360}deg)`

function start() {
    result = getRandomNumber(0, 11);
    console.log(result);
    button.setAttribute('disabled', true);
    button.classList.add('btn-disabled');
    loop();
}

function loop() {
    animate = requestAnimationFrame(loop);
    wheel.style.transform = `rotate(${degrees}deg)`;
    degrees += speed;
    speedLimit();
}

function speedLimit() {
    while (degrees > 360) {
        degrees = 0;
    }
}

function getResultAngle(value) {
    let result = value * angle;
    result += 6 * Math.PI;
    result = (180 / Math.PI) * result;
    return result;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function stop() {
    TweenMax.set(wheel, { rotation: degrees });
    TweenLite.to(wheel, 2, {
        rotation: getResultAngle(result),
        onComplete: () => {
            cancelAnimationFrame(animate);
            button.removeAttribute('disabled');
            button.classList.remove('btn-disabled');
        }
    });
    // anime({
    //     targets: wheel,
    //     rotate: getResultAngle(result),
    //     duration: 3000,
    //     easing: 'easeOutQuad',
    //     complete: () => {
    //         cancelAnimationFrame(animate);
    //         button.removeAttribute('disabled');
    //         button.classList.remove('btn-disabled');
    //     }
    // })
}



button.addEventListener('click', (e) => {
    start();
    setTimeout(() => {
        stop();
    }, 3000)
})