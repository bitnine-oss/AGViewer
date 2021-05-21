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
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ambiance-mobile.css';

interface CodeMirrorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  commandHistory: any[];
  onClick: () => void;
}

const CodeMirrorWrapper: React.FunctionComponent<CodeMirrorWrapperProps> = ({
  value,
  onChange,
  commandHistory,
  onClick,
}) => {
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(commandHistory.length);

  return (
    <CodeMirror
      value={value}
      options={{
        keyMap: 'sublime',
        mode: 'cypher',
        tabSize: 4,
        lineNumbers: true,
        lineNumberFormatter: () => '$',
        extraKeys: {
          'Shift-Enter': (editor: { setValue: (arg0: string) => void }) => {
            onClick();
            editor.setValue('');
            setCommandHistoryIndex(-1);
          },
          'Ctrl-Enter': (editor: { setValue: (arg0: string) => void }) => {
            onClick();
            editor.setValue('');
            setCommandHistoryIndex(-1);
          },
          'Ctrl-Up': (editor: { setValue: (arg0: string) => void }) => {
            if (commandHistory.length === 0) {
              return;
            }
            if (commandHistoryIndex === -1) {
              const currentIdx = commandHistory.length - 1;
              editor.setValue(commandHistory[currentIdx]);
              setCommandHistoryIndex(currentIdx);
              return;
            }
            if (commandHistoryIndex === 0) {
              editor.setValue(commandHistory[0]);
              setCommandHistoryIndex(0);
              return;
            }

            editor.setValue(commandHistory[commandHistoryIndex - 1]);
            setCommandHistoryIndex(commandHistoryIndex - 1);
          },
          'Ctrl-Down': (editor: { setValue: (arg0: string) => void }) => {
            if (commandHistory.length === 0) {
              return;
            }
            if (commandHistoryIndex === -1) {
              editor.setValue('');
              return;
            }

            if (commandHistoryIndex === commandHistory.length - 1) {
              editor.setValue('');
              setCommandHistoryIndex(-1);
              return;
            }

            editor.setValue(commandHistory[commandHistoryIndex + 1]);
            setCommandHistoryIndex(commandHistoryIndex + 1);
          },
        },
      }}
      onChange={(editor) => {
        onChange(editor.getValue());
        const lineCount = editor.lineCount();
        if (lineCount <= 1) {
          editor.setOption('lineNumberFormatter', () => '$');
        } else {
          editor.setOption('lineNumberFormatter', (number: number) => number);
        }
        return true;
      }}
    />
  );
};

export default CodeMirrorWrapper;
