const trottle= (fn, delay=500)=> {
	let timer = null;
	return function() {
		if (timer) return;
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		},delay);
	}
}