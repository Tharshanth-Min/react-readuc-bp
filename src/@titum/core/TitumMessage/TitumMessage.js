import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TitumMessage(props) {


    return (
        <ToastContainer autoClose={ 1000 } className="toast-container"/>
    );
}

export default React.memo(TitumMessage);
