class CompositeInvoker {
    private commands: Array<AbstractCommand>;

    constructor() {
        this.commands = [];
    }

    add(command: AbstractCommand) {
        this.commands.push(command);
    }

    remove(command: AbstractCommand) {
        let index = this.commands.indexOf(command);
        if (index > -1) {
            this.commands.splice(index, 1);
        }
    }

    execute() {
        for (const iterator of this.commands) {
            iterator.execute();
        }
    }
}

interface AbstractCommand {
    execute: () => void;
}

class ConcreteCommand1 implements AbstractCommand {
    private receiver: CompositeReceiver;

    constructor() {
        this.receiver = new CompositeReceiver();
    }

    execute() {
        this.receiver.action1();
    }
}

class ConcreteCommand2 implements AbstractCommand {
    private receiver: CompositeReceiver;

    constructor() {
        this.receiver = new CompositeReceiver();
    }

    execute() {
        this.receiver.action2();
    }
}

class CompositeReceiver {
    action1() {}

    action2() {}
}

function main3() {
    let command1 = new ConcreteCommand1();
    let command2 = new ConcreteCommand2();
    let invoker = new CompositeInvoker();
    invoker.add(command1);
    invoker.add(command2);
    invoker.execute();
}
