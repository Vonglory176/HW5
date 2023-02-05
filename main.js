$(document).ready(function () {
    $('#addTaskButton').on('click', addTask)
    $('#viewMyTasksButton').on('click', viewMyTasks)
    $('#viewHighPriorityOnlyButton').on('click', showHighPriorityTasks)
    //$('#prioritizeButton').on('click', prioritizeTasks())
    $('#viewMyCompletedTasksButton').on('click', printCompletedTasks)
});

//TO-DO LIST OBJECT and ARRAY HOLDING TO-DO LIST ITEM CREATION
function task(task, priority) {this.task = task, this.priority = priority}
let toDoArray = []

//FUNCTION ADDING ITEMS TO TO-DO LIST
async function addTask() {
    try {
        //GRABBING INFO FROM URGENCY SELECTOR RADIO BUTTONS
        let radioID = await radiocheck(), todo = await inputCheck() //Verifying Button-Press/Text-Input
        let priority

        //TO-DO LIST ITEM CREATION & ARRAY PUSH
        radioID === 'radioVeryHigh' ? (priority = 1) :
            radioID === 'radioHigh' ? (priority = 2) :
                radioID === 'radioMedium' ? (priority = 3) :
                    (priority = 4)

        toDoArray.push(new task(todo, priority))

        //RADIO & TEXT BOX RESET
        $(`#${radioID}`).attr('checked', false)
        $("#toDoInput").val('')

    } catch (error) { alert(error) }
}

//Radio Button Check
function radiocheck() {
    return new Promise((resolve, reject) => {
        document.querySelectorAll('input[name="priorityRadio"]').forEach(i => { //Iterating all input elements with name 'urgencySelector'
            if (i.checked) resolve(i.id) //Returns ID of checked
        })
        reject("Please select an priority level!")
    })
}

//Input Check
function inputCheck() {
    return new Promise((resolve, reject) => {
        input = ($('#toDoInput').val()).trim()
        input? resolve(input) : reject("Please enter a valid task!") //Verifying input isn't just whitespace
    })
}

//LIST TASKS IN PROGRESS
//SHOW TO-DO LIST BUTTON CLICKED
function viewMyTasks() {
    $("#incompleteTaskDisplay").html("") //Resetting Current Listed Tasks
    let toDoArray = sortArray() //Sorting array from highest to low priority 
    
    for (let i = 0; i < toDoArray.length; i++) {
        //Verifying task is incomplete before printing
        if(toDoArray[i].priority !== 5) printUncompletedTasks(toDoArray[i].task, i, toDoArray[i].priority)//Text, Index, Priority
    }
}

//VIEW HIGH PRIORITY TASKS ONLY
function showHighPriorityTasks() {
    $("#incompleteTaskDisplay").html("") //Resetting Current Listed Tasks
    let toDoArray = sortArray()  //Sorting array from highest to low priority 

    for(let i = 0; i < toDoArray.length; i++){
        if (toDoArray[i].priority === 1 || toDoArray[i].priority === 2){

            let elementText = toDoArray[i].task + " -- " + (toDoArray[i].priority === 1 ?'Very high':'High') + " priority"
            printUncompletedTasks(elementText, i, toDoArray[i].priority)//Text, Index, Priority
            
        }
    }
}

//Array Sorter
function sortArray(){ 
    return toDoArray.sort((p1, p2) => (p1.priority > p2.priority) ? 1 : (p1.priority < p2.priority) ? -1 : 0)
}

//Uncompleted Task printing
function printUncompletedTasks(text, index, priority){
    //Radio Button
    let elementRadio = $(`<input type='radio'>`)//Setting HTML
    $(elementRadio).attr('id', `taskRadio${index}`)//Setting ID

    $(elementRadio).on('click', function(){//Attaching Event Handler
        toDoArray[index].priority = 5
        $(`#taskLabel${index}`).css('color',colorPicker(5))
    })

    //Affiliated Label
    let elementLabel = $(`<label>${text}</label>`)//Setting HTML & Text
    $(elementLabel).attr('for', `taskRadio${index}`)//Linking to Radio Button
    $(elementLabel).attr('id', `taskLabel${index}`)//Setting ID
    $(elementLabel).css('color',`${colorPicker(priority)}`)//Setting Color

    $("#incompleteTaskDisplay").append("•&emsp;",$(elementLabel),$(elementRadio)," -- Task Completed? <br>")//Printing to Screen
}

//Color Code Based on Priority System
function colorPicker(priority) {
    if      (priority === 1) return 'rgb(212, 2, 2)'
    else if (priority === 2) return 'rgb(255, 68, 0)'
    else if (priority === 3) return 'rgb(239, 168, 3)'
    else if (priority === 4) return 'green'
    else if (priority === 5) return 'darkgreen' //For Complete
}

//VIEW COMPLETED TASKS BUTTON CLICK
function printCompletedTasks() {
    for (let i = 0; i < toDoArray.length; i++){
        if (toDoArray[i].priority === 5) {
            let element = $(`<li>${toDoArray[i].task} -- Completed!</li>`)//Setting HTML
            $(element).css('color',`${colorPicker(toDoArray[i].priority)}`)//Setting Color
            $("#completedTaskDisplay").append($(element))//Printing to Screen
        }
    }
}
