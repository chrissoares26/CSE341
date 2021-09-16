const http = require('http');


const users = ['Chris', 'Mica', 'Matheus'];

const server = http.createServer ((req, res) => {
    const url = req.url;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/add" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users Page</title></head>');
        res.write('<body>');
        res.write('<ul>');
        for (const user of users) {
            res.write(`<li>${user}</li>`);
        }
        res.write('</ul>');
        // Form for "./add-activity".
        res.write('<form action="./create-user" method="POST">');
        res.write('<input type="text" name="addUser">');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');
        // End tags
        res.write('</body>');
        return res.write('</html>');
    }

    if (url === '/create-user'){
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const newUserList = parsedBody.split('=')[1];

            console.log(newUserList);
            users.push(newUserList);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        res.end();
        }
});

server.listen(3000);