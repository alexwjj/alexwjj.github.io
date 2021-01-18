class Sub {
	constructor() {
		this.obers = []
	}

	add(ob) {
		this.obers.push(ob)
	}

	notify(...args) {
		this.obers.forEach(ob => ob.update(...args))
	}
}

class Ob {
	update(...args) {
		console.log(...args)
	}
}

let ob1 = new Ob();
let ob2 = new Ob();

let sub = new Sub();

sub.add(ob1)
sub.add(ob2)


sub.notify('目标发生了变化')