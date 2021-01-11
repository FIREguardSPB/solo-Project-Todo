const formAddToDo = document.getElementById('addTodo')

formAddToDo.addEventListener('submit', async (event) => {
  event.preventDefault()

  const starе = event.target.start.value
  const end = event.target.end.value

  const body = {
    start,
    end,
  }

  const {action, method} = event.target

  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await response.json()

  if(result.succes) {
    console.log('Ok');
    window.location = 'http://localhost:4000/privateOffice'
  }else{
    alert(result.message)
  }
})



///////скрипт с страницы

//   const dateFormat = require('dateformat')
//    let butt1 = document.getElementById('btOn')

// let inputStartDate = document.getElementById('start').value
// let inputEndDate = document.getElementById('end').value
// Data = new Date();
// Year = Data.getFullYear();
// Month = Data.getMonth();
// Day = Data.getDate();
// butt1.addEventListener('click', (event) => {
//   event.preventDefault()
//   let eqDate = new Date(inputStartDate)
//   console.log(eqDate)
//   if (eqDate > Data){
//     alert('NOOOOO, МРАЗОТА, НЕЕЕЕТ!!!!')
//   } else {alert('годнота!!')}
// })
