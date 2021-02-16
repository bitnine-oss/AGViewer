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
import CodeMirrorWrapper from '../presentations/CodeMirrorWrapper';

const mapStateToProps = (state) => ({
  reqString: state.editor.reqString,
  commandHistory: state.editor.commandHistory.slice(
    Math.max(state.editor.commandHistory.length - state.setting.maxNumOfHistories, 1),
  ),
});

const mapDispatchToProps = { };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(CodeMirrorWrapper);
