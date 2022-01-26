// 调用者
class Invoker {
    private command: Command;

    constructor(command: Command) {
        this.command = command;
    }

    setCommand(command: Command) {
        this.command = command;
    }

    call() {
        console.log("调用者执行命令");
        this.command.execute();
    }
}

// 抽象命令
interface Command {
    execute: () => void;
}

// 具体命令
class ConcreteCommand implements Command {
    private receiver: Receiver;

    constructor() {
        this.receiver = new Receiver();
    }

    execute() {
        console.log("command is executed.");
        this.receiver.action();
    }
}

// 接受者
class Receiver {
    action() {
        console.log("receiver's action is called.");
    }
}

function main1() {
    let command = new ConcreteCommand();
    let invoker = new Invoker(command);
    invoker.call();
}

// Undo and Redo
interface Command1 {
    execute: () => void;
    undo: () => void;
}

class Unit {
    private _x: number;
    private _y: number;

    constructor() {
        this._x = 0;
        this._y = 0;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public moveTo(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}

class MoveUnitCommand implements Command1 {
    private unit: Unit;
    private x: number;
    private y: number;
    private xBefore: number;
    private yBefore: number;

    constructor(unit: Unit, x: number, y: number) {
        this.unit = unit;
        this.x = x;
        this.y = y;
        this.xBefore = 0;
        this.yBefore = 0;
    }

    execute() {
        this.xBefore = this.unit.x;
        this.yBefore = this.unit.y;

        this.unit.moveTo(this.x, this.y);
    }

    undo() {
        this.unit.moveTo(this.xBefore, this.yBefore);
    }
}
