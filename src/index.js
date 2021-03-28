import "./style.css";

class Wheel {
    constructor() {
        this.isStarted = false;
        this.wheel = document.querySelector('.wheel-img');
        this.button = document.querySelector('.btn');
        this.animate, this.result = 0;
        this.speed = 0;
        this.degrees = 0;
        this.angle = 2 * Math.PI / 12;
        this.button.addEventListener('click', (e) => {
            this.initWheel();
            setTimeout(() => {
                this.stop()
            }, 3000)
        })
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    getResultAngle() {
        this.result = this.getRandomNumber(0, 11) * this.angle;
        console.log(this.result)
        this.result += 6 * Math.PI;
        this.result = (180 / Math.PI) * this.result;
        return this.result;
    }
    initWheel() {
        this.speed = 20;
        this.isStarted = true;
        this.button.setAttribute('disabled', true);
        this.button.classList.add('btn-disabled');
        this.loop();
    }
    loop() {
        this.animate = requestAnimationFrame(this.loop.bind(this));
        if (this.isStarted) {
            this.wheel.style.transform = `rotate(${this.degrees}deg)`;
            this.degrees += this.speed;
            while (this.degrees > 360) {
                this.degrees = 0;
            }
        }
    }
    stop() {
        TweenMax.set(this.wheel, { rotation: this.degrees });
        TweenLite.to(this.wheel, 2, {
            rotation: this.getResultAngle(),
            onComplete: () => {
                cancelAnimationFrame(this.animate);
                this.button.removeAttribute('disabled');
                this.button.classList.remove('btn-disabled');
            }
        });
    }
}

const wheel = new Wheel();