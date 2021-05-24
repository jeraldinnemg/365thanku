// Select the elements
const clear = document.getElementById('clear'); 
const dateElement = document.getElementById('date');       
const list = document.getElementById('list');    
const item = document.getElementById('item');
const delBtn = document.getElementById('del-btn');
const input = document.getElementById('input');

// Load items to the user interface
function loadList(array) {
    array.forEach(function(item){
        addThank(item.name, item.id, item.trash)
    });
}

// Clear the localstorage

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Show today date

const options = {year: 'numeric', month: 'short', day:'numeric'}

const today= new Date()

dateElement.innerHTML = today.toLocaleDateString('en-US', options)

// Add thank list function 

function addThank(thank, id, trash) {

if(trash) {return;} 

const element = `<li class="item" id="item">
<i class="fas fa-praying-hands pray"></i>
<p class="text">${thank}</p>
<i class="fas fa-trash-alt de" id="del-btn"></i>
</li>`

const position= "beforeend";

list.insertAdjacentHTML(position, element);

}

// Variables
let LIST = [], id= 0;

// Get item from localstorage
let data = localStorage.getItem("THANK");

//Check if data is not empty
if(data){ 
    LIST = JSON.parse(data);
    id= LIST.lenght; //set the id to the last one of the id
    loadList(LIST); // loas the list to the user interface

} else {
    //if data isn't empty
    LIST = [];
    id= 0;
}

// Enter key event to add an item
document.addEventListener ('keyup', function(event){
    if (event.keyCode ==13) {
        const thank = input.value;
        if(thank) {
            addThank(thank);

            LIST.push ({
                name : thank,
                id: id,
                trash: false
            });

            // Add item to localstorage
            localStorage.setItem("THANK", JSON.stringify(LIST));
            id++
        }
        input.value="";
    }
}) 

// Remove item 
function removeThank(element){
    const ul = element.target.parentNode.parentNode;
    const li = element.target.parentNode;
    ul.removeChild(li);
    }

//Delete element 
    list.addEventListener("click", (event) => {
        if(event.target.className=== "fas fa-trash-alt de") {
            removeThank(event);
        }
    });
    
