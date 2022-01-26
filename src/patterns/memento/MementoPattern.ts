//备忘录
class Memento {
    private state: string;

    constructor(state: string) {
        this.state = state;
    }

    setState(state: string) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}

//发起人
class Originator {
    private state?: string;

    setState(state: string) {
        this.state = state;
    }

    getState() {
        return this.state!;
    }

    createMemento() {
        return new Memento(this.state!);
    }

    restoreMemento(m: Memento) {
        this.setState(m.getState());
    }
}

//管理者
class Caretaker {
    private memento?: Memento;

    setMemento(m: Memento) {
        this.memento = m;
    }

    getMemento() {
        return this.memento!;
    }
}

function main() {
    let originator = new Originator();
    let caretaker = new Caretaker();

    originator.setState("state1");
    console.log("初始状态：" + originator.getState());

    caretaker.setMemento(originator.createMemento()); // 保存状态

    originator.setState("state2");
    console.log("新的状态：" + originator.getState());

    originator.restoreMemento(caretaker.getMemento()); // 恢复状态
}
