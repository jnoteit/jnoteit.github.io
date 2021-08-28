const cm = {
	nonces: [],
	vclisteners: [],
	set: function (v) {
		if (chasUser) {
			idb.set(user.uid)
		} else {
			idb.set("anom")
		}
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
		commsSetup(true)



	}
})
chasUser = "undef"

function commsSetup(hasUser) {
	if (chasUser != "undef") {
		return console.log("has already setup as " + chasUser)
	}
	chasUser = hasUser;
	if (hasUser) {
		idb = firebase.database().ref("userreq");
		db = firebase.database().ref("users/" + user.uid);
	} else {
		user = {
			uid: false
		}
		idb = firebase.database().ref("userreq");
		db = firebase.database().ref("anom/");
	}
	db.on("value", (v) => {
		cm.onrun(v)
	});
}