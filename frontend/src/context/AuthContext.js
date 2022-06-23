import * as API from '../Axios/axios';
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ?
     JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(null);
    const [imageLink, setImageLink] = useState(null);

    const signup = async (data)=>{
        await API.signup(data).then(response => {
            if (response.data.status === true) {
                login(data)
            } else {
                setError(response.data.error);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const login = async (data)=>{
        await API.login(data).then(response => {
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.refresh).name);
            navigate('/');
        }).catch(error => {
            setError('Invalid credentials');
        })
    }

    const logout = async ()=>{
        localStorage.removeItem('authTokens')
        setAuthTokens(null);
        setUser(null);
    }

    const createBook = async (data)=>{
        await API.createBook(data).then(response => {
            retrieveBooks();
        }).catch(error => {
            console.log(error);
        })
    }

    const retrieveBooks = async ()=>{
        await API.retrieveBooks().then(response => {
            setBooks(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const updateBook = async (data)=>{
        await API.updateBook(data).then(response => {
            retrieveBooks();
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteBook = async (data)=>{
        await API.deleteBook(data).then(response => {
            retrieveBooks();
        }).catch(error => {
            console.log(error);
        })
    }

    const uploadImage = async (image)=>{
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "w5rfzcjg");
        data.append("cloud_name", "da3qthae5");
        await API.uploadImage(data).then(res => {setImageLink(res.data.secure_url)})
    }

    const updateToken = async ()=>{
        await API.updateToken().then(response => {
            setAuthTokens(response.data.data);
            setUser(jwt_decode(response.data.refresh).name);
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        }).catch(error => {
            logout();
        })
    }


    const contextData = {
        // functions
        signup,
        login,
        logout,
        createBook,
        retrieveBooks,
        updateBook,
        deleteBook,
        uploadImage,

        // state
        user,
        books,
        error,
        show,
        action,
        imageLink,

        // setters
        setError,
        setShow,
        setAction,
    }

    useEffect(()=>{
        const refreshTime = 1000 * 60 * 15;
        const interval = setInterval(()=>{
            if (authTokens) {
                updateToken();
            }
        }, refreshTime)
        return ()=>clearInterval(interval);
    },[authTokens]);
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}