const uri = "https://60fb155591156a0017b4c767.mockapi.io/users/";
async function getJSON() {
  try {
    let resp = await fetch(uri);
    let data = await resp.json();
    createTable(data);
  } catch (error) {
    console.log(error);
  }
}

getJSON();

function createTable(data) {
  let tbody = document.getElementById("tbody");
  //   data.forEach(element => {
  //   let row=document.createElement('tr')

  //  let td1=document.createElement('td')
  //  td1.innerHTML=element.id;
  // let td2=document.createElement('td')
  //  td2.innerHTML=element.name;
  // let td3=document.createElement('td')
  // td3.innerHTML=element.email;

  //  row.append(td1,td2,td3)
  //  tbody.append(row)
  data.forEach((element) => {
    tbody.innerHTML += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.email}</td><td><a class="text-warning" onclick="getUserById(${element.id})">Edit</a> | <a class="text-danger" onclick="deleteUser(${element.id})">Delete</a></td></tr>`;
  });

  //});
}

async function createUser() {
  try {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let resp = await fetch(uri, {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.querySelector("form").reset();
    alert("user created");
    document.getElementById("tbody").innerHTML = "";
    getJSON();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id){
    try{
    await fetch(uri+id,{
        method:"DELETE",
    })
    alert('User Deleted')
    tbody.innerHTML=""
    getJSON();

    
}
catch(error){
   
    console.log(error)
}
    
}
//var userId=''
async function editUser(){
   // console.log(userId)
    try{
     let name=   document.getElementById("name").value
      let email= document.getElementById("email").value
      let id= document.getElementById("id").value
        await fetch(uri+id,{
            method:"PUT",
            body: JSON.stringify({ name, email }),
            headers: {
              "Content-Type": "application/json",
            },
        })
        alert('User Updated')
        tbody.innerHTML=""
       document.querySelector('form').reset()
        getJSON();
    
        
    }
    catch(error){
       
        console.log(error)
    }
   
   
}

async function getUserById(id){
    try{
    let resp = await fetch(uri+id);
    let data = await resp.json();
  
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("id").value = data.id;
  //  userId=data.id
    
}
catch(error){
    console.log(error)
}
}
