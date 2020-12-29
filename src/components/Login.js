import React, { Component } from 'react';
import './css/CustomStyle.css';
import './css/Login.css';
export class Login extends Component {


    handelSubmit = e => {
        e.preventDefault();


        const data = {
            email: this.email,
            password: this.password
        }

        fetch('https://eshoprest.azurewebsites.net/api/users/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: data.email,
                Password: data.password
            })

        })
            .then(res => res.json()).then(res => {

                localStorage.setItem('token', res.token);

                //console.log("token: ", res.token);

                if (localStorage.getItem('token')) {
                    localStorage.setItem('Username', res.username);
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('id', res.id);
                    this.props.history.push("/ads");
                }
                if (localStorage.getItem('token') === "undefined") {
                    localStorage.clear()
                    this.props.history.push("/login");
                }
            })
            .catch(err => {
                console.log(err);
                alert('Login Failed. Try Again')
            })

    };


    render() {

        return (

            <form onSubmit={this.handelSubmit}>
                <div className="middlepos">
                    <div className="card py-5 border-0 pl-1 pr-1">
                        <div className=" card-body" style={{ maxWidth: 400 + "px", width: 300 + "px" }}>
                            <div className="row">
                                <div className=" mx-auto">
                                    <h4 className="display-4 d-flex justify-content-center pb-4">Sign in</h4>

                                    <div className="form-group mb-3">
                                        <input id="inputEmail" type="email" placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"
                                            onChange={e => this.email = e.target.value} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                            onChange={e => this.password = e.target.value} />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
