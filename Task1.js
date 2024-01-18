var first_name = document.getElementById("first_name");
var last_name =  document.getElementById("last_name");
var email_address = document.getElementById("email_address");
var phone_no = document.getElementById("phone_no");
var zipcode = document.getElementById("zipcode");
var birthdate = document.getElementById("birthdate");
var gender = document.getElementsByName("gender");
var hobby = document.getElementsByName('hobby');
var technology = document.getElementById('technology').selectedOptions;

var submit_form = document.getElementById("my_form");
var submit = document.getElementById("submit");

// regularexpression
const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneregex = /^\d{10}$/;
const zipcoderegex = /^\d{6}$/;
const birthdateregex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;


// adding event listner for from validation on submit button
submit_form.addEventListener("submit",()=>{
    validate();
    if(validate()){
        if(model_event=="add"){
            storage()
        }
        else if(model_event=="edit"){
            edit()

        }
    }
    displaydata();
   
})
submit.addEventListener("click",displaydata);

// validate function
const validate=()=>{
    var first_name_val = first_name.value.trim();
    var last_name_val = last_name.value.trim();
    var email_address_val = email_address.value.trim();
    var phone_no_val = phone_no.value.trim();
    var zipcode_val = zipcode.value.trim();
    var birthdate_val = birthdate.value.trim();

    if (first_name_val==""){
        let first_name_error=document.getElementById("first_name_error");
        first_name_error.innerText="please enter your name";
        first_name_error.style.visibility="visible";
        return false;
    }
    else if (last_name_val==""){
        let last_name_error=document.getElementById("last_name_error");
        last_name_error.innerText="please enter your last name";
        last_name_error.style.visibility="visible";
        return false;
    }
    else if (email_address_val==""){
        let email_address_error =document.getElementById("email_address_error");
        email_address_error .innerText="please enter email address";
        email_address_error.style.visibility="visible";
        return false;
    }
    else if(!emailregex.test(email_address_val)){
        email_address_error .innerText="Invalid mail";
        email_address_error.style.visibility="visible";
        return false;
    }
    else if (phone_no_val==""){
        let phone_no_error =document.getElementById("phone_no_error");
        phone_no_error.innerText="please enter phone number";
        phone_no_error.style.visibility="visible";
        return false;
    }
    else if(!phoneregex.test(phone_no_val)){
        phone_no_error.innerText="Invalid phone";
        phone_no_error.style.visibility="visible";
        return false;
    }
    else if (zipcode_val==""){
        let zipcode_error =document.getElementById("zipcode_error");
        zipcode_error.innerText="please enter zipcode";
        zipcode_error.style.visibility="visible";
        return false;
    }
    else if(!zipcoderegex.test(zipcode_val)){
        zipcode_error.innerText="Invalid zipcode";
        zipcode_error.style.visibility="visible";
        return false;
    }
    else if (birthdate_val==""){
        let birthdate_error = document.getElementById("birthdate_error");
        birthdate_error.innerText="please enter birthdate";
        birthdate_error.style.visibility="visible";
        return false;
    }
    else if (!birthdateregex.test(birthdate_val)){
        let birthdate_error =document.getElementById("birthdate_error");
        birthdate_error.innerText="Invalid birthdate please eneter in MM/DD/YYYY.";
        birthdate_error.style.visibility="visible";
        return false;
    }
    else if(!(gender[0].checked||gender[1].checked||gender[2].checked)){
        let gender_error=document.getElementById("gender_error");
        gender_error.innerText="please select gender";
        gender_error.style.visibility="visible";
        return false;
    }
    else if (!(hobby[0].checked||hobby[1].checked||hobby[2].checked||hobby[3].checked)){
        let hobby_error=document.getElementById("hobby_error");
        hobby_error.innerText="please select your hobby";
        hobby_error.style.visibility="visible";
        return false;
    }
    else if (technology.length===0){
        let technology_error =document.getElementById("technology_error");
        technology_error.innerText="please select tecnology";
        technology_error.style.visibility="visible";
        return false;
    }
    return true;
    
}
//   to store data in local storage
const storage=()=>{
    var first_name_val = first_name.value.trim();
    var last_name_val = last_name.value.trim();
    var email_address_val = email_address.value.trim();
    var phone_no_val = phone_no.value.trim();
    var zipcode_val = zipcode.value.trim();
    var birthdate_val = birthdate.value.trim();
    let gender_val;
    let hobby_val="";
    var technology_value="";
    data = [];  
    if(gender[0].checked){
        gender_val="male"
    }
    else if(gender[1].checked){
        gender_val="female"
    }
    else if(gender[2].checked){
        gender_val="other"
    }
    // to catch hobby value
    if(hobby[0].checked){
        hobby_val=hobby_val+"Cricket "
    }
    if(hobby[1].checked){
        hobby_val= hobby_val+"Reading "
    }
    if(hobby[2].checked){
        hobby_val=hobby_val+"Travelling "
    }
    if(hobby[3].checked){
        hobby_val=hobby_val+"Movies "
    }
    // to get value of hobby
    for (let a of technology){
        technology_value+=a.value+" ";
    } 
    let obj={
        "first_name":first_name_val,
        "last_name":last_name_val,
        "email_address":email_address_val,
        "phone_no":phone_no_val,
        "zipcode":zipcode_val,
        "birthdate":birthdate_val,
        "gender": gender_val,
        "hobby": hobby_val,
        "technology_value":technology_value,
    }
    if (localStorage.getItem("user1")!=null){
        for(let x of JSON.parse(localStorage.getItem("user1"))){
            data.push(x)
        }   
    }
    data.push(obj)    
    localStorage.setItem("user1",JSON.stringify(data));
}

// get data from localStorage 
var userdata =JSON.parse(localStorage.getItem("user1"));


