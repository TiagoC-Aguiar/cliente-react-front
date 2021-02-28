// import React, { useState } from 'react';
// import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
// import Cliente from '../Cliente';

// const SelectList = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const toggle = () => setDropdownOpen(prevState => !prevState);
  
//   function mascara() {    
//     if(Cliente.state.mascaraCelular) {
//       return ['(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
//     } else{
//     return ['(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
//     }
//   }
    
//   return (
//     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret>
//         Tipo Telefone
//         </DropdownToggle>
//       <DropdownMenu>        
//         <DropdownItem onClick={Cliente.setState({mascaraCelular: true}), console.log(Cliente.state.mascaraCelular)}>Celular</DropdownItem>        
//         <DropdownItem onClick={Cliente.setState({mascaraCelular: false}), console.log(Cliente.state.mascaraCelular)}>Residencial</DropdownItem>
//         <DropdownItem onClick={Cliente.setState({mascaraCelular: false}), console.log(Cliente.state.mascaraCelular)}>Comercial</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );

// }

// export default SelectList;
