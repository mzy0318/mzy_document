---
title: 变量类型
---

# 变量类型

## any

`any`类型表示没有任何限制,该类型的变量可以赋予任意类型的值

普通类型的变量,在赋值过程中改变类型是不被允许的

```typescript
let num:number = 10;
num = '10';   //这里是不被允许的
```

如果是any类型,则允许被赋值为任意类型

```typescript
let num:any = 10;
num = '10';
```

在任意值上访问任何属性都是允许的

```typescript
let num:any = 10;
console.log(num.myName);
console.log(num.myName.firstName);
```

也允许调用任何方法

```typescript
let num:any = 10;
num.setName('Tom');
num.firstName.setName('Sam');
```

> 声明一个变量为任意值之后,对它的任何操作,返回的内容的类型都任意值

未声明类型的变量,它们会被识别为**任意值**类型

```typescript
let num;
num = '10';
num = 10;
num.setName('Tom')
//等价于
let num:any;
num = '10';
num = 10;
num.setName('Tom')
```

::: tip 使用场景
1. 出于特殊原因,需要关闭某些变量的类型检查,就可以把该变量类型设为`any`.
2. 为了适配以前老的Javascript项目,让代码快速迁移到TypeScript,可以把变量类型设为`any`  

从集合角度看,`any`类型可看成是所有其他类型的合集,包含了一切可能的类型,TypeScript将这种类型称为**顶层类型**,意为涵盖了所有下层.
:::

## unknown
它与`any`含义相同,表示类型不确定,可能是任意类型,但是它有一些限制

::: warning 注意
1. `unknown`类型的变量 ,不能直接赋值给其他变量(除了`any`类型和`unknown`类型)
2. 不能直接调用`unknown`类型变量的方法和属性.
3. `unknown`类型只能进行比较运算(\=\==、\==、!=、!==、||、&&、?)、取反运算(!)、`typeof`运算符和instanceof运算符这几种

从集合角度来看,`unknown`也可以视为其他类型(除了`any`)的合集,所以它和`any`一样,也属于`typescript`的顶层类型.
:::

## never
`typescript`中的`never`类型表示的是值永远不会出现的一种类型。例如：
```ts
type A = 'A';
type B = 'B';
type C = A & B;
```

::: tip 使用场景
1. 在一些类型运算之中,保证类型运算的完整性
2. 不可能返回值的函数,返回值的类型就可以写成`never`;  

从集合角度来看,`never`类是任何集合的子集,任何类型都包括`never`类型,因此,never类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。
:::

::: danger 注意
`never`类型不能赋给它任何值,否则都会报错
:::

## 基本类型
typescript 继承了 JavaScript 的类型设计，以下8种类型可以看作 typescript 的基本类型。
- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null

> 上面所有类型的名称都是小写字母，首字母大写的Number、String、Boolean等在 JavaScript 语言中都是内置对象，而不是类型名称。

> undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

#### boolean类型
`boolean`类型只包含`true`和`false`两个布尔值。
```ts
const x:boolean = true;
const y:boolean = false;
```
#### string 类型
`string`类型包含所有字符串。

```ts
const x:string = 'hello';
const y:string = `${x} world`;
```

#### number 类型
`number`类型包含所有整数和浮点数。
```ts
const x:number = 123;
const y:number = 3.14;
const z:number = 0xffff;
```

#### bigint 类型
`bigint`类型包含所有的大整数。
```ts
const x:bigint = 123n;
const y:bigint = 0xffffn;
```

#### symbol 类型
`symbol`类型包含所有的`Symbol`值。
```ts
const x:bigint = 123n;
const y:bigint = 0xffffn;
```

#### object 类型
`object`object 类型包含了所有对象、数组和函数。
```ts
const x:object = { foo: 123 };
const y:object = [1, 2, 3];
const z:object = (n:number) => n + 1;
```
> 上面示例中，对象、数组、函数都属于 object 类型。

#### undefined 类型，null 类型
undefined 和 null 是两种独立类型，它们各自都只有一个值。  

undefined 类型只包含一个值undefined，表示未定义（即还未给出定义，以后可能会有定义）。
```ts
let x:undefined = undefined;
```

null 类型也只包含一个值null，表示为空（即此处没有值）。
```ts
const x:null = null;
```

如果没有声明类型的变量，被赋值为`undefined`或`null`，在关闭编译设置`noImplicitAny`和`strictNullChecks`时，它们的类型会被推断为`any`。
```ts
// 关闭 noImplicitAny 和 strictNullChecks
let a = undefined;   // any
const b = undefined; // any
let c = null;        // any
const d = null;      // any
```

