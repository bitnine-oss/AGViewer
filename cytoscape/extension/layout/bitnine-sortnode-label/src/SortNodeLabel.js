/*
 * Copyright 2021 Bitnine Co., Ltd.
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
const extend = require( './extend');
const defaults = require('./defaults');

// constructor
// options : object containing layout options
function SortNodeLabel( options ){
  this.options = extend( {}, defaults, options );
}

// runs the layout
SortNodeLabel.prototype.run = function(){
  let options = this.options;
  let eles = options.eles; // elements to consider in the layout
  let layout = this;

  // cy is automatically populated for us in the constructor
  // (disable eslint for next line as this serves as example layout code to external developers)
  // eslint-disable-next-line no-unused-vars
  let cy = options.cy;

  layout.emit( 'layoutstart' );

  // puts all nodes at (0, 0)
  // n.b. most layouts would use layoutPositions(), instead of positions() and manual events  

  const labels = eles.nodes().map((node) => node.data().label);
  let lablesSortNumber = labels.map(() => 0 );
  
  eles.nodes().positions( function(node){    
    let verticalLineIndex =  labels.indexOf(node.data().label);    
    lablesSortNumber[verticalLineIndex] = lablesSortNumber[verticalLineIndex] + 1;
    return {
      x: 300 * verticalLineIndex + 100,
      y: lablesSortNumber[verticalLineIndex] * 100
    };
  });

  // trigger layoutready when each node has had its position set at least once
  layout.one( 'layoutready', options.ready );
  layout.emit( 'layoutready' );

  // trigger layoutstop when the layout stops (e.g. finishes)
  layout.one( 'layoutstop', options.stop );
  layout.emit( 'layoutstop' );

  return this; // chaining
};

// called on continuous layouts to stop them before they finish
SortNodeLabel.prototype.stop = function(){
  return this; // chaining
};

module.exports = SortNodeLabel;
