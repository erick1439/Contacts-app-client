import { useState } from 'react';

const EditRows = ({contact, index, updateRow, makeRowEditable}) => {

    const { id, fullName, city, email, phoneNumber } = contact;

    const [newFullName, setNewFullName] = useState(fullName);
    const [newCity, setNewCity] = useState(city);
    const [newEmail, setNewEmail] = useState(email);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

    const updateContact = async () => {

        await fetch('https://u09rohief7.execute-api.us-east-1.amazonaws.com/dev/updateContact', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                id,
                newFullName,
                newCity,
                newEmail,
                newPhoneNumber
            })
        });

        updateRow(id, newFullName, newCity, newEmail, newPhoneNumber);
        makeRowEditable(null);
    }

    return(
        <tr key={index}>
            <td>{index + 1}</td>
            <td><input type='text' name='fullName' value={newFullName} onChange={(event) => setNewFullName(event.target.value)}></input></td>
            <td><input type='text' name='city' value={newCity} onChange={(event) => setNewCity(event.target.value)}></input></td>
            <td><input type='email' name='email' value={newEmail} onChange={(event) => setNewEmail(event.target.value)}></input></td>
            <td><input type='text' name='phoneNumber' value={newPhoneNumber} onChange={(event) => setNewPhoneNumber(event.target.value)}></input></td>
            <td>
            <span>
                <button type="button" onClick={updateContact} className="btn-primary btn-sm">Save</button>
                <button type="button" onClick={() => makeRowEditable(null)} className="btn-secondary btn-sm">Cancel</button>
            </span>
            </td>
      </tr>
    );
}

export default EditRows;