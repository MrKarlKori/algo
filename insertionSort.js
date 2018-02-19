let items = {
	main: document.querySelector('main'),
	buttonStart: document.querySelector('button'),
	buttonRandom: document.querySelectorAll('button')[1],
	startButtonClicked: false,
    timerH1: null,
    timerFill: null
}

let defaultArr = [56, 1, 2, 56, 767, 9, 9732, -5, 0, 99, 11, 34, 87, 234, 1, 54];

renderArr(defaultArr, 'Input array');

items.buttonStart.addEventListener('click', () => {
	if ( items.startButtonClicked ) {
		return;
	} else items.startButtonClicked = true;
	
	insertionSort(defaultArr);
});

items.buttonRandom.addEventListener('click', () => {
	let spans = document.querySelectorAll('div:first-of-type span');
	let outputDiv = document.querySelectorAll('div')[1];
	let i = 0;
	items.startButtonClicked = false;

	if ( outputDiv ) {
        window.clearTimeout(items.timerH1);
        window.clearTimeout(items.timerFill);
		outputDiv.remove();
	}

	for ( let item of spans ) {
		defaultArr[i] = randomInteger();
		item.textContent = defaultArr[i];
		i++;
	}
});

function insertionSort(arr) {

    renderArr(defaultArr, 'Output array');

    let parent = document.querySelectorAll('div')[1];
    let spans = document.querySelectorAll('div:last-of-type span');
    let timer = 0;

    for ( let i = 1; i < arr.length; i++ ) {
        if ( arr[i] < arr[i-1] ) moveItem(i);
    }
    
    function moveItem(i) {
        let index = i--;
        while ( arr[index] < arr[i] ) {
            timer += 500;
            setTimeout( swap, timer, i, index);
            [arr[i], arr[index]] = [arr[index], arr[i]];
            i--;
            index--;
        } 
    }

    function swap(i, index) {
        fillDef(spans);
        let temp = spans[i].textContent;
        spans[i].style.backgroundColor = 'red';
        spans[i].textContent = spans[index].textContent;
        spans[index].textContent = temp;
    }

    function fillDef(collection) {
        for ( let item of collection ) {
            if ( item.style.backgroundColor === 'red' ) {
            	item.style.backgroundColor = 'rgba(255,0,0,0.5)';
            }
        }
    }

    items.timerFill = setTimeout( fillDef, timer, spans );
    items.timerH1 = setTimeout( () => {
    	document.querySelectorAll('h2')[1].textContent += ': array sorted!';
    }, timer+100);
    
    return arr;
}

function renderArr(arr, message) {
    let div = createItem('div');
    let h2 = createItem('h2');
    h2.textContent = message;
    div.appendChild(h2);

    arr.forEach( (el, i) => {
        let span = createItem('span');
        span.textContent = el;
        div.appendChild(span);
    });

    items.main.appendChild(div);
}

function createItem(item) {
    return document.createElement(item);
}

function randomInteger() {
	return Math.floor(Math.random() * 100);
}