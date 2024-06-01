---
title: 流
---

# 流

结合Lambda表达式，简化集合、数据的操作


## 获取流

| 获取方式 | 方法名 | 说明 |
| :--- | :--- | :--- |
| 单列集合 | default Stream\<E\> stream() | Collection默认方法 |
| 双列集合 | 无 | 无法直接使用stream流 |
| 数组 | public static\<T\> Stream\<T\> stream(T[] array) | Arrays工具类中的静态方法 |
| 一堆零散数据（必须为同种数据类型） | public static\<T\> Stream\<T\> of(T[] array) | Stream接口中的静态方法 |

```java
// 单列集合
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "a", "b", "c", "d", "e");
list.stream().forEach(System.out::println);

// 双列集合
HashMap<String, Integer> hm = new HashMap<>();
hm.put("aaa", 111);
hm.put("bbb", 222);
hm.put("ccc", 333);
hm.put("ddd", 444);
hm.keySet().stream().forEach(System.out::println);   // aaa  bbb  ccc  ddd
hm.entrySet().stream().forEach(System.out::println); // aaa=111  bbb=222  ccc=333  ddd=444
hm.values().stream().forEach(System.out::println);  // 111  222  333  444

// 数组
int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};
Arrays.stream(arr).forEach(System.out::println);

// 零散数据
Stream.of(1,2,3,4).forEach(System.out::println);
```

::: danger 注意
`Stream.of()`方法的形参是一个`可变参数`，可以传递`零散的数据`，也可以传递`数组`。
如果参数是数组的时候，数组成员必须是`引用数据类型`，不能是基本数据类型
:::

## 中间方法

| 名称 | 说明 |
| :--- | :--- |
| Stream\<T\> filter(Predicate\<? super T\> predicate) | 过滤 |
| Stream\<T\> limit(long maxSize) | 获取前几个元素 |
| Stream\<T\> skip(long n) | 跳过前几个元素 |
| static\<T\> Stream\<T\> concat(Stream a, Stream b) | 合并a和b两个流为一个流 |
| Stream\<R\> map(function<T, R> mapper) | 转换流中的数据类型 |
| Stream\<T\> distinct() | 元素去重（依赖hashCode和equals方法） |


```java
// map中间方法
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"张三丰-20", "赵敏-23", "张小明-30");
list.stream().map(e -> Integer.parseInt(e.split("-")[1])).forEach(System.out::println);  // 20  23  30
```

::: danger 注意
1. 中间方法返回新的Stream流，原来的Stream流只能使用一次，建议使用链式编程 
2. 修改Stream流中的数据，不会影响原来集合或数组中的数据
:::

## 终结方法
| 名称 | 说明 |
| :--- | :--- |
| void forEach(Consumer action) | 遍历 |
| long count() | 统计 |
| toArray() | 收集流中的数据，放到数组中 |
| collect(Collector collector) | 收集流中的数据，放到集合中 |


```java
// toArray方法--指定具体的参数
String[] arrayString = {"a", "b", "c", "d", "e"};
String[] array = Arrays.stream(arrayString).toArray(value -> new String[value]);
System.out.println(Arrays.toString(array));

// toArray方法--不指定具体的参数
String[] arrayString = {"a", "b", "c", "d", "e"};
Object[] array = Arrays.stream(arrayString).toArray();

// collect 收集到List集合
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"张三丰-男-20", "赵敏-女-23", "张小明-男-30");
List<String> collect = list.stream()
        .filter(s -> "男".equals(s.split("-")[1]))
        .collect(Collectors.toList());

// collect 收集到Set集合
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"张三丰-男-20", "赵敏-女-23", "张小明-男-30");
Set<String> collect = list.stream()
        .filter(s -> "男".equals(s.split("-")[1]))
        .collect(Collectors.toSet());
        
// collect 收集到Map集合
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"张三丰-男-20", "赵敏-女-23", "张小明-男-30");
Map<String, Integer> collect = list.stream()
        .filter(s -> "男".equals(s.split("-")[1]))
        .collect(Collectors.toMap(s -> s.split("-")[0], m -> Integer.parseInt(m.split("-")[2])));
```