# Avast: NodeJS/React developer task

## Usage

* Rename `env_example` to `.env`, in the root of the project and inside `frontend` and `backend` directory.
* Run `docker-compose up --build`

## Backend

The backend uses a modular approach to boot an Express microservice. The same function that boots Express is also reused for testing the endpoints, through `afterAll` and `beforeAll` Jest's hooks.  
Redis is linked inside the backend and its URL is writtend inside the `.env` file, using `redis` as hostname.

## Frontend

The frontend has been created with `create-react-app`, using an open source CSS theme. The backend is linked in the frontend and reachable with the hostname `backend`.  
This is just a part of what requested inside the _Nice to have_ section, in particular we're showing 2 endpoints with hard-coded parameters:
- the pagination in the home uses its default page size as `10` without using the cursor returned by the backend
- the album section uses the album with id `1` without a form to allow the changes of the parameter.  

## Task

Please create a simple JS/Node.js application that will work as a server that communicate with Redis.
The app needs to be done the way we can run it in a cloud environment.
Please focus on simplicity, proper logic, and tests.
Feel free to use any existing JS library.

Necessary steps:
- before you will start working on it please send us the time estimation necessary to complete the task including all circumstances that could affect the deadline. The proper time estimation is on your side.
- after you complete the task please send us the final code as a ZIP or link to the repository.

Required actions:
- use docker-compose
- before start, load given data into Redis
- create API which will expose 3 different types of information:
	* list of all items
	* list of items by albumId
	* item data by id
- create tests for your application
- as a data source please use https://jsonplaceholder.typicode.com/photos service.

Nice to have (we will consider this as a additional points):
- use Typescript
- use React.js to create a simple frontend for the app which will display stored items:
	* use all exposed types of information from server (see above) and create 3 different views
	* create tests for frontend
- create a simple frontend form and additional server functionality for adding new item/items to Redis
