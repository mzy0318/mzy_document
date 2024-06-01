# List

`List`是最基础的一种集合:它是一种有序列表.
`List`的行为和数组几乎完全相同:List内部按照放入元素的先后顺序存放,每个元素都可以通过索引确定自己的位置.`List`的索引和数组一样,从`0`开始;

## List创建
在实际应用过程中,可以通过`ArrayList`与`LinkedList`来创建一个`List`


### ArrayList创建List
`ArrayList`在内部使用了数组来存储所有元素.  

```java
ArrayList<String> strs = new ArrayList<>();
strs.add("Apple")
```

`ArrayList`添加元素的过程:
1. 一个`ArrayList`拥有5元素,实际数组大小为6(即有一个空位)
2. 当添加一个元素并指定索引到`ArrayList`时,`ArrayList`自动移动需要移动的元素,往内部指定索引的数组位置添加一个元素,然后把`size`加`1`;
3. 继续添加元素,但是数组已满,没有空闲位置的时候,ArrayList先创建一个更大的数组,然后把旧数组的所有元素复制到新数组,紧接着用新数组取代旧数组,新数组就有了空位,可以继续添加一个元素到指定位置,同时`size`加`1`;

### LinkedList创建List
`LinkedList`通过“链表”也实现了List接口.在LinkedList中,它的内部每个元素都指向下一个元素

```java
LinkedList<String> strs = new LinkedList<>();
```

### ArrayList与LinkedList的区别
| 操作 | ArrayList | LinkedList |
|:--- | :--- | :--- |
| 获取指定元素 | 速度很快 | 需要从头开始查找元素 |
| 添加元素到末尾 | 速度很快 | 速度很快 |
| 在指定位置添加/删除 | 需要移动元素 | 不需要移动元素 |
| 内存占用 | 少 | 较大 |

> 通常下总是优先使用`ArrayList`

### List.of()创建List

```java
List<Integer> list = List.of(1,2,3,4);
```
> 使用`List.of()`创建的`List`,不接受`null`,会抛出`NullPointerException`异常  
> `List.of()`返回的是只读`List`  
> 对只读List调用`add()`、`remove()`方法会抛出`UnsupportedOperationException`。

## List的特点
1. 允许添加重复的元素
2. 允许添加Null(List.of方法除外);

## 遍历List

### 使用for遍历list
和数组类型一样,遍历`list`完全可以用`for`循环根据索引配合`get(int)`方法遍历;

```java
List<String> list = List.of("Tom", "Jack");
for(int i = 0; i < list.size(); i++) {
    String s = list.get(i);
    System.out.println(s);
}
```
::: tip 并不推荐上面的方法实现,原因如下
1. 代码复杂
2. 因为`get(int)`方法只有`ArrayList`的实现是高效的,换成`LinkedList`后,索引越大,访问速度越慢.
:::


### 使用迭代器Iterator
`Iterator`本身也是一个对象,但它是由`List`实例调用`iterator()`方法时候创建的.`Iterator`知道如何遍历一个`List`,并且不同的`List`类型,返回的`Iterator`对象实现也是不同的,但总是具有最高的访问效率.

Iterator对象有两个方法:
1. `boolean hasNext()`判断是否有下一个元素
2. `E next()`返回下一个元素

```java
List<String> list = List.of("Tom", "Jack");
for(Iterator<String> it = list.iterator(); it.hasNext();) {
    String i = it.next();
    System.out.println(i);
}
```

java的`for each`循环本身可以使用`Iterator`遍历
```java
List<String> list = List.of("Tom", "Jack");
for(String s : list){
    System.out.println(s);
}
```

实际上，只要实现了`Iterable`接口的集合类都可以直接用`for each`循环来遍历，Java编译器本身并不知道如何遍历集合对象，但它会自动把`for each`循环变成`Iterator`的调用，原因就在于`Iterable`接口定义了一个`Iterator<E> iterator()`方法，强迫集合类必须返回一个`Iterator`实例。

## List转换成Array

### toArray()
`toArray()`方法直接返回一个`Object[]`数组
```java
List<String> list = List.of("Tom", "Jack");
Object[] array = list.toArray();
for(Object i : array) {
    System.out.println(i);
}
```
> 这种方法容易丢失类型信息,实际中很少使用

### toArray(T [])
给`toArray(T[])`传入一个类型相同的`Array`，`List`内部自动把元素复制到传入的`Array`中：

```java
List<String> list = List.of("Tom", "Jack");
String [] array = list.toArray(new String[2]);
for(String i : array) {
    System.out.println(i);
}
```

> 到这个`toArray(T[])`方法的泛型参数`<T>`并不是`List`接口定义的泛型参数`<E>`，所以，我们实际上可以传入其他类型的数组

注意:
1. 如果传入类型不匹配的数组,这个方法会抛出`ArrayStoreException`;
2. 如果传入的数组不够大，那么List内部会创建一个新的刚好够大的数组，填充后返回；如果传入的数组比List元素还要多，那么填充完元素后，剩下的数组元素一律填充null。

### T[] toArray(IntFunction<T[]> generator)
```java
List<String> list = List.of("Tom", "Jack");
String [] array = list.toArray(String[]::new);
for(String i : array) {
    System.out.println(i);
}
```

## Array转换成List
使用`List.of()`方法最简单;
```java
Integer[] array = { 1, 2, 3 };
List<Integer> list = List.of(array);
```

> 也可以通过遍历数组,然后使用List新增数组元素实现

## 编写equals方法
`List`内部并不是通过==判断两个元素是否相等，而是使用`equals()`方法判断两个元素是否相等.  
要正确使用List的`contains()`、`indexOf()`这些方法，放入的实例必须正确覆写`equals()`方法，否则，放进去的实例，查找不到  
之所以能正常放入`String`、`Integer`这些对象，是因为Java标准库定义的这些类已经正确实现了`equals()`方法。

`equals()`方法要求我们必须满足以下条件
1. 自反性（Reflexive）：对于非null的x来说，`x.equals(x)`必须返回true
2. 对称性（Symmetric）：对于非null的x和y来说，如果`x.equals(y)`为true，则`y.equals(x)`也必须为true；
3. 传递性（Transitive）：对于非null的x、y和z来说，如果`x.equals(y)`为true，`y.equals(z)`也为true，那么`x.equals(z)`也必须为true；
4. 一致性（Consistent）：对于非null的x和y来说，只要x和y状态不变，则`x.equals(y)`总是一致地返回true或者false；
5. 对null的比较：即`x.equals(null)`永远返回false。

以Person类为例,name与age相等及表示两个实例相同
```java
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Person person)) return false;
    return age == person.age && Objects.equals(name, person.name);
}
```
equals()方法编写方法
1. 先确定实例`相等`的逻辑,即哪些字段相等,就为实例相等
2. 用`instanceof`判断传入的待比较的`Object`是不是当前类型,如果是则进行比较,否则返回false
3. 对引用类型用`Object.equals()`比较,对基本类型直接使用`==`比较

## 接口方法

### boolean add(E e)
在末尾添加一个元素

### boolean add(int index, E e)
指定索引添加一个元素

### E remove(int index)
删除指定索引元素

### boolean remove(Object e)
删除某个元素

### E get(int index)
获取指定索引的元素

### int size()
获取链表大小

### boolean contains(Object o)
list是否包含某个指定元素

### int indexOf(Object o)
返回某个元素的索引,如果元素不存在就返回`-1`