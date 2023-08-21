var nameInput = document.getElementById('name');
var priceInput = document.getElementById('price');
var categoryInput = document.getElementById('category');
var descriptionInput = document.getElementById('description');
var addButton = document.getElementById('add-btn');
var alertName = document.getElementById('alertName')
var alertCategory = document.getElementById('alertCategory')
var alertPrice = document.getElementById('alertPrice')

var regex = /^[A-Z][A-Za-z]{1,8}$/
var regexPrice = /^[1-9][0-9]{1,4}$/

var globalIndex ;

nameInput.addEventListener('input' , nameValidation )
categoryInput.addEventListener('input' , categoryValidation)
priceInput.addEventListener('input' , priceValidation)

function nameValidation(){
    if(regex.test(nameInput.value)==true){
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        alertName.classList.add('d-none')
    }
    else{
        nameInput.classList.remove('is-vaild')
        nameInput.classList.add('is-invalid')
        alertName.classList.remove('d-none')
    }
}

function categoryValidation(){
    if(regex.test(categoryInput.value)==true){
        categoryInput.classList.add('is-valid')
        categoryInput.classList.remove('is-invalid')
        alertCategory.classList.add('d-none')
    }
    else{
        categoryInput.classList.remove('is-vaild')
        categoryInput.classList.add('is-invalid')
        alertCategory.classList.remove('d-none')
    }
}

function priceValidation(){
    if(regexPrice.test(priceInput.value)==true){
        priceInput.classList.add('is-valid')
        priceInput.classList.remove('is-invalid')
        alertPrice.classList.add('d-none')
    }
    else{
        priceInput.classList.remove('is-vaild')
        priceInput.classList.add('is-invalid')
        alertPrice.classList.remove('d-none')
    }
}

var productArray = [];

if(localStorage.getItem('products') != null){
    productArray = JSON.parse(localStorage.getItem('products') )
    display(productArray)
}


function add(){
  
    if((regex.test(categoryInput.value)==true)&&(regex.test(categoryInput.value)==true)&&(regexPrice.test(priceInput.value)==true)){
        var product = {
            name : nameInput.value,
                price : priceInput.value,
                category : categoryInput.value,
                description : descriptionInput.value
         }
        if(addButton.innerHTML == 'Add Product'){
            productArray.push(product)
        }
        else if(addButton.innerHTML == 'Update'){
            productArray.splice(globalIndex , 1 , product);
            addButton.innerHTML = 'Add Product';

        }

        localStorage.setItem('products' , JSON.stringify(productArray))
        display(productArray);
        clear()
    }
   
}

function display(arr){
    var cartona = `` ;
    for (var i = 0 ; i<arr.length ; i++){  
        cartona+=`<tr>
            <td>${i}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].description}</td>
            <td><button class="btn btn-outline-warning"  onclick="update(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="del(${i})">Delete</button></td>
        </tr>` 
        
    }
    
    document.getElementById('tableBody').innerHTML = cartona;
}

function clear(){
    nameInput.value ='';
    priceInput.value ='';
    categoryInput.value ='';
    descriptionInput.value='';

    if(nameInput.classList.contains('is-valid') == true){
        nameInput.classList.remove('is-valid')
    }
    if(priceInput.classList.contains('is-valid') == true){
        priceInput.classList.remove('is-valid')
    }
    if(categoryInput.classList.contains('is-valid') == true){
        categoryInput.classList.remove('is-valid')
    }
}

function del(index){
    productArray.splice(index , 1);
    display(productArray);
    localStorage.setItem('products' , JSON.stringify(productArray))
}

function update(index){
    nameInput.value = productArray[index].name;
    priceInput.value = productArray[index].price;
    categoryInput.value = productArray[index].category;
    descriptionInput.value = productArray[index].description;
    addButton.innerHTML = 'Update';
    globalIndex = index;
}

function search(term){
    var matchedArray =[];
    for(var i = 0 ; i<productArray.length ; i++){
        if( productArray[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            matchedArray.push(productArray[i])
        }
    }
    display(matchedArray)
}
