/* eslint-disable jsx-a11y/anchor-is-valid */
import './login.css';
import { Backdrop } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';


function UserData(props) {
    const { open, userData, dataContainerRef } = props;
    const [editedUserData, setEditedUserData] = useState({});
    const [cookies, setCookie] = useCookies();
    const [users, setUsers] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });

    };

    const handleLogout = () => {
        document.cookie = 'sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload(false);
    }



    const handleUserSelect = (e) => {
        const selectedId = e.target.value;
        const selectedUser = users.find((user) => user.id === parseInt(selectedId));
        if (selectedUser) {
            setEditedUserData(selectedUser);
            setSelectedUserId(selectedId);
        }

    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('http://localhost:3005/changeuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: cookies.sessionID,
                    user_data: editedUserData
                }),
                credentials: 'include'
            });
            if (response.status === 200) {
                // reload
                setTimeout(() => {
                    window.location.reload(false)
                }, 750)
            } else if (response.status === 401) {
                console.log('401 response')
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting user data', error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3005/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (response.status === 200) {
                    let res = await response.json()
                    setUsers(res)
                    console.log('users set', users)
                } else if (response.status === 401) {
                    console.log('401 response')
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting user data', error);
            }
        }
        if (userData?.admin) {
            fetchUsers()
        }
        setEditedUserData(userData)

    }, [userData]);

    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: (theme) =>
                    Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
            }}
        >
            <div className='userData' ref={dataContainerRef}>
                <div className='userBlocksContainer'>
                    {editedUserData && (
                        <div>
                            <div>
                                {users && (
                                    <div className='infoContainer'>
                                        <div className='infoElement'>Choose User:</div>
                                        <select
                                            name="selectedUser"
                                            value={selectedUserId || ""}
                                            onChange={handleUserSelect}
                                        >
                                            <option value="">Select a user</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.pib}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div className='infoContainer'>
                                    <div className='infoElement'>ПІБ: </div>
                                    <input
                                        type="text"
                                        name="pib"
                                        value={editedUserData?.pib}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='infoContainer'>
                                    <div className='infoElement'>Варіант: </div>
                                    <input
                                        type="number"
                                        name="variant"
                                        value={editedUserData?.variant}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='infoContainer'>
                                    <div className='infoElement'>Номер телефону: </div>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={editedUserData?.phone_number}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='infoContainer'>
                                    <div className='infoElement'>Факультет: </div>
                                    <input
                                        type="text"
                                        name="faculty"
                                        value={editedUserData?.faculty}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='infoContainer'>
                                    <div className='infoElement'>Адреcа: </div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={editedUserData?.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='infoContainer'>
                                    <div className='infoElement'>Адмін: </div>
                                    <input
                                        type="checkbox"
                                        name="admin"
                                        className='adminInput'
                                        disabled
                                        checked={editedUserData?.admin}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            margin: "0 0 0",
                                            lineHeight: 'large'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='buttonsContainer'>
                                <button className='saveChangesButton' onClick={handleSaveChanges}>Save changes</button>
                                <button className='logOutButton' onClick={handleLogout}>Log Out</button>
                            </div>

                        </div>
                    )
                    }
                </div>
            </div>
        </Backdrop>
    );
}

export default UserData;
