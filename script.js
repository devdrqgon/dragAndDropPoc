const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

/** Store list items */
const listItems = []

let dragStartIndex;

createList();

/** Insert list items into DOM  */
function createList() {
    //make copy
    [...richestPeople]
        .map(n => ({ name: n, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.name)
        .forEach((person, index) => {

            const listItem = document.createElement('li');
            //set the index in html
            listItem.setAttribute('data-index', index);
            // listItem.classList.add('right');
            // listItem.classList.add('over');
            

            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
            `;

            listItems.push(listItem);

            draggableList.appendChild(listItem);
        })

        bindEventListeners();
}


function dragStart() {
    dragStartIndex = +this.getAttribute('data-index')
    // console.info('start',dragStartIndex)
}

function dragOver(e){
    // console.log('dragOver');
    this.classList.add('over');

    e.preventDefault()

}


function dragDrop(){
    //  console.log('dragDrop')
    const dragEndIndex = +this.getAttribute('data-index')
    // console.info('drop',dragEndIndex)
    swapItems(dragStartIndex,dragEndIndex);
    this.classList.remove('over');


}

function swapItems(fromIndex, toIndex){
    const fromItem = listItems[fromIndex].querySelector('.draggable')
    const toItem = listItems[toIndex].querySelector('.draggable')
    // console.log(fromItem,toItem)

    listItems[toIndex].appendChild(fromItem)
    listItems[fromIndex].appendChild(toItem)


}

function dragEnter(){
    this.classList.add('over');

    // console.log('dragEnter')
}

function dragLeave(){
    // console.log('dragLeave')
    this.classList.remove('over');

}


function bindEventListeners() {
    // const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    /** adding event listeners */

    // draggables.forEach(d => {
    //     d.addEventListener('dragstart', dragStart);
    // });

    dragListItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });


}
