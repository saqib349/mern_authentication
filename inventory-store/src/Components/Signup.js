import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useGoogleLogin } from '@react-oauth/google';
import { handleFailure,handleSuccess } from '../Util';
import { ToastContainer } from 'react-toastify';


const Signup = () => {
    const userDetail = useStoreState((state) => state.userDetail)
    const setUserDetail = useStoreActions((action) => action.setUserDetail)
    const googleLogin = useStoreActions((action)=> action.googleLogin)
    const userSignup = useStoreActions((action) => action.userSignup)
    const  resetUserDetail= useStoreActions((action)=>action.resetUserDetail)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [showCPassword, setShowCPassword] = React.useState(false);


    const handleChange = (e) => {
        setUserDetail(
            {
                ...userDetail,
                [e.target.name]: e.target.value
            }
        )
    }


    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        await googleLogin(tokenResponse); 
        navigate('/login')
        },
        onError: () => {
        console.error("Google login failed");
        }
    });


const handleSingUp = async (e) => {
    e.preventDefault()
    if (userDetail.password !== userDetail.Cpassword) {
        handleFailure("please ensure that passwords should be matched !")
        return
    }
    const newUser = userDetail
    const result= await userSignup(newUser)
    if (result.success) {
        resetUserDetail()
        handleSuccess("successfully signup")
        navigate('/login')
    }
    else {
        handleFailure(result.message)
    }
}
return (
    <div className="container-fluid">
        <div className="row min-vh-100">
            {/* Left side - Welcome Info */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5" style={{ backgroundColor: '#2c2c2c', color: '#fff' }}>
                <img src="/images/shop-location.png" alt="Inventory Logo" style={{ maxWidth: '200px' }} className="mb-4 align-center" />
                <h1 className="fw-bold mb-3">Join Broom Inventory</h1>
                <p className="fw-light mb-5">Take control of your inventory today. Track, manage, and optimize.</p>

                <div className="d-flex mb-3 align-items-start">
                    <img src="/images/bar.png" alt="" style={{ width: '40px' }} className="me-3" />
                    <div>
                        <h6>Inventory Made Easy</h6>
                        <p className="fw-light">Clean UI and powerful reports</p>
                    </div>
                </div>

                <div className="d-flex mb-3 align-items-start">
                    <img src="/images/toast.png" alt="" style={{ width: '40px' }} className="me-3" />
                    <div>
                        <h6>Access Anywhere</h6>
                        <p className="fw-light">On any device, at any time</p>
                    </div>
                </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="col-md-6 d-flex justify-content-center align-items-center p-5" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                    <h3 className="text-center mb-4">Create Your Account</h3>

                    <div className="text-center mb-3">
                        <button type="button" className="btn btn-outline-light btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-floating mx-1"
                            onClick={handleGoogleLogin}
                        >
                             <i className="fab fa-google"></i>
                        </button>
                        <button type="button" className="btn btn-outline-light btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>
                        <button type="button" className="btn btn-outline-light btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>

                    <p className="text-center mb-4">or sign up with your email</p>

                    <form onSubmit={handleSingUp}>
                        <div className="form-outline mb-3">
                            <label htmlFor="registerName" className="form-label">Full Name</label>
                            <input type="text" id="registerName" className="form-control" name='fullName' value={userDetail.fullName} onChange={handleChange} required />
                        </div>

                        <div className="form-outline mb-3">
                            <label htmlFor="registerUsername" className="form-label">Username</label>
                            <input type="text" id="registerUsername" className="form-control" name='userName' value={userDetail.userName} onChange={handleChange} required />
                        </div>

                        <div className="form-outline mb-3">
                            <label htmlFor="registerEmail" className="form-label">Email</label>
                            <input type="email" id="registerEmail" className="form-control" name='email' value={userDetail.email} onChange={handleChange} required />
                        </div>

                        <div className="form-outline mb-3 position-relative">
                            <label htmlFor="registerPassword" className="form-label">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="registerPassword"
                                className="form-control"
                                name="password"
                                value={userDetail.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                position: 'absolute',
                                right: '10px',
                                top: '38px',
                                cursor: 'pointer',
                                color: '#aaa'
                                }}
                            >
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>

                        <div className="form-outline mb-3 position-relative">
                            <label htmlFor="registerRepeatPassword" className="form-label">Repeat Password</label>
                            <input
                                type={showCPassword ? "text" : "password"}
                                id="registerRepeatPassword"
                                className="form-control"
                                name="Cpassword"
                                value={userDetail.Cpassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() => setShowCPassword(!showCPassword)}
                                style={{
                                position: 'absolute',
                                right: '10px',
                                top: '38px',
                                cursor: 'pointer',
                                color: '#aaa'
                                }}
                            >
                                <i className={`fa ${showCPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="termsCheck" />
                            <label className="form-check-label" htmlFor="termsCheck">
                                I agree to the <a href="#!" className="text-light">terms and conditions</a>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-light w-100 mb-3">Sign Up</button>

                        <p className="text-center">
                            Already have an account? <Link to="/Login" className="text-light">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
);
};

export default Signup;
