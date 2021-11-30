const body = document.body;
const searchInput = document.querySelector('#search-input');
const imgNumber = document.querySelector('#img-number');
const sizeSelection = document.querySelector('#size-selection');
const submitBtn = document.querySelector('#submit-button');
let errorMessage = document.querySelector('#error-message');

submitBtn.addEventListener('click', searchImages);

body.addEventListener ('mousemove', function (event){
    //console.log(event.clientX); 
    const hue = event.clientX;
    body.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
})

function searchImages(event){
    event.preventDefault();
    const searchText = searchInput.value; 
    const searchNum = imgNumber.value;
    const searchUrl = makeSearchUrl(searchText, searchNum);
    const divEl= document.querySelectorAll('#img-gallery img');//this is how to restart the search

        for(let i = 0; i<divEl.length; i++){
            const el = divEl[i];
            el.remove();
        } 
    getImagesFromFlickr(searchUrl)
}

function makeSearchUrl(searchText, searchNum){
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad9dba35f24bf69a6c25f9d98cc8e3c3&text=${searchText}&per_page=${searchNum}&format=json&nojsoncallback=1&sort=relevance&accuracy=1`;
}

function getImagesFromFlickr(url){
    fetch(url).then(
        function (response) {
            return response.json();
        }
    ) .then(
        function (flickrData) {
            console.log(flickrData)
            const size = sizeSelection.value
            
            // loop through the array of photo data and call addImage for each item.
            flickrData.photos.photo.forEach(photo => {
                const url = getImageUrl(photo, size)
                addImage(url)
            })
        }
    ).catch(
        function(error) {
            console.log(error);
            errorMessage.textContent = 'Cannot find the image you are looking for. Try again!'
        }
    )
}

function getImageUrl(photoObject, size){
    let photo = photoObject;
    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    return imgUrl;
}

function addImage(url){
    let img = document.createElement('img');
    img.src = url;
    let div = document.querySelector('#img-gallery');
    img.style.margin = '0.3rem 0.3rem';
    div.appendChild(img);
}