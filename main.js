// Function for Initial Load
function initialLoad(){
    var t = document.getElementById('errorMessage');
    t.style.display = 'none';
    return;
}

// Function to validate User information
function validate(username, password){
    var credentials = [
        {
            username: 'test',
            password: 'test'
        },
        {
            username: 'test1',
            password: 'test1'
        },
        {
            username: 'test2',
            password: 'test2'
        }
    ]
    for(var i=0; i<credentials.length; i++){
        if(username == credentials[i].username && password == credentials[i].password){
            return true;
        } 
    }
    return false;
}

// Function for User Login
function login(){
    var checkedValue = document.getElementById('rememberCheckbox').checked;
    var username = document.getElementById('loginUsernameInput').value;
    var password = document.getElementById('loginPasswordInput').value;

    if(validate(username, password)){
        var t = document.getElementById('errorMessage');
        t.style.display = 'none';
    }
    else{
        var t = document.getElementById('errorMessage');
        t.style.display = 'block';
        return;
    }

    console.log("checkedValue ",checkedValue);

    var existingUsername = getCookie(username);
    if(checkedValue == true){
        if(existingUsername){
            console.log("username ",existingUsername);
            var decryptedUsername= decrypt(existingUsername);
            console.log("decryptedUsername ",decryptedUsername);
            location.href = 'home.html';
        }
        else{
            var encryptedUsername = encrypt(username);
            createCookie(username, encryptedUsername, 1);
            location.href = 'home.html';
        }
    }
    else{
        if(existingUsername){
            console.log("username ",existingUsername);
            var decryptedUsername= decrypt(existingUsername);
            console.log("decryptedUsername ",decryptedUsername);
            location.href = 'home.html';
        }
        else{
            var encryptedUsername = encrypt(username);
            createCookie(username, encryptedUsername, 1);
            location.href = 'home.html';
        }       
    }
    var t = document.getElementById('errorMessage');
    t.style.display = 'none';
}

// Function to create Cookie
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to retreive Cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// Function to encrypt values
function encrypt(value){
    var secretString = "Chxvh45qamF48";
    return CryptoJS.AES.encrypt(secretString, value);
}

// Function to decrypt values
function decrypt(value){
    var secretString = "Chxvh45qamF48";
    var decryptedValue = CryptoJS.AES.decrypt(value, secretString)
    return decryptedValue.toString(CryptoJS.enc.Utf8);
}