import React, {Component} from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



import axios from "axios"

import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST,ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import ProductsCards from "./ProductsCards";


export default class DisplayAllProducts extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            products:[]
        }
    }


    componentDidMount() {
        // needed for sessions to work
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Records read")
                        this.setState({products: res.data})
                    }
                } else {
                    console.log("Record not found")
                }
            })

    //     if(!this.state.products.length >0){
    //         axios.post(`${SERVER_HOST}/resetDB`)
    //             .then(res =>
    //             {
    //                 if(res.data)
    //                 {
    //                     if (res.data.errorMessage)
    //                     {
    //                         console.log(res.data.errorMessage)
    //                     }
    //                     else
    //                     {
    //                         console.log("Records read")
    //                         this.setState({products: res.data})
    //                     }
    //                 }
    //                 else
    //                 {
    //                     console.log("something wrong at the server side")
    //                 }
    //             })
    //     }
    }


    render()
    {
        console.log(localStorage);

        return (
            <div>
                <head>
                </head>
            <body>
            <div id="ab">
            <h2> </h2>
                <div id="cd">
             <h1>KORs</h1>
            <h3>Women</h3>
            <h3>Men</h3>
            <h3>Kids</h3>
            <input type="search" placeholder="Search"/>
            {/* <FontAwesomeIcon icon={faCoffee} /> */}
            <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="form-container">
                {localStorage.accessLevel >  ACCESS_LEVEL_GUEST ?
                    <div className="logout">
                        <Logout/>
                    </div>
                    :
                    <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/></div>
                }

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="add-new-car">
                        <Link className="blue-button" to={"/AddProduct"}>Add New Car</Link>
                    </div>
                    :
                    null
                }

                <div className="table-container">
                    <ProductsCards product={this.state.products} />


                </div>
            </div>
            </div>
            </body>
            </div>
        )
    }
}