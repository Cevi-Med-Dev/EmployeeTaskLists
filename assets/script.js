console.log("excecuted")
let dropdownList = document.querySelectorAll(".task h2")
let listName = Array.from(document.querySelectorAll(".task ul"))
console.log(dropdownList, listName)

dropdownList.forEach(el => {
    console.log(el)
})
listName.forEach(el => {
    el.addEventListener("click", ()=>{
        
    })
})