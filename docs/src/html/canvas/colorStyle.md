# 样式和颜色

## 色彩

`ctx.fillStyle = color`：设置图形的填充颜色。  

`ctx.strokeStyle = color`：设置图形轮廓的颜色。

::: tip 备注
一旦你设置了`strokeStyle`或者`fillStyle`的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置`fillStyle`或 `strokeStyle`的值。  
可以通过`ctx.save()`与`ctx.restore()`这两个方法来实现为**不同的图形上不同的颜色**
:::

```java
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = "#0ff";
    ctx.moveTo(75, 75);
    ctx.lineTo(200, 200);
    ctx.stroke();
    ctx.save();
    // 这里为strokeStyle设置不同的颜色
    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(100, 300);
    ctx.stroke();
    ctx.restore();
```

## 透明度

`ctx.globalAlpha = transparencyValue`：设置`canvas`里所有图形的透明度，有效的值范围是 `0.0`(完全透明)到`1.0()`，默认是`1.0`  

`globalAlpha`属性在需要绘制大量拥有**相同透明度的图形**时候相当高效。

```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.globalAlpha = .1;
```

### 为不同的图形设置不用透明度
1. 为`fillStyle`或`strokeStyle`使用`rgba()`设置颜色及透明度
2. 通过`save()`与`restore()`方法，使用`globalAlpha`为不同的图形设置不同的颜色

```javascript
// 通过设置rgba实现
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.strokeStyle = "rgba(0, 255, 255, .2)";
ctx.moveTo(75, 75);
ctx.lineTo(200, 200);
ctx.stroke();
ctx.save();
ctx.strokeStyle = "rgba(255, 0, 0, .9)";
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(100, 300);
ctx.stroke();
ctx.restore();
// 通过globalAlpha 与 save()及restore()实现
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.globalAlpha = .2;
ctx.beginPath();
ctx.strokeStyle = "#0ff";
ctx.moveTo(75, 75);
ctx.lineTo(200, 200);
ctx.stroke();
ctx.save();
ctx.globalAlpha = .9;
ctx.strokeStyle = "#f00";
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(100, 300);
ctx.stroke();
ctx.restore();
```

## 线型
可以通过一系列属性来设置线的样式。

### lineWidth
`lineWidth = value`：设置线条宽度。  

这个属性设置当前绘线的粗细。属性值必须为正数。默认值是 1.0。  

线宽是指给定`路径`的中心到两边的粗细。

```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.lineWidth = 4.5;
ctx.beginPath();
ctx.moveTo(75, 75);
ctx.lineTo(200, 75);
ctx.stroke();
```

::: warning 注意
画布的坐标并不和像素直接对应
:::

#### 线条描绘原理
一条从(3,1)到(3,5)路径，路径实际是落在`Y轴的轴线`上，因此实际的填充区域仅仅延伸至路径两旁各一半像素。而这半个像素又会以近似的方式进行渲染，这意味着那些像素只是部分着色，结果就是以实际笔触颜色一半色调的颜色来填充整个区域(见代码及下图)。

```javascript
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 75.5);
    ctx.lineTo(200, 75.5);
    ctx.stroke();

    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(75, 100);
    ctx.lineTo(200, 100);
    ctx.stroke();
```

因此这也是1.0线宽并不准确的原因。

### lineCap
`lineCap = type`：设置线条末端样式。  
`lineCap`的值决定了线段端点显示的样子。  
有下面三个值：
1. `butt`(默认值)：最原始的展示方式。
2. `round`：端点处加上了半径为一半线宽的半圆。
3. `square`：端点处加上了等宽且高度为一半线宽的方块。

下图从左到右依次是 `butt`、`round`、`square`

![canvas-miterLimit](/images/html/canvas_linecap.png)

```javascript
ctx.strokeStyle = "#09f";
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(140, 10);
ctx.moveTo(10, 140);
ctx.lineTo(140, 140);
ctx.stroke();

// Draw lines
ctx.strokeStyle = "black";
["butt", "round", "square"].forEach((lineCap, i) => {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
});
```

### lineJoin
`lineJoin = type`：设定线条与线条间接合处的样式。
`lineJoin`的属性值决定了图形中两线段连接处所显示的样子。
有下面三个值：
1. `round`：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
2. `bevel`：在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
3. `miter`(默认值)：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。延伸效果受`miterLimit`属性的制约。

::: tip 提示
`miter`  
线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。
:::

### miterLimit
`miterLimit = value`：限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。默认值是10.0。如果是负数，`0`，`NaN`，或者`Infinity`都会忽略。

`miterLimit`属性就是来限制lineJoin的值为`miter`时的展示效果。  

`miterLimit`属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了 `bevel`。
::: tip 交点距离  
延伸线条外边缘，使其相交于一点，这个点到内边缘相交的点的距离
:::

用下面的图来说明`miterLimit`

![canvas-miterLimit](/images/html/canvas_miterlimit.webp)


### setLineDash(segments)
`setLineDash(segments)`：设置当前虚线样式。

#### 语法
```javascript
ctx.setLineDash(segments);
```
#### 参数  

`segments`  
一个数组，一组描述交替绘制线段和间距（坐标空间单位）长度的数字。如果数组元素是奇数，数组的元素会被`复制`并`重复`。  

#### 返回值  

`undefined`
 
#### 示例
```javascript
function drawDashedLine(pattern) {
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(0, y);
    ctx.lineTo(300, y);
    ctx.stroke();
    y += 20;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let y = 15;

drawDashedLine([]);
drawDashedLine([1, 1]);
drawDashedLine([10, 10]);
drawDashedLine([20, 5]);
drawDashedLine([15, 3, 3, 3]);
drawDashedLine([20, 3, 3, 3, 3, 3, 3, 3]);
drawDashedLine([12, 3, 3]); // Equals [12, 3, 3, 12, 3, 3]
```
![canvas-miterLimit](/images/html/canvas_linedash.png)
### lineDashOffset
`lineDashOffset = value`：设置虚线样式的起始偏移量。

