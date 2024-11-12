
// * Declare Global Variable * //
var siteName=document.getElementById("site-name");
var siteUrl=document.getElementById("site-url");
var lightBoxContainer=document.querySelector("#lightBoxContainer");
var lightBox=document.querySelector("#lightBox");
var closeBtn=document.querySelector("#closeBtn");

// * Declare favoriteSites Array * //
var favoriteSites=[];


//? Get Items From Local Storage ?//
if(localStorage.getItem("favoriteSites")!=null){
    favoriteSites=JSON.parse(localStorage.getItem("favoriteSites"));
    display(favoriteSites);
}


var btnSubmit=document.querySelector(".bookmark-Body .btn-submit");
btnSubmit.addEventListener("click",function(){
    addBookmarkSite();
})

// * Declare addBookmarkSite() Function * //
function addBookmarkSite(){

    // * Declare bookmark Object * //
    var bookmark={
        name:siteName.value,
        url:siteUrl.value
    }

    var flag=true;
    console.log(bookmark);
    console.log(favoriteSites);

    if( isValidName() && isValidUrl(bookmark.url) ){  // ! Check the user Write Correct ! //
        console.log(favoriteSites);
        for(var i=0;i<favoriteSites.length;i++){    // ! Check Not Duplicate Names ! //
            console.log("i =",i);
            console.log(favoriteSites);
            console.log("favoriteSites[i].name",favoriteSites[i].name);
            console.log("bookmark.name",bookmark.name);

            if(bookmark.name==favoriteSites[i].name){
                flag=false;
                break;
            }

        }

            if(flag)
            {
                console.log("add");

        // ^ Add New Object in Array ^ //
        favoriteSites.push(bookmark);
        display(favoriteSites);
        localStorage.setItem("favoriteSites",JSON.stringify(favoriteSites));   // ? Set Items -> String ? //
        clearForm();

            }

            else{

                lightBoxContainer.classList.replace('d-none','d-flex');
                closeBtn.addEventListener("click",function(){
                    lightBoxContainer.classList.replace('d-flex','d-none');
                })
            }

    }

    else{
        lightBoxContainer.classList.replace('d-none','d-flex');
        closeBtn.addEventListener("click",function(){
            lightBoxContainer.classList.replace('d-flex','d-none');
        })
    }

}


// * Declare clearForm() Function * //
function clearForm(){
    siteName.value="";
    siteUrl.value="";
}


// * Declare display(list) Function * //
function display(list){
    var cartona="";
    for(var i=0;i<list.length;i++)
    {
       cartona+= `<tr>
        <td>${i+1}</td>

        <td>${list[i].name}</td>

        <td> <button onclick= "openSiteUrl(${i})" class="btn btn-visit text-white">
        <i class="fa-solid fa-eye pe-2"></i>
        Visit</button>
        </td>

        <td> <button onclick="deleteBookmarkSite(${i})" class="btn btn-delete text-white">
        <i class="fa-solid fa-trash-can pe-2"></i>
        Delete</button>
        </td>
    </tr>`
    }

    document.getElementById("tBody").innerHTML=cartona;
}


// * Declare deleteBookmarkSite(index) Function * //
function deleteBookmarkSite(index){
    favoriteSites.splice(index,1);
    display(favoriteSites)
    localStorage.setItem("favoriteSites",JSON.stringify(favoriteSites));   // ? Set Items -> String ? //
}


// * Declare openSiteUrl(index) Function * //
function openSiteUrl(index){
    window.open(favoriteSites[index].url);  // & Visit Web Site In New Tap & //
}


// * Declare isValidName() Function * //
function isValidName(){
    var regex=/^\w{3,}$/;
    if(regex.test(siteName.value)){
        siteName.classList.replace('is-invalid','is-valid')
        siteName.style.borderColor="#198754";
        siteName.style.boxShadow="0 0 0 0.25rem rgba(25,135,84,.25)";
        return true;
    }

    else{
        siteName.classList.add('is-invalid')
        siteName.style.borderColor="#dc3545";
        siteName.style.boxShadow="0 0 0 0.25rem rgba(220,53,69,.25)";
        return false;
    }
}


//! oninput (siteName) Event !//
siteName.addEventListener("input",function(){

    isValidName();  //call function
    })



// ~ By using the URL constructor and a try...catch statement,
// * you can create a custom isValidUrl(url) Function * //
function isValidUrl(url) {
    try {
      new URL(url);
      siteUrl.classList.replace('is-invalid','is-valid')
      siteUrl.style.borderColor="#198754";
      siteUrl.style.boxShadow="0 0 0 0.25rem rgba(25,135,84,.25)";
      return true;
    } catch (err) {
        siteUrl.classList.add('is-invalid')
        siteUrl.style.borderColor="#dc3545";
        siteUrl.style.boxShadow="0 0 0 0.25rem rgba(220,53,69,.25)";
        return false;
    }
  }


//! oninput (siteUrl) Event !//
siteUrl.addEventListener("input",function(){

    isValidUrl(siteUrl.value) //call function
    })
