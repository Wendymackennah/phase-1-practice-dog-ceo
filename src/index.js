
console.log("%c HI", "color: firebrick");

//function to fetch and display the images
function displayImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

  fetch(imgUrl)
    .then((res) => res.json())
    .then((data) => {
      const imagesUrls = data.message;

      const dogImager = document.getElementById("dog-image-container");

      imagesUrls.forEach((url) => {
        const imager = document.createElement("img");
        imager.src = url;
        imager.alt = "Dog image";

        dogImager.appendChild(imager);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

//function to get the dog breed
function displayDogBreeds(filterUsingLetters) {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  fetch(breedUrl)
    .then((res) => res.json())
    .then((data) => {
      const breeds = data.message;

      const dogBreeders = document.getElementById("dog-breeds");

      // Iterating over the breeds and creating li elements for each
      for (const breed in breeds) {
        // filtering breeds according to the provided letter
        if (!filterUsingLetters || breed.startsWith(filterUsingLetters)) {
          const li = document.createElement("li");
          li.textContent = breed;

          li.addEventListener("click", () => {
            li.style.cursor = "pointer";
            li.style.color = "green";
          });

          
          // Creating a list for the sub-breeds
          if (breeds[breed].length > 0) {
            const subBreedList = document.createElement("ul");
            breeds[breed].forEach((subBreed) => {
              const subListings = document.createElement("li");
              subListings.textContent = `${subBreed} ${breed}`;

              subListings.addEventListener("click", (event) => {
                event.stopPropagation();
                subListings.style.cursor = "pointer";
                subListings.style.color = "green";
              });

              subBreedList.appendChild(subListings);
            });
            li.appendChild(subBreedList);
          }

          dogBreeders.appendChild(li);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching dog breeds:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  displayImages();
  // displaying all breeds initially
  displayDogBreeds();

  // Adding event listener to the dropdown menu
  const breedDropdown = document.getElementById("breed-dropdown");
  breedDropdown.addEventListener("change", function () {
    const selectedLetter = breedDropdown.value;
    displayDogBreeds(selectedLetter);
  });
  });