import  { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const AddUserPopup = (props) => {

    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handler = async (event) => {

        await fetch('https://u09rohief7.execute-api.us-east-1.amazonaws.com/dev/addContact', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('token')
            }, 
            body: JSON.stringify({
                fullName, 
                city,
                email,
                phoneNumber
            })
        });
        
        const newUser = {
            fullName: fullName,
            city: city,
            email: email,
            phoneNumber: phoneNumber
        }

        props.addnewcontact(newUser);
    }

    return (
      <Modal {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add User
            </Modal.Title>
        </Modal.Header>
        <form onSubmit={handler}>
            <Modal.Body>
                <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="Enter full name" name="fullName" onChange={(event) => {setFullName(event.target.value)}} />
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="Enter City" name="city" onChange={(event) => {setCity(event.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={(event) => {setEmail(event.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" placeholder="Enter phone number" name="phoneNumber" onChange={(event) => {setPhoneNumber(event.target.value)}}/>
                </div>   
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className="btn btn-primary btn-block">Add User</button>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </form>
      </Modal>
    );
}

export default AddUserPopup;