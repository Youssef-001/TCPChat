// "Username: yusef0x1, password: 1234"
function parseCredentials (credentials) {

    let username = credentials.substring(credentials.indexOf("Username:")+9, credentials.indexOf(',')).trim();
    let password = credentials.substring(credentials.indexOf("password:")+9).trim();


    return {
        username,
        password
    }

}

// console.log(parseCredentials("Username: yusef0x1, password: 1234"));

module.exports = {parseCredentials}