#### 语法
```javascript
ctx.lineDashOffset = value;
```

#### 值
`value`：偏移量是 float 精度的数字。初始值为 0.0。

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.setLineDash([4, 16]);

// Dashed line with no offset
ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(300, 50);
ctx.stroke();

// Dashed line with offset of 4
ctx.beginPath();
ctx.strokeStyle = "red";
ctx.lineDashOffset = 4;
ctx.moveTo(0, 100);
ctx.lineTo(300, 100);
ctx.stroke();
```
![canvas-miterLimit](/images/html/canvas_linedashoffset.png)

### getLineDash()
`getLineDash()`：返回一个包含当前虚线样式，长度为非负偶数的数组。

## 渐变
通过下面两个方法生成`canvasGradient`对象，并且赋给图形的`fillStyle`或`strokeStyle`属性。

### createLineGradient
该方法返回一个线性`CanvasGradient`对象。想要应用这个渐变，需要把这个返回值赋值给`fillStyle`或者`strokeStyle`。

#### 语法
```javascript
ctx.createLinearGradient(x1, y1, x2, y2);
```
#### 参数
- `x1`：起点的x轴坐标
- `y1`：起点的y轴坐标
- `x2`：终点的x轴坐标
- `y2`：终点的y轴坐标

#### 返回值
`canvasGradient`

#### 示例
```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ctxGradient = ctx.createLinearGradient(20, 0, 220, 0);
ctxGradient.addColorStop(0, 'red');
ctxGradient.addColorStop(.5, 'blue');
ctxGradient.addColorStop(1, 'yellow');
ctx.fillStyle = ctxGradient;
ctx.fillRect(20, 20, 200, 100);
```

### createRadialGradient
根据参数确定两个圆的坐标，绘制放射性渐变的方法。这个方法返回`CanvasGradient`。

#### 语法
```javascript
ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
```
#### 参数
- `x1`：开始圆形的x轴坐标
- `y1`：开始圆形的y轴坐标
- `r1`：开始圆形的半径
- `x2`：结束圆形的x轴坐标
- `y2`：结束圆形的y轴坐标
- `r1`：结束圆形的半径

#### 返回值
`canvasGradient`

#### 示例
```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ctxGradient = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
ctxGradient.addColorStop(0, 'red');
ctxGradient.addColorStop(.5, 'blue');
ctxGradient.addColorStop(1, 'yellow');
ctx.fillStyle = ctxGradient;
ctx.fillRect(0, 0, 200, 200);
```

### canvasGradient.addColorStop
添加一个由`偏移值`和`颜色值`指定的断点到渐变。

#### 语法
```javascript
void canvasGradient.addColorStop(offset, color);
```

#### 参数
- `offset`：`0`到`1`之间的值，超出范围将抛出`INDEX_SIZE_ERR`错误
- `color`：`CSS颜色值`。如果颜色值不能被解析为有效的`CSS颜色值`，将抛出`SYNTAX_ERR`错误。

#### 示例
```javascript
var gradient = ctx.createLinearGradient(0,0,200,0);
gradient.addColorStop(0,"green");
gradient.addColorStop(1,"white");
ctx.fillStyle = gradient;
ctx.fillRect(10,10,200,100);
```

## 图案样式

#### 语法
```javascript
CanvasPattern ctx.createPattern(image, repetition);
```
#### 参数
- `image`：作为重复图像源的`CanvasImageSource`对象。可以是下列之一
    1. `HTMLImageElement`（`<img>`）,或者通过`new Image()`生成
    2. `HTMLVideoElement`（`<video>`）
    3. `HTMLCanvasElement`（`<canvas>`）
    4. `CanvasRenderingContext2D`
    5. `ImageBitmap`
    6. `ImageData`
    7. `Blob`
    
- `repetition`：指定图像如何重复，允许值有
    1. `repeat`
    2. `repeat-x`
    3. `repeat-y`
    4. `no-repeat`

::: tip 注意
如果`repetition`的值为空字符串（`""`）或`null`（但不是`undefined`）,`repeatition`将被当作`repeat`
:::

#### 示例
创建出一个`pattern`之后，赋给`fillStyle`或`strokeStyle`属性即可。

```javascript
var ctx = document.getElementById("canvas").getContext("2d");

// 创建新 image 对象，用作图案
var img = new Image();
img.src = "canvas_createpattern.png";
img.onload = function () {
// 创建图案
var ptrn = ctx.createPattern(img, "repeat");
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);
};
```

## 阴影

### shadowOffsetX 与 shadowOffsetY
`shadowOffsetX`和`shadowOffsetY`用来设定阴影在`X`和`Y`轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为`0`。`Infinity`或者`NaN`都会被忽略。

### shadowBlur
用于设定阴影的模糊程度，`float`类型的值，其数值并不跟像素数量挂钩，也不受变换矩阵的影响。默认值是0。`负数`、`Infinity`或者`NaN`都会被忽略。

### shadowColor
`shadowColor`是标准的`CSS`颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

#### 示例
```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 25;
ctx.shadowColor = "rgba(255, 0, 0, 1)";
ctx.fillStyle = "#0ff"
ctx.fillRect(100, 100, 50, 50);
```

## 填充规则
当我们用到`fill（或者 clip和isPointinPath ）`你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。

两个值
- `nonzero`
- `evenodd`

```javascript
var ctx = document.getElementById("canvas").getContext("2d");
ctx.beginPath();
ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
ctx.fill("evenodd");
```