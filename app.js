// list/array of to-dos
let toDos = ['Cook', 'Code some stuff', 'Eat pizza'];

// method to always reset all UL-content and redisplay it again
const displayToDos = () => {
    // RESET all UL-content
    document.getElementById('ul').innerHTML = '';

    // FOR-EVERY to-do in the 'toDos'-list
    for (let toDo of toDos) {
        // create AND ADD a DIV, LI and BUTTON-element to the UL-element(parent)
        document.getElementById('ul').innerHTML += `
		<div>
			<li>${toDo}</li>
			<button>Remove</button>
		</div>
		`;
    }

    // FOR-EVERY child in UL-element
    for (let child of document.getElementById('ul').children) {
        // PARENT(div-element). This will later be removed, and with it automatically its children, LI- and BUTTON-element
        const parentDiv = child;

        // LI-element with to-do-text
        const childLi = child.children[0];

        // LI-element-TEXT with to-do-text
        const childLiText = child.children[0].innerHTML;

        // this is used to add an click-event-listener to the remove-button
        const childButton = child.children[1];

        // add an event-click to every LI so it can be over-stroked
        childLi.addEventListener('click', () => makeTextWithLineThrough(childLi));

        // add an event-click to every button so it can remove its DIV-parent
        childButton.addEventListener('click', () => removeToDo(parentDiv, childLiText));
    }
};

const makeTextWithLineThrough = (textToBeOverLined) => {
    if (textToBeOverLined.style.textDecoration === 'line-through') textToBeOverLined.style.textDecoration = 'none';
    else textToBeOverLined.style.textDecoration = 'line-through';
};

const removeToDo = (parentDiv, childLiText) => {
    // removes DIV-element(parent that holds LI and BUTTON)
    document.getElementById('ul').removeChild(parentDiv);

    removeFromToDoArray(childLiText);
    focusOnInputField();
    displayToDos();
};

const addToDo = () => {
    // stores value of input-field
    const inputValue = document.getElementById('input').value;

    if (checkAndReturnIfInputFieldIsEmpty()) return;
    addContentToTheToDoArrayArray(inputValue);
    emptyInputField();
    focusOnInputField();
    displayToDos();
};

const addContentToTheToDoArrayArray = (contentToAdd) => {
    toDos = [...toDos, contentToAdd];
};

const removeFromToDoArray = (contentToRemove) => {
    toDos = toDos.filter((toDo) => toDo !== contentToRemove);
};

//
const emptyInputField = () => {
    document.getElementById('input').value = '';
};

const focusOnInputField = () => {
    document.getElementById('input').focus();
};

const checkAndReturnIfInputFieldIsEmpty = () => {
    if (document.getElementById('input').value === '') return true;
};

// AT START > CREATE METHOD(s) AND LISTEN FOR EVENTS
displayToDos();
document.getElementById('button').addEventListener('click', () => addToDo());
