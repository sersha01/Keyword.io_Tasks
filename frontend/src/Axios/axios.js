import axios from 'axios';

const BaseURL = 'http://localhost:8000/';

const token = () =>{ return( { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`}})}

// Signup for a new admin
export const signup = async (data) => await axios.post(BaseURL + 'signup', data)
    
// Login for an existing admin
export const login = async (data) => await axios.post(BaseURL + 'login', data)

//Create a new book
export const createBook = async (data) => await axios.post(BaseURL + 'create/book', data, token())

//Retrieve all books
export const retrieveBooks = async () => await axios.get(BaseURL + 'retrieve/books')

//Update a book
export const updateBook = async (data) => await axios.put(BaseURL + 'update/book', data, token())

//Delete a book
export const deleteBook = async (data) => await axios.post(BaseURL + 'delete/book', data, token())

//Upload a image
export const uploadImage = async (data) => await axios.post("https://api.cloudinary.com/v1_1/da3qthae5/image/upload",data)

//Update token
export const updateToken = async () => await axios.post(BaseURL + 'token/refresh/', { refresh: JSON.parse(localStorage.getItem('authTokens')).refresh }, token())

