// Arrow function that renders each contact
const ReadOnlyRows = ({contact, index, makeRowEditable, deleteContact}) => {

    const updateList = async (index, contact) => {
      const {id, email} = contact;

      await fetch('https://u09rohief7.execute-api.us-east-1.amazonaws.com/dev/deleteContact', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('token')
        }, 
        body: JSON.stringify({
            id,
            email,
        })
      });
  
      deleteContact(contact);
    }
  
    return(
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{contact.fullName}</td>
        <td>{contact.city}</td>
        <td>{contact.email}</td>
        <td>{contact.phoneNumber}</td>
        <td>
          <span>
            <button type="button" onClick={() => makeRowEditable(index)} className="btn-warning btn-sm">Edit</button>
            <button type="button" onClick={() => updateList(index, contact)} className="btn-danger btn-sm">Remove</button>
          </span>
        </td>
      </tr>
    );
}

export default ReadOnlyRows;