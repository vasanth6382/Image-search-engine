const Accesskey = "YJlYW1Te8p_hdML7YstPPqJSpSLp8rSn2zqzg5pFSgs";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchresults =document.querySelector(".search-results");
const showmore =document.getElementById("show-more-button");

let inputdata = "";
let page = 1;

async function searchImages(){
    inputdata = inputE1.value;
    const url = `https://api.unslpash.com/search/photos?
    page=${page}&query=${inputdata}&client_id=${Accesskey}`;

const response = await fetch(url);
const data =await response.json();

const results = data.results;

if (page === 1){
    searchresults.innerHTML = "";

}
results.map((result)=>{
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");
    const image = document.createElement('img');
    image.src= result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchresults.appendChild(imageWrapper);
});
page++;

if (page > 1){
    showmore.style.display = "block";
}
}

formE1.addEventListener("submit", (event) =>  
{
    event.preventDefault()
    page = 1;
    searchImages();
})

showmore.addEventListener("click", () =>
{
    searchImages();    
})