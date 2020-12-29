import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

	render() {
		return (		
			 <header>
				<Navbar className="navbar navbar-expand-sm navbar-toggleable-sm ng-white border-0 box-shadow mb-3 fixed-top rounded-0" style={{ backgroundColor: 'black' }} dark>
					<Container>
						<NavbarBrand tag={Link} to="/ads">
							<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20.000000pt" height="20.000000pt" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet">
								<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#C70039" stroke="none">
									<path d="M2185 4844 c-991 -134 -1782 -866 -1999 -1849 -62 -282 -62 -708 0 -990 203 -918 901 -1616 1819 -1819 282 -62 708 -62 990 0 716 158 1310 622
										  1625 1269 110 224 174 421 216 665 22 127 30 503 15 641 -124 1087 -963 1942 -2044 2084 -146 19 -481 19 -622 -1z m431 -724 c153 -13 281 -39 417 -87 462
										  -160 840 -538 1000 -1000 121 -348 121 -718 0 -1066 -160 -461 -539 -840 -1000 -1000 -347 -121 -719 -121 -1066 0 -461 160 -840 539 -1000 1000 -206
										  591 -58 1233 387 1679 300 299 655 453 1112 483 12 0 79 -4 150 -9z"/>
									<path d="M2204 3442 c-117 -42 -198 -94 -295 -192 -194 -197 -343 -492 -395 -785 -26 -145 -26 -482 0 -580 32 -123 81 -212 160 -291 81 -81 158 -123 280
										  -154 100 -25 300 -27 414 -4 251 51 540 200 822 424 235 186 582 572 650 721 40 88 18 139 -59 139 -68 0 -119 -36 -300 -213 -296 -287 -489 -438 -697 -543
										  -215 -109 -408 -160 -575 -152 -76 4 -104 9 -145 31 -60 30 -116 91 -131 142 l-11 35 179 136 c458 348 659 611 659 864 0 205 -77 352 -219 422 -37 19 -66
										  24 -151 26 -94 2 -113 0 -186 -26z m166 -347 c7 -8 15 -44 17 -79 8 -88 -22 -181 -85 -271 -57 -81 -202 -223 -318 -312 l-81 -62 14 77 c54 292 210 564
										  367 642 49 24 69 25 86 5z"/>
								</g>
							</svg>
							Shop</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />	   
				    {(() => {
					if (localStorage.getItem('token')) {
						return (					
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
								<ul className="navbar-nav flex-grow">
									
									<NavItem className=" d-flex align-items-center pr-2">
										<NavLink tag={Link} className="text-white btn btn-sm btn-success pt-0 pb-0" to="/ads">Ads</NavLink>
									</NavItem>
								
								<li className=" dropdown">
										<NavLink className="nav-link dropdown-toggle btn btn-sm btn-warning pt-0 pb-0" style={{ color: '#000000' }} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<i className="fa fa-user" aria-hidden="true"></i> {localStorage.getItem('Username')}
										</NavLink>
									<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
										<a className="dropdown-item" href="/myads">My ads</a>
										{(() => {
											if (localStorage.getItem('role') === "1") {
												return (
													<a className="dropdown-item" href="/dashboard">Dashboard</a>
												)
											}
										})()}
										<li role="separator" className="divider"></li>
										<a className="dropdown-item" href="/ads" onClick={() => localStorage.clear()}>Logout</a>
									</ul>
									</li>

							</ul>
						</Collapse>			
						)
					} else {
						return (			   
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
							<ul className="navbar-nav flex-grow">
									<NavItem className=" d-flex align-items-center">
										<NavLink tag={Link} className="text-white btn btn-sm btn-success pt-0 pb-0" to="/ads">Ads</NavLink>
									</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-white" to="/login">Login</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-white" to="/register">Sign up</NavLink>
								</NavItem>
							</ul>
						</Collapse>					
						)
					}
					})()}
					</Container>
				</Navbar>
			</header>	
		);
	}
}
