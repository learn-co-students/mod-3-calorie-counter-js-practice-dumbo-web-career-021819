// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
let totalCalories = 0;

document.addEventListener("DOMContentLoaded", () => {
    const caloriesListTag = document.getElementById('calories-list')
    getAllItems();

    // remove Item
    caloriesListTag.addEventListener('click', (e) => {
        if (e.target.dataset.svg === 'trash') {
            let itemId = e.target.parentElement.parentElement.parentElement.dataset.id
            e.target.parentElement.parentElement.parentElement.remove()
            removeItem(itemId)
        }else if (e.target.dataset.svg === 'pencil') {
            console.log('yaay')
            const itemTag = e.target.parentElement.parentElement.parentElement
            const itemId = itemTag.dataset.id
            const itemCalories = itemTag.querySelector('strong').innerText
            const itemNote = itemTag.querySelector('em').innerText
            debugger
            // Keep going here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    })
})

document.addEventListener('click', e => {
    if (e.target.innerText === "ADD CALORIE INTAKE") {
        e.preventDefault();
        console.log(e.target)
        const newCalories = e.target.parentElement.parentElement.querySelector('.uk-input').value
        const newNote = e.target.parentElement.parentElement.querySelector('.uk-textarea').value
        newItem(newCalories, newNote)
    }
    //  else if (e.target.innerText === "UPDATE ENTRY") {
    //     debugger
    //     e.target.parentElement.parentElement.querySelector('.uk-input').value
    //     e.target.parentElement.parentElement.querySelector('.uk-textarea').value
    //     // updateEntryFunction()
    // } // else if
})

function getAllItems() {
    fetch('http://localhost:3000/api/v1/calorie_entries')
    .then(r => r.json())
    .then(itemsArray => {
        itemsArray.forEach(itemObj => {
            const caloriesListTag = document.getElementById('calories-list')
            caloriesListTag.innerHTML = addItemTag(itemObj) + caloriesListTag.innerHTML
            totalCalories += itemObj.calorie
            let progressBar = document.querySelector('progress')
            progressBar.value = totalCalories
        })
        
    })
}

const addItemTag = (itemObj) => {
    return `<li class="calories-list-item" data-id="${itemObj.id}">
          <div class="uk-grid">
            <div class="uk-width-1-6">
              <strong>${itemObj.calorie}</strong>
              <span>kcal</span>
            </div>
            <div class="uk-width-4-5">
              <em class="uk-text-meta">${itemObj.note}</em>
            </div>
          </div>
          <div class="list-item-menu">
            <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
            <a class="delete-button" uk-icon="icon: trash"></a>
          </div>
        </li>`
}

const newItem = (newCalorie, newNote) => {
    return fetch('http://localhost:3000/api/v1/calorie_entries', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
    body: JSON.stringify({
        api_v1_calorie_entry:{
            calorie: newCalorie, 
            note: newNote}
        })
    })
    .then(response => response.json())
    .then(item => {
        const caloriesListTag = document.getElementById('calories-list')
        caloriesListTag.innerHTML = addItemTag(item) + caloriesListTag.innerHTML
        totalCalories += item.calorie
        let progressBar = document.querySelector('progress')
        progressBar.value = totalCalories
    })
}

const removeItem = (itemId) => {
    fetch(`http://localhost:3000/api/v1/calorie_entries/${itemId}`, {
        method: 'DELETE'
    })
}