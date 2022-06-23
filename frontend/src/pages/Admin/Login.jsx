import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
    username : yup.string().email('Please enter valide E-mail').required('Email is required'),
    password : yup.string().min(8,'Password should contain 8 characters').required('Password is required'),
  })

function AdminLogin() {

    const { login, error, setError } = useContext(AuthContext);

    const {
        register,  handleSubmit, formState :{errors} } = useForm({
          resolver: yupResolver(schema),
        })
    
    useEffect(()=>{
        return ()=>{
            setError(null)
        }
    },[])

    return (
        <div className="vh-100 p-0 p-sm-6 d-flex align-items-center bg-light">
            <div className="card w-25x flex-grow-1 flex-sm-grow-0 m-sm-auto">
                <form onSubmit={handleSubmit(login)}>
                <div className="card-body mx-sm-3 flex-grow-0">
                    <h1 className="mb-0 fs-3">Sign In</h1>
                    <div className="fs-exact-14 text-muted mt-2 pt-1 mb-4 pb-2">Log in to your account to continue.</div>
                    <div className="mb-0"><label className="form-label">E-mail</label>
                    <input type="text" className="form-control form-control-lg" name="username" placeholder="Enter E-mail" {...register('username')}/><label className="text-danger">{errors.username?.message}</label></div>
                    <div className="mb-0"><label className="form-label">Password</label>
                    <input type="password" className="form-control form-control-lg" name="password" placeholder="Enter Password" {...register('password')}/>
                    <label className="text-danger">{error}{errors.password?.message}</label></div>
                    <div className="pt-2"><button type="submit" className="btn btn-primary btn-lg w-100">Sign In</button></div>
                </div>
                </form>
                <div className='text-center mb-3 text-muted'>or<br/>Need an account? <Link to="/signup">Signup</Link><br/><Link to="/">Not now</Link></div>
            </div>
        </div>
    )
}

export default AdminLogin;