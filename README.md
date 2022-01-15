# 防抖 debounce

创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 func 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。

**注意**

如果 leading 和 trailing 选项为 true, 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用防抖方法。 如果 wait 为 0 并且 leading 为 false, func 调用将被推迟到下一个点，类似 setTimeout 为 0 的超时。

**例子**

```typescript
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on("resize", _.debounce(calculateLayout, 150));

// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on("click", _.debounce(sendMail, 300, { leading: true, trailing: false }));

// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { maxWait: 1000 });
var source = new EventSource("/stream");
jQuery(source).on("message", debounced);

// 取消一个 trailing 的防抖动调用
jQuery(window).on("popstate", debounced.cancel);
```

第三个参数 options

-   leading，函数在每个等待时延的开始被调用，默认值为 false
-   trailing，函数在每个等待时延的结束被调用，默认值是 true

可以根据不同的值来设置不同的效果：

-   leading-false，trailing-true：默认情况，即在延时结束后才会调用函数
-   leading-true，trailing-true：在延时开始时就调用，延时结束后也会调用
-   leading-true, trailing-false：只在延时开始时调用

# 节流 throttle

创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。

**注意**

如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用。

如果 wait 为 0 并且 leading 为 false, func 调用将被推迟到下一个点，类似 setTimeout 为 0 的超时。

**例子**

```typescript
// 避免在滚动时过分的更新定位
jQuery(window).on("scroll", _.throttle(updatePosition, 100));

// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { trailing: false });
jQuery(element).on("click", throttled);

// 取消一个 trailing 的节流调用。
jQuery(window).on("popstate", throttled.cancel);
```

# 事件 events

-   **emit** is used to trigger an event
-   **on** is used to add a callback function that's going to be executed when the event is triggered

**例子**

```typescript
const emitter = new Emitter();

// Create FirstEvent
const firstEvent = emitter.createEvent<(data: string) => void>();
// Create SecondEvent
const secondEvent = emitter.createEvent<(data: string) => void>();

// Create CompositeDisposable
const disposable = new CompositeDisposable();

// Subscribe FirstEvent
disposable.add(
    firstEvent.on((data) => {
        console.log(data);
    })
);
// Subscribe SecondEvent
disposable.add(
    secondEvent.on((data) => {
        console.log(data);
    })
);

// Raising FirstEvent
firstEvent.emit("This is my first event emitter example.");
// Raising SecondEvent
secondEvent.emit("This is my second event emitter example.");

// Remove firstEvent and secondEvent listener
disposable.dispose();
```

# 随机数 random

**例子**

```typescript
import { random } from "../random";

random.integer(); // min <= random integer <= max, default min = 0, max = 1
// => 0
random.integer(-20, 20);
// => 5

random.float(); // min <= random float < max, default min = 0, max = 1, fixed = 4
// => 0.6332
random.float(0, 100); // 默认保留小数点后4位
// => 79.9663
random.float(0, 100, 8); // 保留小数点后8位
// => 68.57537504

random.boolean(); // The default percent of success (returning true) is 50%.
// => true
random.boolean(30); // The percent of success (returning true) is 30%.
// => false

const array = ["a", "b", "c", "d", "e"];
random.pick(array); // Given an array, pick a random element and return it
// => "c"
random.pick(array, 2); // Given an array, returns a random array with 'count' elements
// => ["e", "d"]

random.shuffle(array); // 洗牌: Given an array, scramble the order and return it.
// => ["c", "b", "e", "a", "d"]

random.weighted(["a", "b"], [100, 1]); // 权重随机: Returns a single item from an array with relative weighting of odds
// => "a"
random.weighted(["a", "b", "c", "d"], [1, 2, 3, 4]);
// => "c"
// 没有要求权重的总和必须是什么特定的值，它们都是相对于彼此的，所以下面用例都是等价的:
random.weighted(["a", "b", "c", "d"], [1, 2, 3, 4]);
random.weighted(["a", "b", "c", "d"], [0.1, 0.2, 0.3, 0.4]);
random.weighted(["a", "b", "c", "d"], [100, 200, 300, 400]);
random.weighted(["a", "b", "c", "d"], [17, 34, 51, 68]);
random.weighted(["a", "b", "c", "d"], [0.17, 0.34, 0.51, 0.68]);

random.inCircle(); // Generate Random Point in a Circle. Default is an Unit Circle: radius=1,center=(0, 0)
// => {"x":-0.30327339876832515,"y":0.18381702162703573}
random.inCircle(10, 1, 2); // radius = 10, center = (1, 2)
// => {"x":-1.9693680953321921,"y":6.181187463756997}

random.onCircle(); // Generate Random Point on a Circle. Default is an Unit Circle: radius=1,center=(0, 0)
// => {"x":-0.6565330839458833,"y":0.7542972290049247}
random.onCircle(10, 1, 2); // radius = 10, center = (1, 2)
// => {"x":-5.8026766001216075,"y":9.329637854229766

random.normal(); // 默认情况下，均值为0，标准差为1，即标准正态分布。
// => 0.5223593379226711
random.normal(100, 15); // 例如，要获得一个随机的智商(它的平均值是100，标准偏差是15)，这是获得更真实结果的一种非常强大的方法，因为“纯随机”往往无法接近真实世界。
// => 93.9885340699105
```

