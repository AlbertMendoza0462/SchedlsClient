import React from 'react';
import { Spinner } from "reactstrap"

const LoadingPage = ({ allPage }) => {


    return (
        <div className={(allPage) ? "d-flex justify-content-center align-items-center flex-column vh-100" : "d-flex justify-content-center align-items-center flex-column"}>
            <Spinner style={{ width: '5rem', height: '5rem' }} />
        </div>
    )
}

export default LoadingPage