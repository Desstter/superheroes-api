import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar = ({ setSearchValue, setType }) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand className="hero-brand">
          🦸 HeroBase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="hero-nav" />
        <Navbar.Collapse id="hero-nav" className="justify-content-end">
          <Nav className="align-items-center gap-2">
            <div id="searchWrapper">
              <span className="material-icons search-icon">search</span>
              <input
                id="searchInput"
                placeholder="Search heroes..."
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="Search heroes"
              />
            </div>
            <Nav.Link onClick={() => setType("All")} className="nav-filter">All</Nav.Link>
            <Nav.Link onClick={() => setType(true)} className="nav-filter">✈ Flying</Nav.Link>
            <Nav.Link onClick={() => setType(false)} className="nav-filter">🚶 Ground</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
