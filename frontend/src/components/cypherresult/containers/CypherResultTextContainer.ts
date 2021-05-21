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
import CypherResultText from '../presentations/CypherResultText';

const mapStateToProps = (state, ownProps) => {
  const { refKey } = ownProps;
  const generateTableData = (data) => {
    let columns = [];
    let rows = [];
    if (data) {
      columns = data.columns;
      rows = data.rows;
    }
    return { columns, rows };
  };
  return {
    data: generateTableData(state.cypher.queryResult[refKey]),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultText);
