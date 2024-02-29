const cardConteiner = document.getElementById("card-conteiner");
const modalDialog = document.getElementById("my_modal_3");
const modalContent = document.getElementById("modal-content");
let clickeItem = false;


const seDetails = async (id) => {
    let idModified = id;
    if (id < 10) {
        idModified = '0' + id
    }
    const detailsRes = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${idModified}`);
    const detailsData = await detailsRes.json();
    console.log(detailsData);
    my_modal_3.showModal();
    modalDialog.innerHTML = `
        <div class="bg-white rounded-xl w-5/6 relative">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</button>
            </form>
            <div class="flex justify-between p-8">
            <div class="md:flex justify-between gap-4">
            <div class="bg-red-100 rounded-xl p-4 md:w-1/2 border-2 border-red-300">
                <div class="w-5/6 pb-4">
                    <h2 class="text-2xl font-bold">${detailsData.data?.description}</h2>
                </div>
                <div class="flex justify-between gap-4">
                    <div class="bg-white p-2 text-green-600 font-semibold rounded-md">
                        <h3>${detailsData.data.pricing[0]?.price} ${detailsData.data.pricing[0]?.plan}</h3>
                    </div>
                    <div class="bg-white p-2 text-amber-600 font-semibold rounded-md">
                        <h3>${detailsData.data.pricing[0]?.price} ${detailsData.data.pricing[1]?.plan}</h3>
                    </div>
                    <div class="bg-white p-2 text-red-600 font-semibold rounded-md">
                        <h3>${detailsData.data.pricing[0]?.price} ${detailsData.data.pricing[2]?.plan}</h3>
                    </div>
                </div>
    
                <div class="flex gap-4">
                    <div>
                        <h6 class="text-2xl font-bold">Explore</h6>
                        <p class="">Features</p>
                        <p class="">Enterprise</p>
                        <p class="">Security</p>
                        <p class="">Pricing</p>
                    </div>
                    <div>
                        <h6 class="text-2xl font-bold">Apps</h6>
                        <p class="">Mac</p>
                        <p class="">Windows</p>
                        <p class="">iPhone</p>
                        <p class="">Android</p>
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 shadow-xl md:w-1/2 p-4">
                <div>
                    <figure class="">
                        <img src=${detailsData.data.image_link[0]} alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${detailsData.data.input_output_examples[0]?.input}</h2>
                        <p>${detailsData.data.input_output_examples[0]?.output}</p>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    `
}

const loadCards = async () => {
    cardConteiner.innerHTML = "";

    const AllDataUrl = "https://openapi.programming-hero.com/api/ai/tools"
    const res = await fetch(AllDataUrl);
    const data = await res.json();
    const cardsData = data.data.tools

    if (clickeItem) {
        const date = (cardsData.sort((a, b) => {
            return new Date(b.published_in) - new Date(a.published_in);
        }))
        date.forEach(card => {
            const cardDiv = document.createElement("div");
            cardDiv.innerHTML = `
            <div onclick="seDetails(${card.id})" class="card w-96 bg-base-100 shadow-xl p-4 cursor-pointer">
                    <figure>
                    <div><img src="${card.image}" alt="${card.name} img" /></div>
                    </figure>
                    <div class="py-4 space-y-2">
                        <div>
                            <h2 class="card-title">Features</h2>
                            <p>1. ${card.features?.[0]}</p>
                            <p>2. ${card.features?.[1]}</p>
                            <p>3. ${card.features?.[2]}</p>
                        </div>
                        <hr>
                        <div>
                            <h2 class="card-title">${card.name}</h2>
                            <p>published: ${card.published_in}</p>
                        </div>
    
                    </div>
                </div>
            `
            cardConteiner.appendChild(cardDiv)

        });
    }
    else {
        cardsData.forEach(card => {
            const cardDiv = document.createElement("div");
            cardDiv.innerHTML = `
        <div onclick="seDetails(${card.id})" class="card w-full bg-base-100 shadow-xl p-4 cursor-pointer">
                <figure>
                <div><img class=" w-full" src="${card.image}" alt="${card.name} img" /></div>
                </figure>
                <div class="py-4 space-y-2">
                    <div>
                        <h2 class="card-title">Features</h2>
                        <p>1. ${card.features?.[0]}</p>
                        <p>2. ${card.features?.[1]}</p>
                        <p>3. ${card.features?.[2]}</p>
                    </div>
                    <hr>
                    <div>
                        <h2 class="card-title">${card.name}</h2>
                        <p>published: ${card.published_in}</p>
                    </div>

                </div>
            </div>
        `
            cardConteiner.appendChild(cardDiv)
        });
    }
}

loadCards()

document.getElementById("sort-data").addEventListener("click", () => {
    clickeItem = true;
    loadCards();
})
