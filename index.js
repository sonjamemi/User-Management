const userEl=document.getElementById("user")

const displayUsers = async ()=>{
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await res.json()
      for( let i=0; i<data.length; i++){
        userEl.innerHTML+=`
        <tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phone}</td>
        <td>
        <div id="icons">
        <img src="images/edit_icon.png" alt="">
        <img src="images/delete_icon.png" onclick="deleteUser(${data[i].id})" alt="">
        </div>
        </td>
        </tr>
        `
      }
}

displayUsers()

const deleteUser=(id)=>{
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
     });
    console.log(id)
}


