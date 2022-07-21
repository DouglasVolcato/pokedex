async function getPokemons(page = 0,number = 1){
    const server = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=${page}`);
    const data = await server.json();

    data.results.forEach(async function(item) {

        const server1 = await fetch(item.url);
        const data1 = await server1.json();

        const hp = `${data1.stats[0].stat.name}: ${data1.stats[0].base_stat}`;
        const attack = `${data1.stats[1].stat.name}: ${data1.stats[1].base_stat}`;
        const defence = `${data1.stats[2].stat.name}: ${data1.stats[2].base_stat}`;
        const special_attack = `${data1.stats[3].stat.name}: ${data1.stats[3].base_stat}`;
        const special_defense = `${data1.stats[4].stat.name}: ${data1.stats[4].base_stat}`;

        const name = data1.name;
        const id = data1.id;

        let evolutionName1 = "";
        let evolutionName2 = "";
        let evolutionName3 = "";
        let evolutionId1 = "";
        let evolutionId2 = "";
        let evolutionId3 = "";
        let evolutionId1Real = "";
        let evolutionId2Real = "";
        let evolutionId3Real = "";
        let evolutionImage1 = "";
        let evolutionImage2 = "";
        let evolutionImage3 = "";
        let evolutionImage1Real = "";
        let evolutionImage2Real = "";
        let evolutionImage3Real = "";

        try {
            const species1 =  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            const species2 = await species1.json();
            const species = species2.evolution_chain.url;
            const evolution1 = await fetch(species);
            const evolution = await evolution1.json();

            if (id == 236){
                console.log(evolution.chain);
            }

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
            evolutionId1Real = evolutionId1 == "" ? "Not found" : evolutionId1;
            evolutionId2Real = evolutionId2 == "" ? "Not found" : evolutionId2;
            evolutionId3Real = evolutionId3 == "" ? "Not found" : evolutionId3;

            if (id != evolutionId1Real && id != evolutionId2Real && id != evolutionId3Real){
                for (let i = 1; i <= 8; i++){
                    try{
                        if (id == evolution.chain.evolves_to[i].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('')){
                            evolutionId2 = evolution.chain.evolves_to[i].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
                            evolutionName2 = evolution.chain.evolves_to[i].species.name
                        }
                    } catch(e){}
                    for (let f = 0; f <= 8; f++){
                        try{
                            if (id == evolution.chain.evolves_to[i].evolves_to[f].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('')){
                                evolutionId3 = evolution.chain.evolves_to[i].evolves_to[f].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "").split(' ').join('');
                                evolutionName3 = evolution.chain.evolves_to[i].evolves_to[f].species.name;
                            }
                        } catch(e){}
                    }
                }
            }
            evolutionId1Real = evolutionId1 == "" ? "Not found" : evolutionId1;
            evolutionId2Real = evolutionId2 == "" ? "Not found" : evolutionId2;
            evolutionId3Real = evolutionId3 == "" ? "Not found" : evolutionId3;

            evolutionImage1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId1}.png`;
            evolutionImage2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId2}.png`;
            evolutionImage3 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId3}.png`;
            evolutionImage1Real = evolutionId1Real == "Not found" ? "./assets/images/noImage.jpg" : evolutionImage1;
            evolutionImage2Real = evolutionId2Real == "Not found" ? "./assets/images/noImage.jpg" : evolutionImage2;
            evolutionImage3Real = evolutionId3Real == "Not found" ? "./assets/images/noImage.jpg" : evolutionImage3;
        } 
        catch(e){
            evolutionId1Real = evolutionId1 == "" ? "Not found" : evolutionId1;
            evolutionId2Real = evolutionId2 == "" ? "Not found" : evolutionId2;
            evolutionId3Real = evolutionId3 == "" ? "Not found" : evolutionId3;

            evolutionImage1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId1}.png`;
            evolutionImage2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId2}.png`;
            evolutionImage3 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionId3}.png`;
            evolutionImage1Real = evolutionId1Real == "Not found" ? "./assets/images/noImage.jpg" : evolutionImage1;
            evolutionImage2Real = evolutionId2Real == "Not found" ? "./assets/images/noImage.jpg" : evolutionImage2;
            evolutionImage3Real = evolutionId3Real == "Not found" ? "./assets/images/noImage.jpg" : evolutionImage3;
        }

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

        let type1 = "";
        let type2 = "";
        let type3 = "";
        let type4 = "";
        let type5 = "";

        try{
            type1 = data1.types[0].type.name.toUpperCase();
        }catch(e){
            type1 = "";
        }
        try{
            type2 = data1.types[1].type.name.toUpperCase();
        }catch(e){
            type2 = "";
        }
        try{
            type3 = data1.types[2].type.name.toUpperCase();
        }catch(e){
            type3 = "";
        }
        try{
            type4 = data1.types[3].type.name.toUpperCase();
        }catch(e){
            type4 = "";
        }
        try{
            type5 = data1.types[4].type.name.toUpperCase();
        }catch(e){
            type5 = "";
        }

        function verifyType(a){
            let answer = "";
            if (a.toUpperCase() == "BUG"){
                answer = `<a class="type" style="background-color:green; color:white">${a}</a>`;
            } if (a.toUpperCase() == "DRAGON"){
                answer = `<a class="type" style="background-color:crimson; color:white">${a}</a>`;
            } if (a.toUpperCase() == "FAIRY"){
                answer = `<a class="type" style="background-color:fuchsia; color:white">${a}</a>`;
            } if (a.toUpperCase() == "FIRE"){
                answer = `<a class="type" style="background-color:orange">${a}</a>`;
            } if (a.toUpperCase() == "GHOST"){
                answer = `<a class="type" style="background-color:darkmagenta; color:white">${a}</a>`;
            } if (a.toUpperCase() == "GROUND"){
                answer = `<a class="type" style="background-color:olive; color:white">${a}</a>`;
            } if (a.toUpperCase() == "NORMAL"){
                answer = `<a class="type" style="background-color:white">${a}</a>`;
            } if (a.toUpperCase() == "PSYCHIC"){
                answer = `<a class="type" style="background-color:pink">${a}</a>`;
            } if (a.toUpperCase() == "STEEL"){
                answer = `<a class="type" style="background-color:dimgray; color:white">${a}</a>`;
            } if (a.toUpperCase() == "DARK"){
                answer = `<a class="type" style="background-color:black; color:white">${a}</a>`;
            } if (a.toUpperCase() == "ELECTRIC"){
                answer = `<a class="type" style="background-color:yellow">${a}</a>`;
            } if (a.toUpperCase() == "FIGHTING"){
                answer = `<a class="type" style="background-color:orangered; color:white">${a}</a>`;
            } if (a.toUpperCase() == "FLYING"){
                answer = `<a class="type" style="background-color:mediumspringgreen">${a}</a>`;
            } if (a.toUpperCase() == "GRASS"){
                answer = `<a class="type" style="background-color:lime">${a}</a>`;
            } if (a.toUpperCase() == "ICE"){
                answer = `<a class="type" style="background-color:turquoise">${a}</a>`;
            } if (a.toUpperCase() == "POISON"){
                answer = `<a class="type" style="background-color:palevioletred">${a}</a>`;
            } if (a.toUpperCase() == "ROCK"){
                answer = `<a class="type" style="background-color:brown; color:white">${a}</a>`;
            } if (a.toUpperCase() == "WATER"){
                answer = `<a class="type" style="background-color:steelblue; color:white">${a}</a>`;
            }

            if (answer == undefined){return ""}
            else {return answer};
        }

        if (true){
    
            document.querySelector("#cardList").insertAdjacentHTML("beforeend", `
            
            <div class="card">
                <img class="characterImage" src=${image}>
                <div class="characterInfo">                    
                    <p class="name">${name.toUpperCase()}</p>
                    <p class="ID">ID: ${id}</p>
                    <div class="types">
                        ${verifyType(type1)}
                        ${verifyType(type2)}
                        ${verifyType(type3)}
                        ${verifyType(type4)}
                        ${verifyType(type5)}
                    </div>
                    <button type="button" class="showDescription" onclick="showDescription()">Show Description</button>

                    <span class="descriptionPokemon">
                        <div class="descriptionPokemon2">
                            <div class="descriptionPokemon1">

                                <button type="button" class="closeDescription" onclick="closeDescription()">Close</button>

                                <div class="divImages">
                                    <div>
                                        <img class="characterImage" src=${image}>
                                        <p class="name">${name.toUpperCase()}</p>
                                        <p class="ID">ID: ${id}</p>
                                    </div>
                                    <div>
                                        <p class="name">Evolution Chain</p>
                                        <div class="evolucoes">
                                            <div>
                                                <img class="characterImage" src=${evolutionImage1Real}>
                                                <p class="name">${evolutionName1.toUpperCase()}</p>
                                                <p class="ID">ID: ${evolutionId1Real}</p>
                                            </div>
                                            <div>
                                            <img class="characterImage" src=${evolutionImage2Real}>
                                            <p class="name">${evolutionName2.toUpperCase()}</p>
                                                <p class="ID">ID: ${evolutionId2Real}</p>
                                            </div>
                                            <div>
                                            <img class="characterImage" src=${evolutionImage3Real}>
                                            <p class="name">${evolutionName3.toUpperCase()}</p>
                                                <p class="ID">ID: ${evolutionId3Real}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="description_class_stats">
                                    <div class="stats">
                                        <p>${hp}</p>
                                        <p>${attack}</p>
                                        <p>${defence}</p>
                                        <p>${special_attack}</p>
                                        <p>${special_defense}</p>
                                    </div>
                                    <div>
                                        <div class="types">
                                            ${verifyType(type1)}
                                            ${verifyType(type2)}
                                            ${verifyType(type3)}
                                            ${verifyType(type4)}
                                            ${verifyType(type5)}
                                        </div>
                                        <p class="descriptionPage">${mystring}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            `);
        } 
    });
}

function showDescription(){
    const buttons = document.querySelectorAll(".showDescription")
    for (let n of buttons){
        n.addEventListener("click", function(){
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

async function search(){
    const inputSearch = document.querySelector("#inputSearch");
    const allCards = document.querySelectorAll(".card");

    for (let n of allCards){
        n.style.display = "none";
    }

    await getPokemons(0, 10000);

    const allCards2 = document.querySelectorAll(".card");

    for(let n of allCards2){
        if (n.querySelector(".type").innerText.toUpperCase().includes(inputSearch.value.toUpperCase())){
            n.style.display = "";
        } else if (n.querySelector(".ID").innerText.toUpperCase().includes(inputSearch.value.toUpperCase())){
            n.style.display = "";
        } else if (n.querySelector(".name").innerText.toUpperCase().includes(inputSearch.value.toUpperCase())){
            n.style.display = "";
        } else {
            n.style.display = "none";
        }
    }
    inputSearch.value = "";
}

async function pages(from = 0, to = 99) {

    const everyCard = document.querySelectorAll(".card")
    for (let n of everyCard){
        n.style.display = "none";
    }
    
    const qtd = from + to

    for (let i = from; i <= qtd; i++){
        await new Promise((resolve) => {
            resolve(getPokemons(i));
        });
    }
}

pages(0, 99, 1);
