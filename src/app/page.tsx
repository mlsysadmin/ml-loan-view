import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

function homeContents() {
    const whatYouNeed = [{
        title: 'Requirements',
        constents: [
            'Government ID',
            'Proof of Income (COE/ITR/Pay Slip)',
            'Latest 3mos Bank statements',
            'Proof of Address',
            'Property Documents'
        ]
    }, {
        title: 'Who can apply',
        constents: [
            '21 years old and up',
            'Filipino / Permanent Resident',
            'Stable source of income',
            'No history of loan default or bankruptcy'
        ]
    }, {
        title: 'Loan Details',
        constents: [
            'PHP 100,000 to PHP 10,000,000 (depending on income)',
            'Loan tenure: 60 months(max)',
            'Interest: 6.5% per annum',
            'Monthly amortization',
            'Residential property to be financed',
            '5-15 business days upon submission'
        ]
    }];

    const whyCard = [
        {
            title: 'Low Interest Rates', 
            description: 'Enjoy competitive rates that make home-ownership more affordable.',
            img: ''
        },
        {
            title: 'Quick and Easy Application', 
            description: 'Apply online in minutes with fast processing and approvals.',
            img: ''
        },
        {
            title: 'Flexible Payment Terms', 
            description: 'Choose repayment periods that suit income and lifestyle.',
            img: ''
        }
    ];

    function whatYouNeedContents(contents: any[]) {
        return contents.map(content => <li key={content}>{content}</li>)
    }

    return (
        <>  
            <Container>
                <div className="container home-banner">
                    <div className="hero-content">
                        <p className="banner-text">Match your dream <span className="red">Home</span><br/> with a <span className="red">Loan</span> that fits you.</p>
                        <p>Your dream homeis just a few clicks away.</p>
                        <div className="hero-buttons">
                            <Link href="/calculator">
                                <button className="btn btn-start-here">Start here &nbsp; <ArrowRight size={20} /></button>
                            </Link>
                        </div>  
                    </div>
                    <div className="hero-image">
                        <Image
                        src="/images/home-loan2.png"
                        alt="MLhuillier logo"
                        width={100}
                        height={100}
                        />
                    </div>
                </div>
                <Col lg="12">
                    <div className="what-you-need-container">
                        <p className="banner-text">What you need</p>
                        <Row className="what-you-need">
                            {whatYouNeed.map(item => 
                                <div key={item.title} className="what-you-need-card">
                                    <div className="title">
                                        {item.title}
                                    </div>
                                    <ul>
                                        {whatYouNeedContents(item.constents)}
                                    </ul>
                                </div>
                            )}
                        </Row>
                    </div>
                </Col>
                <Container className="why">
                    <p className="text-center">
                        <span className="text-danger mb-5 banner-text">Why M. Lhuillier</span> <br />
                        <span>We've reinvented the way you get a home loan <br /> because you deserve bettter.</span>
                    </p>
                    <div className="row text-center">
                        {whyCard.map(item => 
                            <div key={item.title} className="col-md-4 mb-5 mb-md-0 order-md-1 order-2">
                                <div className="icon-wrapper mb-4">  
                                    Image here
                                </div>
                                <h6>
                                    {item.title}
                                </h6>
                                <p>{item.description}</p>
                            </div>
                        )}
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default homeContents;