// to display data on page
function displaydata(){
    var tbdata= document.querySelector(".userdata");
    var element = "";
    for(let d of userdata){
        element+=`<tr>
            <td>${userdata.indexOf(d)+1}</td>
             <td>${d.first_name}</td>
             <td>${d.last_name}</td>
             <td>${d.email_address}</td>
             <td>${d.phone_no}</td>
             <td>${d.zipcode}</td>
             <td>${d.birthdate}</td>
             <td>${d.gender}</td>
             <td>${d.hobby}</td>
             <td><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${userdata.indexOf(d)}>edit</button></td>
             <td><button type="button" class="delete" id=${userdata.indexOf(d)}>delete</button></td>
             <td><button type="button" class="view" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${userdata.indexOf(d)}>view</button></td>
            </tr>`

    }
    tbdata.innerHTML=element;
    deletedata();
   
}   
// to display data when page load 
if (userdata){
    displaydata();
}
// event handling
var model_event = ""
 let add_button = document.getElementById("add")
 add_button.addEventListener("click",()=>{
    removeRecord()
    model_event="add"
 })
 var selected_item=null

// delete function
function deletedata(){
    let buttons = document.querySelectorAll(".delete")
    buttons.forEach((button)=>{
        button.addEventListener('click',(event)=>{
            userdata.splice(Number(event.target.id),1)
            localStorage.setItem("user1", JSON.stringify(userdata));
            displaydata();
        
        })
    })
}

// view function
const viewbutton =document.querySelectorAll(".view");
for (let i=0 ;i<viewbutton.length;i++){
    viewbutton[i].addEventListener("click", (event)=>{
        const viewdata = userdata[i]
        document.getElementById("first_name").value=viewdata["first_name"]
        document.getElementById("last_name").value=viewdata["last_name"]
        document.getElementById("email_address").value=viewdata["email_address"]
        document.getElementById("phone_no").value=viewdata["phone_no"]
        document.getElementById("zipcode").value=viewdata["zipcode"]
        document.getElementById("birthdate").value=viewdata["birthdate"]
        document.getElementById(viewdata["gender"]).checked=true;
        document.getElementById("submit").style.display="none"
        for (let z of viewdata["hobby"].split(" ")){
            if(z){
                document.getElementById(z.trim()).checked=true;
            }
        }
        });
    }        

//   edit function for getting data from localstorage
const editbutton =document.querySelectorAll(".edit");

for (let i=0 ;i<viewbutton.length;i++){
    editbutton[i].addEventListener("click", (event)=>{
        const viewdata = userdata[i]
        model_event ="edit"
        selected_item = Number(event.target.id)
        removeRecord();
        document.getElementById("first_name").value=viewdata["first_name"]
        document.getElementById("last_name").value=viewdata["last_name"]
        document.getElementById("email_address").value=viewdata["email_address"]
        document.getElementById("phone_no").value=viewdata["phone_no"]
        document.getElementById("zipcode").value=viewdata["zipcode"]
        document.getElementById("birthdate").value=viewdata["birthdate"]
        document.getElementById(viewdata["gender"]).checked=true;
        for (let z of viewdata["hobby"].split(" ")){
            if(z){
                document.getElementById(z.trim()).checked=true;
            }
        }
        });
        document.getElementById('technology').selectedIndex = 4
    }  
    
    
// edit button function for storing edited data
function edit(){
    var first_name_val = first_name.value.trim();
    var last_name_val = last_name.value.trim();
    var email_address_val = email_address.value.trim();
    var phone_no_val = phone_no.value.trim();
    var zipcode_val = zipcode.value.trim();
    var birthdate_val = birthdate.value.trim();
    let gender_val;
    let hobby_val="";
    let technology="";
    data = [];  
    // to catch gender value
    if(gender[0].checked){
        gender_val="male"
    }
    else if(gender[1].checked){
        gender_val="female"
    }
    else if(gender[2].checked){
        gender_val="other"
    }
    // to catch hobby value
    if(hobby[0].checked){
        hobby_val=hobby_val+"Cricket "
    }
    if(hobby[1].checked){
        hobby_val= hobby_val+"Reading "
    }
    if(hobby[2].checked){
        hobby_val=hobby_val+"Travelling "
    }
    if(hobby[3].checked){
        hobby_val=hobby_val+"Movies "
    }
    // to get value of hobby
    for (let a of technology){
        technology=technology+a.value+" ";
    } 
    let obj={
        "first_name":first_name_val,
        "last_name":last_name_val,
        "email_address":email_address_val,
        "phone_no":phone_no_val,
        "zipcode":zipcode_val,
        "birthdate":birthdate_val,
        "gender": gender_val,
        "hobby": hobby_val,
        "technology_value":technology,
    }
    userdata[selected_item]=obj
    localStorage.setItem("user1",JSON.stringify(userdata));
    displaydata();
    selected_item=null
}

// to refresh my page
let refreshbtn=document.getElementById("refresh")
refreshbtn.addEventListener("click",()=>{
    window.location.reload()
    removeRecord()
})

// function to remove data
function removeRecord(){
    document.getElementById("first_name").value=""
    document.getElementById("first_name").value=""
    document.getElementById("last_name").value=""
    document.getElementById("email_address").value=""
    document.getElementById("phone_no").value=""
    document.getElementById("zipcode").value=""
    document.getElementById("birthdate").value=""
    document.getElementById("male").checked=false;
    document.getElementById("female").checked=false;
    document.getElementById("other").checked=false;
    document.getElementById("Cricket").checked=false;
    document.getElementById("Reading").checked=false;
    document.getElementById("Travelling").checked=false;
    document.getElementById("Movies").checked=false;
    document.getElementById("submit").style.display="block"
}
