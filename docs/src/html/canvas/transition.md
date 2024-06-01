---
title: 变形
---

# 变形

## 状态的保存与恢复

### save
`save()`是将当前状态放入栈中，保存`canvas`全部状态的方法。

#### 语法
```javascript
void ctx.save();
```

保存到栈中的绘制状态有下面部分组成：
- 当前的变换矩阵。
- 当前的剪切区域。
- 当前的虚线列表。
- 以下属性当前的值：`strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `lineDashOffset`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation`, `font`, `textAlign`, `textBaseline`, `direction`, `imageSmoothingEnabled`.


### restore
`restore()`通过在绘图状态栈中弹出顶端的状态，将`canvas`恢复到`最近的保存状态`的方法。如果没有保存状态，此方法不做任何改变。

#### save()与restore()的示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Save the current state
ctx.save();

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// Restore to the state saved by the most recent call to save()
ctx.restore();

ctx.fillRect(150, 40, 100, 100);
```

## 移动
`translate()`方法用来移动`canvas`和它的原点到一个不同的位置。

#### 语法
```javascript
ctx.translate(x, y);
```

#### 参数
- `x`： 左右偏移量
- `y`： 上下偏移量

#### 示例
```javascript
function draw() {
    var ctx = document.getElementById("canvas").getContext("2d");
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            ctx.save();
            ctx.fillStyle = "rgb(" + 51 * i + ", " + (255 - 51 * i) + ", 255)";
            ctx.translate(10 + j * 50, 10 + i * 50);
            ctx.fillRect(0, 0, 25, 25);
            ctx.restore();
        }
    }
}
```

## 旋转
`rotate()`方法，用于以原点为中心旋转`canvas`。

#### 语法
```javascript
rotate(angle);
```
::: tip 提示
旋转的中心点始终是`canvas`的原点，如果要改变它，我们需要用到`translate`方法。
:::


#### 参数
- `angle`：旋转的角度 (angle)，它是`顺时针方向`的，以`弧度`为单位的值。

#### 示例
```javascript
ctx.save();
// blue rect
ctx.fillStyle = "#0095DD";
ctx.fillRect(30, 30, 100, 100);
ctx.rotate((Math.PI / 180) * 25);
// grey rect
ctx.fillStyle = "#4D4E53";
ctx.fillRect(30, 30, 100, 100);
ctx.restore();

// right rectangles, rotate from rectangle center
// draw blue rect
ctx.fillStyle = "#0095DD";
ctx.fillRect(150, 30, 100, 100);

ctx.translate(200, 80); // translate to rectangle center
// x = x + 0.5 * width
// y = y + 0.5 * height
ctx.rotate((Math.PI / 180) * 25); // rotate
ctx.translate(-200, -80); // translate back

// draw grey rect
ctx.fillStyle = "#4D4E53";
ctx.fillRect(150, 30, 100, 100);
```

## 缩放
用它来增减图形在`canvas`中的像素数目，对形状，位图进行缩小或者放大。

#### 语法
```javascript
scale(x, y);
```

#### 参数
- `x`：水平缩放因子
- `y`：垂直缩放因子
`x`与`y`默认值是1，比1小会缩小图形，比1大会放大图形。如果是负数，相当于以x或y轴作为对称镜像反转。

#### 示例
```javascript
var ctx = document.getElementById("canvas").getContext("2d");
// draw a simple rectangle, but scale it.
ctx.save();
ctx.scale(10, 3);
ctx.fillRect(1, 10, 10, 10);
ctx.restore();

// mirror horizontally
ctx.scale(-1, 1);
ctx.font = "48px serif";
ctx.fillText("MDN", -135, 120);
```

## 变形
`transform()`方法允许对变形矩阵直接修改。

#### 语法
```javascript
void ctx.transform(a, b, c, d, e, f);
```

#### 参数
- `a(m11)`：水平缩放。
- `b(m12)`：垂直倾斜。
- `c(m21)`：水平倾斜。
- `d(m22)`：垂直缩放。
- `e(dx)`：水平移动。
- `f(dy)`：垂直移动。

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.transform(1, 0.2, 0.8, 1, 0, 0);
ctx.fillRect(0, 0, 100, 100);
```

### setTransform(a, b, c, d, e, f)
这个方法会将当前的变形矩阵重置为单位矩阵，然后用相同的参数调用`transform`方法。  
如果任意一个参数是无限大，那么变形矩阵也必须被标记为无限大，否则会抛出异常。从根本上来说，该方法是取消了当前变形，然后设置为指定的变形，一步完成。

### resetTransform()
重置当前变形为单位矩阵，它和调用以下语句是一样的：`ctx.setTransform(1, 0, 0, 1, 0, 0)`;

#### 示例
```js
var ctx = document.getElementById("canvas").getContext("2d");

var sin = Math.sin(Math.PI / 6);
var cos = Math.cos(Math.PI / 6);
ctx.translate(100, 100);
var c = 0;
for (var i = 0; i <= 12; i++) {
    c = Math.floor((255 / 12) * i);
    ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
    ctx.fillRect(0, 0, 100, 10);
    ctx.transform(cos, sin, -sin, cos, 0, 0);
}

ctx.setTransform(-1, 0, 0, 1, 100, 100);
ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
ctx.fillRect(0, 50, 100, 100);
```