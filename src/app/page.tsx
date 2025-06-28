import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import HomeLoanPage from './landing-pages/home-loan'
import CarLoanPage from './landing-pages/car-loan'
// import { usePathname, useSearchParams } from 'next/navigation';

function homeContents() {


        // const pathname = usePathname();
        // const searchParams = useSearchParams();

        // const fullURL = `${pathname}?${searchParams.toString()}`;
        // console.log('=====:URL:::', fullURL)

        const whatYouNeed = [{
            title: 'Requirements',
            constents: [
                'Government ID',
                'Proof of Income',
                'Proof of Address',
            ]
        }, {
            title: 'Who can apply',
            constents: [
                'At least 21 years old',
                'Filipino Citizen*',
                'Stable source of income'
            ]
        }, {
            title: 'Loan Details',
            constents: [
                'Up to PHP 10,000,000',
                'From 12 to 6 months',
                'Quick approval',
            ]
        }];

        const whyCard = [
            {
                title: 'Low Interest Rates',
                description: 'Enjoy competitive rates that make home-ownership more affordable.',
                img: 'low-interest'
            },
            {
                title: 'Quick and Easy Application',
                description: 'Apply online in minutes with fast processing and approvals.',
                img: 'easy-apply'
            },
            {
                title: 'Flexible Payment Terms',
                description: 'Choose repayment periods that suit income and lifestyle.',
                img: 'flexible-payment-terms'
            }
        ];

        function whatYouNeedContents(contents: any[]) {
            return contents.map(content =>
                <div key={content} className="card-check-list">
                    <Image
                        className="check"
                        src="/images/check.svg"
                        alt="MLhuillier logo"
                        width={10}
                        height={10}
                    />
                    {content}
                </div>
            )
        }

        return (
            <>
                <Container>
                    <CarLoanPage/>
                    {/* <Col lg="12">
                        <div className="what-you-need-container">
                            <p className="banner-text regular title">What you need</p>
                            <br />
                            <Row className="">
                                {whatYouNeed.map(item =>
                                    <div key={item.title} className="col-md-4 mb-5 mb-md-0 ">
                                        <div className="what-you-need-card">
                                            <div className="card-title  smaller regular">
                                                {item.title}
                                            </div>
                                            <div className="card-check-list-wrapper">
                                                {whatYouNeedContents(item.constents)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Row>
                            <br />
                            <div className="text-muted regular">* Except for condominium (see details)</div>
                        </div>
                    </Col> */}
                    <Container className="why">
                        <div className="center-why">
                            <span className="red banner-text regular title">Why M. Lhuillier</span> <br />
                            <div className=" why-text">
                                <span className="regular readable">We've reinvented the way you get a home loan because you deserve bettter.</span>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row text-center">
                            {whyCard.map(item =>
                                <div key={item.title} className="col-md-4 mb-5 mb-md-0 order-md-1 order-2">
                                    <div className="icon-wrapper mb-4">
                                        <Image
                                            src={'/images/' + item.img + '.svg'}
                                            alt="MLhuillier logo"
                                            width={50}
                                            height={50}
                                        />
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