const pagesToken = "EAADwo1f3bgkBAJV9ESDjfy2fZCGoo93QAcPxGVZAguPnL4rPUPRkRqaLchu56vt7mboZA4OGAqGQEzSlf9GJfqZCmhY5sA2NDbzhE4nB02psid3cUtn04lCO9YpZB2e7wSSE0bg2OQV64W0UceJDj54ySL0jdugEy8BpwfIfJwFgoQPhSzXjo"
const endpointURL = "https://hollow-cake-coyote.glitch.me/webhook";
const myToken = "JKASLD4j5hS9FDGQHLTK3sd8f9wtoibntrsdfhiwjgkbejsdvgbjsdfjkhiwyerotigffdkjnbkksabjrhjgfsjkb"

//1. configure webhook first

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const VERIFY_TOKEN = 'JKASLD4j5hS9FDGQHLTK3sd8f9wtoibntrsdfhiwjgkbejsdvgbjsdfjkhiwyerotigffdkjnbkksabjrhjgfsjkb';

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url);
  const { pathname, query } = parsedUrl;

  // Verify the webhook subscription
  if (pathname === '/webhook') {
    const params = querystring.parse(query);

    if (params['hub.mode'] === 'subscribe' && params['hub.verify_token'] === VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(params['hub.challenge']);
    } else {
      console.error('Webhook verification failed');
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Verification failed');
    }
  }
});

// Set the server to listen on a specific port
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});










//2nd part

const http = require('http');

// Create a server to handle incoming requests
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Parse the incoming message data
      const message = JSON.parse(body);

      // Access different properties of the message
      const senderId = message.sender.id;
      const recipientId = message.recipient.id;
      const messageText = message.message.text;

      // Process the message and send a response
      // ... Your message handling logic goes here ...

      // Send a response back to Facebook
      res.statusCode = 200;
      res.end();
    });
  } else {
    // Handle other requests if needed
    res.statusCode = 404;
    res.end();
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});





//Step 2:

// Assuming you have already set up your server with the required routes and dependencies

// Import necessary libraries or modules
const fetch = require('node-fetch');

// Define your message handling route
app.post('/webhook', (req, res) => {
  // Extract the message details from the request
  const { sender, message } = req.body;

  // Check if the user's message is 'quote'
  if (message.text.toLowerCase() === 'quote') {
    // Call the Quotes API to get a random quote
    fetch('https://api.example.com/quotes/random')
      .then(response => response.json())
      .then(data => {
        const quoteText = data.text;
        const quoteImage = data.image;

        // Craft the response message with the quote and image
        const responseMessage = {
          text: quoteText,
          attachment: {
            type: 'image',
            payload: {
              url: quoteImage
            }
          }
        };

        // Send the response message back to the user
        sendMessage(sender.id, responseMessage);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        // Send an error message back to the user
        const errorMessage = {
          text: 'Oops! Something went wrong while fetching the quote. Please try again later.'
        };
        sendMessage(sender.id, errorMessage);
      });
  }

  // Return a response to Facebook to acknowledge the message
  res.status(200).send('Message Received');
});

// Function to send a message using the Messenger API
function sendMessage(recipientId, message) {
  // Construct the request body
  const requestBody = {
    recipient: {
      id: recipientId
    },
    message: message
  };

  // Make a POST request to the Messenger API
  fetch('https://graph.facebook.com/v15.0/me/messages?access_token=YOUR_PAGE_ACCESS_TOKEN', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (response.ok) {
      console.log('Message sent successfully');
    } else {
      console.error('Error sending message:', response.status, response.statusText);
    }
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
}
