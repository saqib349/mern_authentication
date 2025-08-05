import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const getAllProducts = useStoreActions((actions) => actions.getAllProducts);
  const products = useStoreState((state) => state.products);
  const userLogout = useStoreActions((action) => action.userLogout);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProducts();
      if (!result) {
        console.log("invalid access");
      }
    };
    fetchData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    userLogout(false);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-danger px-4" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12">
            <h3 className="text-center text-muted">There's no item</h3>
          </div>
        ) : (
          products.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
