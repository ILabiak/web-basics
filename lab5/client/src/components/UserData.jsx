/* eslint-disable jsx-a11y/anchor-is-valid */
import './login.css';
import { Backdrop } from '@mui/material';


function UserData(props) {
    const { open, userData, dataContainerRef } = props;

    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: (theme) =>
                    Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
            }}
        >
            <div className='loginform' ref={dataContainerRef}>
                <div className='userBlocksContainer'>
                    {userData && (
                        <div>
                            <div className='infoElement'>ПІБ: {userData?.pib}</div>
                            <div className='infoElement'>Варіант: {userData?.variant}</div>
                            <div className='infoElement'>Номер телефону: {userData?.phone_number}</div>
                            <div className='infoElement'>Факультет: {userData?.faculty}</div>
                            <div className='infoElement'>Адреcа: {userData?.address}</div>
                            <div className='infoElement'>Адмін: {userData?.admin ? 'Так' : 'Ні'}</div>
                        </div>
                    )
                    }
                </div>
            </div>
        </Backdrop>
    );
}

export default UserData;