如果希望避免这种情况，则需要打开编译选项`strictNullChecks`。

```ts
// 打开编译设置 strictNullChecks

let a = undefined;   // undefined
const b = undefined; // undefined
let c = null;        // null
const d = null;      // null
```

#### undefined 和 null 的特殊性
作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为`undefined`或`null`。
```ts
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```

但是有时候，这并不是开发者想要的行为，也不利于发挥类型系统的优势。
```ts
const obj:object = undefined;
obj.toString() // 编译不报错，运行就报错---因为undefined类型没有toString()方法
```

避免上面的错误,需要打开`strictNullChecks`选项
```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

打开strictNullChecks以后，undefined和null这两种值也不能互相赋值了。

```ts
// 打开 strictNullChecks

let x:undefined = null; // 报错
let y:null = undefined; // 报错
```


## 包装对象类型

#### 包装对象的概念
JavaScript 的8种类型之中，undefined和null其实是两个特殊值，object属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。
- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是**这些值在需要时，会自动产生的对象**。

```ts
'hello'.charAt(1) // 'e'
```
上面示例中，字符串`hello`执行了`charAt()`方法。但是，在`JavaScript`语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

> `String()`只有当作构造函数使用时（即带有`new命令`调用），才会返回包装对象。如果当作普通函数使用（不带有new命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

#### 包装对象类型与字面量类型
由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。
- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```ts
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

## Object 类型与 object 类型

#### Object 类型 

`Object`代表`JavaScript`语言里面的广义对象。所有可以转成对象的值，都是`Object`类型，这囊括了几乎所有的值。

```ts
let obj:Object;
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

事实上，除了undefined和null这两个值不能转为对象，其他任何值都可以赋值给Object类型。
```ts
let obj:Object;

obj = undefined; // 报错
obj = null; // 报错
```

空对象{}是Object类型的简写形式，所以使用Object时常常用空对象代替

```ts
let obj:{};
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

#### object 类型

`object`类型代表`JavaScript`里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```ts
let obj:object;
 
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
obj = true; // 报错
obj = 'hi'; // 报错
obj = 1; // 报错
```

大多数时候，我们使用对象类型，只希望包含真正的对象，不希望包含原始类型。所以，建议总是使用小写类型object，不使用大写类型Object。

无论是大写的Object类型，还是小写的object类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```ts
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```

## 值类型
`typescript`规定，单个值也是一种类型，称为“值类型”。
```ts
// 变量x的类型是字符串hello，导致它只能赋值为这个字符串，赋值为其他字符串就会报错
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```

typescript 推断类型时，遇到const命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。
```ts
//变量x是const命令声明的，TypeScript 就会推断它的类型是值https，而不是string类型。
const x = 'https';

// y 的类型是 string
const y:string = 'https';
```

`const`命令声明的变量，如果赋值为对象，并不会推断为值类型
```ts
// x 的类型是 { foo: number }
const x = { foo: 1 };
```


值类型可能会出现一些很奇怪的报错。
```ts
const x:5 = 4 + 1; // 报错

// 使用类型断言解决上面的报错
const x:5 = (4 + 1) as 5; // 正确
```

## 联合类型
联合类型（union types）指的是多个类型组成的一个新类型，使用符号`|`表示。
```ts
let x:string|number;
x = 123; // 正确
x = 'abc'; // 正确
```

联合类型可以与值类型相结合，表示一个变量的值有若干种可能。
```ts
let setting:true|false;
let gender:'male'|'female';
let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```

打开编译选项`strictNullChecks`后，其他类型的变量不能赋值为`undefined`或`null`。这时，如果某个变量确实可能包含空值，就可以采用联合类型的写法。
```ts
let name:string|null;
name = 'John';
name = null;
```

联合类型的第一个成员前面，也可以加上竖杠|，这样便于多行书写。
```ts
let x:
  | 'one'
  | 'two'
  | 'three'
  | 'four';
```

一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步处理。
```ts
function printId(id:number|strin) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

> “类型缩小”是`typescript`处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理。

## 交叉类型
交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号&表示。

```ts
// 变量x同时是数值和字符串，这当然是不可能的，所以 typescript 会认为x的类型实际是never。
let x:number&string;
```

#### 用途
交叉类型的主要用途是表示对象的合成。

```ts
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```

交叉类型常常用来为对象类型添加新属性。
```ts
type A = { foo: number };
type B = A & { bar: number };
```

## type命令
`type`命令用来定义一个类型的别名。
```ts
type Age = number;
let age:Age = 55;
```

别名不允许重名。  
```ts
type Color = 'red';
type Color = 'blue'; // 报错
```

别名的作用域是块级作用域。这意味着，代码块内部定义的别名，影响不到外部。
```ts
type Color = 'red';

