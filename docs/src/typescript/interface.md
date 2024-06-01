---
title: 接口
---

# 接口


## 简介
interface是对象的模板,可以看作是种类型约定,中文译为`接口`.使用了某个模板的对象,就拥有了指定的类型结构

```ts
interface Person {
    firstname:string,
    lastname:string,
    age:number
}

// 使用
let p:Person = {
    firstname:"Tom",
    lastName:"Jack",
    age:12
}
```
`方括号运算符`可以取出interface某个属性的类型
```ts
interface Foo {
    a: string
}

type A = Foo['a'];
```

interface可能表示对象的各种语法,它的成员有5种形式
-  对象属性
-  对象属性索引
-  对象方法
-  函数
-  构造函数

### 对象属性
```ts
// 基本属性
interface Point {
    x:number,
    y:number
}

// 可选属性
interface Point {
    x?:number,
    y?:number
}

// 只读属性
interface Point {
    readonly x: number,
    readonly y: number
}
```

### 对象属性索引
```ts
interface MyObj {
    [prop: string]:number
}
```

属性索引共有`string`,`number`和`symbol`三种类型.  

1. 一个接口最多只能定义一种类型的索引
2. 同类型索引会约束该接口中所有相同类型的的值的类型
```ts
interface MyObj {
    [prop: string]: number,
    // 属性a的类型为string,受到属性索引的约束
    a:boolean  // 报错
}
```

同时定义了字符串索引和数值索引，那么数值索引必须服从于字符串索引。因为在 JavaScript中，数值属性名最终是自动转换成字符串属性名。
```ts
interface A {
  [prop: string]: number;
  [prop: number]: string; // 报错
}

interface B {
  [prop: string]: number;
  [prop: number]: number; // 正确
}
```

### 对象方法
对象方法有三种写法
```ts
interface A {
    f(x: boolean): string,
}

interface B {
    f:(x: boolean) => string
}

interface c {
    f: {(x: boolean) :string}
}
```

属性名可以采用表达式
```ts
const f = 'f';
inteface A {
    [f](x: string): string
}
```

类型方法可以重载
```ts
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

// interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。
function MyFunc(): number;
function MyFunc(x: boolean): boolean;
function MyFunc(x: string, y: string): string;
function MyFunc(
  x?:boolean|string, y?:string
):number|boolean|string {
  if (x === undefined && y === undefined) return 1;
  if (typeof x === 'boolean' && y === undefined) return true;
  if (typeof x === 'string' && typeof y === 'string') return 'hello';
  throw new Error('wrong parameters');  
}

const a:A = {
  f: MyFunc
}
```

### 函数
interface也可以用来声明独立的函数
```ts
interface Add {
    (x:number, y:number):number
}
const myAdd:Add = (x,y) => x + y;
```

### 构造函数
```ts
interface ErrorConstructor {
    new (message?:string): Error
}
```

## 继承
interface可以继承其他类型

### interface 继承 interface
```ts
interface Shape {
  name: string;
}

interface Circle extends Shape {
  radius: number;
}
```

ts的interface支持多重继承
```ts
interface Style {
  color: string;
}

interface Shape {
  name: string;
}

interface Circle extends Style, Shape {
  radius: number;
}
```

子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。
```ts
interface Foo {
  id: string;
}

interface Bar extends Foo {
  id: number; // 报错
}
```

多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错
```ts
interface Foo {
  id: string;
}

interface Bar {
  id: number;
}

// 报错
interface Baz extends Foo, Bar {
  type: string;
}
```

### interface 继承 type
`interface` 可以继承 `type`命令定义的对象类型
```ts
type Country = {
  name: string;
  capital: string;
}

interface CountryWithPop extends Country {
  population: number;
}
```

> 注意:如果`type`命令定义类型不是对象,interface就无法继承

### interface 继承 类
interface 还可以继承 class，即继承该类的所有成员。
```ts
class A {
    x:string = '';
    y():boolean {
        return true;
    }
}

interface B extends A {
    age:number
}

let person:B = {
    age:12,
    x:"Tom",
    y:() => true,
}
```

某些类拥有私有成员和保护成员，interface 可以继承这样的类，但是意义不大。
```ts
class A {
  private x: string = '';
  protected y: string = '';
}

interface B extends A {
  z: number
}

// 报错
const b:B = { /* ... */ }

// 报错
class C implements B {
  // ...
}
```

## 接口合并
多个同名接口会合并成一个接口。
```ts
interface Box {
  height: number;
  width: number;
}

interface Box {
  length: number;
}
```

这样的设计主要是为了兼容 JavaScript 的行为。JavaScript开发者常常对全局对象或者外部库，添加自己的属性和方法。那么，只要使用 interface给出这些自定义属性和方法的类型，就能自动跟原始的 interface 合并，使得扩展外部类型非常方便。

同名接口合并时，同一个属性如果有多个类型声明，彼此不能有类型冲突。
```ts
interface A {
  a: number;
}

interface A {
  a: string; // 报错
}
```

同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。
```ts
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

这个规则有一个例外。同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。
```ts
interface A {
  f(x:'foo'): boolean;
}

interface A {
  f(x:any): void;
}

// 等同于
interface A {
  f(x:'foo'): boolean;
  f(x:any): void;
}
```

一个实际的例子是 Document 对象的createElement()方法，它会根据参数的不同，而生成不同的 HTML 节点对象。
```ts
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 等同于
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
```

如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。
```ts
interface Circle {
  area: bigint;
}

interface Rectangle {
  area: number;
}

declare const s: Circle | Rectangle;

s.area;   // bigint | number
```

## interface 与 type 的异同

### 相同之处
1. 首先表现在都能为对象类型起名。

### 不同
1. `type`能够表示非对象类型，而interface只能表示对象类型（包括数组、函数等）。
2. `interface`可以继承其他类型，`type`不支持继承。
3. 同名`interface`会自动合并，同名`type`则会报错。
4. `interface`不能包含属性映射（mapping），`type`可以
5. `this`关键字只能用于`interface`。
6. `type`可以扩展原始数据类型，`interface`不行。
7. `interface`无法表达某些复杂类型（比如交叉类型和联合类型），但是`type`可以。