const checkBoxList=document.querySelectorAll('.custom-checkbox')
const inputFields=document.querySelectorAll('.goal-input')
const errorLabel=document.querySelector('.error-label')
const progressLabel=document.querySelector('.progress-label')
const progressBar=document.querySelector('.progress-bar')
const progressValue=document.querySelector('.progress-value')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
  ]



const allGoals= JSON.parse(localStorage.getItem('allGoals'))|| {

first: {
name:'',
completed:false,
},

second: {
name:'',
completed:false,
},

third: {
name:'',
completed:false,
},
}
let completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length  //no. of goals complete


progressValue.style.width=`${(completedGoalsCount/inputFields.length)*100}%`
progressValue.firstElementChild.innerText=`${completedGoalsCount}/${inputFields.length}completed`
progressLabel.innerText=allQuotes[completedGoalsCount]


checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
const allGoalsAdded=[...inputFields].every(function(input){
    return input.value
})
if(allGoalsAdded){
        checkbox.parentElement.classList.toggle('completed')   //to add class named completed  
const inputId=checkbox.nextElementSibling.id
allGoals[inputId].completed= !allGoals[inputId].completed

completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length  //no. of goals complete
progressValue.style.width=`${(completedGoalsCount/inputFields.length)*100}%`
progressValue.firstElementChild.innerText=`${completedGoalsCount}/${inputFields.length} completed`
progressLabel.innerText=allQuotes[completedGoalsCount]

localStorage.setItem('allGoals',JSON.stringify(allGoals))
  }else{
progressBar.classList.add('show-error')

}
    } )
    
})
inputFields.forEach((input)=>{
input.value=allGoals[input.id].name  //value shows on relaod

if(allGoals[input.id].completed){
input.parentElement.classList.add('completed')
progressValue.style.width='33.33%'
}

    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input',(e)=>{
       if(allGoals[input.id].completed){
input.value=allGoals[input.id].name
return //cannot type in it after ticking
} 
        allGoals[input.id].name=input.value 
        
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
        
    })
})
