async function getPokemons(page = 0,number = 99){
    const server = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=${page}`);
    const data = await server.json();

    const everyCard = document.querySelectorAll(".card")
    for (let n of everyCard){
        n.style.display = "none";
    }

    data.results.forEach(async function(item) {

        const server1 = await fetch(item.url);
        const data1 = await server1.json();

        const name = data1.name;
        const id = data1.id;

        let image = "";

        if (data1.sprites.other["official-artwork"].front_default == null){
            image = "./assets/images/noImage.jpg";
        } else {
            image = data1.sprites.other["official-artwork"].front_default;
        }
        
        const server2 = await fetch(data1.species.url);
        const data2 = await server2.json();

        let description = "";

        for (let i = 0; i <= 5; i++){
            if (data2.flavor_text_entries[i].language.name == "en"){

                description = data2.flavor_text_entries[i].flavor_text;
                break;
            }
        }

        const mystring1 = description;
        const mystring = mystring1.replace('','').replace('POKéMON', 'POKÉMON').replace('POKéMON', 'POKÉMON').replace('POKéMON', 'POKÉMON');

        const [a, ...b] = mystring;
        const arr = a.toUpperCase() + b;
   
        const numTypes = [];
        for(let n of data1.types){
            numTypes.push(n);
        };

        if (numTypes.length == 1){
            document.querySelector("#cardList").insertAdjacentHTML("beforeend", `
            
            <div class="card">
            <img class="characterImage" src=${image}>
            <div class="characterInfo">
                <p class="name">${name.toUpperCase()}</p>
                <p class="ID">ID: ${id}</p>
                <p class="type">${data1.types[0].type.name.toUpperCase()}</p>
                <p class="description">${mystring}</p>
                <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
            </div>
            </div>

            `)
        } else if (numTypes.length == 2){
            document.querySelector("#cardList").insertAdjacentHTML("beforeend", `
            
            <div class="card">
            <img class="characterImage" src=${image}>
            <div class="characterInfo">
                <p class="name">${name.toUpperCase()}</p>
                <p class="ID">ID: ${id}</p>
                <p class="type">${data1.types[0].type.name.toUpperCase()}, ${data1.types[1].type.name.toUpperCase()}</p>
                <p class="description">${mystring}</p>
                <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
            </div>
            </div>

            `)
        } else if (numTypes.length == 3){
            document.querySelector("#cardList").insertAdjacentHTML("beforeend", `
            
            <div class="card">
            <img class="characterImage" src=${image}>
            <div class="characterInfo">
                <p class="name">${name.toUpperCase()}</p>
                <p class="ID">ID: ${id}</p>
                <p class="type">${data1.types[0].type.name.toUpperCase()}, ${data1.types[1].type.name.toUpperCase()}, ${data1.types[2].type.name.toUpperCase()}</p>
                <p class="description">${mystring}</p>
                <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
            </div>
            </div>

            `)
        } else if (numTypes.length == 4){
            document.querySelector("#cardList").insertAdjacentHTML("beforeend", `
            
            <div class="card">
            <img class="characterImage" src=${image}>
            <div class="characterInfo">
                <p class="name">${name.toUpperCase()}</p>
                <p class="ID">ID: ${id}</p>
                <p class="type">${data1.types[0].type.name.toUpperCase()}, ${data1.types[1].type.name.toUpperCase()}, ${data1.types[2].type.name.toUpperCase()}, ${data1.types[3].type.name.toUpperCase()}</p>
                <p class="description">${mystring}</p>
                <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
            </div>
            </div>

            `)
        } else if (numTypes.length == 5){
            document.querySelector("#cardList").insertAdjacentHTML("beforeend", `
            
            <div class="card">
            <img class="characterImage" src=${image}>
            <div class="characterInfo">
                <p class="name">${name.toUpperCase()}</p>
                <p class="ID">ID: ${id}</p>
                <p class="type">${data1.types[0].type.name.toUpperCase()}, ${data1.types[1].type.name.toUpperCase()}, ${data1.types[2].type.name.toUpperCase()}, ${data1.types[3].type.name.toUpperCase()}, ${data1.types[4].type.name.toUpperCase()}</p>
                <p class="description">${mystring}</p>
                <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
            </div>
            </div>

            `)
        }
    });
}

function showDescription(){
    const buttons = document.querySelectorAll(".showDescription")
    for (let n of buttons){
        n.addEventListener("click", function(){
            console.log(n.parentElement.querySelector(".ID").innerText.replace("ID:", "").split(' ').join(''));
        });
    }
}

getPokemons(0, 100);