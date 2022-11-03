const userEl=document.getElementById("user")
const popupBtnEl=document.getElementById("popup-btn")
const popupContainerEl=document.getElementById("popup-container")
const popupEl=document.getElementById("popup")
const closeEl=document.getElementById("close")
const editEl=document.getElementById("edit")
const formEl=document.getElementById("form")
const saveEl=document.getElementById("save")
const nameEl=document.getElementById("name")
const emailEl=document.getElementById("email")
const phoneEl=document.getElementById("phone")
const usernameEl=document.getElementById("username")
const addressEl=document.getElementById("address")
const cityEl=document.getElementById("city")
const zipcodeEl=document.getElementById("zipcode")
const latEl=document.getElementById("lat")
const lngEl=document.getElementById("lng")
const locationEl=document.getElementById("google-places")
const latDivEl=document.getElementById("lat-div")
const lngDivEl=document.getElementById("lng-div")

const popupContainerEditEl=document.getElementById("popup-container-edit")
const popupEditEl=document.getElementById("popup-edit")
const closeEditEl=document.getElementById("close-edit")
const formEditEl=document.getElementById("form-edit")
const nameEditEl=document.getElementById("name-edit")
const emailEditEl=document.getElementById("email-edit")
const phoneEditEl=document.getElementById("phone-edit")
const usernameEditEl=document.getElementById("username-edit")
const addressEditEl=document.getElementById("address-edit")
const cityEditEl=document.getElementById("city-edit")
const zipcodeEditEl=document.getElementById("zipcode-edit")
const latEditEl=document.getElementById("lat-edit")
const lngEditEl=document.getElementById("lng-edit")
const locationEditEl=document.getElementById("google-places-edit")
const latEditDivEl=document.getElementById("lat-edit-div")
const lngEditDivEl=document.getElementById("lng-edit-div")

let rowId=0;

//display all users 
const displayUsers = async ()=>{
      const res = await fetch("http://localhost:8008/users")
      const data = await res.json()
      for( let i=0; i<data.length; i++){
        userEl.innerHTML+=`
        <tr>
        <td id="table-ids">${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phone}</td>
        <td id="td-icons">
        <div id="icons">
        <img src="images/edit_icon.png" id="edit" onclick="editUserModal(${data[i].id})" alt="">
        <img src="images/delete_icon.png" onclick="deleteUser(${data[i].id})" id="delete" alt="">
        </div>
        </td>
        </tr>
       `
      }
}

displayUsers()

//delete a user
const deleteUser = async (id) =>{
      fetch('http://localhost:8008/users/'+id,{
      method: 'DELETE',
      })
}

//Create new user
const addUser = async() =>{
    const res = await fetch("http://localhost:8008/users",{
          method: "POST",
          body:JSON.stringify({
                name: nameEl.value,
                email: emailEl.value,
                phone: phoneEl.value,
                username: usernameEl.value,
                address: addressEl.value,
                city: cityEl.value,
                zicode: zipcodeEl.value,
                lat: latEl.value,
                lng: lngEl.value
          }),
          headers:{
                'Content-type': 'application/json; charset=UTF-8',
          }
    })     
}

//update user
const editUser = (id) =>{

    const res = fetch(`http://localhost:8008/users/${id}`,{
          method: "PATCH",
          body:JSON.stringify({
            name: nameEditEl.value,
            email: emailEditEl.value,
            phone: phoneEditEl.value,
            username: usernameEditEl.value,
            address: addressEditEl.value,
            city: cityEditEl.value,
            zicode: zipcodeEditEl.value,
            lat: latEditEl.value,
            lng: lngEditEl.value
          }),
          headers:{
                'Content-type': 'application/json; charset=UTF-8',
          }
    })     
}

//prevent add user autosubmission form 
formEl.addEventListener('submit', (e)=>{
  e.preventDefault()
  validateForm()
})

//prevent edit user autosubmission form
formEditEl.addEventListener('submit', (e)=>{
  e.preventDefault()
  editUser(rowId)
})

//open popup for edit User
const editUserModal = (id) =>{
  popupContainerEditEl.style.display="flex"
  popupEditEl.style.display="flex"
  rowId = id
}

//open popup
const openForm=()=>{
    popupContainerEl.style.display="flex"
    popupEl.style.display="flex"
}

// close popup
closeEl.addEventListener("click", ()=>{
    popupContainerEl.style.display="none"
    popupEl.style.display="none"
})

closeEditEl.addEventListener("click", ()=>{
  popupContainerEditEl.style.display="none"
  popupEditEl.style.display="none"
})

//show latitude and longitude add user form 
const showFields = ()=>{
if (locationEl.checked) {
    latDivEl.style.display = 'block'
    latEl.style.display="block"
    lngDivEl.style.display = 'block'
    lngEl.style.display="block"
  } else {
    latDivEl.style.display = 'none'
    latEl.style.display="none"
    lngDivEl.style.display ="none"
    lngEl.style.display="none"
  }
}

//show latitude and longitude edit user form 
const showEditFields = ()=>{
  if (locationEditEl.checked) {
      latEditDivEl.style.display = 'block'
      latEditEl.style.display="block"
      lngEditDivEl.style.display = 'block'
      lngEditEl.style.display="block"
    } else {
      latEditDivEl.style.display = 'none'
      latEditEl.style.display="none"
      lngEditDivEl.style.display ="none"
      lngEditEl.style.display="none"
    }
  }

// ADD USER FORM VALIDATION

