# project-3

This documentation consists of a guide of how to run the application, features of the application, reflections around the design regarding accessibility and sustainability, technologies used and descriptions of testing.

# Installing and running the application

Running the application locally:
To be able to run the application locally you need to run both backend and frontend. You might also have to do the installs listed below.

## Installs

- npm install

### If backend

- npm i apollo-server-express graphql nodemon express --save
- npm i mongoose

### In frontend

- npm install react-router-dom
- npm install --save-dev @types/react-router-dom
- npm i @apollo/client
- npm install recoil

## Running the application

### Backend

cd backend
npm run dev

### Frontend

cd frontend
npm start

## Running the tests

Unit tests:
cd frontend
npm test

End-2-end tests:
You have to run three terminals at the same time, one for the server in backend, one for the application in frontend, and one for the tests in the frontend folder. When the cypress window opens, you have to click on the test called “frontend.spec.ts” to actually run the end-2-end test.

cd frontend
npm run test:e2e-open

# Requirements for functionality and content

## Search

The application has a search field with the possibility of searching for words contained in the title of the short stories. The field works in two ways; 1) you can write the word you want to search for in the input field, and click the “Search” button, or 2) you can write the word you want to search for in the input field and click “Enter”. We have chosen to not show results when only a part of the word is a match.

## List-based presentation

Big result-sets are managed by pagination that makes it possible to click through different pages. Up to ten stories are loaded at once at the page, then ten more when you click to the next page.

## Possibility to see more details

The user of the page can see more information about each story by clicking the button “Read More”. When the button is clicked the user will be able to read the whole story, in addition to the different tags connected to the story. If the user wants to read less, it is possible to click the button “Read less”.

## Sort and filter

The stories can be filtered on the different tags available in the database. There are ten different tags, and each story can have a maximum of three tags. Furthermore, the stories can be sorted based on ascending or descending amounts of likes.

## User-generated data

A user can add a like to each story. This will increase the count of likes on the story, and the user will be able to see that the count goes up. It is also possible to remove a like, which will make the count go down.

This functionality is not optimal as the user can react more than once on a post if the page is closed and opened up again. Possible ways to fix this could be using localstorage to keep track of the stories reacted on, or make a user component.

## Universal design/web accessibility

The webpage has a few adaptations to make it easier for people with different disabilities to use it. For the visually impaired the page has a noticeable contrast between the text and the background. Furthermore, it is possible to zoom in and out on the page and there is a normal distance between the words in the stories. The buttons on the page show a shadow when it is hovered over, which makes it easier for a user to see that they are hovering the button. The buttons are of a reasonable size, which makes them easy to use.The keyboard can be used to scroll down the page, and also scroll through the filters and sort. The page hopefully has understandable text, where each input field and drop-down menu has a description above. The group has also focused on using html elements that match the content and tried using as few div elements that we managed.This is done to make it more compatible for text-to-speech programs to interpret the web page. In future projects we will focus on this even more.

## Sustainability

When querying the database we use an offset-based pagination to avoid unnecessary gathering of data from the database, which reduces the use of resources. Offset-based pagination goes through all the data until the last data object is fetched (object number: offset + limit). For example if data is gathered for the first page, only ten stories need to be iterated through, in contrast to the last page where there are 150 stories that are considered. To increase the sustainability of the page we could have used cursor based pagination. This can reduce the use of resources that gather data from the database since it only goes through the relevant data.

By sorting and filtering directly on the database, enabled by GraphQL, we also avoid gathering data that is not going to be presented on the site and this is a lot more sustainable than first gathering all of the data before sorting and filtering it.

The use of the React library for building the user interface is also sustainable in itself since it only updates and renders the components that are affected by a change in a state and does not render the whole page again.

## Design and reasonable choices

The web application has a layout where the search fields and the filtering and the sorting option is on the top of the app. Furthermore, the results are displayed underneath. If the application is unable to get a response on the query an error message will be displayed. If no stories match the search, another error message will be displayed. On the bottom of the page the user can switch between the pages. The placement of the elements is consistent with many other websites, making it easy for users to use previous experience with websites when navigating the site.

## Database

We chose to use MongoDB as our database. We downloaded data of short stories as a JSON file from “[https://dummyjson.com]” "(https://dummyjson.com)", which we then imported into our database. MongoDB was chosen because it enabled us to rapidly start developing data, and since it is widely used in industry and by major companies, like eBay.

# Requirements for use of technology

## Frontend

The frontend of the project was initialized with “npx create-react-add frontend –template typescript”. Frontend uses Apollo Client to manage data with GraphQL by the help of the useQuery hook and useMutation. It updates a state and renders the components in the UI that are affected.

A combination of css grid and css flex has been used to present the various elements on the website, depending on how the elements should be placed when the width of the screen changes. Basic html elements, such as header, section and form, are used. This makes it easy to get an overview of the code, as well as the purpose and functionality of the various elements.

For pagination we chose to use the Pagination component from Material UI. This gave us the opportunity to get familiar with one of the big libraries for html components. It also gave us a design for pagination that is intuitive for the user, since it is similar to the design on many other websites

## State management - Recoil

For state management we chose to use Recoil, a state management library for React. This enabled us to get shared states (atoms) that can keep track of the stories a user wants to expand (read more about). It also made it possible to remember which state each story has when the user clicks through different pages. If you want to read more about a story at page one and expand it, the state manager keeps track of this action, even after the user has gone to other pages. When the user goes back to page one again, the story will still be expanded.

## Backend

In the backend we use Apollo Server and Express. The Apollo Server processes the GraphQL operation and responds to the request. The Express framework is used as a middleware. Backend has a resolver function, which the Apollo Server uses to populate data into the schema that it fetches from the database. In our code the resolver includes a Query with a getPost method that returns the stories that match the search and filter values in the given sort order, and Mutation that alters the number of reactions (known as likes in the UI).

## GraphQL and mongoose

To gather data from the database we send a query or a mutation on the GraphQL format from the frontend to the backend. In backend the resolver translates this query into a mongoose query to the database to fetch the desired data.

## Testing

### Unit

We used Jest for unit testing and with a MockProvider we mocked an ApolloProvider which instead of sending a request to the database mocked the responses to specific requests. The tests checks whether the loading works as it should, if the short stories become visible for the user on screen and if a request to an empty database returns the right error message. This error will for example occur if the server is down.

### End-to-end

We used Cypress to automate the end-to-end testing, because it is a testing framework with a simple user interface, as well as good documentation. In the end-to-end tests we test at least one instance of each of the website’s features. The end-to-end tests have extended the test coverage of the website, helping us to make sure that our website is working as it should.

## Known errors

During manual testing, we found out that choosing a new filter on a given page immediately gives the first page of the new result, even though the number on the page menu at the bottom of the page shows the number of the last page you visited before choosing a new filter

As mentioned before another known error is that a user can like the same post several times if the application is closed or the page is switched.
