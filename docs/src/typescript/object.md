---
title: 对象
---

# 对象

除了原始类型，对象是 JavaScript 最基本的数据结构。TypeScript 对于对象类型有很多规则。

## 声明
对象类型最简单的声明方式就是使用大括号表示对象,在大括号内部声明每个属性和方法
```ts
// obj后面的大括号就是对象的类型声明
let obj:{
    x:number,
    y:number
} = {
    x:1,y:1
}
```

属性的类型可以用分号结尾,也可以使用逗号结尾;
最后一个属性可以写逗号或者分号,也可以不写

```ts
// 使用逗号分隔
type MyObj = {
    x:number,
    y:number
}

// 使用分号分隔
type MyObj = {
    x:number;
    y:number
}
```

## 读写规则
一旦声明了类型,对象赋值的时候,就不能缺少指定属性,也不能有多余属性
```ts
type MyObj = {
    x:number,
    y:number
}

let numObj1 = { x:12 }   // 报错
let numObj2 = { x:12, y:34, z:12 } // 报错
```

读写不存在的属性也会报错。
```ts
let obj:{
    x:number,
    y:number
} = {x:12,y:23}

obj.z   //报错
```

同样地，也不能删除类型声明中存在的属性，修改属性值是可以的。
```ts
let obj:{
    x:number,
    y:number
} = {x:12,y:23}

delete obj.x  // 报错
obj.x = 1222;
```
对象的方法使用函数类型描述
```ts
type MyObj = {
    x:number,
    y:number,
    add(x:number,y:number):number,
    // 或者写成
    add(x:number,y:number) => number
}
```

对象类型可以使用方括号读取属性类型
```ts
type User = {
    name: string,
    age: number
}
type name = User['name'];
```

除了type命令可以为对象类型声明一个别名，TypeScript还提供了interface命令，可以把对象类型提炼为一个接口。
```ts
// 写法一
type MyObj = {
  x:number;
  y:number;
};

const obj:MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}

const obj:MyObj = { x: 1, y: 1 };
```

TypeScript 不区分对象自身的属性和继承的属性，一律视为对象的属性。
```ts
interface MyInterface {
  toString(): string; // 继承的属性
  prop: number; // 自身的属性
}

const obj:MyInterface = { // 正确
  prop: 123,
};
```

## 可选属性
如果某个属性是可选的,需要在属性后面加一个问号
```ts
let obj:{
    x:number,
    y?:number
} = { x:123 }
```

可选属性等同于允许赋值为undefined，下面两种写法是等效的。
```ts
type User = {
  firstName: string;
  lastName?: string;
};

// 等同于
type User = {
  firstName: string;
  lastName?: string|undefined;
};
```

> 访问没有赋值的可选属性返回的是`undefined`;

## 只读属性
属性前面加`readonly`关键字,表示这个属性是只读属性,不能修改,
```ts
let obj:{
    readonly age:number
} = { age:12 };

obj.age = 23;  //报错
```

注意
1. 只读属性只能在对象初始化期间赋值,此后就不能修改该属性
2. 如果属性值是一个对象,`readonly`修饰符并不禁止修改该对象的属性,只是禁止完全替换掉该对象.


如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量。
```ts
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let w:Person = {
  name: 'Vicky',
  age: 42,
};

let r:ReadonlyPerson = w;

w.age += 1;
r.age // 43
```

如果希望属性值是只读的，除了声明时加上readonly关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言`as const`。
```ts
const myUser = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 报错
```

`as cons`t属于`TypeScript`的类型推断，如果变量明确地声明了类型，那么 TypeScript 会以声明的类型为准.
```ts
const myUser:{ name: string } = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 正确
```

## 属性名的索引类型
如果对象的属性非常多，一个个声明类型就很麻烦，而且有些时候，无法事前知道对象会有多少属性，比如外部 API 返回的对象。这时 TypeScript 允许采用属性名表达式的写法来描述类型，称为“属性名的索引类型”。

```ts
type MyObj = {
  [property: string]: string
};

const obj:MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
};
```

`JavaScript`对象的属性名（即上例的`property`）的类型有三种可能，除了上例的`string`，还有`number`和`symbol`。
```ts
type T1 = {
  [property: number]: string
};

type T2 = {
  [property: symbol]: string
};
```

对象可以同时有多种类型的属性名索引，比如同时有数值索引和字符串索引。但是，数值索引不能与字符串索引发生冲突，必须服从后者，这是因为在JavaScript语言内部，所有的数值属性名都会自动转为字符串属性名。
```ts
type MyType = {
  [x: number]: boolean; // 报错
  [x: string]: string;
}
```

可以既声明属性名索引，也声明具体的单个属性名。如果单个属性名符合属性名索引的范围，两者不能有冲突，否则报错。
```ts
type MyType = {
  foo: boolean; // 报错
  [x: string]: string;
}
```

