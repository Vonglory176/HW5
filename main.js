document.addEventListener("DOMContentLoaded", function (_) {
    document.getElementById('addItemButton').addEventListener('click', addItem)
    document.getElementById('viewMyTasksButton').addEventListener('click', viewMyTasks)
    document.getElementById('viewHighPriorityOnlyButton').addEventListener('click', showHighPriorityTasks)
    document.getElementById('prioritizeButton').addEventListener('click', prioritizeTasks())

});


//ARRAY HOLDING TO-DO LIST ITEMS
const toDoArray = []


//TO-DO LIST OBJECT CREATION
function task(task, priority) {
    this.task = task
    this.priority = priority
}

//FUNCTION ADDING ITEMS TO TO-DO LIST
async function addItem() {
    try {
        //GRABBING INFO FROM URGENCY SELECTOR RADIO BUTTONS
        let radio = await radiocheck()
        let todo = document.getElementById('toDoInput').value
        let urgency

        //TO-DO LIST ITEM CREATION & ARRAY PUSH
        radio === 'radioVeryHigh' ? (urgency = 'very high') :
            radio === 'radioHigh' ? (urgency = 'high') :
                radio === 'radioMedium' ? (urgency = 'medium') :
                    (urgency = 'low')


        toDoArray.push(new task(todo, urgency))
        console.log(toDoArray) //FOR DEBUGGING

        //RADIO & TEXT BOX RESET
        //this isn't working 
        //document.getElementByID(radio).checked = false
        document.getElementById("toDoInput").value = "";

    } catch { alert("Unable to add item to list") }

}

//RADIO BUTTON CHECK
function radiocheck() {
    return new Promise((resolve, reject) => {
        document.querySelectorAll('input[name="urgencySelector"]').forEach(i => { //Iterating all input elements with name 'urgencySelector'
            if (i.checked) resolve(i.id) //Returns ID of checked
            console.log(i.checked, i.id) //FOR DEBUGGING
        })
        reject("Please select an urgency level for the task")  //Returns error if none
    })
}


//LIST TASKS IN PROGRESS
//SHOW TO-DO LIST BUTTON CLICKED
function viewMyTasks() {
    let theList = document.getElementById("inProgressTasksDisplay");
    theList.innerHTML = " ";
    toDoArray.forEach(function (element) {
        var list = document.createElement('li');
        list.innerHTML = element.task;

        //COLOR CODE THE ITEM BASED ON PRIORITY LEVEL
        if (element.priority === 'very high') {
            list.style.color = 'rgb(212, 2, 2)';
        } else if (element.priority === 'high') {
            list.style.color = 'rgb(255, 68, 0)';
        } else if (element.priority === 'medium') {
            list.style.color = 'rgb(239, 168, 3)';
        } else {
            list.style.color = 'green';
        }

        theList.appendChild(list);
    })
}

//VIEW HIGH PRIORITY TASKS ONLY
function showHighPriorityTasks() {
    let theList = document.getElementById("inProgressTasksDisplay");
    theList.innerHTML = " ";
    toDoArray.forEach(function (element) {
        if (element.priority === 'very high') {
            var list = document.createElement('li');
            list.style.color = 'rgb(212, 2, 2)';
            list.innerHTML = element.task + " -- " + element.priority + " priority";
            theList.appendChild(list);
        }
    })
    toDoArray.forEach(function (element) {
        if (element.priority === 'high') {
            var list = document.createElement('li');
            list.style.color = 'rgb(255, 68, 0)';
            list.innerHTML = element.task + " -- " + element.priority + " priority";
            theList.appendChild(list);
        }
    })
}

//PRIORITIZE MY TASKS BUTTON CLICK

