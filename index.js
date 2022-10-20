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

const tableName= document.getElementById("data-name")
const tableEmail= document.getElementById("data-email")
const tablePhone= document.getElementById("data-phone")

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
        <img src="images/edit_icon.png" id="edit" onclick="openForm()" alt="">
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
    const res = await fetch('http://localhost:8008/users/'+id,{
        method: 'DELETE',
      })
      const data = await res.json()
    //   console.log("ID SELECTED: ", id)
    //   console.log("DATA RETURNED ON DELETE: ", data)
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
    // const data = await res.json()
    // console.log(data)
    // userEl.innerHTML +=`
    // <tr>
    // <td>${data.id}</td>
    // <td id="data-name">${data.name}</td>
    // <td id="data-email">${data.email}</td>
    // <td id="data-phone">${data.phone}</td>
    // <td>
    // <div id="icons">
    // <img src="images/edit_icon.png" alt="">
    // <img src="images/delete_icon.png" onclick="deleteUser(${data[i].id})" alt="">
    // </div>
    // </td>
    // </tr>
    // `        
}

//update user
const editUser = (id) =>{

  const parent = e.target.parentElement
  let nameContent=parent.querySelector('name').textContent
  nameEl.value = nameContent

    const res = fetch(`http://localhost:8008/users/${id}`,{
          method: "PUT",
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

//prevent autosubmission 
formEl.addEventListener('submit', (e)=>{
  e.preventDefault()
  validateForm()
})

// //open popup for edit User
// const editUserModal = (id) =>{
//   popupContainerEl.style.display="flex"
//   popupEl.style.display="flex"
//   rowId = id
// }

// //Close popup btn on Edit User form
// closeModalEditBtn.addEventListener("click", ()=>{
//   modalContainerEditUserEl.style.display="none"
//   modalEditUserEl.style.display="none"
// })

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

//show latitude and longitude
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

//submit form if validateForm() returns true
saveEl.addEventListener("click", ()=>{
  validateForm()

  if(validateForm() == true){
    addUser()
  }
  })

// //Google Places API autocomplete 
// autocomplete = new google.maps.places.Autocomplete(document.getElementById("address"),
// {
//   componentRestrictions: {'country': ['us']},
//   fields: ['geometry', 'name'],
//   types: ['establishment']
// }
// )
