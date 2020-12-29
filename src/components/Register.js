import React, { Component } from 'react';
import './css/CustomStyle.css';
export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }

    handelSubmit = e => {
        e.preventDefault();


        const data = {
            username: this.username,
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            address: this.address,
            phonenumber: this.phonenumber,
            city: this.city
        }

        fetch('/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: data.username,
                Email: data.email,
                Password: data.password,
                Firstname: data.firstname,
                Lastname: data.lastname,
                Address: data.address,
                Phonenumber: data.phonenumber,
                City: data.city

            })

        })
            
            .then(res => {
                console.log(res);

                this.props.history.push("/login");

            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {

        return (
            <div className="middlepos">
                <div className="login card py-2 border-0 pl-1 pr-1">
                    <div className=" card-body" style={{ width: 400 + "px" }}>
                        <div className="row">
                            <div className=" mx-auto">
                                <h4 className="display-4 d-flex justify-content-center pb-4">Sign up</h4>

                                <form onSubmit={this.handelSubmit}>
                                    <div className="form-group mb-3">
                                        <input id="username" type="text" placeholder="Username" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"
                                            onChange={e => this.username = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="email" type="email" placeholder="Email" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.email = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="inputPassword" type="password" placeholder="Enter password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.password = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="firstname" type="text" placeholder="First name" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.firstname = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="lastanme" type="text" placeholder="Last name" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.lastname = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="address" type="text" placeholder="Address" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.address = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="phonenumber" type="text" placeholder="Phone number" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.phonenumber = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="city" type="text" placeholder="City" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.city = e.target.value} />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign up</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}