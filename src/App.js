import React, { Component } from 'react';
import './App.css';
import './lib/timeline.scss';
import Timeline from './lib/timeline';
import { getSampleData } from './data';

const CustomTopLabel = props => {
  return (
    <div className="custom-top-label">
      <p>Top Label</p>
    </div>
  );
};

const CustomBottomLabel = props => {
  return (
    <div className="custom-bottom-label">
      <p>Bottom Label</p>
    </div>
  );
};

const CustomHeader = props => {
  return (
    <div className="custom-header">
      <h3>Header</h3>
    </div>
  );
};

const CustomFooter = props => {
  return (
    <div className="custom-footer">
      <h3>Footer</h3>
    </div>
  );
};

const CustomTextBody = props => {
  return (
    <div className="custom-text-body">
      <h3>Text Body</h3>
    </div>
  );
};

const CustomImageBody = props => {
  const { imageUrl } = props.event;
  return (
    <div className="custom-image-body">
      <h3 className="image-body-label">Image Body</h3>
      <img src={imageUrl} alt="" className="rt-image" />
    </div>
  );
};

class TimelineExample extends Component {
  static displayName = 'TimelineExample';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      events: getSampleData(),
      useCustomComponents: false,
      reverseOrder: false,
    };
  }

  handleToggleUseCustomComponents(event) {
    this.setState({ useCustomComponents: event.target.checked });
  }
  handleToggleReverseOrder(event) {
    this.setState({ reverseOrder: event.target.checked });
  }

  render() {
    const { events, useCustomComponents, reverseOrder } = this.state;
    const timeline = <Timeline events={events} reverseOrder={reverseOrder} />;
    const customComponents = {
      topLabel: CustomTopLabel,
      bottomLabel: CustomBottomLabel,
      header: CustomHeader,
      imageBody: CustomImageBody,
      textBody: CustomTextBody,
      footer: CustomFooter,
    };
    const customTimeline = <Timeline events={events} customComponents={customComponents} reverseOrder={reverseOrder} />;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>React Image Timeline Example</h1>
          <h4>resize window to see mobile layout</h4>
        </div>
        <div className="toggle-container">
          <strong>Use Custom Components</strong>
          <input
            type="checkbox"
            onChange={this.handleToggleUseCustomComponents.bind(this)}
            checked={useCustomComponents}
          />
          <strong>Reverse Order</strong>
          <input type="checkbox" onChange={this.handleToggleReverseOrder.bind(this)} checked={reverseOrder} />
        </div>
        <hr />
        {useCustomComponents ? customTimeline : timeline}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return <TimelineExample />;
  }
}

export default App;
