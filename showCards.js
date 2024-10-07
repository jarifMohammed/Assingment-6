//  fetch data of all pets to show in cards
const loadCards = () =>{
    const loader = document.getElementById("loader");
    const petCards = document.getElementById("card-container");

    // Show the loader and hide the card container
    loader.classList.remove("hidden");
    petCards.classList.add("hidden");
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        setTimeout(() => {
            displayCards(data.pets);
            
            loader.classList.add("hidden");
            petCards.classList.remove("hidden");
            
        }, 2000);
    })
    .catch((error) => console.log(error))
}


const displayCards = (cards) => {
    const petCards = document.getElementById("card-container")
    petCards.innerHTML=""

      if(cards.length == 0){
        petCards.classList.remove("grid")
         petCards.innerHTML=` <div class=" justify-center text-center card bg-base-100 p-8 border-2">
                            <div class="flex justify-center">
                                <img class="rounded-xl  w-20 py-8" src="images/error.webp" alt="Shoes" />
                            </div>
                            <h2 class="font-black text-4xl mb-4">No Information available</h2>
                            <p>Currently, there is no information available in the Bird category. We are working to update our listings and provide you with the latest details. Please check back soon for new additions and updates!</p>

                        </div>`
         return
      } else{
        petCards.classList.add("grid")
      }

    cards.forEach((pet) =>{
        const card = document.createElement("div")
        
        card.classList = "bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4";
        card.innerHTML=` <img class="rounded-xl object-fill" src="${pet.image}" alt="Shoes" />
        <div class="mt-4">
            <h2 class="text-xl font-bold mb-2">${pet.pet_name}</h2>
            <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/bulldog.png" alt="bulldog"/>Breed: ${pet.breed?pet.breed:"unknown breed"}</p>
            <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/ios/20/birth-date.png" alt="birth-date"/>Birth: ${pet.date_of_birth?pet.date_of_birth.substring(0, 4):"unknown"}</p>
            <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/cotton/20/gender.png" alt="gender"/>Gender: ${pet.gender?pet.gender:"unknown gender"}</p>
            <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/average-2.png" alt="average-2"/>Price : ${pet.price?pet.price:"unknown price"}$</p>

            <div class="grid grid-cols-3 gap-2 pt-3 border-t-2">
                <button id="${pet.petId}-like" class="btn px-0"><img width="25" height="25" src="https://img.icons8.com/material-outlined/25/facebook-like.png" alt="facebook-like"/></button>
                <button id="${pet.petId}-adopt" class="btn px-0 text-[#0E7A81]">Adopt</button>
                <button onclick="loadDetails(${pet.petId})" id="${pet.petId}-details" class="btn px-0 text-[#0E7A81]">Details</button>
            </div>
        </div>`
        petCards.append(card)
    //    function to show coundown modal
        adopted(pet)
        // function to see liked
        likeBtn(pet)
    })
}
// like button functionality
const likeBtn = (pet)=>{
    const likeButton = document.getElementById(`${pet.petId}-like`)
    const likeDiv = document.getElementById("like-div")

    likeButton.addEventListener('click', ()=>{
        const liked = document.createElement("img")
        liked.src = pet.image
        liked.alt = `${pet.petId}-like`
        liked.classList = "rounded-xl w-full"

        likeDiv.appendChild(liked)
    })
}





// showing adpot mmodal
const adopted= (pet) =>{
      const openButton = document.getElementById('openModal')
      const adopt = document.getElementById(`${pet.petId}-adopt`)
       const countDown = document.getElementById('adoptModal')
       const display = document.getElementById('count')

          adopt.addEventListener('click' ,()=>{
           
            countDown.showModal()
            startCountdown(3)
          })
          function startCountdown(seconds){
            let countdown = seconds
            display.textContent = countdown
            
            const interval = setInterval(() =>{
                countdown --
                display.textContent = countdown
                if(countdown <0){
                    adopt.innerText="Adopted"
                    adopt.disabled= "true"
                    clearInterval(interval)
                countDown.close()
            }
            }, 1000)

 }
}

// load details after clicking  the details button
const loadDetails= async(petId) =>{
  
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  const res = await fetch(uri)
  const data = await res.json()
  displayModal(data.petData)
  
  
}

const displayModal=(pet)=>{
    
       const petsDetails = document.getElementById("modal-content")
       document.getElementById("customModal").showModal()
    petsDetails.innerHTML=`<img class="rounded-xl w-full" src="${pet.image}" alt="Shoes" />
                <div class="mt-4">
                    <h2 class="text-xl font-bold mb-2">${pet.pet_name}</h2>
                    <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/bulldog.png" alt="bulldog"/>Breed: ${pet.breed?pet.breed:"unknown breed"}</p>
                    <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/ios/20/birth-date.png" alt="birth-date"/>Birth: ${pet.date_of_birth?pet.date_of_birth:"unknown"}</p>
                    <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/cotton/20/gender.png" alt="gender"/>Gender: ${pet.gender?pet.gender:"unknown gender"}</p>
                    <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/average-2.png" alt="average-2"/>Price : ${pet.price?pet.price:"unknown price"}$</p>
                    <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="25" height="25" src="https://img.icons8.com/external-outline-wichaiwi/25/external-vaccination-reopening-country-outline-wichaiwi.png" alt="external-vaccination-reopening-country-outline-wichaiwi"/>vaccinated_status : ${pet.vaccinated_status}</p>

                    <br><br>
                    <hr>
                    <br>
                    
                    <h3 class="font-bold">Detail Information</h3>
                    <p class="flex gap-1 font-normal text-[#131313B3] mb-1">${pet.pet_details}</p>

                    <br><br>

                    
                </div>
                `
                
                
}









loadCards()
