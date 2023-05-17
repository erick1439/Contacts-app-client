import React, { useEffect, useState, Fragment } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar.js';
import { useNavigate } from 'react-router-dom'; 
import { decodeToken } from 'react-jwt';
import ReadOnlyRows from '../ReadOnlyRows/ReadOnlyRows.js';
import EditRows from '../EditRows/EditRows.js';
import './Dashboard.css';

// Dashboard component
const Dashboard = () => {

  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const addNewContact = (newContact) => {
    setContacts((prevState) => [...prevState, newContact])
  }

  const deleteContact = (contact) => {
    setContacts(contacts.filter((value) => value !== contact))
  }

  const makeRowEditable = (index) => {
    setRowToEdit(index);
  }

  const updateRow = (id, fullName, city, email, phoneNumber) => {

    const copy = [...contacts];

    for (let i = 0; i < copy.length; i++) 
      if (copy[i].id === id) {
        copy[i].fullName = fullName;
        copy[i].city = city;
        copy[i].email = email;
        copy[i].phoneNumber = phoneNumber;
      }

      setContacts(copy)
  }

  const populateScreen = async () => {

    const response = await fetch('https://u09rohief7.execute-api.us-east-1.amazonaws.com/dev/getProfile', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });

    const data = await response.json();

    setFirstName(data.firstName);
    setLastName(data.lastName);
    setContacts(data.contacts);
  }

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {

      const user = decodeToken(token);

      if (!user) {
        localStorage.removeItem('token');
        navigate('/login'); 
      }

      else{ 
        populateScreen();
      }
    }

    else
      navigate('/login');
    
  }, []);

    return (
      <div>
          <DashboardNavbar firstName={firstName} lastName={lastName} addNewContact={addNewContact}/>
          <form>
            <ReactBootstrap.Table striped bordered className="table-hover table-sm table-light">
              <thead className="">
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {contacts.map((contact, index) => 
                    <Fragment>
                      {
                        rowToEdit !== index ? <ReadOnlyRows contact={contact} index={index} makeRowEditable={makeRowEditable} deleteContact={deleteContact}/> :
                        <EditRows contact={contact} index={index} updateRow={updateRow} makeRowEditable={makeRowEditable}/>
                      }
                    </Fragment>
                  )} 
              </tbody>
            </ReactBootstrap.Table>
          </form>
      </div>
  );
}

export default Dashboard;