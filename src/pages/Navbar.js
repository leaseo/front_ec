import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, Button, Nav } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideLogout: false
        }
    }

    logout = () => {
        cookies.remove('user', {path: '/'});
        cookies.remove('token', {path: '/'});
        window.location.href = './';
    }

    componentDidMount() {
        if(!cookies.get('user')) {
            this.setState({
                hideLogout: true
            })
        }
    }

    render() {
        const { hideLogout } = this.state;
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Ecomerciar Project</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link hidden={hideLogout} href="/photoData">Photos</Nav.Link>
                    <Nav.Link className="active" hidden={hideLogout} href="/gridData">Grid Data</Nav.Link>
                </Nav>
                <Form inline>
                    <Button hidden={hideLogout} variant="outline-info" onClick={() => this.logout()}>Logout</Button>
                </Form>
            </Navbar>
        );
    }
}

export default NavbarComponent