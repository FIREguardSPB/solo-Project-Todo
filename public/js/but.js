
 

  // const butt1 = document.getElementById('btOn')

  // butt1.addEventListener("click", function() {
  //   alert("Кнопка нажата.");
  // });
  const dateFormat = require('dateformat')
  Data = new Date();
  Year = Data.getFullYear();
  Month = Data.getMonth();
  Day = Data.getDate();
  let currentData = '2020-11-02'
    // if (currentData - Data ){
    //   console.log('NOOOOO, МРАЗОТА, НЕЕЕЕТ!!!!')
    // } else {console.log('годнота!!')}
    // let b = dateFormat(currentData, "yyyy-mm-dd")
    let b = new Date(currentData)
  console.log(b)
  console.log(Data) 
  if (b < Data){
    console.log('меньше')} else {console.log('!!!!')}
  


 

  // {{!-- {{!-- const inputStartDate = document.getElementById('start').value --}}
  // {{!-- const inputEndDate = document.getElementById('end').value --}}
  // {{!-- butt.addEventListener('click', (event) => { --}}
  //   {{!-- event.preventDefault() --}}
    // {{!-- if (formAddToDo.getDate() < getDate()) { --}}
