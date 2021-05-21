/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import uuid from 'uuid';
import AlertContainers from '../../alert/containers/AlertContainers';
import CodeMirror from '../../editor/containers/CodeMirrorWapperContainer';
import SideBarToggle from '../../editor/containers/SideBarMenuToggleContainer';

interface EditorProps {
  setCommand: (command: string) => void;
  command: string;
  addFrame: (command: string, contentsId: string, key: string) => void;
  trimFrame: (removeContentsId: string) => void;
  addAlert: (message: string) => void;
  alertList: any[];
  isActive: boolean;
  database: any;
  executeCypherQuery: (query: string[]) => Promise<any>;
  addCommandHistory: (query: string) => void;
  toggleMenu: (target: string) => void;
}

const Editor: React.FunctionComponent<EditorProps> = ({
  setCommand,
  command,
  addFrame,
  trimFrame,
  addAlert,
  alertList,
  isActive,
  database,
  executeCypherQuery,
  addCommandHistory,
  toggleMenu,
  // addCommandFavorites,
}) => {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState<JSX.Element[]>([]);

  // const favoritesCommand = () => {
  //   dispatch(() => addCommandFavorites(command));
  // };

  const clearCommand = () => {
    setCommand('');
  };

  const onClick = () => {
    const refKey = uuid.v4();
    if (command.toUpperCase().startsWith(':PLAY')) {
      dispatch(() => addFrame(command, 'Contents', refKey));
    } else if (command.toUpperCase() === ':SERVER STATUS') {
      dispatch(() => trimFrame('ServerStatus'));
      dispatch(() => addFrame(command, 'ServerStatus', refKey));
    } else if (database.status === 'disconnected' && command.toUpperCase() === ':SERVER DISCONNECT') {
      dispatch(() => trimFrame('ServerDisconnect'));
      dispatch(() => trimFrame('ServerConnect'));
      dispatch(() => addAlert('ErrorNoDatabaseConnected'));
      dispatch(() => addFrame(command, 'ServerDisconnect', refKey));
    } else if (database.status === 'disconnected' && command.toUpperCase() === ':SERVER CONNECT') {
      dispatch(() => trimFrame('ServerConnect'));
      dispatch(() => addFrame(':server connect', 'ServerConnect', refKey));
    } else if (database.status === 'disconnected' && command.toUpperCase().match('(MATCH|CREATE).*')) {
      dispatch(() => trimFrame('ServerConnect'));
      dispatch(() => addAlert('ErrorNoDatabaseConnected'));
      dispatch(() => addFrame(command, 'ServerConnect', refKey));
    } else if (database.status === 'connected' && command.toUpperCase() === ':SERVER DISCONNECT') {
      dispatch(() => trimFrame('ServerDisconnect'));
      dispatch(() => addAlert('NoticeServerDisconnected'));
      dispatch(() => addFrame(command, 'ServerDisconnect', refKey));
    } else if (database.status === 'connected' && command.toUpperCase() === ':SERVER CONNECT') {
      dispatch(() => trimFrame('ServerStatus'));
      dispatch(() => addAlert('NoticeAlreadyConnected'));
      dispatch(() => addFrame(command, 'ServerStatus', refKey));
    } else if (database.status === 'connected') {
      const reqStringValue = command;
      dispatch(() =>
        executeCypherQuery([refKey, reqStringValue]).then((response: any) => {
          if (response.type === 'cypher/executeCypherQuery/fulfilled') {
            addFrame(reqStringValue, 'CypherResultFrame', refKey);
          } else if (response.type === 'cypher/executeCypherQuery/rejected') {
            addFrame(reqStringValue, 'CypherResultFrame', refKey);
            dispatch(() => addAlert('ErrorCypherQuery'));
          }
        })
      );
    }
    dispatch(() => addCommandHistory(command));
    clearCommand();
  };

  useEffect(() => {
    setAlerts(
      alertList.map((alert: any) => (
        <AlertContainers
          key={alert.alertProps.key}
          alertKey={alert.alertProps.key}
          alertName={alert.alertName}
          errorMessage={alert.alertProps.errorMessage}
        />
      ))
    );
  }, [alertList]);

  return (
    <div className="container-fluid">
      <div className="editor">
        <div className="container-fluid editor-area card-header">
          <div className="input-group input-style">
            <div
              style={{
                height: '60px',
                width: '60px',
                color: '#ffffff',
                textAlign: 'left',
                lineHeight: '30px',
              }}
            >
              <span>
                Query
                <br />
                Editor
              </span>
            </div>
            <div className="form-control col-11 editor-code-wrapper">
              <CodeMirror onClick={onClick} value={command} onChange={setCommand} />
            </div>
            <div className="input-group-append ml-auto editor-button-wrapper" id="editor-buttons">
              {/* <button className="frame-head-button btn btn-link"
               type="button" onClick={() => favoritesCommand()}>
                <FontAwesomeIcon
                  icon={faStar}
                  size="lg"
                />
              </button> */}
              <button
                className={command ? 'btn show-eraser' : 'btn hide-eraser'}
                type="button"
                id="eraser"
                onClick={() => clearCommand()}
              >
                <i className="icon-eraser" />
              </button>
              <button
                className="frame-head-button btn btn-link"
                type="button"
                onClick={() => onClick()}
                title="Run Query"
              >
                <i className="icon-play" />
              </button>
              <button
                className="frame-head-button btn btn-link"
                type="button"
                onClick={() => {
                  toggleMenu('home');
                  if (!isActive) {
                    document.getElementById('wrapper')?.classList.remove('wrapper');
                    document.getElementById('wrapper')?.classList.add('wrapper-extension-padding');
                  } else {
                    document.getElementById('wrapper')?.classList.remove('wrapper-extension-padding');
                    document.getElementById('wrapper')?.classList.add('wrapper');
                  }
                }}
                title={isActive ? 'Hide' : 'Show'}
              >
                <SideBarToggle isActive={isActive} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {alerts}
    </div>
  );
};

export default Editor;
