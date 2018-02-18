let main = document.querySelector('main');

function insertionSort(arr) {

    renderArr(arr, 'Input array');
    renderArr(arr, 'Output array');

    let parent = document.querySelectorAll('div')[1];
    let spans = document.querySelectorAll('div:nth-child(3) span');
    let timer = 0;

    for ( let i = 1; i < arr.length; i++ ) {
        if ( arr[i] < arr[i-1] ) moveItem(i);
    }
    
    function moveItem(i) {
        let index = i--;
        while ( arr[index] < arr[i] ) {
            timer += 1000;
            console.log(timer);
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
            item.style.backgroundColor = 'rgba(255,0,0,0.5)';
        }
    }
    
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

    main.appendChild(div);
}

function createItem(item) {
    return document.createElement(item);
}

console.log(insertionSort([56, 1, 2, 56, 767, 9, 9732, -5, 0, 99, 11, 34, 87, 234, 1, 54]));