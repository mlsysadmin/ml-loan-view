import { Container, Nav, Navbar } from 'react-bootstrap';
import './mainStyles.css';
import Image from 'next/image'

function header() {
    const headerMenuItem = [
        {name: 'Personal', url: '/personal'}, 
        {name: 'Business', url: '/business'}, 
        {name: 'Promos', url: '/promos'}, 
        {name: 'Learn', url: '/learn'}, 
        {name: 'About', url: '/about'}, 
        {name: 'Support', url: '/contact-us'}
    ];

    return (
        <>
            {/* <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Nav className="me-auto">
                        asd
                    </Nav>
                </Container>
            </Navbar> */}
            <div className='header-container'>
                <nav className='navbar-main'>
                    <div className="container px-0">
                        <div className='navbar-content'>
                            <div className="mobile-toggle">
                                <button type="button" aria-label="Toggle menu">
                                <span></span>
                                <span></span>
                                <span></span>
                                </button>
                            </div>
                            <div className="navbar-logo">
                                <a href={`/`}>
                                <Image
                                src="/images/ml-logo-2.svg"
                                alt="MLhuillier logo"
                                width={30}
                                height={30}
                                />
                                </a>
                            </div>
                            <div className='navbar-menu'>
                                <ul>
                                    {headerMenuItem.map(menuItem => <li key={menuItem.name}><a href={menuItem.url} className="nav-link">{menuItem.name}</a></li>)}
                                </ul>
                            </div>
                            <div className='navbar-actions'>
                                <a className='login-button' href="">Log in</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default header;

