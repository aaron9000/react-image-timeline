import React, { useState, useCallback } from 'react';
import './App.css';
import './lib/timeline.scss';
import Timeline, { TimelineEvent, TimelineCustomComponents, TimelineEventProps } from './lib/timeline';
// @ts-ignore
import { getSampleData } from './data';

const CustomTopLabel = (props: TimelineEventProps) => {
  return (
    <div className="custom-top-label">
      <p>Top Label</p>
    </div>
  );
};

const CustomBottomLabel = (props: TimelineEventProps) => {
  return (
    <div className="custom-bottom-label">
      <p>Bottom Label</p>
    </div>
  );
};

const CustomHeader = (props: TimelineEventProps) => {
  return (
    <div className="custom-header">
      <h3>Header</h3>
    </div>
  );
};

const CustomFooter = (props: TimelineEventProps) => {
  return (
    <div className="custom-footer">
      <h3>Footer</h3>
    </div>
  );
};

const CustomTextBody = (props: TimelineEventProps) => {
  return (
    <div className="custom-text-body">
      <h3>Text Body</h3>
    </div>
  );
};

const CustomImageBody = (props: TimelineEventProps) => {
  const { imageUrl } = props.event;
  return (
    <div className="custom-image-body">
      <h3 className="image-body-label">Image Body</h3>
      <img src={imageUrl} alt="" className="rt-image" />
    </div>
  );
};

const TimelineExample = React.memo(
  (
    props: {},
    state: {
      events: Array<TimelineEvent>;
      useCustomComponents: boolean;
      reverseOrder: boolean;
      denseLayout: boolean;
      imageType: string;
    }
  ) => {
    const [imageType, setImageType] = useState('normal');
    const [events, setEvents] = useState(getSampleData(imageType));
    const [useCustomComponents, setUseCustomComponents] = useState(false);
    const [reverseOrder, setReverseOrder] = useState(false);
    const [denseLayout, setDenseLayout] = useState(false);

    const onToggleReverseOrder = useCallback(() => setReverseOrder(!reverseOrder), [reverseOrder]);
    const onToggleDenseLayout = useCallback(() => setDenseLayout(!denseLayout), [denseLayout]);
    const onToggleUseCustomComponents = useCallback(() => setUseCustomComponents(!useCustomComponents), [
      useCustomComponents,
    ]);
    const onToggleImageType = useCallback(() => {
      const newImageType = imageType === 'normal' ? 'odd' : 'normal';
      setImageType(newImageType);
      setEvents(getSampleData(newImageType));
    }, [imageType]);

    const customComponents = useCustomComponents
      ? ({
          topLabel: CustomTopLabel,
          bottomLabel: CustomBottomLabel,
          header: CustomHeader,
          imageBody: CustomImageBody,
          textBody: CustomTextBody,
          footer: CustomFooter,
        } as TimelineCustomComponents)
      : null;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>React Image Timeline</h1>
          <h4>resize window to see mobile layout</h4>
        </div>
        <div className="config-container">
          <div className="toggle-container">
            <div>
              <input type="checkbox" onChange={onToggleUseCustomComponents} checked={useCustomComponents} />
              <strong>Use Custom Components</strong>
            </div>
            <div>
              <input type="checkbox" onChange={onToggleReverseOrder} checked={reverseOrder} />
              <strong>Reverse Order</strong>
            </div>
            <div>
              <input type="checkbox" onChange={onToggleImageType} checked={imageType !== 'normal'} />
              <strong>Non-unform Images</strong>
            </div>
            <div>
              <input type="checkbox" onChange={onToggleDenseLayout} checked={denseLayout} />
              <strong>Dense Layout</strong>
            </div>
          </div>
        </div>
        <hr />
        <Timeline events={events} customComponents={customComponents} reverseOrder={reverseOrder} denseLayout={denseLayout} />
      </div>
    );
  }
);

const App = TimelineExample;

export default App;
