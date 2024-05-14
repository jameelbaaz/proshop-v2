import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cartItems);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <img src={logo} alt="Proshop" />
            Proshop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link to="/cart" as={Link}>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                    {cartItems.length}
                    {/* {cartItems.reduce((acc, curr) => acc + curr.qty, 0)} */}
                  </Badge>
                )}
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/">
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link to="/Login" as={Link}>
                  <FaUser className="mx-2" />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
