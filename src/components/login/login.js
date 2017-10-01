import React, { Component } from 'react';
import './login.css';
import {BASE_API_URL} from '../lib/api';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '', 
            message:'',
        }
    }


loginCheck = () =>{
    if(this.state.email === '' || this.state.password === ''){
        this.setState({message : 'email dan password harus di isi'})
    
    }else if(this.state.email !== '' && this.state.password !== ''){
        const params ={
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post (BASE_API_URL + '/Users/login',params)
            .then(res=>{
                console.log(res)
                if(res.status === 200){
                    this.setState({ message:'login success!!' })
                }else if(res.status === 401)
                this.setState({ message: 'email dan password anda salah' })
            })
            .catch(err=>{
                console.log(err)
                this.setState({ message: 'email dan password anda salah' })
            })

    } 
}

   render(){
       return(
            <div className="card login">
                <div className="card-block">
                    <h4> Please Login </h4>
                    <br/>
                    <p>{this.state.message}</p>
                    <input 
                        type="email" 
                        className="email" 
                        placeholder="E-mail"
                        onChange= {(event) =>this.setState({ email: event.target.value })} />
                    <br/>
                    <input 
                        type="password" 
                        className="password" 
                        placeholder="Password" 
                        onChange= {(event) =>this.setState({ password: event.target.value })}/>
                    <br/><br/>
                    <button  className="btn btn-primary" onClick={this.loginCheck}> Login </button>    
                </div>
            </div>
       );
   }
}


export default Login;