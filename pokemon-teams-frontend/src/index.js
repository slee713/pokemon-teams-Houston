const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

fetch(TRAINERS_URL)
.then(res => res.json())
.then(trainers => showTrainers(trainers))

function showTrainers(trainers) {
    trainers.forEach(trainer => addTrainer(trainer))
}

function addTrainer(trainer) {
    let div = document.createElement("div")
    div.className = "card"
    div.setAttribute("data-id", `${trainer.id}`)
    
    let pName = document.createElement("p")
    pName.innerText = `${trainer.name}`
    
    let addButton = document.createElement("button")
    addButton.setAttribute("data-trainer-id", `${trainer.id}`)
    addButton.innerText = "Add Pokemon"
    
    let ul = document.createElement("ul")
    
    trainer.pokemons.forEach(pokemon => addPokemon(pokemon))
    
    function addPokemon(pokemon){
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        
        let releaseBtn = document.createElement("button")
        releaseBtn.className = "release"
        releaseBtn.setAttribute("data-pokemon-id", `${pokemon.id}`)
        releaseBtn.innerText = "Release"
        
        li.append(releaseBtn)
        ul.append(li)

        releaseBtn.addEventListener("click", () => {
            config = {
                method: "DELETE"
            }
            fetch(POKEMONS_URL+`/${pokemon.id}`, config)
            .then(resp => resp.json())
            .then(pokemon => {
                let index = trainer.pokemons.indexOf(pokemon)
                trainer.pokemons.splice(index, 1)
                li.remove()
            })
            
        })
    }
    div.append(pName, addButton, ul)
    main.append(div)


    addButton.addEventListener("click", () => {
        event.preventDefault()
        // debugger
        if (trainer.pokemons.length < 6){
            config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    trainer_id: trainer.id
                })
            }
            fetch(POKEMONS_URL, config)
            .then(res => res.json())
            .then(pokemon => {
                addPokemon(pokemon)
                trainer.pokemons.push(pokemon)
            })
        }
        // debugger;
    })
}
