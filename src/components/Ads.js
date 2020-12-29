import React, { Component } from 'react';
import './css/CustomStyle.css';
import { Link } from 'react-router-dom'
import { startAnimation } from './LoadingAnimation.js';

export class Ads extends Component {
    static displayName = Ads.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch('https://eshoprest.azurewebsites.net/api/ads')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }

    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return (
                startAnimation()
            )
        }
        else {
            return (
               
                    <div className="container-fluid dark-grey-text mt-5">
                        <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">

                                            {items.map(items => (

                                                <div key={items.id} className="col-lg-4 col-md-6 mb-4">
                                                    <div className="hover hover-1 text-white border-0 box-shadow rounded-sm">
                                                        <img className="card-img-top picture-shadow" style={{objectFit: "scale-down"}} src="https://d2pa5gi5n2e1an.cloudfront.net/webp/ph/images/article/11401_TH/summary_snp.jpg" alt=""/>

                                                        <div className="hover-overlay"></div>
                                                        <div className="hover-1-content px-5 py-4">
                                                            <Link to={{
                                                                pathname: '/adinfo',
                                                                state: { adid: items.id }
                                                            }}> <h3 className="hover-1-title font-weight-bold mb-0"><span className="font-weight-light pl-2 pr-2" style={{ backgroundColor: 'white', borderRadius: 10, color: 'black', whiteSpace: "nowrap", overflow: "hidden"}}>{items.title}</span></h3></Link>

                                                            <h5 className="text-white">{items.price} &euro;</h5>
                                                            <p className="hover-1-description font-weight-light mb-0">{items.description}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
             
            );
        }
    }
}