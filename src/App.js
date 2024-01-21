import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  // const savedItem = localStorage.getItem(data);
  // const parsedItem = JSON.parse(savedItem);
  // console.log(parsedItem);
  const [data, setData] = useState(() => {
    const savedItem = localStorage.getItem('data');
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || [];
  });
  const [editId, setEditID] = useState();
  const [user, setUser] = useState({
    fname: '',
    number: '',
    email: '',
    gender: '',
    city: '',
  });
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handelDelete = (id) => {
    const newData = data.filter((val) => val.id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
    setEditID(id);
    const editData = data.find((val) => val.id === id);
    setUser({ ...editData });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const { fname, number, email, gender, city } = user;
    // if ((!fname, !email, !number, !gender, !city)) return;

    const isEmpty = !Object.values(user).every((x) => x !== null && x !== '');
    if (isEmpty) {
      alert('fill all input values');
      return;
    }
    if (editId) {
      setData(
        data.map((item) => {
          if (item.id === editId) {
            return { ...item, ...user };
          }
          return item;
        })
      );
      setEditID(null);
    } else {
      setData([...data, { id: new Date().getTime().toString(), ...user }]);
    }
    setUser({
      fname: '',
      number: '',
      email: '',
      gender: '',
      city: '',
    });
  };

  return (
    <div className="main">
      <h1>React form practice</h1>
      <form>
        <label>
          fname
          <input
            type="text"
            name="fname"
            value={user.fname}
            onChange={handleChange}
          />
        </label>
        <label>
          number
          <input
            type="number"
            name="number"
            value={user.number}
            onChange={handleChange}
          />
        </label>{' '}
        <label>
          email
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          gender
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={user.gender === 'male'}
          />
          male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={user.gender === 'female'}
          />
          female
        </label>
        <label>
          City
          <select name="city" onChange={handleChange}>
            <option value={user.city || 'pune'}>pune</option>
            <option value={user.city || 'mumbai'}>mumbai</option>
            <option value={user.city || 'delhi'}>delhi</option>
          </select>
        </label>
        <button onClick={handleSubmit}>submit </button>
      </form>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>email</td>
              <td>number</td>
              <td>gender</td>
              <td>city</td>
              <td>button</td>
            </tr>
          </thead>
          <tbody>
            {data.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.id} </td>
                  <td>{val.fname} </td>
                  <td>{val.number} </td>
                  <td>{val.email} </td>
                  <td>{val.gender} </td>
                  <td>{val.city} </td>
                  <td>
                    {' '}
                    <span onClick={() => handleEdit(val.id)}> Edit</span>
                    <span onClick={() => handelDelete(val.id)}> Delete</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h2>No Data avilable</h2>
      )}
    </div>
  );
}
