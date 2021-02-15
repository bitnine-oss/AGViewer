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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Nav, Collapse } from 'react-bootstrap';
import CypherResultTableContainer from '../../cypherresult/containers/CypherResultTableContainer';
import CypherResultMetaContainer from '../../cypherresult/containers/CypherResultMetaContainer';

const CypherResultFrame = ({
  refKey, isPinned, reqString, removeFrame, pinFrame,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const expandFrame = () => {
    setIsFullScreen(!isFullScreen);
  };

  const setIconForIsExpanded = () => {
    if (isExpanded) {
      return <span className="fas fa-angle-up fa-lg" aria-hidden="true" />;
    }
    return <span className="fas fa-angle-down fa-lg" aria-hidden="true" />;
  };

  const setIconForIsFullscreen = () => {
    if (isFullScreen) {
      return <span className="fas fa-compress-alt fa-lg" aria-hidden="true" />;
    }
    return <span className="fas fa-expand-alt fa-lg" aria-hidden="true" />;
  };

  return (
    <div className={`card ${isFullScreen ? ' fullscreen ' : 'mt-3'}`}>
      <div className="card-header">
        <div className="d-flex card-title text-muted">
          <div className="mr-auto">
            <strong>
              {' '}
              $
              {reqString}
            </strong>
          </div>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isFullScreen ? ' selected ' : ''}`}
            onClick={() => expandFrame()}
          >
            {setIconForIsFullscreen(isExpanded)}
          </button>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isPinned ? ' selected ' : ''}`}
            onClick={() => pinFrame(refKey)}
          >
            <span
              className="fas fa-paperclip fa-lg"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            data-toggle="collapse"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls={refKey}
          >
            {setIconForIsExpanded()}
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link pl-3"
            onClick={() => removeFrame(refKey)}
          >
            <span className="fas fa-times fa-lg" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Collapse in={isExpanded}>
        <div className="card-body card-body-graph" id={refKey}>
          <div className="d-flex h-100">
            <Tab.Container defaultActiveKey="table">

              <Nav variant="pills" className="flex-column graph-card-nav">

                <Nav.Item>
                  <Nav.Link eventKey="table">
                    <span className="fas fa-table" aria-hidden="true" />
                    <br />
                    Table
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="code">
                    <span className="fas fa-terminal" aria-hidden="true" />
                    <br />
                    Meta
                  </Nav.Link>
                </Nav.Item>

              </Nav>
              <Tab.Content className="graph-card-content container-fluid graph-tabpanel">

                <Tab.Pane eventKey="table">
                  <CypherResultTableContainer refKey={refKey} />
                </Tab.Pane>

                <Tab.Pane eventKey="code">
                  <CypherResultMetaContainer refKey={refKey} />
                </Tab.Pane>

              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </Collapse>
    </div>

  );
};

CypherResultFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
};

export default CypherResultFrame;
