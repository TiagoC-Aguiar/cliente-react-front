import React, {Component} from 'react';

import {ErrorMessage, Field, Formik, Form} from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import {history} from './history';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Input, Col, FormGroup, Label, Card, Row, Button} from 'reactstrap';
import './login.css';

const Login = () => {
  // class Login extends React.Component {
    
  // logar() {
    //   axios.post('/api/login').then(response => {
    //     // let {clientes} = this.state;
    //     // clientes.push(response.data);
    
    //     // this.setState({clientes, novoClienteModal: false, novoClienteData: {
    //     //   id: '',
    //     //   nome: '',
    //     //   cpf: '',
    //     // },});
    //     console.log('teste login')
    //   })
    // }

  const handleSubmit = values => {
    axios.post('/api/login', values).then(
      resp => {
        const {data} = resp
        if(data) {
          console.log(data)          
          localStorage.setItem('app-token', data)
          history.push("/")
        }
      }
    )
  }

  // const erroLogin = () => {
  //   <div class="alert alert-danger" role="alert">
  //     login ou senhas inválidos
  //   </div>
  // }
  
  const validations = yup.object().shape({
    login: yup.string().required(),
    senha: yup.string().min(4).required()
  })

  // render() {

    return (
      <div className="container">            
        <Row style={{justifyContent: 'center'}}>
          <Col sm="9">
        <Card style={{margin: 'auto', padding: '60px', position: 'relative', display: 'flex', boxShadow: '1px 2px 4px rgba(0,0,0,.25)'}}>
          <h2>Login</h2>
          <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >

          <Form className="form">
            <FormGroup row>              
              <Label>Username</Label>                     
              <Field name="login" className="form-control" />
              <ErrorMessage component="span" name="login" className="alert alert-danger" />
            </FormGroup>
            <FormGroup row>
              <Label for="senha">Password</Label>
                <Field name="senha" className="form-control" />
                <ErrorMessage component="span" name="senha" className="alert alert-danger" />
            </FormGroup>
            {/* <Button color="primary" type="submit" size="lg">Entrar</Button> */}
            <button type="submit" className="btn btn-primary btn-lg">Entrar</button>
          </Form>
        </Formik>
        </Card>
        </Col>
        </Row>
        </div>
    )
  }
// }

export default Login;
