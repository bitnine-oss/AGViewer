import React from 'react'

const ServerStatusFrame = ({refKey, reqString, serverInfo, removeFrame, frameIndex }) => {
    const { host, port, user, database, graph } = serverInfo;
    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <div className="frame-head-button card-title-collapsed card-title-close px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></div>
                    <div className="frame-head-button card-title-collapsed card-title-close px-3" data-toggle="collapse"
                        data-target="#connectStatusCardBody" aria-expanded="false"
                        aria-controls="connectStatusCardBody"><span className="fa fa-lg" aria-hidden="true"></span>
                    </div>
                    <div className="frame-head-button card-title-collapsed card-title-close pl-3">
                        <span className="fa fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></div>
                </div>
            </div>
            <div className="card-body collapse show" id="connectStatusCardBody">
                <div className="row">
                    <div className="col-3">
                        <h3>Connection Status</h3>
                        <p>This is your current connection information.</p>
                    </div>
                    <div className="col-9">
                        <p>You are connected as user <strong>{user}</strong></p>
                        <p>to <strong>{host}:{port}/{database}</strong></p>
                        <p>Graph path has been set to <strong>{graph}</strong></p>
                    </div>
                </div>
            </div>
            <div className="card-footer">

            </div>
        </div>
    );
}

export default ServerStatusFrame