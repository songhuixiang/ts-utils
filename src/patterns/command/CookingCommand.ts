class Waiter {
    private hefen?: Breakfast;
    private changfen?: Breakfast;
    private huntun?: Breakfast;

    setHeFen(hefen: Breakfast) {
        this.hefen = hefen;
    }

    setChangfen(changfen: Breakfast) {
        this.changfen = changfen;
    }

    setHunTun(huntun: Breakfast) {
        this.huntun = huntun;
    }

    chooseHeFen() {
        this.hefen?.cooking();
    }

    chooseChangeFen() {
        this.changfen?.cooking();
    }

    chooseHunTun() {
        this.huntun?.cooking();
    }
}

interface Breakfast {
    cooking: () => void;
}

class HeFen implements Breakfast {
    private receiver: HeFenChef;

    constructor() {
        this.receiver = new HeFenChef();
    }

    cooking() {
        this.receiver.cooking();
    }
}

class HunTun implements Breakfast {
    private receiver: HunTunChef;

    constructor() {
        this.receiver = new HunTunChef();
    }

    cooking() {
        this.receiver.cooking();
    }
}

class ChangFen implements Breakfast {
    private receiver: ChangFenChef;

    constructor() {
        this.receiver = new ChangFenChef();
    }

    cooking() {
        this.receiver.cooking();
    }
}

class HeFenChef {
    cooking() {
        console.log("接收者");
    }
}

class ChangFenChef {
    cooking() {
        console.log("接收者");
    }
}

class HunTunChef {
    cooking() {
        console.log("接收者");
    }
}

function main2() {
    let huntun: Breakfast = new HunTun();
    let changfen: Breakfast = new ChangFen();
    let hefen: Breakfast = new HeFen();
    let waiter = new Waiter();
    waiter.setChangfen(changfen);
    waiter.setHeFen(hefen);
    waiter.setHunTun(huntun);
    waiter.chooseHeFen();
    waiter.chooseChangeFen();
    waiter.chooseHunTun();
}
