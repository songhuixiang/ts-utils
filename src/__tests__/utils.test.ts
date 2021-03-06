/** 
import { CompositeDisposable, Emitter } from "../events";
test("events", () => {
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

    // Remove all listeners
    disposable.dispose();
});
*/

// import { timeoutPromise, delay, arrayDiff } from "../utils";
/** 
test("timeoutPromise", () => {
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

    return doIt;
});
*/

/** 
test("arrayDiss", () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3, 4, 5];
    console.log(arrayDiff(array1, array2)); // [4, 5]
});
*/

/** 
import { random } from "../random";
test("random", () => {
    random.integer(); // min <= random integer <= max, default min = 0, max = 1
    // => 0
    random.integer(-20, 20);
    // => 5

    random.float(); // min <= random float < max, default min = 0, max = 1, fixed = 4
    // => 0.6332
    random.float(0, 100); // ????????????????????????4???
    // => 79.9663
    random.float(0, 100, 8); // ??????????????????8???
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

    random.shuffle(array); // ??????: Given an array, scramble the order and return it.
    // => ["c", "b", "e", "a", "d"]

    random.weighted(["a", "b"], [100, 1]); // ????????????: Returns a single item from an array with relative weighting of odds
    // => "a"
    random.weighted(["a", "b", "c", "d"], [1, 2, 3, 4]);
    // => "c"
    // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????:
    random.weighted(["a", "b", "c", "d"], [1, 2, 3, 4]);
    random.weighted(["a", "b", "c", "d"], [0.1, 0.2, 0.3, 0.4]);
    random.weighted(["a", "b", "c", "d"], [100, 200, 300, 400]);
    random.weighted(["a", "b", "c", "d"], [17, 34, 51, 68]);
    random.weighted(["a", "b", "c", "d"], [0.17, 0.34, 0.51, 0.68]);

    random.inCircle(); // Generate Random Point in a Circle. Default is an Unit Circle: radius=1,center=(0,0)
    // => {"x":-0.30327339876832515,"y":0.18381702162703573}
    random.inCircle(10, 1, 2); // radius = 10, center = (1, 2)
    // => {"x":-1.9693680953321921,"y":6.181187463756997}

    random.onCircle(); // Generate Random Point on a Circle. Default is an Unit Circle: radius=1,center=(0,0)
    // => {"x":-0.6565330839458833,"y":0.7542972290049247}
    random.onCircle(10, 1, 2); // radius = 10, center = (1, 2)
    // => {"x":-5.8026766001216075,"y":9.329637854229766}

    random.normal(); // ???????????????????????????0???????????????1???????????????????????????
    // => 0.5223593379226711
    random.normal(100, 15); // ???????????????????????????????????????(??????????????????100??????????????????15)?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    // => 93.98853406991051
});
*/

// import { Diff, ElementType, Intersection, Keys, Optional, Subtract, Values } from "../types";
// import Chance from "chance";
// test("types", () => {
/** 
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
    */
/** 
    type Props = { name: string; age: number; visible: boolean };

    // Expect: "name" | "age" | "visible"
    type PropsKeys = Keys<Props>;
    let a: PropsKeys = "name";
    */
// type Props = { name: string; age: number; visible: boolean };
// Expect: string | number | boolean
// type PropsValues = Values<Props>;
// type Props = { name: string; age: number; visible: boolean };
// type DefaultProps = { age: number };
// Expect: { name: string; visible: boolean; }
// type RequiredProps = Diff<Props, DefaultProps>;

// type Props = { name: string; age: number; visible: boolean };
// type DefaultProps = { age: number; address: string };

// Expect: { age: number; }
// type DuplicatedProps = Intersection<Props, DefaultProps>;

// type Props = { name: string; age: number; visible: boolean };
// type DefaultProps = { age: number };

// Expect: { name: string; visible: boolean; }
// type RequiredProps = Subtract<Props, DefaultProps>;

// type Props = { name: string; age: number; visible: boolean };

// Expect: { name?: string; age?: number; visible?: boolean; }
// type Props1 = Optional<Props>;
// Expect: { name: string; age?: number; visible?: boolean; }
// type Props2 = Optional<Props, "age" | "visible">;
// });

// import { seedrandom } from "../seedrandom";
// test("seedrandom", () => {
//     let random1 = new seedrandom(12345);
//     let random2 = new seedrandom(12345);

//     // These yield the same values, in sequence
//     console.log(random1.random());
//     console.log(random2.random());

//     let random3 = new seedrandom("one");
//     let random4 = new seedrandom("two");

//     // These will be different
//     console.log(random3.random());
//     console.log(random4.random());
// });

import { HttpClient } from "../httpclient";
test("httpclient", async () => {
    // const httpServer = new HttpClient("http://119.29.27.76:9001/");
    // let ret = await httpServer.get("login?prodect=1");
    // console.log("serverlist http response ", ret);

    // const gameId = 1;
    // const channel = "apple";
    // const msg = "shx";
    // const data = `game_id=${gameId}&game_channel=${channel}&nickname=${msg}`;
    const iwpServerUrl = new HttpClient("https://iwppublic.shx.cn");
    // let ret = JSON.parse((await iwpServerUrl.post("/wechat/checknickname", 5000, data, "application/x-www-form-urlencoded")) as string);
    // console.log("????????????????????? ", ret);
    // if (ret.code === "0") {
    //     console.log("post success");
    // } else {
    //     console.log("????????????");
    // }

    const key = "abc";
    const playerId = 111;
    const gameId = 111;
    let ret = await iwpServerUrl.post("/client/v1/cdkey/exchange", 5000, `cdkey=${key}&user_id=${playerId}&game_id=${gameId}`);
    console.log(JSON.parse(ret as string));
});
