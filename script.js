// show categories on html on ui
let currentPets = []

// create loadPets
const loadPets = () =>{
//   fetching data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then((res) => res.json())
  .then(data => displayPets(data.categories) )
  .catch((error) => console.log(error))

}
loadPets()

const removeActive = ()=>{
    const allBtn = document.getElementsByClassName("buttons")
    for(btn of allBtn){
        btn.classList.remove("active")
    }

}
// display pets with categories

//   filter category as per name function

const filterCategory= (name)=>{
    

    const loader = document.getElementById("loader");
    const petCards = document.getElementById("card-container");
    const likeDiv = document.getElementById("like-div");

    
    loader.classList.remove("hidden");
    petCards.classList.add("hidden");
    likeDiv.classList.add("hidden");
    // alert(name)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    .then((res) => res.json())
    .then(data => {
        setTimeout(() => {
            removeActive()
            const activeBtn = document.getElementById(`btn-${name}`)
            activeBtn.classList.add("active")
             currentPets = data.data
            displayCards(data.data)

            loader.classList.add("hidden");
            petCards.classList.remove("hidden");
            likeDiv.classList.remove("hidden")
        }, 2000);
    })
    .catch((error) => console.log(error))
  
   
}

const displayPets = (categories) =>{
    const categoryBtnContainer = document.getElementById("category-btn-section")
    categories.forEach( (item) => {
   

  //    create button fro  category

     let button = document.createElement("div")
     
     button.innerHTML = `
      <button id="btn-${item.category}" 
                    onclick="filterCategory('${item.category}')" 
                    class="btns buttons flex items-center justify-center border border-gray-300 rounded-lg p-2 m-1 transition-all duration-300 hover:bg-[#0E7A81] hover:text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0E7A81] focus:ring-opacity-50">
                <img class="object-cover h-6 w-7 mr-2" src="${item.category_icon}" alt="${item.category}">
                <span class="text-lg font-semibold">${item.category}</span>
            </button>
     `
    //  button.innerText = item.category {this is not allowed to use innerText when using inner.Html}

    //  add button to categorBtnContainer

    categoryBtnContainer.append(button)
 })
}
                    //   sorting 
document.getElementById('sort-btn').addEventListener('click', () => {
    if (currentPets.length > 0) {
        const sortedPets = currentPets.sort((a, b) => b.price - a.price);
        displayCards(sortedPets);
    } else {
        alert("No pets to sort. Please filter a pet category first.");
    }
});