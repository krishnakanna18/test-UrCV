import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {serverEndPoint} from '../config'
import '../css/login.css'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from "react-router-dom";
class LogIn extends Component {


    async signin(logOrReg){

        let res,state,status,loginUser,redirect
        document.getElementById("loginErrMsg").innerText=''
        if(logOrReg===0){
            let username=document.getElementById("login_username").value
            let password=document.getElementById("login_password").value
            res=await fetch(`${serverEndPoint}/user/login`,{
                method:"post",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username,
                    password

                })
            })
        }

        else{

            let name=document.getElementById("reg_name").value
            let username=document.getElementById("reg_username").value
            let password=document.getElementById("reg_password").value
            res=await fetch(`${serverEndPoint}/user/signup`,{
                method:"post",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username,
                    password,
                    name
                })
            })

        }
        status=res.status
        res=await res.json()

        loginUser=this.props.loginUser
        try{
            state=JSON.parse(this.props.location.state)
        }
        catch(e){
            state={redirect:'/'}
        }
        redirect=state.redirect
        // console.log(this.props.location,"Location")
        if(status===200 || status===202){
            loginUser(res.user,res.loggedin)
                this.props.history.push({
                    pathname:redirect
                })
            }
        
        else if(logOrReg===0)
            document.getElementById("loginErrMsg").innerText=res.log_data

        else
            document.getElementById("regErrMsg").innerText=res.log_data
        

    }
    


    // componentWillUnmount(){
    //     console.log("Unmounted Login")
    // }
    

    render(){
        return(
            <div style={{overflowY:"hidden"}}>
                <div style={{backgroundColor:"#4a154b  "}}>
                    <nav className="container-lg transparent navbar navbar-dark navbar-expand-lg" id="navTopBg" >
                        
                        <Link className="navbar-brand bold " to='/' >
                            <span id="logoMenuPg" style={{color:'white', fontSize:"30px",fontFamily: 'ANNIHILATOR', fontWeight:"bolder"}}>UrCV</span>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" style={{color:'white'}}></span>
                        </button>

                        <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto align-items-center">
                                <li className="nav-item mr-3 ml-3 activeItem" >
                                    <Link to='/' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>Home</span></Link>
                                </li>
                                <li className="nav-item mr-3 ml-3" >
                                    <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>Design</span></Link>
                                </li>

                            </ul>

                        </div>

                    </nav>
                </div>
               
                <div className="loginPageTopBar">


                    <div className="loginPageCentreComponent">
                        
                        <div className="d-flex flex-row">

                            {/* Login */}
                            <div className="col-6 loginInnerComp p-5" style={{borderRight:"1px solid #4a154b"}}> 

                                <div className="d-flex flex-column align-items-center mt-5 mb-5">

                                    <h5 className="col" style={{textAlign:"center"}}>Sign in</h5>

                                    <div className="cont col">
                                        <input className="mt-5 loginInp" placeholder="  Username" id="login_username"></input>
                                    </div>

                                    <div className="cont col">
                                        <input className="mt-3 loginInp" type="password" placeholder="  Password" id="login_password"></input>
                                    </div>

                                    <p className="col" id="loginErrMsg" style={{color:"red"}}></p>

                                    <button className="btn lbtn mt-4" onClick={async()=>{await this.signin(0)}}>
                                            Login
                                    </button>

                                </div>
                            
                            </div>

                            {/* Register */}
                            <div className="col-6 loginInnerComp p-5" style={{borderLeft:"1px solid #4a154b"}}>

                                <div className="d-flex flex-column align-items-center mt-5 mb-5 ml-2 mr-2">

                                    <h5 className="col" style={{textAlign:"center"}}>Register</h5>

                                    <div className="cont col">
                                        <input className="mt-5 loginInp" placeholder="  Name" id="reg_name"></input>
                                    </div>

                                    <div className="cont col">
                                        <input className="mt-3 loginInp" placeholder="  Username" id="reg_username"></input>
                                    </div>

                                    <div className="cont col">
                                        <input className="mt-3 loginInp" type="password" placeholder="  Password" id="reg_password"></input>
                                    </div>

                                    <p className="col" id="regErrMsg" style={{color:"red"}}></p>

                                    <button className="btn lbtn mt-4" onClick={async()=>{await this.signin(1)}}>
                                            Register
                                    </button>

                                </div>

                            </div>

                            </div>

                        </div>

                </div>
            </div>
            

            // <div>
            //     <button className="btn btn-drak"
            //     onClick={async()=>await this.signin()}
            //     >
            //         Sign in
            //     </button>
            // </div>
        )
    }
}
 
export default withRouter(LogIn);