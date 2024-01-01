var first_name = document.getElementById("first_name");
var last_name =  document.getElementById("last_name");
var email_address = document.getElementById("email_address");
var phone_no = document.getElementById("phone_no");
var zipcode = document.getElementById("zipcode");
var birthdate = document.getElementById("birthdate");
var gender = document.getElementsByName("gender");
var hobby = document.getElementsByName('hobby');
var technology = document.getElementById('technology').selectedOptions;

var submit = document.getElementById("submit");

// regularexpression
var emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var phoneregex = /^\d{10}$/;
var zipcoderegex = /^\d{6}$/;
var birthdateregex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;


// adding event listner for from validation on submit button
submit.addEventListener("click",()=>{
    console.log(localStorage.getItem("user1"))
    validate();
    if(validate()){

        storage();
    }
   
})

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
        let first_name_error=document.getElementById("last_name_error");
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
        let birthdate_error =document.getElementById("birthdate_error");
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
    alert("form submitted successfully")
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
    let technologys="";
    data = [];
    
    // to catch gender value
    if(gender[0].checked){
        gender_val="Male"
    }
    else if(gender[1].checked){
        gender_val="Female"
    }
    else if(gender[2].checked){
        gender_val="Female"
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
        technologys=technologys+a.value+" ";
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
        "technology_value":technologys,
    }
    if (localStorage.getItem("user1")!=null){
        for(let x of JSON.parse(localStorage.getItem("user1"))){
            data.push(x)
        }
        // data.push(JSON.parse(localStorage.getItem("user1"))[0])
    }
    data.push(obj)
    

    localStorage.setItem("user1",JSON.stringify(data));
}