if (Math.random() < 0.5) {
  type Color = 'blue';
}
```

别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套。
```ts
type World = "world";
type Greeting = `hello ${World}`;
```

## typeof运算符
`JavaScript`语言中，`typeof`运算符是一个一元运算符，返回一个字符串，代表操作数的类型。

```js
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n // "bigint"
```

`typescript`将`typeof`运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的`typescript`类型。

```ts
const a = { x: 0 };
type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number
```

`JavaScript`的`typeof`遵守`JavaScript`规则，`typescript`的`typeof`遵守`typescript` 规则。它们的一个重要区别在于，编译后，前者会保留，后者会被全部删除。

```ts
// 源代码
let a = 1;
let b:typeof a;

if (typeof a === 'number') {
  b = a;
}

// 编译后的结果
let a = 1;
let b;
if (typeof a === 'number') {
    b = a;
}
```

## 块级类型声明
typescript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。
```ts
if (true) {
  type T = number;
  let v:T = 5;
} else {
  type T = string;
  let v:T = 'hello';
}
```

## 类型的兼容
typescript 的类型存在兼容关系，某些类型可以兼容其他类型。
```ts
type T = number|string;

let a:number = 1;
let b:T = a;
```

如果类型A的值可以赋值给类型B，那么类型A就称为类型B的子类型（subtype）  

typescript 的一个规则是，凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。

## 数组类型
typescript 数组有一个根本特征：所有成员的类型必须相同，但是成员数量是不确定的，可以是无限数量的成员，也可以是零成员。

数组的类型有两种写法:

#### 第一种写法

```ts
// 单一类型
let arr:number[] = [1, 2, 3];

// 多类型
let arr:(number|string)[];
```

#### 第二种写法
```ts
// 单一类型
let arr:Array<number> = [1, 2, 3];

// 多类型
let arr:Array<number|string>;
```

正是由于成员数量可以动态变化，所以`typescript`不会对数组边界进行检查，越界访问数组并不会报错。

```ts
let arr:number[] = [1, 2, 3];
let foo = arr[3]; // 正确
```

typescript 允许使用方括号读取数组成员的类型。
```ts
type Names = string[];
type Name = Names[0]; // string

// 也可以写成下面的形式
type Names = string[];
type Name = Names[number]; // string
```

#### 数组的类型推断
如果数组变量没有声明类型，TypeScript就会推断数组成员的类型。这时，推断行为会因为值的不同，而有所不同。


如果变量的初始值是空数组，那么 typescript 会推断数组类型是any[]。
```ts
// 推断为 any[]
const arr = [];
```

为这个数组赋值时，TypeScript 会自动更新类型推断。
```ts
const arr = [];
arr // 推断为 any[]

arr.push(123);
arr // 推断类型为 number[]

arr.push('abc');
arr // 推断类型为 (string|number)[]
```

> 类型推断的自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新。

#### 只读数组
typescript 允许声明只读数组，方法是在数组类型前面加上readonly关键字。
```ts
const arr:readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错
```

`typescript`将`readonly number[]`与`number[]`视为两种不一样的类型，后者是前者的子类型。

```ts
let a1:number[] = [0, 1];
let a2:readonly number[] = a1; // 正确

a1 = a2; // 报错
```

`readonly`关键字不能与数组的泛型写法一起使用。

```ts
// 报错
const arr:readonly Array<number> = [0, 1];
```

typescript 提供了两个专门的泛型，用来生成只读数组的类型。
```ts
const a1:ReadonlyArray<number> = [0, 1];
const a2:Readonly<number[]> = [0, 1];
```

只读数组还有一种声明方法，就是使用“const 断言”。
```ts
const arr = [0, 1] as const;
arr[0] = [2]; // 报错 
```

#### 多维数组
typescript 使用T[][]的形式，表示二维数组，T是最底层数组成员的类型。
```ts
var multi:number[][] = [[1,2,3], [23,24,25]];
```

## 元组
元组（tuple）是 typescript 特有的数据类型，JavaScript 没有单独区分这种类型。它表示成员类型可以自由设置的数组.

由于成员的类型可以不一样，所以元组必须明确声明每个成员的类型。
```ts
// 元组的成员类型与成员的值必须相同(数量与类型)
const s:[string, string, boolean] = ['a', 'b', true];
```

#### 区分数组与元组
typescript 的区分方法就是，成员类型写在方括号里面的就是元组，写在外面的就是数组。
```ts
// 数组
let a:number[] = [1];
// 元组
let t:[number] = [1];
```

使用元组时，必须明确给出类型声明（上例的[number]），不能省略，否则 typescript 会把一个值自动推断为数组。
```ts
// a 的类型被推断为 (number | boolean)[]
let a = [1, true];
```

元组成员的类型可以添加问号后缀（?），表示该成员是可选的。
```ts
let a:[number, number?] = [1];
```

问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。
```ts
type myTuple = [ number, number, number?, string];
```

使用扩展`运算符（...）`，可以表示不限成员数量的元组。
```ts
type NamedNums = [
  string,
  ...number[]
];

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];
```

扩展运算符（...）用在元组的任意位置都可以，它的后面只能是一个数组或元组。
```ts
type t1 = [string, number, ...boolean[]];
type t2 = [string, ...boolean[], number];
type t3 = [...boolean[], string, number];
```

元组的成员可以添加成员名，这个成员名是说明性的，可以任意取名，没有实际作用。
```ts
type Color = [
  red: number,
  green: number,
  blue: number
];

