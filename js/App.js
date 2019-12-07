class App {

	constructor(){
		this.initialize();
		this.situation = "closed";
		this.time;
		this.startTime;
		this.endTime;
		this.username;
	}

	initialize(){

		this.btnStart = document.getElementById("start");
		this.targetCircle = document.getElementById("target-click");

		this.targetCircle.addEventListener("click", e=>{

			if (this.situation == "waiting") {
				this.situation = "closed";
				this.targetCircle.classList.remove("ready");
				this.btnStart.classList.remove("disabled");
				let date = new Date();
				this.endTime = date.getTime();
				this.scoreboard();

				alert("Acertou");
			} else if (this.situation == "closed") {
				alert("Ainda não...");
			} else {
				alert("Inicie o teste primeiro");
			}

		});

		this.btnStart.addEventListener("click", e=>{

			this.username = prompt("Informe o seu nome:");
			setTimeout(function(){

			}, 1000);
			if (this.username) {
				this.initTarget();
				this.btnStart.classList.add("disabled");
			} else {
				alert("Nome inválido");
			}

		});

	}

	scoreboard(){

		let olElement = document.getElementById("scoreboard-list");
		let li = document.createElement("li");
		li.innerHTML = `${this.username} <strong class="float-right">${this.getSeconds()} segundos</strong>`;
		olElement.appendChild(li);

	}

	getSeconds(){

		return (this.endTime - this.startTime) / 1000;

	}

	initTarget(){

		setTimeout(()=>{
			this.targetCircle.classList.add("ready");
			this.situation = "waiting";
			let date = new Date();
			this.startTime = date.getTime();
		}, (this.getRandomInt(1, 10) * 1000));

	}

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

}