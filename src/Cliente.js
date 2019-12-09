import React, {Component} from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
// import SelectList from './components/SelectList';
// import './script.js';
// import  from './components/Cep';

import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label, FormGroup, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './App.css';

// const [dropdownOpen, setDropdownOpen] = useState(false);
// const toggleDrop = () => setDropdownOpen(prevState => !prevState);

class Cliente extends React.Component {

  state = {
    clientes: [],
    endereco: [],
    novoClienteData: {
      nome: '',
      cpf: '',  
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',    
    },
    novoEnderecoData: {
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',
      cliente: [],
    },
    novoEmailData: {
      email: '',
    },
    novoTelefoneData: {
      telefone1: '',
      telefone2: '',
      telefone3: '',

    },
    editClienteData: {
      id: '',
      nome: '',
      cpf: '',
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',
    },
    editEnderecoData: {
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',
      cliente: '',
    },
    novoClienteModal: false,
    editClienteModal: false,
    mascaraCelular: true,
  }

  componentDidMount() {
    this._refreshClientes()
  };

  toggleNewClienteModal() {
    this.setState({
      novoClienteModal: ! this.state.novoClienteModal
    })
  }

  toggleEditClienteModal() {
    this.setState({
      editClienteModal: ! this.state.editClienteModal
    })
  }

  addCliente() {
    // this.removeCarecterCep(this.state.clientes.cep)
    // this.setState({clientes: {
    //   cep: this.state.clientes.cep.replace(/\D/g, '')
    // }})

    // let {novoTelefoneData} = this.state;
    //               novoTelefoneData.telefone2 = e.target.value;
    let {novoClienteData} = this.state;
    novoClienteData.cep = this.removeCarecterCep()
    novoClienteData.cpf = this.removeCarecterCpf()

    this.setState({novoClienteData})

  axios.post('/clientes', this.state.novoClienteData).then(response => {
    let {clientes} = this.state;
    // let {} = this.state;
    
    clientes.push(response.data);
    // this.setState({endereco: response.data})

    console.log('Dados do cliente: ', response.data)
    
    this.setState({clientes, novoClienteModal: false, novoClienteData: {
      id: '',
      nome: '',
      cpf: '',
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',
    },});
  })  
  

  
  //   let {endereco} = this.state
  //   endereco.cep = cep
  //   this.setState({endereco})
  //   console.log('cep final: ', this.state.endereco.cep)
  
  //   axios.post('/enderecos', this.state.novoEnderecoData).then(response => {
    //     let {endereco} = this.state;
    
    //     endereco.push(response.data);
    //     this.setState({endereco, novoClienteModal: false, novoEnderecoData: {
      //       cep: '',
      //       uf: '',
      //       cidade: '',
      //       bairro: '',
      //       logradouro: '',
      //       complemento: '',
      //       cliente: '',
      //     },})
      //   })
      //   console.log('Endereco: ', this.state.novoEnderecoData) 
      //   console.log('email: ', this.state.novoEmailData.email) 
      //   console.log('telefone: ', this.state.novoTelefoneData.telefone) 
    }
    
    removeCarecterCep() {
      // var cep = valor.replace(/\D/g, '');
      // this.setState({clientes: {cep: cep}})

      // return cep
      let valCep1 = this.state.novoClienteData.cep
      let cep = ''
      let cont = 0
  
      console.log('valCep1: ', this.state.novoClienteData.cep)

      while(valCep1.length > cont) {
        let cond = valCep1.slice(cont, cont + 1)
        if(cond >= 0 || cond <= 9) {
          cep += valCep1.slice(cont, cont + 1)
        }
        cont++
      }   
      
      return cep
    }

    removeCarecterCpf() {
      
      let valCpf1 = this.state.novoClienteData.cpf
      let cpf = ''
      let cont = 0
  
      console.log('valCpf1: ', this.state.novoClienteData.cpf)

      while(valCpf1.length > cont) {
        let cond = valCpf1.slice(cont, cont + 1)
        if(cond >= 0 || cond <= 9) {
          cpf += valCpf1.slice(cont, cont + 1)
        }
        cont++
      }   
      
      return cpf
    }

    updateCliente(id) {    
      // console.log('updateCliente(id): ', id);
      let {nome, cpf,cep,uf,cidade,bairro,logradouro,complemento} = this.state.editClienteData;        
      axios.put('/clientes/' + id, {
        id, nome, cpf,cep,uf,cidade,bairro,logradouro,complemento
      }).then((response) => {     
        this._refreshClientes();
        this.setState({
          editClienteModal: false, editClienteData: {id: '', nome: '', cpf: '',cep: '',uf: '',cidade: '',bairro: '',logradouro: '',complemento: ''}
        })
        
      })
    }

