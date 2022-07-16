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

        //requisitar caract nos links
        // console.log(data1.stats[0].stat); 
        // console.log(data1.stats[1].stat);
        // console.log(data1.stats[2].stat);
        // console.log(data1.stats[3].stat);
        // console.log(data1.stats[4].stat);
        

        const name = data1.name;
        const id = data1.id;


////EVOLUCAO

        let evolutionName1 = "";
        let evolutionName2 = "";
        let evolutionName3 = "";
        let evolutionId1 = "";
        let evolutionId2 = "";
        let evolutionId3 = "";

        try {

            const species1 =  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            const species2 = await species1.json();
            const species = species2.evolution_chain.url;
    
            const evolution1 = await fetch(species);
            const evolution = await evolution1.json();

            try{
                evolutionName1 = evolution.chain.species.name;
            } catch(e){
                evolutionName1 = "Not found";
            }
            try{
                evolutionName2 = evolution.chain.evolves_to[0].species.name;
            } catch(e){
                evolutionName2 = "Not found";
            }
            try{
                evolutionName3 = evolution.chain.evolves_to[0].evolves_to[0].species.name;
            } catch(e){
                evolutionName3 = "Not found";
            }

            try{
                evolutionId1 = evolution.chain.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
            } catch(e){
                evolutionId1 = "Not found";
            }
            try{
                evolutionId2 = evolution.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
            } catch(e){
                evolutionId2 = "Not found";
            }
            try{
                evolutionId3 = evolution.chain.evolves_to[0].evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
            } catch(e){
                evolutionId3 = "Not found";
            }
            console.log(evolutionName1);
            console.log(evolutionId1);
            console.log(evolutionName2);
            console.log(evolutionId2);
            console.log(evolutionName3);
            console.log(evolutionId3);
            console.log("");
    
        } 
        
        catch(e){
            console.log("ERRO 404");
        }
////


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
                    <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>

                    <span class="descriptionPokemon">
                        <div class="descriptionPokemon2">
                            <div class="descriptionPokemon1">

                                <button type="button" class="closeDescription" onclick="closeDescription()">Close</button>
                                <img class="characterImage" src=${image}>
                                <p>${evolutionName1} ${evolutionId1}, ${evolutionName2} ${evolutionId2}, ${evolutionName3} ${evolutionId3}</p>
                                <p class="name">${name.toUpperCase()}</p>
                                <p class="ID">ID: ${id}</p>
                                <p class="type">${data1.types[0].type.name.toUpperCase()}</p>
                                <p class="description">${mystring}</p>

                            </div>
                        </div>
                    </span>

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
                    <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
                    
                    <span class="descriptionPokemon">
                        <div class="descriptionPokemon2">
                            <div class="descriptionPokemon1">

                                <button type="button" class="closeDescription" onclick="closeDescription()">Close</button>
                                <img class="characterImage" src=${image}>
                                <p>${evolutionName1} ${evolutionId1}, ${evolutionName2} ${evolutionId2}, ${evolutionName3} ${evolutionId3}</p>
                                <p class="name">${name.toUpperCase()}</p>
                                <p class="ID">ID: ${id}</p>
                                <p class="type">${data1.types[0].type.name.toUpperCase()}</p>
                                <p class="description">${mystring}</p>

                            </div>
                        </div>
                    </span>

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
                    <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
                    
                    <span class="descriptionPokemon">
                        <div class="descriptionPokemon2">
                            <div class="descriptionPokemon1">

                                <button type="button" class="closeDescription" onclick="closeDescription()">Close</button>
                                <img class="characterImage" src=${image}>
                                <p>${evolutionName1} ${evolutionId1}, ${evolutionName2} ${evolutionId2}, ${evolutionName3} ${evolutionId3}</p>
                                <p class="name">${name.toUpperCase()}</p>
                                <p class="ID">ID: ${id}</p>
                                <p class="type">${data1.types[0].type.name.toUpperCase()}</p>
                                <p class="description">${mystring}</p>

                            </div>
                        </div>
                    </span>
                    
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
                    <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
                    
                    <span class="descriptionPokemon">
                        <div class="descriptionPokemon2">
                            <div class="descriptionPokemon1">

                                <button type="button" class="closeDescription" onclick="closeDescription()">Close</button>
                                <img class="characterImage" src=${image}>
                                <p>${evolutionName1} ${evolutionId1}, ${evolutionName2} ${evolutionId2}, ${evolutionName3} ${evolutionId3}</p>
                                <p class="name">${name.toUpperCase()}</p>
                                <p class="ID">ID: ${id}</p>
                                <p class="type">${data1.types[0].type.name.toUpperCase()}</p>
                                <p class="description">${mystring}</p>

                            </div>
                        </div>
                    </span>
                    
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
                    <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>
                    
                    <span class="descriptionPokemon">
                        <div class="descriptionPokemon2">
                            <div class="descriptionPokemon1">

                                <button type="button" class="closeDescription" onclick="closeDescription()">Close</button>
                                <img class="characterImage" src=${image}>
                                <p>${evolutionName1} ${evolutionId1}, ${evolutionName2} ${evolutionId2}, ${evolutionName3} ${evolutionId3}</p>
                                <p class="name">${name.toUpperCase()}</p>
                                <p class="ID">ID: ${id}</p>
                                <p class="type">${data1.types[0].type.name.toUpperCase()}</p>
                                <p class="description">${mystring}</p>

                            </div>
                        </div>
                    </span>
                    
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

            n.parentElement.querySelector(".descriptionPokemon").style.display="unset";
        });
    }
}

function closeDescription(){
    const description = document.querySelectorAll(".descriptionPokemon");

    for (let n of description){
        n.style.display="none";
    }
}

getPokemons(0, 100);
