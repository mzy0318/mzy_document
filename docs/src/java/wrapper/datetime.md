---
title: 日期时间
---

# 日期时间

- 世界标准时间：格林尼治时间/格林威治时间简称`GMT`。目前世界标准时间（UTC）已经替换为：原子钟。
- 中国标准时间：世界标准时间 +8
- 时间单位换算：
    - 1秒 = 1000毫秒
    - 1毫秒 = 1000微秒
    - 1微秒 = 1000纳秒


## Date时间类
Date类是一个JDK写好的Javabean类，用来描述时间，精确到秒。  
利用空参构造创建对象，默认表示系统当前时间。  
利用有参构造创建对象，表示指定的时间。 

### Date()
空参构造返回当前时间
```java
Date d = new Date();  // Sun Jan 07 21:30:16 CST 2024
```

### Date(Long time)
有参数构造返回指定时间  
- time：毫秒值
```java
Date d = new Date(1000L);  // Thu Jan 01 08:00:01 CST 1970
```

### setTime(Long time)
设置时间对象里面的毫秒值
- time：毫秒值
```java
Date d = new Date();
d.setTime(1000L);  // Thu Jan 01 08:00:01 CST 1970
```

### Long getTime()
返回时间对象的毫秒值
```java
Date d = new Date(1000L);
long time = d.getTime();  // 1000
```


## SimpleDateFormat
 
 作用  
- 格式化：把时间变成需要的格式
- 解析：把字符串表示的时间转换成`Date`对象

### SimpleDateFormat()
利用空参构造创建`SimpleDateFormat`对象，使用默认格式
```java
SimpleDateFormat sdf = new SimpleDateFormat();
Date d = new Date(0L);
String format = sdf.format(d);  // 1970/1/1 上午8:00
```

### SimpleDateFormat(String format)
利用有空参构造创建`SimpleDateFormat`对象，使用指定格式
```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date d = new Date(0L);
String format = sdf.format(d);  // 1970-01-01 08:00:00
```

### Date parse(String source)
```java
String str = "2024-01-08 21:52:59";
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = sdf.parse(str);  // Mon Jan 08 21:52:59 CST 2024
```
::: warning 提示
创建`SimpleDateFormat`对象传入的格式要与被`解析的时间字符串格式`相同
:::

## Calendar
Calendar代表了系统当前时间的日历对象，可以单独修改、获取时间中年，月，日。

::: warning 提示
Calendar是一个抽象类，不能直接创建对象
:::

| 方法名 | 说明 |
| --- |  --- |
| public final Date getTime() | 获取日期对象 |
| public final setTime(Date date) | 给日历设置日期对象 |
| public long getTimeInMillis() | 拿到时间的毫秒值 |
| public void setTimeInMillis(long millis) | 给日历设置毫秒值 |
| public int get(int field) | 获取日历中的某个字段信息 |
| public void set(int field, int value) | 修改日历的某个字段信息 |
| public void add(int field, int amount) | 为某个字段增加/减少指定的值 |

::: warning 提示
上面表格中的`field`参数可以使用`Calendar`类里面的常量，不用特殊记忆
:::

### 获取日历对象
```java
Calendar instance = Calendar.getInstance();
```
注：
1. `Calendar`是一个抽象类，不能通过new获取，需要通过一个静态方法获取到子类对象
2. `Calendar`子类对象实例会把时间中的纪元、年、月、日、时、分、秒、星期等都放到一个数组当中
2. 月份的范围是`0~11`（这一点同Javascript）
3. 星期范围是`1~7`，其中`1`代表`星期日`

## ZoneId时区
| 方法名 | 说明 |
| --- | --- |
| static Set\<String\> getAvailableZoneIds() | 获取Java中支持的所有时区 |
| static ZoneId systemDefault() | 获取系统默认时区 |
| static ZoneId of(String zoneId) | 获取一个指定时区 |


```java
ZoneId zoneId = ZoneId.systemDefault(); //  Asia/Shanghai
ZoneId zoneId = ZoneId.of("Asia/Shanghai"); //  Asia/Shanghai
```

## Instant时间戳
| 方法名 | 说明 |
| --- | --- |
| static Instant now() | 获取当前时间的Instant对象（标准时间） |
| static Instant ofXxx(Long epochMilli) | 根据秒/毫秒/纳秒获取Instant对象 |
| ZonedDateTime atZone(ZoneId one) | 指定时区 |
| boolean isXxx(Instant otherInstant) | 判断系列方法 |
| Instant minusXxx(long millisToSubtract) | 减少时间系列方法 |
| Instant plusXxx(long millisToSubtract) | 增加时间系列方法 |

