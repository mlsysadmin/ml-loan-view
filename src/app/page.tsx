import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import './globals.css'
// import HomeLoanPage from './landing-pages/home-loan'
// import CarLoanPage from './landing-pages/car-loan'
// import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from './loans/components/navbar';
import Footer from './loans/components/footer';

function mainPage() {
    const whyCard = [
        {
            title: 'Nationwide Presence',
            description: 'There is always a branch near you with our <span class="red">3,000 branches</span> nationwide',
            img: 'https://mlhuillier.com/img/revamp/filipino-philippines.svg',
        },
        {
            title: 'For over 40 years',
            description: 'A trusted name  <span class="red"> known by every Filipino </span> for all types of financial services',
            img: 'https://mlhuillier.com/img/revamp/icons/ml-diamond.svg'
        },
        {
            title: 'In your pocket',
            description: 'With  <span class="red"> MCash</span>, you have access to all our services anytime, anywhere',
            img: 'https://mlhuillier.com/img/revamp/filipino-mcash.svg'
        }
    ];
    return (
        <main>
            <Navbar />
            <div className="gradient-section">
                <br /><br /><br /><br />
                <Container>
                    <div className="col-md-12 main-page-card-container">
                        <Link href={'/loans?type=car'} className="col-md-6">
                            <div className="main-page-card-wrapper">
                                <div className="main-page-card">
                                    <div className="main-page-card-details">
                                        <p className="red readable medium">Car Loan</p>
                                        <p>A new car is just a few clicks away!</p>
                                    </div>

                                    <Image
                                        className="check"
                                        src="https://mlhuillier.com/img/revamp/individual-car-loan.svg"
                                        alt="MLhuillier logo"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                        </Link>
                        <Link href={'/loans?type=home'} className="col-md-6">
                            <div className="main-page-card-wrapper">
                                <div className="main-page-card">
                                    <div className="main-page-card-details">
                                        <p className="red readable medium">Home Loan</p>
                                        <p>Home loans made easy!</p>
                                    </div>

                                    <Image
                                        className="check"
                                        src="https://mlhuillier.com/img/revamp/individual-home-loan.svg"
                                        alt="MLhuillier logo"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                </Container>
                <br /><br /><br /><br />
            </div>
            <Container className="why-main">
                <div className="center-why-main">
                    <span className="banner-text-main medium big">Why do <span className="red">25m+ Filipinos</span> love M. Lhuillier? </span> <br />
                </div>
                <br />
                <br />
                <div className="row text-center">
                    {whyCard.map(item =>
                        <div key={item.title} className="col-md-4 mb-5 mb-md-0 order-md-1 order-2">
                            <div className="icon-wrapper mb-4">
                                <Image
                                    src={item.img}
                                    alt="Icon"
                                    width={120}
                                    height={170}
                                />
                            </div>
                            <h6>
                                {item.title}
                            </h6>
                            <p dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                    )}
                </div>
            </Container>
            <Footer/>
        </main>
    );
}

export default mainPage;