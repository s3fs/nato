

let toBeTranslated = document.querySelector('#translator');
let toBeCopied = document.querySelector('#buffer');
let langButton = document.querySelector('#lang__button');
let helpButton = document.querySelector('#help');
let closeButton = document.querySelector('#popup__close');
let popUp = document.querySelector('#popup');
var mapObj; // we'll assign later

//why is that call here, what is it for? 
//Also seems like it gets rid of a popup and a version span. Is that bc their content is not declared in strings.json?
loadPage();

var tr = () => {
	//To grab contents use .value not .innerHTML
	let content = toBeTranslated.value.toUpperCase();
	content = content.replace(/[A-Z]/gi, (matched) => `${mapObj[matched]} `);
	toBeCopied.innerHTML = content;
}

var copy = () => {
	toBeCopied.select();
	document.execCommand('copy');
	//same here
	document.getElementById('input__button-copy').value = 'Copied!';
	setInterval(() => {
		document.getElementById('input__button-copy').value = 'Copy';
	}, 3000);
}

helpButton.onclick = () => {
	//Just trying out different things. You can actually break the layout here but I'm gonna leave it.
	document.querySelector('#container').classList.toggle('blur');
	popUp.style.visibility = 'visible';
}

closeButton.onclick = () => {
	document.querySelector('#container').classList.toggle('blur');
	popUp.style.visibility = 'hidden';
}

langButton.addEventListener('click', function(e) {
	//what does preventDefault() do here? I've tried removing it and it had no effect
	e.preventDefault();
	var language = this.innerText === 'RU' ? 'Russian' : 'English';
	loadPage(language);
});


//What is this sorcery? lol. I just can't grasp it for now. 
//I see that it changes DOM with json contents, but everything in between... is mystery 
//Could you please recommend a source that covers what you did here? 
function loadPage(language="English"){
	fetch("strings/languages.json")
		.then(json=>json.json())
		.then(lang=>{
			mapObj = lang[language].mapObj;
			Object.keys(lang[language]).forEach(key=>{
				if(document.getElementById(key)){
					document.getElementById(key).innerText = lang[language][key];
				}
			});
		});
}
