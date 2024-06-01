# 绘制

## 矩形
`canvas`提供三种绘制矩形的方法
1. `fillRect(x, y, width, height)`：绘制一个填充的矩形，默认颜色为黑色
2. `strokeRect(x, y, width, height)`：绘制一个矩形边框，默认颜色为黑色
3. `clearRect(x, y, width, height)`：清除指定矩形区域，让清除部分完全透明

:::tip 提示
x 与 y 指定了在 canvas 画布上所绘制的矩形的左上角（相对于原点）的坐标。width 和 height 设置矩形的尺寸。
:::

### 例子
```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.fillRect(0,0, 100, 100);
ctx.strokeRect(0, 150, 100, 100);
ctx.clearRect(25, 25, 50, 50);
```

## 绘制线段路径
图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。  

### 绘制路径用到的方法
1. `beginPath()`：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
2. `moveTo(x, y)`：将笔触移动到指定的坐标(x, y)上。当`canvas`初始化或者`beginPath()`调用后，通常会使用`moveTo()`函数设置起点。
3. `lineTo(x, y)`：绘制一条从当前位置到指定坐标(x, y)的直线
4. `closePath()`：闭合路径之后图形绘制命令又重新指向到上下文
5. `stroke()`：通过线条来绘制图形轮廓。默认颜色为黑色
6. `fill()`：通过填充路径内容区域生成实心图形。默认颜色为黑色

:::tip 备注
调用`fill()`函数时，所有没有闭合的形状都会自动闭合，所以不需要调用`closePath()`函数。但是调用`stroke()`时不会自动闭合。
:::

### 例子
```javascript
// 填充
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 200);
ctx.lineTo(300, 200);
ctx.fill();

// 图形轮廓
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 200);
ctx.lineTo(300, 200);
ctx.stroke();
ctx.closePath();
```

## 绘制圆弧路径
绘制圆弧或圆，通常使用`arc()`方法.也可以使用`arcTo()`,不过这个实现并不那么可靠
1. `arc(x, y, radius, startAngle, endAngle, anticlockwise)`：画一个以`(x, y)`为圆心的以`radius`为半径的圆弧(圆),从`startAngle`开始到`endAngle`结束，按照`anticlockwise`给定的方向（默认为顺时针）来生成。
2. `arcTo(x1, y1, x2, y2, radius)`：根据给定的控制点和半径画一段圆弧，再以直线连接两个点。

:::tip 备注
`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式：`弧度 = (Math.PI/180)*角度`;
:::

### 例子
```javascript
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            ctx.beginPath();
            var x = 25 + j * 50; // x 坐标值
            var y = 25 + i * 50; // y 坐标值
            var radius = 20; // 圆弧半径
            var startAngle = 0; // 开始点
            var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
            var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针
            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            if (i > 1) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
    }
```

## 贝塞尔曲线
一般用来绘制**复杂**有**规律**的图形。

1. `quadraticCurveTo(cp1x, cp1y, x, y)`：绘制二次贝塞尔曲线，`cp1x, cp1y`为一个控制点，`x, y`为结束点。
2. `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：绘制三次贝塞尔曲线，`cp1x, cp1y`为控制点一，`cp2x, cp2y`为控制点二，`x, y`为结束点。

::: tip 提示
参数`x、y`在这两个方法中都是结束点坐标。`cp1x, cp1y`为坐标中的第一个控制点，`cp2x, cp2y`为坐标中的第二个控制点。
:::

### 二次贝塞尔曲线

```javascript
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
```



### 三次贝塞尔曲线

```javascript
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
```

## 绘制矩形

`rect(x, y, width, height)`：绘制一个左上角坐标为`(x, y)`，宽为`width`,高为`height`的矩形。

::: tip 提示
当该方法执行的时候，`moveTo()`方法自动设置坐标参数`(0, 0)`。也就是说，当前**笔触自动重置回默认坐标**。
:::

```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

// fill风格矩形
ctx.rect(20, 20, 100, 50);
ctx.fill();

// stroke风格矩形
ctx.rect(20, 20, 100, 50);
ctx.stroke();
```