  editCliente(id,nome,cpf,cep,uf,cidade,bairro,logradouro,complemento) {
    this.setState({
      editClienteData: {id,nome,cpf,cep,uf,cidade,bairro,logradouro,complemento}, editClienteModal: ! this.state.editClienteModal
    })    
    console.log('editCliente(nome): ', this.state.editClienteData.nome)
  }

  _refreshClientes() {
    axios.get('/clientes').then(response => {
      this.setState({
        clientes: response.data
      })
    })
  }

  deleteCliente(id) {
    axios.delete('/clientes/' + id).then(response => {
      this._refreshClientes();
    })
  }

  // Select List 

  toggleSelectList() {
    this.setState({
      selectList: !this.state.selectList
    })
  }
 
// CEP

  // pesquiarCep() {
  //   Cep.pesquiarCep(this.state.editEnderecoData)
  // }

  limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    // document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    // document.getElementById('ibge').value=("");
  }

meu_callback(conteudo) {
// if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    // document.getElementById('rua').value=(conteudo.logradouro);

    if(!conteudo.erro) {
      document.getElementById('bairro').value=(conteudo.bairro);
      document.getElementById('cidade').value=(conteudo.localidade);
      document.getElementById('uf').value=(conteudo.uf);
      document.getElementById('logradouro').value=(conteudo.logradouro);
    } else {
      this.limpa_formulario_cep();
      alert("CEP não encontrado.");
      document.getElementById('cep').value="";
    }
    // document.getElementById('ibge').value=(conteudo.ibge);
    // } //end if.
    // else {
      //     //CEP não Encontrado.
      //     this.limpa_formulario_cep();
      // alert("CEP não encontrado.");
// }
}

