import { Container, Navbar, Nav } from "react-bootstrap";
import Logo from "../Assets/test.svg";

const NavBar = ({ setSearchValue, setType }) => {
  const handleType = (heroType) => {
    setType(heroType);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={Logo} width="120px" height="60px" alt="Brand Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <div id="search">
              <div id="divIcon">
                <span className="material-icons">search</span>
              </div>

              <input
                id="searchInput"
                placeholder="Search"
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
              />
            </div>

            <Nav.Link onClick={() => handleType("All")}>All Heroes</Nav.Link>
            <Nav.Link onClick={() => handleType(true)}>Flying Heroes</Nav.Link>
            <Nav.Link onClick={() => handleType(false)}>
              Flightless Heroes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