const c:Color = [255, 255, 255];
```

元组可以通过方括号，读取成员类型。
```ts
type Tuple = [string, number];
type Age = Tuple[1]; // number
```

由于元组的成员都是数值索引，即索引类型都是number，所以可以像下面这样读取。
```ts
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];  // string|number|Date
```

#### 只读元组
元组也可以是只读的，不允许修改，有两种写法。
```ts
// 写法一
type t = readonly [number, string]

// 写法二
type t = Readonly<[number, string]>
```

跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。
```ts
type t1 = readonly [number, number];
type t2 = [number, number];

let x:t2 = [1, 2];
let y:t1 = x; // 正确

x = y; // 报错
```

#### 成员数量推断
如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。
```ts
function f(point: [number, number]) {
  if (point.length === 3) {  // 报错
    // ...
  }
}
```

如果包含了可选成员，TypeScript 会推断出可能的成员数量。
```ts
function f(
  point:[number, number?, number?]
) {
  if (point.length === 4) {  // 报错
    // ...
  }
}
```

如果使用了扩展运算符，TypeScript 就无法推断出成员数量。
```ts
const myTuple:[...string[]]
  = ['a', 'b', 'c'];

if (myTuple.length === 4) { // 正确
  // ...
}
```

#### 扩展运算符与成员数量
扩展运算符`（...）`将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 `typescript`会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。


这导致如果函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。
```ts
const arr = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 报错
```

有些函数可以接受任意数量的参数，这时使用扩展运算符就不会报错。
```ts
const arr = [1, 2, 3];
console.log(...arr) // 正确
```

解决这个问题的一个方法，就是把成员数量不确定的数组，写成成员数量确定的元组，再使用扩展运算符。
```ts
const arr:[number, number] = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 正确
```

另一种写法是使用as const断言。
```ts
const arr = [1, 2] as const;
```

## Symbol 类型
Symbol 值通过Symbol()函数生成。在 typescript 里面，Symbol 的类型使用symbol表示。
```ts
let x:symbol = Symbol();
let y:symbol = Symbol();

x === y;  // false;
```

#### unique symbol
`Symbol` 值不存在字面量，必须通过变量来引用，写不出只包含单个`Symbol`值的那种值类型。

为了解决这个问题，`typescript`设计了symbol的一个子类型`unique symbol`，它表示单个的、某个具体的`Symbol`值
```ts
// 正确
const x:unique symbol = Symbol();

// 报错
let y:unique symbol = Symbol();
```

const命令为变量赋值 Symbol 值时，变量类型默认就是unique symbol，所以类型可以省略不写。
```ts
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();
```

相同参数的Symbol.for()方法会返回相同的 Symbol 值。TypeScript 目前无法识别这种情况，所以可能出现多个 unique symbol 类型的变量，等于同一个 Symbol 值的情况。
```ts
const a:unique symbol = Symbol.for('foo');
const b:unique symbol = Symbol.for('foo');
```

#### 类型推断
let命令声明的变量，推断类型为 symbol。
```ts
// 类型为 symbol
let x = Symbol();
```

const命令声明的变量，推断类型为 unique symbol。
```ts
// 类型为 unique symbol
const x = Symbol();
```

const命令声明的变量，如果赋值为另一个 symbol 类型的变量，则推断类型为 symbol。
```ts
let x = Symbol();

// 类型为 symbol
const y = x;
```

let命令声明的变量，如果赋值为另一个 unique symbol 类型的变量，则推断类型还是 symbol。
```ts
const x = Symbol();

// 类型为 symbol
let y = x;
```