pesquisacep() {
let valor = this.state.novoClienteData.cep;
//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

// var cep = this.removeCarecterCep(valor)

//Verifica se campo cep possui valor informado.
if (cep != "") {

    // if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        // document.getElementById('rua').value="...";
        // document.getElementById('ibge').value="...";
        // document.getElementById('bairro').value="...";
        // document.getElementById('cidade').value="...";
        // document.getElementById('uf').value="...";
        
        //Cria um elemento javascript.
        var script = document.createElement('script');
        
        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json'  // /?callback=meu_callback';
        
        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);        
        
        axios.get(script.src).then(response => {
          // console.log(response.data)
          this.setState({
            clintes: response.data  
          })
          // document.getElementById('bairro').value=this.state.endereco.bairro;
          // document.getElementById('cidade').value="...";
          // document.getElementById('uf').value="...";          
          this.meu_callback(response.data)
        })

    // } //end if.
 
} //end if.
else {
    //cep sem valor, limpa formulário.
    this.limpa_formulario_cep();
}
};


  render() {
    let clientes = this.state.clientes.map(cliente => {
      return(
        <tr key={cliente.id}>
          <td>{cliente.id}</td>
          <td>{cliente.nome}</td>
          <td>{cliente.cpf}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editCliente.bind(this, cliente.id, cliente.nome, cliente.cpf)}>Editar</Button>
            <Button color="danger" size="sm" onClick={this.deleteCliente.bind(this, cliente.id)}>Excluir</Button>
          </td>
        </tr>
        
      )
    });   

    return (
      <div className="App container">  
        <h1>Cadastro de Clientes</h1>  
        <Button className="my-3" color="primary" onClick={this.toggleNewClienteModal.bind(this)}>Adicionar Cliente</Button>{' '}
        
        {/* Cadastro cliente */}

        <Modal isOpen={this.state.novoClienteModal} toggle={this.toggleNewClienteModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewClienteModal.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
            <FormGroup>              
              <Label for="Nome">Nome: </Label>
              <Input placeholder="Nome do cliente" id="nome" name="nome" value={this.state.novoClienteData.nome} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.nome = e.target.value;
                this.setState({novoClienteData});
              }} />
            </FormGroup>
            <FormGroup>              
              <Label for="email">E-mail: </Label>
              <Input placeholder="E-mail" id="email" name="email" value={this.state.novoEmailData.email} onChange={(e) => {
                let {novoEmailData} = this.state;
                novoEmailData.email = e.target.value;
                this.setState({novoEmailData});
              }} />
            </FormGroup>
            <Row>
              <Col md={6}>
            <FormGroup>              
              <Label for="cpf">CPF: </Label>
              <MaskedInput placeholder="CPF do cliente" className="form-control" id="cpf" name="cpf" value={this.state.novoClienteData.cpf} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.cpf = e.target.value;
                this.setState({novoClienteData});
              }} 
              mask={[/[0-9]/, /\d/,/\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/,/\d/, '-', /\d/, /\d/]} guide={false}
              />
              </FormGroup>
              </Col>
              <Col md={6}>
                    <FormGroup>              
              <Label for="cep">CEP: </Label>
              {/* <Input placeholder="CEP" id="cep" name="cep" value={this.state.novoEnderecoData.cep} onChange={(e) => {
                let {novoEnderecoData} = this.state;
                novoEnderecoData.cep = e.target.value;
                this.setState({novoEnderecoData});
              }} /> */}
              
              <MaskedInput placeholder="CEP" className="form-control" id="cep" name="cep" value={this.state.novoClienteData.cep} onBlur={this.pesquisacep.bind(this)} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.cep = e.target.value;
                this.setState({novoClienteData});
              }} 
              mask={[/[1-9]/, /\d/,'.', /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/]} guide={true} showMask={true}
              />
              
              </FormGroup>
            </Col>
          </Row>
            <Row>
              <Col md={6}>
            <FormGroup>              
              <Label for="cidade">Cidade: </Label>
              <Input placeholder="Cidade" id="cidade" name="cidade" value={this.state.novoClienteData.cidade} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.cidade = e.target.value;
                this.setState({novoClienteData});
              }} />
              </FormGroup>
              </Col>
              <Col md={6}>
                    <FormGroup>              
              <Label for="uf">UF: </Label>
              <Input placeholder="UF" id="uf" name="uf" value={this.state.novoClienteData.uf} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.uf = e.target.value;
                this.setState({novoClienteData});                
              }} />
              </FormGroup>
            </Col>
          </Row>
            <Row>
              <Col md={6}>
            <FormGroup>              
              <Label for="bairro">Bairro: </Label>
              {/* <Input placeholder="bairro" id="bairro" name="bairro" value={this.state.novoEnderecoData.bairro} onChange={(e) => {
                let {novoEnderecoData} = this.state;
                novoEnderecoData.bairro = e.target.value;
                this.setState({novoEnderecoData});
              }} /> */}
              <input type="text" id="bairro" name="bairro" className="form-control" />
              </FormGroup>
              </Col>
              <Col md={6}>
                    <FormGroup>              
              <Label for="logradouro">Logradouro: </Label>
              <Input placeholder="Logradouro" id="logradouro" name="logradouro" value={(this.state.clientes.logradouro) ? this.state.clientes.logradouro : this.state.novoClienteData.logradouro} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.logradouro = e.target.value;
                this.setState({novoClienteData});
              }} />
              </FormGroup>              
            </Col>
          </Row>
          <FormGroup>
          <Label for="complemento">Complemento: </Label>
              <Input placeholder="Complemento" id="complemento" name="complemento" value={this.state.novoClienteData.complemento} onChange={(e) => {
                let {novoClienteData} = this.state;
                novoClienteData.complemento = e.target.value;
                this.setState({novoClienteData});
                console.log(this.state.clientes)
              }} />
              {/* <input type="text" name="complemento" id="complemento" className="form-control" /> */}
          </FormGroup>         
            <Row>
                <Col md={4}>                
                <label>
                Celular: <input type="radio" name="tipo_telefone" value="CELULAR" /></label>
                <label>
                Residencial: <input type="radio" name="tipo_telefone" value="RESIDENCIAL" /></label>
                <label>
                Comercial: <input type="radio" name="tipo_telefone" value="COMERCIAL" /></label>
                </Col>
              <Col md={8}>
              <MaskedInput name="telefone2" className="form-control telefone"
                mask={['(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} guide={true} showMask={true}
                value={this.state.novoTelefoneData.telefone2} onChange={(e) => {
                  let {novoTelefoneData} = this.state;
                  novoTelefoneData.telefone2 = e.target.value;
                  this.setState({novoTelefoneData});                  
                }} />
                </Col>
                </Row>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.toggleNewClienteModal.bind(this)}>Cancel</Button>
            <Button color="primary" onClick={this.addCliente.bind(this)}>Salvar</Button>{' '}
          </ModalFooter>
        </Modal>  

        {/* Modal editar Cliente */}

        <Modal isOpen={this.state.editClienteModal} toggle={this.toggleEditClienteModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditClienteModal.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
            <FormGroup>                            
              <Label for="Nome">Nome: </Label>
              <Input placeholder="Nome do cliente" id="nome" name="nome" value={this.state.editClienteData.nome} onChange={(e) => {
                let {editClienteData} = this.state;
                editClienteData.nome = e.target.value;
                this.setState({editClienteData});
              }} />
            </FormGroup>
            <FormGroup>              
              <Label for="cpf">CPF: </Label>
              <Input placeholder="CPF do cliente" id="cpf" name="cpf" value={this.state.editClienteData.cpf} onChange={(e) => {
                let {editClienteData} = this.state;
                editClienteData.cpf = e.target.value;
                this.setState({editClienteData});
              }} /> 
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEditClienteModal.bind(this)}>Cancel</Button>{' '}
            <Button color="primary" onClick={this.updateCliente.bind(this, this.state.editClienteData.id)}>Salvar</Button>{' '}
          </ModalFooter>
        </Modal>  

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientes}
          </tbody>
        </Table>        
      </div>
    );
  }
}

export default Cliente;
