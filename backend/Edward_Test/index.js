import express from 'express';
const app = express();
const port = 3000;

// Server Side
app.listen(port, () => {
    console.log(`'Server is running on port ${port}'`);
    });

app.get('/', (req, res) => {
    res.sendFile("D:\\DEVELOPER_FILES\\REPOSITORIES\\udemy_webdev\\udemy_webdev\\backend\\Edward_Test\\index.html");
})

// Frontend
function pullEmail() {
    var email = document.getElementById('email');
    return email
}

function pullPassword() {
    var password = document.getElementById('password');
    return password
}

function submitForm() {
    var email = pullEmail();
    var password = pullPassword();
    console.log(email, password);
}

$(document).click("submit", function() {
    submitForm();
});

