

let toBeTranslated = document.querySelector('#translator');
let toBeCopied = document.querySelector('#buffer');
let langButton = document.querySelector('#lang__button');
let helpButton = document.querySelector('#help');
let closeButton = document.querySelector('#popup__close');
let popUp = document.querySelector('#popup');
var mapObj; // we'll assign later

loadPage();

var tr = () => {
	let content = toBeTranslated.value.toUpperCase();
	content = content.replace(/[A-Z]/gi, (matched) => `${mapObj[matched]} `);
	toBeCopied.innerHTML = content;
}

var copy = () => {
	toBeCopied.select();
	document.execCommand('copy');
	document.getElementById('input__button-copy').value = 'Copied!';
	setInterval(() => {
		document.getElementById('input__button-copy').value = 'Copy';
	}, 3000);
}

helpButton.onclick = () => {
	document.querySelector('#container').classList.toggle('blur');
	popUp.style.visibility = 'visible';
}

closeButton.onclick = () => {
	document.querySelector('#container').classList.toggle('blur');
	popUp.style.visibility = 'hidden';
}

langButton.addEventListener('click', function(e) {
	e.preventDefault();
	var language = this.innerText === 'RU' ? 'Russian' : 'English';
	loadPage(language);
});

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
