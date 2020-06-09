let movieList = [];

let movieInput = document.querySelector("input[type='text']");

let cards = document.querySelector(".cards");

function createElement(tag, props = {}, children) {
	let elm = document.createElement(tag);
	elm.append(children);
	return elm;
}

function createUI(data = movieList, root = cards) {
	root.innerHTML = "";
	data.forEach((movie, index) => {
		let li = createElement("li");
		let p = createElement("p");
		p.innerText = movie.name;
		let button = createElement("button");
		button.innerText = movie.isWatched ? "Watched" : "To Watch";
		button.setAttribute("data-id", index);
		let del = createElement("span");
		del.setAttribute("data-id", index);
		del.innerText = "X";
		li.append(p, button, del);
		cards.append(li);
	});
}

function toggleWatch(event) {
	if (event.target.nodeName === "BUTTON") {
		let id = event.target.dataset.id;
		movieList = movieList.map((movie, index) => {
			if (index == id) {
				return {
					...movie,
					isWatched: !movie.isWatched,
				};
			}
			return movie;
		});
		createUI();
	}
}

function handleInput(event) {
	if (event.keyCode === 13) {
		movieList = movieList.concat({
			name: event.target.value,
			isWatched: false,
		});
		console.log(movieList);
		event.target.value = "";
		createUI();
	}
}

function deleteMovie(e) {
	if (e.target.nodeName === "SPAN") {
		let id = e.target.dataset.id;
		movieList.splice(id, 1);
		createUI();
	}
}

cards.addEventListener("click", deleteMovie);
cards.addEventListener("click", toggleWatch);
movieInput.addEventListener("keyup", handleInput);
