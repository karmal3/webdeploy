import React, { Component } from 'react';
import './css/CustomStyle.css';
import { startAnimation } from './LoadingAnimation.js';


export class AdInfo extends Component {
    static displayName = AdInfo.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsCom: [],
            isLoaded: false,
            isCommentsLoaded: false,
        };
    }

    handelSubmit = e => {
        e.preventDefault();
        const data = {
            text: this.text,
            fkAdId: this.fkAdId
        }
        window.$("#exampleModalCenterComment").modal("hide");
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Text: data.text,
                fkAdId: data.fkAdId
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

    handleEdit = e => {
        e.preventDefault();
        const data = {
            text: this.text,
            id: this.id
        }
        window.$("#exampleModalCenterCommentEdit" + data.id).modal("hide");
        fetch('/comments/' + data.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Text: data.text
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

    deleteComment(itemId) {
        const { itemsCom } = this.state;

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }

        fetch('/comments/' + itemId, options)
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        itemsCom: itemsCom.filter(itemCom => itemCom.id !== itemId),
                        response: result,

                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    componentDidMount() {

        //console.log(this.props.location.state.adid);
        fetch('/ads/' + this.props.location.state.adid)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
        fetch('/ads/' + this.props.location.state.adid + '/comments')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isCommentsLoaded: true,
                    itemsCom: json,
                })
            });
    }

    render() {

        var { isLoaded, items, itemsCom } = this.state;

        if (!isLoaded) {
            return (
                startAnimation()
            )
        }
        else {
            return (
                <div>
                    <form onSubmit={this.handelSubmit}>
                        <div className="modal fade bd-example-modal" id="exampleModalCenterComment" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal modal-dialog-centered" role="document">
                                <div className="modal-content border-0">
                                    <div className="form-group basic-textarea border-0">
                                        <textarea required className="form-control bg-transparent border-0" defaultValue={this.props.children} id="exampleFormControlTextarea" name="text" rows="10" placeholder="Type your message here..." maxLength="255" onChange={e => this.text = e.target.value}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-sm rounded border-0" onClick={() => { this.fkAdId = items.id }}>Send</button>

                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="container-fluid dark-grey-text mt-5">
                        <div className="row">

                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-3">
                                                <div className="card product-card border-0 box-shadow">
                                                    <div className="card-body p-0">
                                                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                                            <div className="carousel-inner">

                                                                <div className="carousel-item active">
                                                                    <img className="card-img-bottom picture-shadow" style={{ height: '350px' }} src="https://d2pa5gi5n2e1an.cloudfront.net/webp/ph/images/article/11401_TH/summary_snp.jpg" alt="" />
                                                                </div>


                                                                <div className="carousel-item">
                                                                    <img className="card-img-bottom picture-shadow" style={{ height: '350px' }} src="https://ahvalnews6.com/wp-content/uploads/2020/05/Some-Latest-Mobile-Phones.jpg" alt="" />
                                                                </div>

                                                            </div>
                                                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                <span className="sr-only btn btn-secondary">Previous</span>
                                                            </a>
                                                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                <span className="sr-only">Next</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-3">
                                                <div className="card product-card border-0 box-shadow">
                                                    <div className="card-body">
                                                        <div className="mb-2">
                                                            <span className="badge badge-primary mr-1 badge-pill">{items.fkCategory.name}</span>

                                                        </div>
                                                        <h3 className="card-title">{items.title}</h3>
                                                        <h4>{items.price} &euro;</h4>
                                                        <p className="card-text">{items.description}</p>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card card-outline-secondary my-4 border-0 box-shadow picture-shadow">
                            <div className="card-header border-bottom-0 pb-1 d-flex ">

                                <div className=" align-items-center pr-2">
                                    <h5>Product Reviews</h5>
                                </div>
                                <div className="justify-content-end align-items-center">
                                    {(() => {
                                        if (localStorage.getItem('token')) {
                                            return (
                                                <button className="btn btn-success btn-sm border-0 pb-1 rounded-pill " type="button" data-toggle="modal" data-target="#exampleModalCenterComment">Leave a Review </button>
                                            )
                                        }
                                    })()}
                                </div>
                            </div>

                            {itemsCom.map(itemsCom => (


                                <div key={itemsCom.id} className="card-body" style={{ boxShadow: '0 2px 1px -1px #F2F4F4' }}>
                                    <form onSubmit={this.handleEdit}>
                                        <div className="modal fade bd-example-modal" id={"exampleModalCenterCommentEdit" + itemsCom.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal modal-dialog-centered" role="document">
                                                <div className="modal-content border-0">
                                                    <div className="form-group basic-textarea border-0">
                                                        <textarea required className="form-control bg-transparent border-0" defaultValue={itemsCom.text} id="exampleFormControlTextarea" name="text" rows="10" placeholder="Type your message here..." maxLength="255" onChange={e => this.text = e.target.value}></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-sm rounded border-0" onClick={() => { this.id = itemsCom.id }}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="m-0"> {itemsCom.text}</p>
                                    <small className="text-muted">Posted by {itemsCom.fkUser.username} on  {itemsCom.date}</small>

                                    {(() => {
                                        if (localStorage.getItem('id') === itemsCom.fkUser.id.toString()) {
                                            return (
                                                <div className="d-sm-inline-flex flex-sm-row-reverse">
                                                    <button className="btn btn-sm btn-warning m-1 rounded-pill" type="button" data-toggle="modal" data-target={"#exampleModalCenterCommentEdit" + itemsCom.id}><i className="fa fa-edit"></i></button>
                                                    <button className="btn btn-sm btn-danger m-1 rounded-pill " type="submit" onClick={() => { window.confirm("Are you sure you want to delete this comment?") && this.deleteComment(itemsCom.id) }}><i className="fa fa-remove"></i></button>
                                                </div>
                                            )
                                        }
                                    })()}



                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
}