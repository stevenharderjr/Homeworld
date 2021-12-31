import React from 'react';
import ReactDOM from 'react-dom';
import Homeworld from './app/Homeworld.jsx';
import axios from 'axios';
import './styles/style.css';

let AppContainer = document.createElement('div');
AppContainer.setAttribute('id', 'Homeworld');
document.body.appendChild(AppContainer);

// function getHouseholdData(cb) {
//   axios.get('/household?name=harder')
//     .then(({ data }) => {
//       console.log(data);
//       // this.household = new MemberCollection(res.data);
//       // console.log('Data recieved');
//       // this.setState({
//       //   household: household,
//       //   nav: <Dashboard members={members} onClick={(name) => this.memberDashboard(name)}/>
//       // });
//       cb(data);
//     })
//     .catch(err => {
//       console.log('Could not fetch member data', err);
//     });
// }

// getHouseholdData(household => {
ReactDOM.render(<Homeworld />, document.getElementById('Homeworld'));
// });
