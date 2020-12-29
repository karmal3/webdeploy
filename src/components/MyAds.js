import React, { Component } from 'react';
import './css/CustomStyle.css';
import { Link } from 'react-router-dom'
import { startAnimation } from './LoadingAnimation.js';

export class MyAds extends Component {
    static displayName = MyAds.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsCategory: [],
            isLoaded: false,
        };

    }

    handelSubmitAd = e => {
        e.preventDefault();
        const data = {
            title: this.title,
            description: this.description,
            price: this.price,
            fkCategoryId: this.fkCategoryId
        }

        //console.log(data.title)
        //console.log(data.description)
        //console.log(data.price)
        //console.log(data.fkCategoryId)

        window.$("#exampleModalCenter").modal("hide");
        fetch('/ads', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                price: data.price,
                fkCategoryId: data.fkCategoryId
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

    handleEditAd = (e, i) => {
        e.preventDefault();
        const data = {
            title: this.title,
            description: this.description,
            price: this.price,
            fkCategoryId: this.fkCategoryId,
            id: this.id
        }

        const { items } = this.state;
        const filteredItems = items.filter(item => item.fkUserId.toString() === localStorage.getItem('id').toString())
        filteredItems[i][e.target.name] = e.target.value;
        this.setState({ filteredItems });

        //console.log(data.title)
        //console.log(data.description)
        //console.log(data.price)
        //console.log(data.fkCategoryId)
        window.$("#exampleModalCenterAdEdit" + data.id).modal("hide");
        fetch('/ads/' + data.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Title: filteredItems[i].title,
                Description: filteredItems[i].description,
                Price: filteredItems[i].price,
                FkCategoryId: filteredItems[i].fkCategoryId
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

    deleteAd(itemId) {
        const { items } = this.state;

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }

        fetch('/ads/' + itemId, options)
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
        fetch('/ads')
            .then(res => res.json())
            .then(json => {
                this.setState({

                    isLoaded: true,
                    items: json

                })
            });
        fetch('/categories')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        itemsCategory: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )

    }

    handleChange = (e, i) => {
        //console.log(i);
        const { items } = this.state;
        const filteredItems = items.filter(item => item.fkUserId.toString() === localStorage.getItem('id').toString())

        filteredItems[i][e.target.name] = e.target.value;
        this.setState({ filteredItems });
        //console.log(filteredItems)

    };

    render() {

        var { isLoaded, items, itemsCategory } = this.state;
        const filteredItems = items.filter(item => item.fkUserId.toString() === localStorage.getItem('id').toString())
        if (!isLoaded) {
            return (
                startAnimation()
            )
        }
        else {
            return (
                <div className="container-fluid dark-grey-text mt-5">
                    <div className="mb-2">
                        <button type="button" className="btn btn-sm btn-success pt-0 pb-0" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-plus-circle"></i> New Ad</button>

                    </div>
                    <div className="row">
                        <div className="container">
                            <form onSubmit={this.handelSubmitAd}>
                                <div className="modal fade bd-example-modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="card product-card h-100 ">
                                                <div className="card-body">
                                                    <div className="input-group mb-3 rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>

                                                        <select id="category" required className="bg-primary custom-select bg-light border-0" name="FkCategoryId" onChange={e => this.fkCategoryId = e.target.value}>
                                                            <option value="" disabled selected>Category</option>
                                                            {itemsCategory.map(itemsCategory => (
                                                                <option key={itemsCategory.id} value={itemsCategory.id}>{itemsCategory.name}</option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                    <div className="input-group mb-3 rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>
                                                        <input required type="text" className="text-center form-control form-control-underlined  bg-transparent" placeholder="Item name" aria-label="itemname" name="Title" aria-describedby="basic-addon1" maxLength="30"
                                                            onChange={e => this.title = e.target.value} />
                                                    </div>
                                                    <div className="input-group mb-3 rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>
                                                        <input required type="text" className="text-center form-control form-control-underlined  bg-transparent" name="Price" placeholder="Price" aria-label="price" pattern="[0-9\.]{1,8}" title="numbers with . only"
                                                            onChange={e => this.price = e.target.value} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">&euro;</span>
                                                        </div>
                                                    </div>

                                                    <div className="input-group mb-3 border rounded">
                                                        <div className="input-group rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text border-0">Description</span>
                                                            </div>
                                                            <textarea required className="form-control border-0" name="Description" aria-label="Description" rows="6" maxLength="255" onChange={e => this.description = e.target.value} ></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-footer border-top-0 ">
                                                    <button type="submit" className="text-white btn btn-primary border-0 pull-left" >Create</button>
                                                    <button type="button" className="close pull-right" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        {filteredItems.map((filteredItem, i) => (

                                            <div key={i} className="col-lg-4 col-md-6 mb-4">
                                                <div className="hover hover-1 text-white border-0 box-shadow rounded-sm">
                                                    <img className="card-img-top picture-shadow" style={{ objectFit: "scale-down" }} src="https://d2pa5gi5n2e1an.cloudfront.net/webp/ph/images/article/11401_TH/summary_snp.jpg" alt="" />

                                                    <div className="hover-overlay"></div>
                                                    <div className="hover-1-content px-5 py-4">
                                                        <Link to={{
                                                            pathname: '/adinfo',
                                                            state: { adid: filteredItem.id }
                                                        }}> <h3 className="hover-1-title font-weight-bold mb-0"><span className="font-weight-light pr-2 pl-2" style={{ backgroundColor: 'white', borderRadius: 10, color: 'black', whiteSpace: "nowrap", overflow: "hidden"}}>{filteredItem.title}</span></h3></Link>
                                                        <h5 className="text-white">{filteredItem.price} &euro;</h5>
                                                        <div className="hover-1-description d-sm-inline-flex flex-sm-row-reverse">
                                                            <button className="btn btn-sm btn-warning m-1 rounded-pill" type="button" data-toggle="modal" data-target={"#exampleModalCenterAdEdit" + filteredItem.id}><i className="fa fa-edit"></i></button>
                                                            <button className="btn btn-sm btn-danger m-1 rounded-pill " type="submit" onClick={() => { window.confirm("Are you sure you want to delete this ad?") && this.deleteAd(filteredItem.id) }}><i className="fa fa-remove"></i></button>
                                                        </div>
                                                    </div>

                                                    <form onSubmit={e => this.handleEditAd(e, i)}>
                                                        <div className="modal fade bd-example-modal" id={"exampleModalCenterAdEdit" + filteredItem.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                            <div className="modal-dialog modal modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="card product-card h-100 ">
                                                                        <div className="card-body">
                                                                            <div className="input-group mb-3 rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>

                                                                                <select required className="bg-primary custom-select bg-light border-0" name="fkCategoryId" value={filteredItem.fkCategoryId} onChange={e => this.handleChange(e, i)}>
                                                                                    <option value="" disabled selected>Category</option>
                                                                                    {itemsCategory.map(itemsCategory => (
                                                                                        <option key={itemsCategory.id} name="fkCategoryId" value={itemsCategory.id}>{itemsCategory.name}</option>

                                                                                    ))}
                                                                                </select>

                                                                            </div>
                                                                            <div className="input-group mb-3 rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>
                                                                                <input required type="text" className="text-center form-control bg-transparent" placeholder="Item name" value={filteredItem.title}
                                                                                    aria-label="itemname" name="title" aria-describedby="basic-addon1" maxLength="30"
                                                                                    onChange={e => this.handleChange(e, i)} />
                                                                            </div>

                                                                            <div className="input-group mb-3 rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>
                                                                                <input required type="text" className="text-center form-control bg-transparent" name="price" placeholder="Price" value={filteredItem.price} pattern="[0-9\.]{1,8}" title="numbers with . only"
                                                                                    onChange={e => this.handleChange(e, i)} />

                                                                                <div className="input-group-append">
                                                                                    <span className="input-group-text">&euro;</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="input-group mb-3 border rounded">
                                                                                <div className="input-group rounded" style={{ boxShadow: "0 0.2 + rem 1 + rem 0 rgba(0, 0, 0, 0.1)" }}>
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text border-0">Description</span>
                                                                                    </div>
                                                                                    <textarea required className="form-control border-0" name="description" rows="6" maxLength="255" value={filteredItem.description}
                                                                                        onChange={e => this.handleChange(e, i)}></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="card-footer border-top-0 ">
                                                                            <button type="submit" className="text-white btn btn-primary border-0 pull-left" onClick={() => { this.id = filteredItem.id }} >Confirm</button>
                                                                            <button type="button" className="close pull-right" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        }
    }
}