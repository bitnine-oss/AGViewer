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

import { connect } from 'react-redux';
import { getConnectionStatus } from '../../../features/database/DatabaseSlice';
import { getMetaData, getMetaChartData } from '../../../features/database/MetadataSlice';
import Contents from '../presentations/Contents';

const mapStateToProps = (state) => ({
  database: state.database,
  isActive: state.navigator.isActive,
});

const mapDispatchToProps = { getConnectionStatus, getMetaData, getMetaChartData };

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
