import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

function footer() {
    const footerMenuItem = [
        {  
            category: 'Products & Services',
            items: [
                'eLoad and Gaming',
                'Quick Cash Loans',
                'Kwarta Padala',
                'MCash',
                'ML Express',
                'Money Changer',
                'Jewelry',
                'Insurance',
                'ML Moves',
                'ML Payroll PRO',
                'ML ShopSafe',
            ]
        }, {
            category: 'Company',
            items: [
                'About Us',
                'Branch Locator',
                'Careers',
                'News & Updates',
                'Promos'
            ]
        }
    ];

    
    return (
        <>
            <div className="nav-footer">
                <div className="text-lg-start d-none d-lg-block">
                    <div className="container footer-content py-5">
                        <Row>
                            <Col className="col-lg-4">
                                <div className="footer-logo">
                                    <Image
                                    src="/images/ml-logo.svg"
                                    alt="MLhuillier logo"
                                    width={400}
                                    height={35}
                                    />
                                </div>
                                <p className="mb-1 font-weight-bold text-body lahat-pwede">
                                    <span className="red">Lahat</span> Puwede!
                                </p>
                            </Col>
                            <Col className="col-lg-1"></Col>
                            <Col className="mb-4 mb-md-0">
                                <h6 className="mb-3 fw-bold footer-col-title">Products &amp; Services</h6>
                                <ul className="list-unstyled mb-0">
        
                                    <li className="mb-3">
                                        <a href="https://mlweb.mlhuillier.com/eload" className="text-decoration-none" target="_blank">eLoad and Gaming</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/coming-soon" className="text-decoration-none">Quick Cash Loans</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/kwarta-padala" className="text-decoration-none" target="_blank">Kwarta Padala</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/#mcash-download" className="text-decoration-none">MCash</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/ml-express" className="text-decoration-none" target="_blank">ML Express</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/money-changer" className="text-decoration-none">Money Changer</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="https://shop.mlhuillier.com" className="text-decoration-none">Jewelry</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="https://mlweb.mlhuillier.com/insurance" className="text-decoration-none" target="_blank">Insurance</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/ml-moves" className="text-decoration-none">ML Moves</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/ml-payroll-pro" className="text-decoration-none">ML Payroll PRO</a>
                                    </li>
                                    
                                    <li className="mb-3">
                                        <a href="/ml-shopsafe" className="text-decoration-none">ML ShopSafe</a>
                                    </li>
                                    
                                </ul>
                            </Col>
                            <Col className="mb-4 mb-md-0">
                                <div className="col mb-4 mb-md-0">
                                    <h6 className="mb-3 fw-bold footer-col-title">Company</h6>
                                    <ul className="list-unstyled mb-0">
                                        
                                        <li className="mb-3">
                                        <a href="/about-m-lhuillier-financial-services" className="text-decoration-none">About Us</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="/branches" className="text-decoration-none">Branch Locator</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="https://webcareers.mlhuillier.com" className="text-decoration-none" target="_blank">Careers</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="/newsletters" className="text-decoration-none">News &amp; Updates</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="/promos" className="text-decoration-none">Promos</a>
                                        </li>
                                        
                                    </ul>
                                    
                                    <h6 className="mb-3 mt-5 fw-bold footer-col-title">Help &amp; Legal</h6>
                                    <ul className="list-unstyled mb-0">
                                        
                                        <li className="mb-3">
                                        <a href="/faq" className="text-decoration-none">FAQ</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="/contact-us" className="text-decoration-none">Contact Us</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="/mcash-terms-and-conditions" className="text-decoration-none">Terms &amp; Conditions</a>
                                        </li>
                                        
                                        <li className="mb-3">
                                        <a href="/privacy-notice" className="text-decoration-none">Privacy Notice</a>
                                        </li>
                                        
                                    </ul>
                                
                                </div> 
                            </Col>
                            <Col className="mb-4 mb-md-0">
                                <h6 className="mb-3 fw-bold footer-col-title">Social Media</h6>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-3">
                                    <a href="https://www.facebook.com/mlhuillier.official/" className="text-decoration-none" target="_blank">
                                        <i className="fab fa-facebook me-2" aria-hidden="true"></i> Facebook
                                    </a>
                                    </li>
                                    <li className="mb-3">
                                    <a href="https://instagram.com/mlhuillier_official" className="text-decoration-none" target="_blank">
                                        <i className="fab fa-instagram me-2" aria-hidden="true"></i> Instagram
                                    </a>
                                    </li>
                                    <li className="mb-3">
                                    <a href="https://x.com/KaMLhuillier" className="text-decoration-none" target="_blank">
                                        <i className="fab fa-x-twitter me-2" aria-hidden="true"></i> Twitter / X
                                    </a>
                                    </li>
                                    <li className="mb-3">
                                    <a href="https://www.youtube.com/user/MLhuillierInc" className="text-decoration-none" target="_blank">
                                        <i className="fab fa-youtube me-2" aria-hidden="true"></i> Youtube
                                    </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="d-block d-lg-none">
                    <div className="container py-4">
                        {/* Logo and tagline - centered */}
                        <div className="mb-2 text-left">
                            <div className="navbar-logo">
                                <Image
                                    src="/images/ml-logo.svg"
                                    alt="MLhuillier logo"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <p className="mb-0 font-weight-bold text-body"><span className="text-danger">Lahat</span> Puwede!</p>
                            <p className="mb-0">Email us</p>
                            <a href="mailto:customercare@mlhuillier.com">
                            customercare@mlhuillier.com
                            </a>
                        </div>
                        <div className="mb-2 text-left">
                            <a href="https://www.facebook.com/mlhuillier.official/" className="text-decoration-none mr-4" target="_blank">
                            <i className="fab fa-facebook fs-4" aria-hidden="true"></i>
                            </a>
                            <a href="https://instagram.com/mlhuillier_official" className="text-decoration-none mr-4" target="_blank">
                            <i className="fab fa-instagram fs-4" aria-hidden="true"></i>
                            </a>
                            <a href="https://x.com/KaMLhuillier" className="text-decoration-none mr-4" target="_blank">
                            <i className="fab fa-x-twitter fs-4" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.youtube.com/user/MLhuillierInc" className="text-decoration-none" target="_blank">
                            <i className="fab fa-youtube fs-4" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container py-4 footer-bottom">
                    <div className="row justify-content-between">
                        <div className="ml-3 my-0 mb-1 m-sm-0 small">
                            Copyright © <span className="copyright-year"> 2025 </span>  M.Lhuillier Financial Services, Inc.
                        </div>
                        <div className="ml-3 my-0 m-sm-0 small">
                            All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default footer;