var productImage = document.getElementById('productImage')
var productName = document.getElementById('productName')
var productCategory = document.getElementById('productCategory')
var productPrice = document.getElementById('productPrice')
var productRating = document.getElementById('productRating')
var productSales = document.getElementById('productSales')
var productRevenue = document.getElementById('productRevenue')
var addBtn = document.getElementById('addBtn')
var updateBtn = document.getElementById('updateBtn')
var previewBtn = document.getElementById('previewBtn')

var updatItmeIndex;

var allProduct = []

if (localStorage.getItem('allProduct') != null) {
    allProduct = JSON.parse(localStorage.getItem('allProduct'))

    displayProduct(allProduct)
}

function addProduct() {

    if (nameValidation() == true && priceValidation() == true && salesValidation() == true && revenueValidation() == true) {
        var imgSrc = productImage.value
        var newImgSrc = imgSrc.substring(12,)

        var product = {
            img: newImgSrc,
            name: productName.value,
            category: productCategory.value,
            price: productPrice.value,
            rating: productRating.value,
            sales: productSales.value,
            revenue: productRevenue.value,
        }
        allProduct.push(product)
        localStorage.setItem('allProduct', JSON.stringify(allProduct))
        displayProduct(allProduct)
        clearForm()
        clearValidation()
    }
}

function displayProduct(list) {
    var container = ``

    for (var i = 0; i < list.length; i++) {
        var rateContainer = ``
        for (var j = 0; j < 5; j++) {
            if (j < list[i].rating) {
                rateContainer += `<i id='star' class="fa-solid fa-star text-warning"></i>`
            }
            else {
                rateContainer += `<i id='star' class="fa-solid fa-star text-body-tertiary"></i>`
            }
        }

        container += `<tr>
        <td class="ps-4">${i + 1}</td>
        <td><img src="img/${list[i].img}"></td>
        <td>${list[i].name}</td>
        <td>${list[i].category}</td>
        <td>$${list[i].price}</td>
        <td>${rateContainer + ' ' + list[i].rating}.0</td>
        <td><i class="fa-solid fa-cart-shopping text-black-50"></i> ${list[i].sales}M</td>
        <td>$${list[i].revenue}M</td>

        <td><button onclick="updateProduct(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>

        <td><button onclick="previewItem(${i})" id = "previewBtn" class="btn btn-success"><i class="fa-solid fa-eye"></i> Preview</button></td>

        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`

    }

    document.getElementById('tbody').innerHTML = container;

}

function clearForm() {
    productImage.value = '';
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productRating.value = '';
    productSales.value = '';
    productRevenue.value = '';
}

function deleteProduct(itemIndex) {
    allProduct.splice(itemIndex, 1)
    localStorage.setItem('allProduct', JSON.stringify(allProduct))
    displayProduct(allProduct)
}

function updateProduct(itemIndex) {
    productName.value = allProduct[itemIndex].name;
    productCategory.value = allProduct[itemIndex].category;
    productPrice.value = allProduct[itemIndex].price;
    productRating.value = allProduct[itemIndex].rating;
    productSales.value = allProduct[itemIndex].sales;
    productRevenue.value = allProduct[itemIndex].revenue;

    addBtn.classList.replace('d-block', 'd-none')
    updateBtn.classList.replace('d-none', 'd-block')
    updatItmeIndex = itemIndex
}

function saveUpdate() {
    var imgSrc = productImage.value
    var newImgSrc = imgSrc.substring(12,)

    var product = {
        img: newImgSrc,
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        rating: productRating.value,
        sales: productSales.value,
        revenue: productRevenue.value,
    }
    allProduct.splice(updatItmeIndex, 1, product)

    localStorage.setItem('allProduct', JSON.stringify(allProduct))

    displayProduct(allProduct)
    clearForm()
    clearValidation()
    addBtn.classList.replace('d-none', 'd-block')
    updateBtn.classList.replace('d-block', 'd-none')
}

function previewItem(itemIndex) {
    document.querySelector(".layer").classList.replace("d-none", "d-flex")
    document.querySelector(".caption").innerHTML = allProduct[itemIndex].name
    document.querySelector(".w-50").src = "img/" + allProduct[itemIndex].img
}

function nameValidation() {
    var regex = /^[A-Z]{2,4}[a-z]{0,10} ?[a-zA-Z1-9\s]*$/gi

    if (regex.test(productName.value) == true) {
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')
        document.querySelector(".NameValidation").innerHTML = ''
        return true
    }
    else {
        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')
        document.querySelector(".NameValidation").innerHTML = 'Invalid Name*'
        return false
    }
}

function priceValidation() {
    var regex = /^[1-9][0-9]{2,4}$/

    if (regex.test(productPrice.value) == true) {
        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')
        document.querySelector(".PriceValidation").innerHTML = ''
        return true
    }
    else {
        productPrice.classList.add('is-invalid')
        productPrice.classList.remove('is-valid')
        document.querySelector(".PriceValidation").innerHTML = 'Invalid Price*'
        return false
    }
}

function salesValidation() {
    var regex = /^[1-9].?[0-9]{0,2}$/

    if (regex.test(productSales.value) == true) {
        productSales.classList.add('is-valid')
        productSales.classList.remove('is-invalid')
        document.querySelector(".salesValidation").innerHTML = ''
        return true
    }
    else {
        productSales.classList.add('is-invalid')
        productSales.classList.remove('is-valid')
        document.querySelector(".salesValidation").innerHTML = 'Invalid number*'
        return false
    }
}

function revenueValidation() {
    var regex = /^[1-9].?[0-9]{0,2}$/

    if (regex.test(productRevenue.value) == true) {
        productRevenue.classList.add('is-valid')
        productRevenue.classList.remove('is-invalid')
        document.querySelector(".revenueValidation").innerHTML = ''
        return true
    }
    else {
        productRevenue.classList.add('is-invalid')
        productRevenue.classList.remove('is-valid')
        document.querySelector(".revenueValidation").innerHTML = 'Invalid number*'
        return false
    }
}

function clearValidation() {
    productName.classList.remove('is-valid', 'is-invalid')
    productCategory.classList.remove('is-valid', 'is-invalid')
    productPrice.classList.remove('is-valid', 'is-invalid')
    productRating.classList.remove('is-valid', 'is-invalid')
    productSales.classList.remove('is-valid', 'is-invalid')
    productRevenue.classList.remove('is-valid', 'is-invalid')
}

function closeBtn() {
    clearForm()
    clearValidation()
    addBtn.classList.replace('d-none', 'd-block')
    updateBtn.classList.replace('d-block', 'd-none')
    document.querySelector(".NameValidation").innerHTML = ''
    document.querySelector(".PriceValidation").innerHTML = ''
    document.querySelector(".salesValidation").innerHTML = ''
    document.querySelector(".revenueValidation").innerHTML = ''
}

function searchProduct(searchTerm) { 
    var searchArray = []
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            
            searchArray.push(allProduct[i])
        }
    }

    displayProduct(searchArray)
}

document.querySelector(".fa-circle-xmark").addEventListener("click", function () {
    document.querySelector(".layer").classList.replace("d-flex", "d-none")
})