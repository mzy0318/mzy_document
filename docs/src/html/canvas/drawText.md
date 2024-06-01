---
title: 绘制文本
---

# 绘制文本

## 绘制文本

### fillText
指定的坐标上绘制文本字符串，并使用当前的`fillStyle`对其进行填充。

#### 语法

```javascript
fillText(text, x, y, [, maxWidth])
```
#### 参数
- `text`：要作为渲染上下文的文本字符串。使用当前的`font`、`textAlign`、`textBaseline`和`direction`设置值对文本进行渲染。
- `x`：开始绘制文本的点的`X`轴坐标，单位为像素。
- `y`：开始绘制文本的基线的`Y`轴坐标，单位为像素。
- `maxWidth(可选)`：文本渲染后的最大像素宽度。如果未指定，则文本宽度没有限制。但是，如果提供了该值，浏览器将调整字距，选择水平方向更紧凑的字体（如果有这种字体或可以在不降低质量的情况下生成这种字体），或缩小字体大小，以便在指定宽度内容纳文本。


#### 示例
```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.fillText("Hello world", 50, 90);
```

### strokeText
指定的坐标上绘制文本字符串，并使用当前的`strokeStyle`对其进行填充。

#### 语法

```javascript
strokeText(text, x, y, [, maxWidth])
```
#### 参数
- `text`：要作为渲染上下文的文本字符串。使用当前的`font`、`textAlign`、`textBaseline`和`direction`设置值对文本进行渲染。
- `x`：开始绘制文本的点的`X`轴坐标，单位为像素。
- `y`：开始绘制文本的基线的`Y`轴坐标，单位为像素。
- `maxWidth(可选)`：文本渲染后的最大像素宽度。如果未指定，则文本宽度没有限制。但是，如果提供了该值，浏览器将调整字距，选择水平方向更紧凑的字体（如果有这种字体或可以在不降低质量的情况下生成这种字体），或缩小字体大小，以便在指定宽度内容纳文本。


#### 示例
```javascript
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeText("Hello world", 50, 90);
```

::: tip
绘制文本直接绘制到画布上，而不会修改当前路径，因此任何后续的`fill()`或`stroke()`调用都不会对其产生影响。
:::

## 字体样式
有更多的属性可以改变`canvas`显示文本的方式

### font
当前字体样式属性

#### 语法
```javascript
ctx.font = value;
```

#### 值
`value`：符合`CSS font`语法的`DOMString字符串`。默认字体是`10px sans-serif`。

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "bold 48px serif";
ctx.strokeText("Hello world", 50, 100);
```

::: warning 提示
必须设置字体，如果只设置字体大小是不会生效。  
`ctx.font = "48px"`没有任何效果
:::

### textAlign
`textAlign`是描述绘制文本时，文本的对齐方式的属性。  
该对齐是基于`CanvasRenderingContext2D.fillText/strokeText`方法的`x`的值。

::: info 提示
`textAlign="center"`比较特殊。`textAlign`的值为`center`时候文本的居中是基于`fillText`的时候所给的`x`的值，也就是说文本一半在`x`的左边，一半在`x`的右边（可以理解为计算`x`的位置时从默认文字的左端，改为文字的中心，因此你只需要考虑`x`的位置即可）。所以，如果你想让文本在整个`canvas`居中，就需要将`fillText`的`x`值设置成`canvas`的宽度的一半。
:::

#### 语法
```javascript
ctx.textAlign = "left" || "right" || "center" || "start" || "end";
```

#### 值
- `left`：文本左对齐。
- `right`：文本右对齐。
- `center`：文本居中对齐。
- `start`：文本对齐界线开始的地方（左对齐指本地从左向右，右对齐指本地从右向左）。
- `end`：文本对齐界线结束的地方（左对齐指本地从左向右，右对齐指本地从右向左）。

默认值是：`start`

::: info 提示
`direction`属性会对此属性产生影响。如果`direction`属性设置为`ltr`，则`left`和`start`的效果相同，`right`和`end`的效果相同；如果`direction`属性设置为`rtl`，则 `left`和`end`的效果相同，`right`和`start`的效果相同。
:::

#### 示例
```javascript
const canvas = document.getElementById("canvas");
canvas.width = 350;
const ctx = canvas.getContext("2d");
const x = canvas.width / 2;  // canvas宽度的一半

ctx.beginPath();
ctx.moveTo(x, 0);
ctx.lineTo(x, canvas.height);
ctx.stroke();

ctx.font = "30px serif";

ctx.textAlign = "left";
ctx.fillText("left-aligned", x, 40);

ctx.textAlign = "center";
ctx.fillText("center-aligned", x, 85);

ctx.textAlign = "right";
ctx.fillText("right-aligned", x, 130);
```

### baseBaseLine
`textBaseline`是描述文本基线的属性。  
决定文字垂直方向的对齐方式。  

#### 语法
```javascript
ctx.textBaseline = "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
```

#### 值
- `top`：文本基线在文本块的顶部。
- `hanging`：文本基线是悬挂基线。
- `middle`文本基线在文本块的中间。
- `alphabetic`：文本基线是标准的字母基线。
- `ideographic`：文字基线是表意字基线；如果字符本身超出了`alphabetic`基线，那么`ideograhpic`基线位置在字符本身的底部。
- `bottom`：文本基线在文本块的底部。与`ideographic`基线的区别在于`ideographic`基线不需要考虑下行字母。

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const baselines = [
    "top",
    "hanging",
    "middle",
    "alphabetic",
    "ideographic",
    "bottom"
];
ctx.font = "36px serif";
ctx.strokeStyle = "red";

baselines.forEach((baseline, index) => {
    ctx.textBaseline = baseline;
    const y = 75 + index * 75;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(550, y + 0.5);
    ctx.stroke();
    ctx.fillText(`Abcdefghijklmnop (${baseline})`, 0, y);
});
```
![canvas-miterLimit](/images/html/canvas_font_baseline.png)

### direction
`direction`是描述当前文本方向的属性。

#### 语法
```javascript
ctx.direction = "ltr" || "rtl" || "inherit";
```

#### 值
- `ltr`：文本方向从左向右。
- `rtl`：文本方向从右向左。
- `inherit`：根据情况继承`<canvas>`元素或者`Document`。
默认值是 inherit。

#### 示例
```javascript
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";
ctx.fillText("Hi!", 150, 50);
ctx.direction = "rtl";
ctx.fillText("Hi!", 150, 130);
```

## 预测文本宽度 measureText()
`measureText()`方法返回一个关于被测量文本`TextMetrics`对象包含的信息;

#### 语法
```javascript
ctx.measureText(text);
```
#### 参数
- `text`：需要测量的`String`。

#### 示例
```javascript
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var text = ctx.measureText("foo"); // TextMetrics object
text.width; // 16;

```