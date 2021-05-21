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
import CypherResultCytoscape from '../presentations/CypherResultCytoscape';
import { setLabels } from '../../../features/cypher/CypherSlice';
import { generateCytoscapeElement } from '../../../features/cypher/CypherUtil';

const mapStateToProps = (state, ownProps) => {
  const { refKey } = ownProps;

  const generateElements = () => {
    try {
      return generateCytoscapeElement(
        state.cypher.queryResult[refKey].rows, state.setting.maxDataOfGraph, false,
      );
    } catch (e) {
      // TODO need tracing error
      console.error(e);
    }
    return {
      legend: {
        nodeLegend: {},
        edgeLegend: {},
      },
      elements: {
        nodes: [],
        edges: [],
      },
    };
  };
  return {
    data: generateElements(),
    maxDataOfGraph: state.setting.maxDataOfGraph,
    maxDataOfTable: state.setting.maxDataOfTable,
  };
};

const mapDispatchToProps = { setLabels };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(CypherResultCytoscape);
