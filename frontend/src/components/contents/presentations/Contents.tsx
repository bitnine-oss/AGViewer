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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FramesContainer from '../containers/Frames';
import styles from './Contents.module.scss';

const Contents = ({ database, isActive, getConnectionStatus, getMetaData, getMetaChartData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (database.status === 'init') {
      dispatch(() => {
        getConnectionStatus().then((response) => {
          if (response.type === 'database/getConnectionStatus/fulfilled') {
            getMetaData();
            getMetaChartData();
          }
        });
      });
    }
  }, [database.status]);

  return (
    <div className={`${styles.Content} ${isActive ? styles.Expanded : ''}`}>
      <div style={{ padding: '0rem 1rem 1rem 1rem' }}>
        <FramesContainer />
      </div>
    </div>
  );
};

Contents.propTypes = {
  database: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  getConnectionStatus: PropTypes.func.isRequired,
  getMetaData: PropTypes.func.isRequired,
  getMetaChartData: PropTypes.func.isRequired,
};

export default Contents;
