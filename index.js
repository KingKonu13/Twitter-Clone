// javascript

/* Requirement analysis:
   1.  Ability to type endorsements  
   2.  Ability to store endorsements when publish btn is clicked 
   3.  Ability to see endorsements when publish btn is clicked
*/ 


/* Software design: 
    1. Need to initalize a firebase realtime database 
    2. Need to grab input field value  
    3. Need a fucntion to clear input field
    4. Need a fucntion to write input field values to the database 
    5. Need a function to read values from database 
    6. Need a function to render values on the client
*/


/* Required functions 
    initalizeApp
    getDatabase
    ref
    push
    onValue
*/

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSetting = {
    databaseURL: "https://champion-bdc21-default-rtdb.firebaseio.com/"
}

//Initalizing the firebase app by connecting our application to the firebase url
const app = initializeApp(appSetting)

// Creating a pointer to our databases on firebase 
const database = getDatabase(app)
// Creating a pointer to our specifc "endorsements" database reference
const endorsementsInDB = ref(database, "Endorsements")

// creating all the required element objects
const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const endorsementEl = document.getElementById("container-two")


// main logic
btnEl.addEventListener("click", function(){
    // writing to the database
    let endorsements = inputEl.value 
    writeEndorsementsToDB(endorsements)
    clearInputField()
    // reading from the database
    onValue(endorsementsInDB, function(snapshot){
        let publishedEndorsementsArray = Object.values(snapshot.val())
        renderEndorsementsFromDB(publishedEndorsementsArray)
    })
})

 
// A function to write inputs to the database
 function writeEndorsementsToDB(endorsements){
     push(endorsementsInDB, endorsements)
 }
 
// A function to clear the input field
 function clearInputField(){
     inputEl.value = ""
 }
 
 // function that indexes over everything in the database and renders them on the client
 function renderEndorsementsFromDB(array){
     for (let i = 0; i < array.length; i++){
         let publishedValue = array[i] 
         endorsementEl.innerHTML += `<div>
                                        <p>${publishedValue}</p>
                                    </div>`
     }
 }