```typescript
import { seedrandom } from "../seedrandom";

let random1 = new seedrandom(12345);
let random2 = new seedrandom(12345);

// These yield the same values, in sequence
console.log(random1.random());
console.log(random2.random());

let random3 = new seedrandom("one");
let random4 = new seedrandom("two");

// These will be different
console.log(random3.random());
console.log(random4.random());
```

# 通用类型 types

为 TypeScript 项目提供一组通用类型，这些类型是惯用的，是现有 TypeScript 映射类型的补充。

**Primitive**

-   在 JavaScript 中，(primitive types)基本类型为: string | number | bigint | boolean | symbol | null | undefined

```typescript
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;
export const isPrimitive = (val: unknown): val is Primitive => {
    if (val === null || val === undefined) return true;
    return ["string", "number", "bigint", "boolean", "symbol"].includes(typeof val);
};
```

**Falsy**

-   在 TypeScript 中表示错误值的类型：false | "" | 0 | null | undefined

```typescript
export type Falsy = false | "" | 0 | null | undefined;
export const isFalsy = (val: unknown): val is Falsy => !val;
```

**Nullish**

-   在 TypeScript 中表示空值的类型：null | undefined

```typescript
export type Nullish = null | undefined;
export const isNullish = (val: unknown): val is Nullish => val == null;
```

**DeepReadonly\<T\>**

-   使对象类型的所有属性为只读

**ElementType\<T, K\>**

-   获取数组、元组或类型为 T 的对象中匹配给定索引类型 K 的元素的类型

```typescript
type Props = { name: string; age: number; visible: boolean };
// Expect: string
type NameType = ElementType<Props, "name">;

type Tuple = [boolean, number];
// Expect: boolean
type A = ElementType<Tuple, 0>;
// Expect: number
type B = ElementType<Tuple, 1>;

type Arr = boolean[];
// Expect: boolean
type ItemsType = ElementType<Arr, number>;

type Obj = { [key: string]: number };
// Expect: number
type ValuesType = ElementType<Obj, string>;
```

**Keys\<T\>**

-   获取对象类型 T 中所有键的联合类型

```typescript
type Props = { name: string; age: number; visible: boolean };

// Expect: "name" | "age" | "visible"
type PropsKeys = Keys<Props>;
```

**Values\<T\>**

-   获取对象类型 T 中所有值的联合类型

```typescript
type Props = { name: string; age: number; visible: boolean };

// Expect: string | number | boolean
type PropsValues = Values<Props>;
```

**Diff\<T, U\>**

-   获取给定对象类型 T 和 U 的集合差(T \ U)

```typescript
type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

// Expect: { name: string; visible: boolean; }
type RequiredProps = Diff<Props, DefaultProps>;
```

**Intersection\<T, U\>**

-   选取对象类型 T 和 U 的交叉属性

```typescript
type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number; address: string };

// Expect: { age: number; }
type DuplicatedProps = Intersection<Props, DefaultProps>;
```

**Subtract\<T, U\>**

-   从 T 中移除 U 中存在的属性(U 具有 T 的属性的子集)

```typescript
type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

// Expect: { name: string; visible: boolean; }
type RequiredProps = Subtract<Props, DefaultProps>;
```

**Optional\<T, K\>**

-   从 T 使一组属性键 K 成为可选的

```typescript
type Props = { name: string; age: number; visible: boolean };

// Expect: { name?: string; age?: number; visible?: boolean; }
type Props1 = Optional<Props>;
// Expect: { name: string; age?: number; visible?: boolean; }
type Props2 = Optional<Props, "age" | "visible">;
```

# 工具集 utils

## 为 Promise 添加超时限制 timeoutPromise

Sometimes a promise may take too long to resolve or reject, and sometimes we just can’t wait for it.

**Using Promise.race**

-   顾名思义，Promise.race 就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

**例子**

```typescript
const doSomething = function () {
    return new Promise<string>((resolve, reject) => {
        delay(3).then(() => {
            resolve("done");
        });
    });
};

// Apply a timeout of 5 seconds to doSomething
let doIt = timeoutPromise(doSomething(), 5);

// Wait for the promise to get resolved
doIt.then((response) => {
    // Use response
    console.log("doSomething completed");
});

// Wait for the promise to get rejected or timed out
doIt.catch((error) => {
    // Deal with error
    console.log("Timeout exceeded");
});
```
