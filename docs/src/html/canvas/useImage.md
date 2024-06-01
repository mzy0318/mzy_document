---
title: 使用图像
---

# 使用图像
canvas 更有意思的一项特性就是图像操作能力。  
可以用于动态图像合成或者作为图形的背景，以及游戏界面。  
浏览器支持的任意格式的外部图片都可以使用，比如`PNG`、`GIF`或者`JPEG`。甚至可以将同一个页面中其他`canvas`元素生成的图片作为图片源。

引入图像到canvas里需要以下两步基本操作：
1. 获得一个指向`HTMLImageElement`的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片。
2. 使用`drawImage()`函数将图片绘制到画布上。

## 获取要绘制的图片
canvas可以使用下面这些类型中的一种作为图片的源
1. `HTMLImageElement`：这些图片是由`Image()`函数构造出来的，或者任何的`<img>`元素
2. `HTMLVideoElement`：用一个`HTML`的`<video>`元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
3. `HTMLCanvasElement`：可以使用另一个`<canvas>`元素作为你的图片源。
4. `ImageBitmap`：这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其他几种源中生成。
这些源统一由`CanvasImageSource`类型来引用。

## 绘制图片
一旦获得了源图对象，就可以使用`drawImage`方法将它渲染到`canvas`里;

#### 语法
```javascript
drawImage(image, dx, dy);
drawImage(image, dx, dy, dWidth, dHeight);
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

#### 参数
- `image`：绘制到上下文的元素。允许任何的画布图像源，
- `sx(可选)`：需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的左上角`X轴坐标`。可以使用`3参数`或`5参数`语法来省略这个参数。
- `sy(可选)`：需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的左上角`Y轴坐标`。可以使用`3参数`或`5参数`语法来省略这个参数。
- `sWidth(可选)`：需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的`sx`和`sy`开始，到`image`的右下角结束。可以使用`3参数`或`5参数`语法来省略这个参数。使用负值将翻转这个图像。
- `sHeigth(可选)`：需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的高度。使用负值将翻转这个图像。
- `dx`：`image`的左上角在目标画布上`X轴坐标`。
- `dy`：`image`的左上角在目标画布上`Y轴坐标`。
- `dWidth`：`image`在目标画布上绘制的宽度。允许对绘制的`image`进行缩放。如果不说明，在绘制时`image`宽度不会缩放。注意，这个参数不包含在`3参数`语法中。
- `dHeigth`：`image`在目标画布上绘制的高度。允许对绘制的`image`进行缩放。如果不说明，在绘制时`image`高度不会缩放。注意，这个参数不包含在`3参数`语法中。

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("source");

image.addEventListener("load", (e) => {
    ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
});
```

## 源元素大小
`drawImage()`方法在绘制时使用源元素的固有尺寸（以 CSS 像素为单位）。

如果加载图像并在其构造函数中指定可选的大小参数，则必须使用所创建实例的`naturalWidth`和`naturalHeight`属性来正确计算裁剪和缩放区域等内容，而不是`element.width`和 `element.height`。如果元素是`<video>`元素，则`videoWidth`和`videoHeight`也是如此，

#### 示例
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image(60, 45); // Using optional size for image
image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "rhino.jpg";

function drawImageActualSize() {
  // Use the intrinsic size of image in CSS pixels for the canvas element
  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;

  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  ctx.drawImage(this, 0, 0);

  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  ctx.drawImage(this, 0, 0, this.width, this.height);
}
```

## 控制图像的缩放行为
过度缩放图像可能会导致图像模糊或像素化。可以通过使用绘图环境的`imageSmoothingEnabled`属性来控制是否在缩放图像时使用平滑算法。默认值为`true`，即启用平滑缩放。也可以像这样禁用此功能： 
```javascript
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```