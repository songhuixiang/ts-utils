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
