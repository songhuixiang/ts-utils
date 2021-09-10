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
