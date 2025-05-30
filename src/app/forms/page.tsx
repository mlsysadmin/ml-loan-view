import React from 'react';
import CollateralInformationPage from './components/CollateralInformation';
import { Container } from 'react-bootstrap';
import './index.css';

export default function FormPage() {
    const steps = [
        {
            step: '1', 
            active: true,
            done: false,
            subStep: [
                {active: false},
                {active: false},
            ]
        },
        {
            step: '2',
            active: true,
            done: false,
            subStep: [
                {active: false},
                {active: false},
            ]
        },
        {
            step: '3',
            active: true,
            done: false,
            subStep: [
                {active: false},
                {active: false},
            ]
        },
        {
            step: '4',
            active: true,
            done: false,
            subStep: [
                {active: false},
                {active: false},
            ]
        },
    ];

    return (
        <Container>
            <div className='top-container'>
                <div className='top-text'>
                    Get Started with your <span className='red'>Home Loan</span>
                </div>
                <p>Complete the form to begin your home loan application process.</p>
                <div className='step-container'>
                    {steps.map(step =>
                        <div key={step.step} className='steps {}'>
                            {step.step}
                        </div>
                    )}
                </div>
            </div>
            <CollateralInformationPage />
        </Container>
    );
}