//email address validation
const emailValidation = ()=>{

  const emailElValue=emailEl.value.trim(); 
  const validEmailAddress=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailErrEl=document.getElementById('email-err');

  if(emailElValue=="")
  {
   emailErrEl.innerHTML="Email address is required!";
   emailEl.style.borderColor = "red";

  }else if(!validEmailAddress.test(emailElValue)){
    emailErrEl.innerHTML="Please enter a valid email address!";
    emailEl.style.borderColor = "red";
  }else{
    emailErrEl.innerHTML="";
    return true;
  }
}
emailEl.oninput = ()=>{
emailValidation();
}

//phone number validation
const phoneNumberValidation = ()=>{

  const phoneNumberValue=phoneEl.value.trim(); 
  const validPhoneNumber=/^[0-9]*$/;
  const phoneErrEl=document.getElementById('phone-err');

  if(phoneNumberValue=="")
  {
   phoneErrEl.innerHTML="Phone number is required!";
   phoneEl.style.borderColor = "red";
  }else if(!validPhoneNumber.test(phoneNumberValue)){
    phoneErrEl.innerHTML="Please enter a valid phone number!";
    phoneEl.style.borderColor = "red";
  }else if(phoneNumberValue.length!=10){
    phoneErrEl.innerHTML="Phone number should have 10 digits!";
    phoneEl.style.borderColor = "red";
  }
  else{
    phoneErrEl.innerHTML="";
    return true;
  }

}
phoneEl.oninput= ()=>{
phoneNumberValidation();
}

//validate form
const validateForm = ()=>{
  
  emailValidation();
  phoneNumberValidation();
  
  if(emailValidation() == true && 
    phoneNumberValidation()==true){
    return true;
  }else{
    return false;
  }
}

//submit form if validateForm() returns 
saveEl.addEventListener("click", ()=>{
  validateForm()

  if(validateForm() == true){
    addUser()
  }
  })

// EDIT USER 

//phone number validation
const phoneEditValidation = ()=>{

  const phoneEditValue=phoneEditEl.value.trim(); 
  const validPhoneNumber=/^[0-9]*$/;
  const phoneEditErrEl=document.getElementById('phone-edit-err');

  if(phoneEditValue=="")
  {
   phoneEditErrEl.innerHTML="Phone number is required!";
   phoneEditEl.style.borderColor = "red";
  }else if(!validPhoneNumber.test(phoneEditValue)){
    phoneEditErrEl.innerHTML="Please enter a valid phone number!";
    phoneEditEl.style.borderColor = "red";
  }else if(phoneEditValue.length!=10){
    phoneEditErrEl.innerHTML="Phone number should have 10 digits!";
    phoneEditEl.style.borderColor = "red";
  }
  else{
    phoneEditErrEl.innerHTML="";
    return true;
  }

}
phoneEditEl.oninput= ()=>{
phoneEditValidation();
}

//email address validation
const emailEditValidation = ()=>{

  const emailEditElValue=emailEditEl.value.trim(); 
  const validEmailAddress=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailEditErrEl=document.getElementById('email-edit-err');

  if(emailEditElValue=="")
  {
   emailEditErrEl.innerHTML="Email address is required!";
   emailEditEl.style.borderColor = "red";

  }else if(!validEmailAddress.test(emailEditElValue)){
    emailEditErrEl.innerHTML="Please enter a valid email address!";
    emailEditEl.style.borderColor = "red";
  }else{
    emailEditErrEl.innerHTML="";
    return true;
  }
}
emailEditEl.oninput = ()=>{
emailEditValidation();
}

//validate form
const validateEditForm = ()=>{
  
  emailEditValidation();
  phoneEditValidation();
  
  if(emailEditValidation() == true && 
    phoneEditalidation()==true){
    return true;
  }else{
    return false;
  }
}

//submit form if validateEditForm() returns 
saveEl.addEventListener("click", ()=>{
  validateEditForm()

  if(validateEditForm() == true){
    editUser(rowId)
  }
  })

//Google Places API autocomplete 

function initMap(){
  autocompleted = new google.maps.places.Autocomplete(document.getElementById("address"),
  {
    componentRestrictions: {'country': ['us']},
    fields: ['geometry', 'name'],
    types: ['establishment']
  }
  
  )
  google.maps.event.addListener(autocompleted, 'place_changed', function () {

    let place = autocompleted.getPlace();
    latEl.value = place.geometry.location.lat()
    lngEl.value = place.geometry.location.lng()

    let address = place.formatted_address;
    let latitude = place.geometry.location.lat();
    let longitude = place.geometry.location.lng();
    let latlng = new google.maps.LatLng(latitude, longitude);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
            let address = results[0].formatted_address;
            let pin = results[0].address_components[results[0].address_components.length - 1].long_name;
            let city = results[0].address_components[results[0].address_components.length - 4].long_name;
            cityEl.value = city;
            zipcodeEl.value = pin;
        }
    }
});
});

autocomplete = new google.maps.places.Autocomplete(document.getElementById("address-edit"),
{
  componentRestrictions: {'country': ['us']},
  fields: ['geometry', 'name'],
  types: ['establishment']
}

)
  google.maps.event.addListener(autocomplete, 'place_changed', function () {

    let place = autocomplete.getPlace();
    latEditEl.value = place.geometry.location.lat()
    lngEditEl.value = place.geometry.location.lng()

    let address = place.formatted_address;
    let latitude = place.geometry.location.lat();
    let longitude = place.geometry.location.lng();
    let latlng = new google.maps.LatLng(latitude, longitude);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let address = results[0].formatted_address;
          let pin = results[0].address_components[results[0].address_components.length - 1].long_name;
          let city = results[0].address_components[results[0].address_components.length - 4].long_name;
          cityEditEl.value = city;
          zipcodeEditEl.value = pin;
          }
        }
      });
    });
}
