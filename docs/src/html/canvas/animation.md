---
title: 动画
---

# 动画

## 动画的基本步骤
1. `清空canvas`：除非接下来要画的内容会完全充满canvas(例如背景图)，否则你需要清空所有。最简单的做法就是用`clearRect()`方法。
2. `保存canvas状态`：如果你要改变一些会改变`canvas状态`的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。
3. 绘制动画图形（animated shapes）：这一步才是重绘动画帧。
4. `恢复canvas状态`：如果已经保存了canvas的状态，可以先恢复它，然后重绘下一帧。

## 操控动画
为了实现动画，需要一些可以定时执行重绘的方法。  
通常使用以下3种方式来实现：
1. `setInterval(function, delay)`：当设定好间隔时间后，function 会定期执行。
2. `setTimeout(function, delay)`：在设定好的时间之后执行函数
3. `requestAnimationFrame(callback)`：告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: "blue",
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mouseover", (e) => {
    raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
    window.cancelAnimationFrame(raf);
});

ball.draw();
```