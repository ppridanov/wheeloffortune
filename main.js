(()=>{"use strict";function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}new(function(){function e(){var t=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.isStarted=!1,this.wheel=document.querySelector(".wheel-img"),this.button=document.querySelector(".btn"),this.animate,this.result=0,this.speed=0,this.degrees=0,this.angle=2*Math.PI/12,this.button.addEventListener("click",(function(e){t.initWheel(),setTimeout((function(){t.stop()}),3e3)}))}var i,s;return i=e,(s=[{key:"getRandomNumber",value:function(t,e){return Math.floor(Math.random()*(e-t+1)+t)}},{key:"getResultAngle",value:function(){return this.result=this.getRandomNumber(0,11)*this.angle,console.log(this.result),this.result+=6*Math.PI,this.result=180/Math.PI*this.result,this.result}},{key:"initWheel",value:function(){this.speed=20,this.isStarted=!0,this.button.setAttribute("disabled",!0),this.button.classList.add("btn-disabled"),this.loop()}},{key:"loop",value:function(){if(this.animate=requestAnimationFrame(this.loop.bind(this)),this.isStarted)for(this.wheel.style.transform="rotate(".concat(this.degrees,"deg)"),this.degrees+=this.speed;this.degrees>360;)this.degrees=0}},{key:"stop",value:function(){var t=this;TweenMax.set(this.wheel,{rotation:this.degrees}),TweenLite.to(this.wheel,2,{rotation:this.getResultAngle(),onComplete:function(){cancelAnimationFrame(t.animate),t.button.removeAttribute("disabled"),t.button.classList.remove("btn-disabled")}})}}])&&t(i.prototype,s),e}())})();