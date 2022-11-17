import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
    // -------- CONDICIONAL DE NAVEGAÇÃO --------
    // cria uma constante para localização
    const location = useLocation()

    // se o caminho que o usuário estiver for a raiz
    if(location.pathname === "/") {
        // então a navbar fica null, ou seja, não irá aparecer
        return null
    }

    // -------- RENDERIZAÇÃO DE HTML --------
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>IronRH</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Página inicial</Link>
                        <Link className="nav-link" to="/funcionarios">Ver funcionários</Link>
                        <Link className="nav-link" to="/cadastrar">Cadastrar novo funcionário</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar