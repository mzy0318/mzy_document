---
title: 组合与裁切
---

# 组合与裁切

## 组合
`globalCompositeOperation`属性设置要在绘制新形状时应用的合成操作的类型。

#### 语法
```javascript
globalCompositeOperation = type;
```

#### 选项
`type`：可以是以下12个值
- `source-over`：这是默认设置，并在现有画布上绘制新图形。
- `source-in`：仅在新形状和目标画布重叠的地方绘制新形状。其他的都是透明的。
- `source-out`：在不与现有画布内容重叠的地方绘制新图形。
- `source-atop`：只在与现有画布内容重叠的地方绘制新图形。
- `destination-over`：在现有画布内容的后面绘制新的图形。
- `destination-in`：仅保留现有画布内容和新形状重叠的部分。其他的都是透明的。
- `destination-out`：仅保留现有画布内容和新形状不重叠的部分。
- `destination-atop`：仅保留现有画布内容和新形状重叠的部分。新形状是在现有画布内容的后面绘制的。
- `lighter`：两个重叠图形的颜色是通过颜色值相加来确定的。
- `copy`：只显示新图形。
- `xor`：形状在重叠处变为透明，并在其他地方正常绘制。
- `multiply`：将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。

#### 简单示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.globalCompositeOperation = "xor";

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
```
![canvas-miterLimit](/images/html/canvas_compositing.png)

## 裁切
`clip()`是将当前创建的路径设置为当前剪切路径的方法。  
裁切路径和普通的`canvas`图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。  
如下图，红边五角星就是裁切路径，所有在路径以外的部分都不会在 canvas 上绘制出来。
![canvas-miterLimit](/images/html/canvas_clipping_path.png)

#### 语法
```javascript
void ctx.clip();
void ctx.clip(fillRule);
void ctx.clip(path, fillRule);
```

#### 参数
- `fillRule`：判断一点是路径外还是在路径内。允许的值
    - `nonzero`：非零环绕原则，默认的原则
    - `evenodd`：奇偶环绕原则
- `path`：需要剪切的`Path2D`路径

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create circular clipping region
ctx.beginPath();
ctx.arc(100, 75, 50, 0, Math.PI * 2);
ctx.clip();

// Draw stuff that gets clipped
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "orange";
ctx.fillRect(0, 0, 100, 100);
```