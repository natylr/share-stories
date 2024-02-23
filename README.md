<<<<<<< HEAD
# ShareStories

Welcome to ShareStories, a cutting-edge storytelling platform crafted with React.js, Node.js, and MongoDB.

ShareStories offers a dynamic space for users to weave captivating narratives seamlessly. With intuitive features, users can effortlessly craft sequential stories, each frame a canvas for creativity. Whether you're an aspiring writer or a seasoned storyteller, ShareStories provides the tools to bring your tales to life, with the option to enrich narratives through compelling imagery. Embark on a journey of storytelling innovation with ShareStories.

### Link - [ShareStories](http://share-stories-online.netlify.app/)

##  Technology Stack

- ![React](https://img.shields.io/badge/React-2021-blue.svg) [React](https://reactjs.org/)
- ![Node.js](https://img.shields.io/badge/Node.js-v18.8.0-green.svg) [Node.js](https://nodejs.org/en/)
- ![MongoDB](https://img.shields.io/badge/MongoDB-v6.0.0-light-green.svg) [MongoDb](https://www.mongodb.com/)
- ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
- ![HTML5](https://img.shields.io/badge/HTML5-semantic-orange)
- ![CSS3](https://img.shields.io/badge/CSS3-responsive-blue)
- ![JWT](https://img.shields.io/badge/JWT-token-orange)
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-encryption-yellowgreen)

## Key Features ✨

ShareStories provides an immersive experience for storytellers and readers alike:

- **User Authentication:** Seamlessly register and log in to explore the platform. Customize your profile with avatars and details for a personalized touch.
- **Story Creation:** Unleash your creativity by crafting sequential stories. Effortlessly add frames, each serving as a canvas for your imagination.
- **Read-Only Access:** Dive into a vast collection of stories shared by creators worldwide. Find inspiration or simply enjoy exploring diverse narratives.
- **Creator Privileges:** Maintain complete control over your stories with exclusive editing and deletion rights. Only you can modify or remove your content, ensuring the integrity of your narratives.
- **Security Measures:** Rest assured knowing your data is safeguarded. ShareStories prioritizes security with token-based authentication and bcrypt encryption.
=======

# ShareStories

Welcome to ShareStories, a cutting-edge storytelling platform crafted with React.js, Node.js, and MongoDB. ShareStories offers a dynamic space for users to weave captivating narratives seamlessly. With intuitive features, users can effortlessly craft sequential stories, each frame a canvas for creativity. Whether you're an aspiring writer or a seasoned storyteller, ShareStories provides the tools to bring your tales to life, with the option to enrich narratives through compelling imagery. Embark on a journey of storytelling innovation with ShareStories.

### Link - http://share-stories-online.netlify.app/

## 🏁 Technology Stack

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [MongoDb](https://www.mongodb.com/)

## Key Features

ShareStories presents a robust set of features to enhance your storytelling experience:

- **User Authentication**: Seamlessly log in or register to access the platform's features. Customize your profile with avatars and personal details to create a personalized experience.

- **Story Creation**: Dive into the world of storytelling by crafting your own sequential stories. Add frames effortlessly, with each frame serving as a canvas for your creativity.

- **Read-Only Access**: Explore a vast collection of stories curated by creators worldwide. Gain inspiration or entertainment through the diverse range of narratives available.

- **Creator Privileges**: Maintain control over your stories with exclusive editing and deletion rights. Only the creator retains the ability to modify or remove their content, ensuring the integrity of each narrative.

- **Security Measures**: Rest assured knowing that ShareStories prioritizes your data security. Utilizing token-based authentication and bcrypt encryption, your personal information and stories are safeguarded against unauthorized access.
>>>>>>> f8e89995638affe2859b2c952f024c9289f85bb4

## Setup Instructions

To set up ShareStories on your local machine, follow these steps:

1. **Clone the Repository**: Clone the ShareStories repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/sharestories.git
    ```

2. **Install Dependencies**: Navigate to the `client` directory and install the necessary dependencies:

    ```bash
    cd sharestories/client
    npm install
    ```

    Then, navigate to the `server` directory and install the dependencies:

    ```bash
    cd ../server
    npm install
    ```

3. **Initialize Configuration Files**: In the `server` directory, create a `secret.js` file to store your MongoDB connection URL and JWT secret:

    ```bash
    touch secret.js
    ```

    Edit the `secret.js` file to include your MongoDB connection URL and JWT secret:

    ```javascript
    module.exports = {
      mongoUrl: 'YOUR_MONGODB_CONNECTION_URL',
      JWT_SECRET: 'YOUR_JWT_SECRET'
    };
    ```

4. **Create Environment Variables**: In the `server` directory, create a `.env` file to define the port configuration:

    ```bash
    touch .env
    ```

    Edit the `.env` file to specify the desired port:

    ```plaintext
    PORT=3000
    ```

5. **Start Development Servers**: Start the client and server development servers separately:

    - In the `client` directory:

      ```bash
      npm start
      ```

    - In the `server` directory:

      ```bash
      npm start
      ```

6. **Access the Application**: Once both servers are running, access ShareStories by navigating to `http://localhost:3000` in your web browser.

Follow these instructions to set up ShareStories on your local machine. If you encounter any issues, refer to the project's documentation or reach out to the development team for assistance.
