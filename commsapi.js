const cm = {
	nonces: [],
	vclisteners: [],
	set: function (v) {
		idb.set(user.uid)
		let nonce = ranGenerate(16);
		this.nonces.push(nonce)

		db.set(Object.assign({}, v, {
			from: user.uid,
			to: "server",
			nonce
		}));
	},
	onvalue: function (v) {
		this.vclisteners.push(v);
	},
	onrun: function (v) {
		if (!v.val()) {
			return
		}
		if (!v.val().nonce) {
			return
		}
		if (this.nonces.includes(v.val().nonce) && v.val().from == "server") {
			this.nonces.splice(this.nonces.indexOf(v.val().nonce), 1);

			for (i in this.vclisteners) {

				this.vclisteners[i](v);
			}
		} else {

		}
	}

}


firebase.auth().onAuthStateChanged(function (fuser) {

	if (fuser) {

		user = fuser;
		db = firebase.database().ref("users/" + fuser.uid);
		idb = firebase.database().ref("userreq");
		db.on("value", (v) => {
			cm.onrun(v)
		});


	}
})