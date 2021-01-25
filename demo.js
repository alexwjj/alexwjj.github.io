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
	remove(ob) {
		let index = this.obers.indexOf(ob)
		delete this.obers.splice(index,1)
	}
}

class Ob {
	update(...args) {
		console.log(...args);
	}
}

let ob1 = new Ob()
let ob2 = new Ob()

let sub = new Sub()

sub.add(ob1)
sub.add(ob2)
sub.remove(ob2)
sub.notify('hhh')
