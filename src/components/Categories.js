import React, { Component } from 'react';
import './css/CustomStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { startAnimation } from './LoadingAnimation.js';

export class Categories extends Component {
    static displayName = Categories.name;
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            error: null,
            response: {}

        };
    }

    handelSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.name
        }
        window.$("#exampleModalCenter").modal("hide");
        fetch('/categories', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Name: data.name
            })
        })
            .then(res => {
                console.log(res);
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err);
            })
    };
    handleEdit = (e, i) => {
        e.preventDefault();
        const data = {
            id: this.id,
            name: this.name
        }

        const { items } = this.state;
        items[i][e.target.name] = e.target.value;
        this.setState({ items });

        window.$("#exampleModalCenterEdit" + data.id).modal("hide");

        fetch('/categories/' + data.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Name: items[i].name
            })
        })
            .then(res => {
                console.log(res);
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err);
            })
       
    };
    deleteCategory(itemId) {
        const { items } = this.state;

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }

        fetch('/categories/' + itemId, options)
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        items: items.filter(item => item.id !== itemId),
                        response: result,

                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }
    componentDidMount() {
        fetch('/categories')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    handleChange = (e, i) => {
        const { items } = this.state;
        items[i][e.target.name] = e.target.value;
        this.setState({ items });
        console.log(items[i].name)
    };

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return (startAnimation())
        } else {
            if (localStorage.getItem('role') === "1") {
                return (
                    <div className="container box-shadow">

                        <button type="button" className="btn btn-success btn-sm mb-2" data-toggle="modal" data-target="#exampleModalCenter">Create new</button>
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handelSubmit}>
                                            <div className="form-group">
                                                <input required type="text" className="form-control" placeholder="Enter category"
                                                    onChange={e => this.name = e.target.value} />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-sm rounded-pill">Create</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >#</th>
                                    <th scope="col">Category</th>
                                    <th scope="col" className="pr-5" style={{ textAlign: "right" }}>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td >
                                            <div className="row d-flex justify-content-center align-items-center ">
                                                <div className="modal fade" id={"exampleModalCenterEdit" + item.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form action='post' onSubmit={e => this.handleEdit(e, i)}>
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" name="name" value={item.name || ""}
                                                                            onChange={e => this.handleChange(e, i)} />
                                                                    </div>
                                                                    <button type="submit" className="btn btn-primary btn-sm rounded-pill" onClick={() => { this.id = item.id }}>Confirm</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end align-items-center ">
                                                <button type="button" className="btn btn-warning btn-sm m-1 rounded-pill" data-toggle="modal" data-target={"#exampleModalCenterEdit" + item.id} >Edit</button>
                                                <button type="button" className="btn btn-danger btn-sm m-1 rounded-pill" onClick={() => { window.confirm("Are you sure you want to delete this category?") && this.deleteCategory(item.id) }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <h1>You don't have permission to this page</h1>
                );
            }
        }
    }
}



