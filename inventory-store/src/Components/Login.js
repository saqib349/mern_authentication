
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { handleFailure, handleSuccess } from '../Util';
import { ToastContainer } from 'react-toastify';

const Login = () => {

    const userDetail = useStoreState((state) => state.userDetail)
    const setUserDetail = useStoreActions((action) => action.setUserDetail)
    const userLogin = useStoreActions((action) => action.userLogin)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserDetail(
            {
                ...userDetail,
                [e.target.name]: e.target.value
            }
        )
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        const oldUser = {
            email: userDetail.email,
            password: userDetail.password
        };

        const result = await userLogin(oldUser);

        if (result.success) {
            handleSuccess(`Successfully login MR. ${userDetail.fullName}`);

            setUserDetail({
                fullName: "",
                userName: "",
                email: "",
                password: "",
                Cpassword: ""
            });

            setTimeout(() => {
                navigate('/products');
            }, 500);
        } else {
            handleFailure(result.message); // pass message directly
        }
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5" style={{ backgroundColor: '#2c2c2c', color: '#fff' }}>
                    <img src="/images/inventory.png" alt="Inventory Logo" style={{ maxWidth: '200px' }} className="mb-4" />
                    <h1 className="fw-bold mb-3">Broom Inventory</h1>
                    <p className="fw-light mb-5">Your ideal partner in keeping inventory organized and optimized.</p>

                    <div className="d-flex mb-3 align-items-start">
                        <img src="/images/bar.png" alt="" style={{ width: '40px' }} className="me-3" />
                        <div>
                            <h6>Stay Organized</h6>
                            <p className="fw-light">Keep everything under control</p>
                        </div>
                    </div>

                    <div className="d-flex mb-3 align-items-start">
                        <img src="/images/soda.png" alt="" style={{ width: '40px' }} className="me-3" />
                        <div>
                            <h6>Get All Your Stats</h6>
                            <p className="fw-light">All reports with one click</p>
                        </div>
                    </div>

                    <div className="d-flex mb-3 align-items-start">
                        <img src="/images/toast.png" alt="" style={{ width: '40px' }} className="me-3" />
                        <div>
                            <h6>Keep an Eye</h6>
                            <p className="fw-light">Access from anywhere</p>
                        </div>
                    </div>
                </div>


                <div className="col-md-6 d-flex justify-content-center align-items-center p-5" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <h3 className="text-center mb-4">Login</h3>

                        <div className="text-center mb-3">
                            <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>
                            <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button type="button" className="btn btn-outline-light btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>

                        <p className="text-center mb-4">or use your account:</p>

                        <form onSubmit={handleLogin}>
                            <div className="form-outline mb-3">
                                <label htmlFor="loginEmail" className="form-label">Email</label>
                                <input type="email" id="loginEmail" className="form-control" name='email' value={userDetail.email} onChange={handleChange} required />
                            </div>

                            <div className="form-outline mb-3">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <input type="password" id="loginPassword" className="form-control" name='password' value={userDetail.password} onChange={handleChange} required />
                            </div>

                            <div className="form-check d-flex justify-content-between mb-4">
                                <div>
                                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                                    <label className="form-check-label ms-2" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <a href="#!" className="text-light">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn btn-light w-100 mb-3">Sign In</button>

                            <p className="text-center">
                                Not a member? <Link to="/signup" className="text-light">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
