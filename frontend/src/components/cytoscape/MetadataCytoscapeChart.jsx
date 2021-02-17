import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import klay from 'cytoscape-klay';
import euler from 'cytoscape-euler';
import avsdf from 'cytoscape-avsdf';
import spread from 'cytoscape-spread';
import CytoscapeComponent from 'react-cytoscapejs';
import { seletableLayouts } from './CytoscapeLayouts';
import { stylesheet } from './CytoscapeStyleSheet';

cytoscape.use(COSEBilkent);
cytoscape.use(cola);
cytoscape.use(dagre);
cytoscape.use(klay);
cytoscape.use(euler);
cytoscape.use(avsdf);
cytoscape.use(spread);

const MetadataCytoscapeChart = ({ elements }) => {
  const [cytoscapeObject, setCytoscapeObject] = useState(null);

  const cyCallback = useCallback((newCytoscapeObject) => {
    if (cytoscapeObject) return;
    newCytoscapeObject.on('resize', () => {
      newCytoscapeObject.center();
    });
    setCytoscapeObject(newCytoscapeObject);
  },
  [cytoscapeObject]);

  useEffect(() => {
    if (cytoscapeObject) {
      cytoscapeObject.minZoom(1e-1);
      cytoscapeObject.maxZoom(1.5);
      const selectedLayout = seletableLayouts.coseBilkent;
      selectedLayout.animate = true;
      selectedLayout.fit = true;
      cytoscapeObject.layout(selectedLayout).run();
      cytoscapeObject.maxZoom(5);
    }
  }, [elements]);

  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(elements)}
      stylesheet={stylesheet}
      cy={cyCallback}
      className="chart-area metachart-area"
    />
  );
};

MetadataCytoscapeChart.propTypes = {
  elements: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.any,
    })),
    edges: PropTypes.arrayOf(PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.any,
    })),
  }).isRequired,
};

export default MetadataCytoscapeChart;