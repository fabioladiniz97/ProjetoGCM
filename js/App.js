class App {

	constructor(){
		this.initialize();
		this.situation = "closed";
		this.time;
		this.startTime;
		this.endTime;
		this.username;
		this.scores = [];
	}

	initialize(){

		this.btnStart = document.getElementById("start");
		this.targetCircle = document.getElementById("target-click");

		this.targetCircle.addEventListener("click", e=>{

			this.btnStart.classList.contains('disabled');

			if (this.situation == "waiting") {
				this.situation = "closed";
				let date = new Date();
				this.endTime = date.getTime();
				this.scoreboard();

				this.showOnTarget();

				setTimeout(()=>{
					this.targetCircle.classList.remove("ready");
					this.targetCircle.classList.remove("result-good");
					this.targetCircle.classList.remove("result-bad");
					this.btnStart.classList.remove("disabled");
					this.targetCircle.innerHTML = "";
				}, 3500);

			} else if (this.situation == "closed") {
				alert("Ainda não...");
			}

		});

		this.btnStart.addEventListener("click", e=>{

			if (!this.btnStart.classList.contains("disabled")) {

				this.username = prompt("Informe o seu nome:");
				setTimeout(function(){

				}, 1000);
				if (this.username) {
					this.initTarget();
					this.btnStart.classList.add("disabled");
				} else {
					alert("Nome inválido");
				}

			}

		});

	}

	showOnTarget(){

		this.situation = 'closed';

		if (this.getUserPosition() == 1) {
			this.targetCircle.classList.add("result-good");
			this.targetCircle.innerHTML = "1º";
		} else {
			this.targetCircle.classList.add("result-bad");
			this.targetCircle.innerHTML = `${this.getUserPosition()}º`;
		}

	}

	scoreboard(){

		this.scores.push({
			username: this.username,
			timeScore: this.getSeconds()
		});

		this.scores.sort((a, b)=>{
			return a.timeScore - b.timeScore;
		});

		let olElement = document.getElementById("scoreboard-list");
		let li = document.createElement("li");
		li.innerHTML = `${this.username} <strong class="float-right">${this.getSeconds()} segundos</strong>`;
		olElement.appendChild(li);

		let c = 0;

		olElement.querySelectorAll("li").forEach(el=>{
			
			el.innerHTML = `${this.scores[c].username} <strong class="float-right">${this.scores[c].timeScore} segundos</strong>`;
			c++;

		});

	}

	getUserPosition(){

		let c = 0;
		let position = null;

		this.scores.forEach(player=>{

			if (player.username == this.username) {
				position = c + 1;
				return false;
			}
			c++;

		});

		return position;

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