const API_KEY = '489e117d51b2b2e815625547b586b6db';
const cityID = '306'; //San Francisco
const cuisineID = '959'; //Donuts restaurants
const requestURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&count=15&cuisines=${cuisineID}`;
const mainContentContainer = document.getElementById('main-content');

//Main Fetch with API key included in headers: This fetch generates the list of 10 restaurants
const request = new Request(requestURL, {
    headers: new Headers({
      'Accept': 'application/json',
      'user-key': `${API_KEY}`
    })
  });

  fetch(request)
  .then ((response) => {
      return response.json();
  })

  .then((restaurantsObject) => {
    //Extracts restaurants array from the main json object we got in the response
    const restaurantsArray = restaurantsObject.restaurants;
    console.log(restaurantsArray);

    restaurantsArray.forEach((restaurant) => {
        mainContentContainer.innerHTML += generateRestaurantsHTML(restaurant);  //Calls function to generate the HTML for each restaurant
    });
  })

  .catch((error) => {
      console.log(error);
  });

// Function to generate data to show in HTML
function generateRestaurantsHTML(item) {
    //Get Restaurant details
    const restaurantName = item.restaurant.name;
    const restaurantImage = restaurantImageURL(); //Calls function to check if image is available or not
    //const restaurantImageURL = item.restaurant.thumb; **There is also a smaller image version by accesing thumb**
    const restaurantRating = item.restaurant.user_rating.aggregate_rating;
    const restaurantRatingText = item.restaurant.user_rating.rating_text;
    const restaurantEstablishment = item.restaurant.establishment[0];
    const restaurantAddress = item.restaurant.location.address;
    const restaurantCost = item.restaurant.average_cost_for_two;
    const restaurantPriceRange = item.restaurant.price_range;

    //Generate HTML elements
    let restaurantData = '';
    restaurantData += '<section class="restaurant-item">';
    restaurantData += `<img src=${restaurantImage} />`;
    restaurantData += `<h2>${restaurantName}</h2>`;
    restaurantData += `<p>Rating: ${restaurantRating}</p>`;
    restaurantData += `<p>Customers think: ${restaurantRatingText}</p>`;
    restaurantData += `<p>Cost for two: ${restaurantCost}</p>`;
    restaurantData += `<p>Price Range: ${restaurantPriceRange}</p>`;
    restaurantData += `<p>Style: ${restaurantEstablishment}</p>`;
    restaurantData += `<p>Address: ${restaurantAddress}</p>`;
    restaurantData += '</section>';
    return restaurantData;

    //Function to check if image is available or should fall to backup image
    function restaurantImageURL() {
      const restaurantImageURLFromAPI = item.restaurant.featured_image;
      if(restaurantImageURLFromAPI) {
        return restaurantImageURLFromAPI;
      } else {
        return './images/donut.jpg' //Put here path to the image placeholder for restaurant without a feature_image value
      }
    };
};