```java
// now
 Instant.now();  // 2024-01-13T14:18:33.113700200Z
 // ofXxx()
 Instant.ofEpochMilli(0L); // 1970-01-01T00:00:00Z
 Instant.ofEpochSecond(1L); // 1970-01-01T00:00:01Z
 Instant.ofEpochSecond(1L, 1000000000L); // 1970-01-01T00:00:02Z
 // atZone
 Instant.now().atZone(ZoneId.of("Asia/Shanghai")); // 2024-01-13T22:35:26.241863600+08:00[Asia/Shanghai]
 // isXxx()
 Instant instant = Instant.ofEpochMilli(1L);
Instant instant1 = Instant.ofEpochMilli(100L);

instant.isAfter(instant1);  // false
instant.isBefore(instant1); // true

// minusXxx
Instant instant = Instant.ofEpochMilli(40000L);  // 1970-01-01T00:00:40Z
instant.minusSeconds(1L);  // 1970-01-01T00:00:39Z

// plusXxx
Instant instant = Instant.ofEpochMilli(40000L);  // 1970-01-01T00:00:40Z
instant.plusSeconds(1L);  // 1970-01-01T00:00:41Z
```

## ZoneDateTime带时区的时间
| 方法名 | 说明 |
| :--- | :--- |
| static ZoneDateTime now() | 获取当前时间的ZoneDateTime对象 |
| static ZoneDateTime ofXxx() | 获取指定时间的ZoneDateTime对象 |
| ZoneDateTime withXxx(时间) | 修改时间系列 |
| ZoneDateTime minusXxx(时间) | 减少时间系列 |
| ZoneDateTime plusXxx(时间) | 增加时间系列 |

```java
// now
ZonedDateTime.now(); // 2024-01-14T07:25:13.275647300+08:00[Asia/Shanghai]
// ofXxx
ZonedDateTime.of(2024, 1, 14, 7, 28, 10, 0, ZoneId.of("Asia/Shanghai"));  //2024-01-14T07:28:10+08:00[Asia/Shanghai]

ZoneId zoneId = ZoneId.of("Asia/Shanghai");
Instant instant = Instant.now();
ZonedDateTime.ofInstant(instant, zoneId);  // 2024-01-14T09:08:37.925537200+08:00[Asia/Shanghai]

// withXxx
ZonedDateTime now = ZonedDateTime.now();
now.withYear(2023);  // 2023-01-14T09:12:18.661341300+08:00[Asia/Shanghai]

// minusXxx
ZonedDateTime now = ZonedDateTime.now();
now.minusYears(2);  // 2022-01-14T09:13:49.271021500+08:00[Asia/Shanghai]

// plusXxx
ZonedDateTime now = ZonedDateTime.now();
now.plusYears(2);  // 2026-01-14T09:14:49.048675200+08:00[Asia/Shanghai]
```

::: info 注意
JDK8所提供的时间对象都是不可变的，如果修改、增加或减少时间只会产生一个新的时间对象
:::

## DateTimeFormatter时间格式化或解析
| 方法名 | 说明 |
| :--- | :--- |
| static DateTimeFormatter ofPattern(String 格式) | 获取格式对象 |
| String format(时间对象) | 按照指定方式格式化 |

```java
ZonedDateTime time = Instant.now().atZone(ZoneId.of("Asia/Shanghai"));
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
dateTimeFormatter.format(time);  // 2024-01-14
```

## LocalDate、LocalTime、LocalDateTime
| 方法名 | 说明 |
| :--- | :--- |
| static xxx now() | 获取当前的时间对象 |
| static xxx of() | 获取指定时间的对象 |
| get开头的方法 | 获取日历中的年、月、日、时、分、秒 |
| isBefore，isAfter | 比较两个LocalDate |
| with开头 | 修改时间系统方法 |
| minus开头 | 减少时间系列的方法 |
| plus开头 | 增加时间系列的方法 |
| public LocalDate toLocalDate() | LocalDateTime转换成一个LocalDate对象 |
| public LocalDate toLocalTime() | LocalDateTime转换成一个LocalTime对象 |

```java
LocalDate localDate = LocalDate.now();
Month month = localDate.getMonth();  // JANUARY
int monthValue = localDate.getMonthValue();  // 1
```

## Duration、Period、ChronoUnit

- Duration：用于计算两个`时间`间隔（秒，纳秒）
- Period：用于计算两个`日期`间隔（年、月、日）
- ChronoUnit：用于计算两个`日期`间隔

```java
// period
LocalDate now = LocalDate.now();
LocalDate localDate = LocalDate.of(2000, 2, 12);
Period between = Period.between(localDate, now);
int years = between.getYears();  // 23
int months = between.getMonths();  // 11
int days = between.getDays(); // 2

// duration
LocalDateTime now = LocalDateTime.now();
LocalDateTime localDateTime = LocalDateTime.of(2000, 2, 12, 12, 23, 59);
Duration duration = Duration.between(localDateTime, now);
long days = duration.toDays(); 
long hours = duration.toHours();
long minutes = duration.toMinutes();

// ChronoUnit 计算时间间隔常用方法
LocalDateTime now = LocalDateTime.now();
LocalDateTime localDateTime = LocalDateTime.of(2000, 2, 12, 12, 23, 59);
long days = ChronoUnit.DAYS.between(localDateTime, now);
long years = ChronoUnit.YEARS.between(localDateTime, now);
```

::: tip 注意
上述对象的`between`方法计算是规则是：后一个参数减去前一个参数（因此后面的参数要比前面的参数要靠后）
:::
