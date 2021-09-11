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

import { timeoutPromise, delay, arrayDiff } from "../utils";
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

test("arrayDiss", () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3, 4, 5];
    console.log(arrayDiff(array1, array2)); // [4, 5]
});
