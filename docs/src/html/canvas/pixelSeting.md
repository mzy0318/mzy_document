---
title: 像素设置
---
# 像素设置
可以直接通过`ImageData`对象操纵像素数据，直接读取或将数据数组写入该对象中。

## ImageData
`ImageData`对象中存储着`canvas`对象真实的像素数据，它包含以下几个只读属性：
- `width`：图片宽度
- `height`：图片宽度
- `data`：`Uint8ClampedArray`类型的一维数组，包含着`RGBA格式`的整型数据，范围在 0 至 255 之间（包括 255）。  

    `data`属性返回一个`Uint8ClampedArray`，它可以被使用作为查看初始像素数据。每个像素用`4个1bytes`值(按照红，绿，蓝和透明值的顺序; 这就是`RGBA格式`);   
    每个颜色值部份用`0`至`255`来代表。  
    每个部份被分配到一个在数组内连续的索引，左上角像素的红色部份在数组的索引`0`位置。像素从左到右被处理，然后往下，遍历整个数组。
    
`Uint8ClampedArray`包含`height × width × 4`字节数据，索引值从`0`到`(height× width × 4)-1`;

#### 示例
读取图片中位于第50行，第200列的像素的蓝色部分
```javascript
blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 2];
```

根据行、列读取某像素点的R/G/B/A值公式
```javascript
imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 0/1/2/3];
```

使用`Uint8ClampedArray.length`属性来读取像素数组的大小（以字节为单位）
```javascript
var numBytes = imageData.data.length;
```

## 创建ImageData对象
`createImageData()`方法可以创建一个**新的**、**空白的**、**指定大小**的`ImageData`对象。所有的像素在新对象中都是透明的。

#### 语法
```javascript
ImageData ctx.createImageData(width, height);
ImageData ctx.createImageData(imagedata);
```

#### 参数
- `width`：`ImageData`新对象的宽度
- `height`：`ImageData`新对象的高度
- `imageData`：从现有的`ImageData`对象中，复制一个和其宽度和高度相同的对象。**图像自身不允许被复制**。

#### 示例
```javascript
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.rect(10, 10, 100, 100);
ctx.fill();

console.log(ctx.createImageData(100, 100)); // ImageData { width: 100, height: 100, data: Uint8ClampedArray[40000] }
```

## 获取实例中像素数据
`getImageData()`返回一个`ImageData`对象，用来描述`canvas`区域隐含的像素数据，这个区域通过矩形表示，起始点为`(sx, sy)`、`宽为sw`、`高为sh`。

#### 语法
```javascript
ImageData ctx.getImageData(sx, sy, sw, sh);
```

#### 参数
- `sx`：将要被提取的图像数据矩形区域的左上角`x`坐标。
- `sy`：将要被提取的图像数据矩形区域的左上角`y`坐标。
- `sw`：将要被提取的图像数据矩形区域的`宽度`。
- `sh`：将要被提取的图像数据矩形区域的`高度`。

#### 示例
```javascript
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.rect(10, 10, 100, 100);
ctx.fill();

console.log(ctx.getImageData(50, 50, 100, 100)); // ImageData { width: 100, height: 100, data: Uint8ClampedArray[40000] }
```

## 设置场景中像素数据
`putImageData()`将数据从已有的`ImageData`对象绘制到位图的方法。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。

#### 语法
```javascript
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

#### 参数
- `imageData`：`ImageData`，包含像素值的数组对象。
- `dx`：源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
- `dy`：源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
- `dirtyX`：在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
- `dirtyY`：在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
- `dirtyWidth`：在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
- `dirtyHeight`：在源图像数据中，矩形区域的高度。默认是图像数据的高度。

#### 示例
图片的灰度和反相颜色  
::: info 提示
反相颜色是减掉颜色的最大色值255  
灰度是是用红绿和蓝的平均值
:::

```javascript
var img = new Image();
img.crossOrigin = "anonymous";
img.src = "./assets/rhino.jpg";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

img.onload = function () {
    ctx.drawImage(img, 0, 0);
};

var original = function () {
    ctx.drawImage(img, 0, 0);
};

// 反相颜色
var invert = function () {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};
// 灰度
var grayscale = function () {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};

const inputs = document.querySelectorAll("[name=color]");
for (const input of inputs) {
    input.addEventListener("change", function (evt) {
        switch (evt.target.value) {
            case "inverted":
                return invert();
            case "grayscale":
                return grayscale();
            default:
                return original();
        }
    });
}
```

## 保存图片

### data URI
`toDataURL()`方法返回一个包含图片展示的`data URI(base64)`。可以使用`type`参数指定其类型，默认为`PNG`格式。图片的分辨率为`96dpi`。

::: warning 注意事项
- 如果画布的高度或宽度是0，那么会返回字符串`"data:,"`。
- 如果传入的类型非`image/png`但是返回的值以`data:image/png`开头，那么该传入的类型是不支持的。
- Chrome支持`image/webp`类型。
:::

#### 语法
```javascript
canvas.toDataURL(type, encoderOptions);
```

#### 参数
- `type`：图片格式，默认为`image/type`
- `encoderOprions`：在指定图片格式为`image/jpeg`或`image/webp`的情况下，可以从`0`到`1`的区间内选择图片的质量。如果超出取值范围，将会使用默认值`0.92`。其他参数会被忽略。

#### 示例
```javascript
var canvas = document.getElementById("canvas");
var dataURL = canvas.toDataURL();
console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
```

### Blob
`toBlob()`方法创造`Blob对象`，用以展示`canvas`上的图片；这个图片文件可以被缓存或保存到本地（由用户代理自行决定）。

::: info 提示
可以在调用时指定所需的文件格式和图像质量，若未指定文件格式（或不支持指定的文件格式），则默认导出`image/png`类型。浏览器需要支持`image/png`，大多数浏览器还支持额外的图片格式，包括`image/jpeg`和`image/webp`。
:::

#### 语法
```javascript
toBlob(callback)
toBlob(callback, type)
toBlob(callback, type, quality)
```

#### 参数
- `callback`：回调函数，可获得一个单独的`Blob`对象参数。如果图像未被成功创建，可能会获得`null`值。
- `type`：`DOMString`类型，指定图片格式，默认格式（未指定或不支持）为`image/png`。
- `quality`：`Number`类型，值在`0`与`1`之间，当请求图片格式为`image/jpeg`或者`image/webp`时用来指定图片展示质量。如果这个参数的值不在指定类型与范围之内，则使用默认值，其余参数将被忽略。

#### 示例
```javascript
const canvas = document.getElementById("canvas");

canvas.toBlob((blob) => {
    const newImg = document.createElement("img");
    const url = URL.createObjectURL(blob);

    newImg.onload = () => {
        // 不再需要读取该 blob，因此释放该对象
        URL.revokeObjectURL(url);
    };

    newImg.src = url;
    document.body.appendChild(newImg);
});
```