> 属性名的**数值索引**不宜用来声明数组，因为采用这种方式声明数组，就不能使用各种数组方法以及`length`属性，因为类型里面没有定义这些东西。

## 解构赋值
解构赋值的类型写法，跟为对象声明类型是一样的。

```ts
const {id, name, price}:{
  id: string;
  name: string;
  price: number
} = product;
```

> 目前没法为解构变量指定类型，因为对象解构里面的冒号，JavaScript 指定了其他用途。

## 结构类型原则
只要对象 B 满足 对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structural typing）。

```ts
type A = {
  x: number;
};

type B = {
  x: number;
  y: number;
};
```
> 根据“结构类型”原则，TypeScript检查某个值是否符合指定类型时，并不是检查这个值的类型名（即“名义类型”），而是检查这个值的结构是否符合要求（即“结构类型”）。

如果类型 B 可以赋值给类型 A，TypeScript 就认为 B 是 A 的子类型（subtyping），A 是 B的父类型。子类型满足父类型的所有结构特征，同时还具有自己的特征。凡是可以使用父类型的地方，都可以使用子类型，即子类型兼容父类型。

`结构类型原则`设计有意想不到的结果
```ts
type myObj = {
  x: number,
  y: number,
};

function getSum(obj:myObj) {
  let sum = 0;

  for (const n of Object.keys(obj)) {
    // obj[n] 可以推断为any类型, 如果项目设置为不允许变量类型推断为any，代码就会报错。
    const v = obj[n]; // 报错
    sum += Math.abs(v);
  }

  return sum;
}
// 改写成下面的代码就不会报错
type MyObj = {
  x: number,
  y: number,
};

function getSum(obj:MyObj) {
  return Math.abs(obj.x) + Math.abs(obj.y);
}
```


## 严格字面量检查
如果对象使用字面量表示，会触发 TypeScript 的严格字面量检查（strict object literalchecking）。如果字面量的结构跟类型定义的不一样（比如多出了未定义的属性），就会报错。

如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的。

```ts
// 等号右边是字面量对象
const point:{
  x:number;
  y:number;
} = {
  x: 1,
  y: 1,
  z: 1 // 报错
};

// 等号右边是变量名
const myPoint = {
  x: 1,
  y: 1,
  z: 1
};

const point:{
  x:number;
  y:number;
} = myPoint; // 正确
```

由于严格字面量检查，字面量对象传入函数必须很小心，不能有多余的属性。
```ts
interface Point {
  x: number;
  y: number;
}

function computeDistance(point: Point) { /*...*/ }

computeDistance({ x: 1, y: 2, z: 3 }); // 报错
computeDistance({x: 1, y: 2}); // 正确
```

编译器选项suppressExcessPropertyErrors，可以关闭多余属性检查。下面是它在 tsconfig.json 文件里面的写法。
```json
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": true
  }
}
```

## 最小可选属性规则
根据“结构类型”原则，如果一个对象的所有属性都是可选的，那么其他对象跟它都是结构类似的。
```ts
type Options = {
  a?:number;
  b?:number;
  c?:number;
};
```
为了避免这种情况，TypeScript 2.4 引入了一个“最小可选属性规则”，也称为“弱类型检测”（weak type detection）。  
最小可选属性规则:如果某个类型的所有属性都是可选的，那么该类型的对象必须至少存在一个可选属性，不能所有可选属性都不存在。
```ts
type Options = {
  a?:number;
  b?:number;
  c?:number;
};

const opts = { d: 123 };

const obj:Options = opts; // 报错
```

> 如果想规避这条规则，要么在类型里面增加一条索引属性（[propName: string]: someType），要么使用类型断言（opts as Options）。

## 空对象
空对象是 TypeScript 的一种特殊值，也是一种特殊类型。

空对象没有自定义属性，所以对自定义属性赋值就会报错。空对象只能使用继承的属性，即继承自原型对象Object.prototype的属性。
```ts
const obj = {};
obj.prop = 123; // 报错

obj.toString();
```

TypeScript 不允许动态添加属性，所以对象不能分步生成，必须生成时一次性声明所有属性。  
如果确实需要分步声明，一个比较好的方法是，使用扩展运算符（...）合成一个新对象。  
```ts
// 错误
const pt = {};
pt.x = 3;
pt.y = 4;

// 正确
const pt = {
  x: 3,
  y: 4
};
// 使用扩展运算符
const pt0 = {};
const pt1 = { x: 3 };
const pt2 = { y: 4 };

const pt = {
  ...pt0, ...pt1, ...pt2
};
```

空对象作为类型，其实是`Object`类型的简写形式。
```ts
let d:{};
// 等同于
// let d:Object;

d = {};
d = { x: 1 };
d = 'hello';
d = 2;
```

如果想强制使用没有任何属性的对象，可以采用下面的写法。  
```ts
interface WithoutProperties {
  [key: string]: never;
}

// 报错
const a:WithoutProperties = { prop: 1 };
```