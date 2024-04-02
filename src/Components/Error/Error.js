// ErrorComponent.js
import React from 'react';

const Error = ({ errorMessage, onClose }) => {
    return (
        <div className="error-box">
            <div className="error-message">{errorMessage}</div>
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    );
};

export default Error;
