import "./style.css";
import { gsap, TweenLite, TweenMax } from 'gsap';
import html2canvas from 'html2canvas';
import $ from 'jquery';
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
                html2canvas(document.querySelector('.wheel'), {
                    useCORS: true
                }).then((canvas) => {
                    var image = canvas.toDataURL("image/png");
                    console.log(image);
                    image = image.replace('data:image/png;base64,', '');
                    var param = { imageData: image };
                    console.log(param);
                    // $.ajax({
                    //     url: "https://api.imageban.ru/v1",
                    //     data: JSON.stringify(param),
                    //     dataType: "json",
                    //     type: "POST",
                    //     contentType: "application/json; charset=utf-8",
                    //     // beforeSend: function (xhr) {
                    //     //     xhr.setRequestHeader("Authorization", "TOKEN_xweGJ6REMINBHSntqu8u");
                    //     // },
                    //     success: function (data) {
                    //         alert('Image saved successfully !');
                    //     },
                    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //         var err = eval("(" + XMLHttpRequest.responseText + ")");
                    //     }
                    // });
                });

            }
        });
    }
}

const wheel = new Wheel();