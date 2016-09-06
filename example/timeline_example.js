import React, {Component, PropTypes} from 'react';
import Timeline from '../dist/timeline';
import {getSampleData} from './data';
require('../dist/timeline.css');

const CustomStartLabel = (props) => {
    return <div className="custom-start-label">
        <p>Start Label</p>
    </div>;
};

const CustomEndLabel = (props) => {
    return <div className="custom-end-label">
        <p>End Label</p>
    </div>;
};

const CustomHeader = (props) => {
    return <div className="custom-header">
        <h3>Header</h3>
    </div>;
};

const CustomFooter = (props) => {
    return <div className="custom-footer">
        <h3>Footer</h3>
    </div>;
};

const CustomTextBody = (props) => {
    return <div className="custom-text-body">
        <h3>Text Body</h3>
    </div>;
};

const CustomImageBody = (props) => {
    const {imageUrl} = props.event;
    return <div className="custom-image-body">
        <h3 className="image-body-label">Image Body</h3>
        <img src={imageUrl} className='rt-image'/>
    </div>;
};

export default class TimelineExample extends Component {
    static displayName = 'TimelineExample';
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            events: getSampleData(false),
            useCustomComponents: false
        };
    }

    handleToggle(event) {
        this.setState({useCustomComponents: event.target.checked});
    }

    render() {
        const {events, useCustomComponents} = this.state;
        const timeline = <Timeline events={events}/>;
        const customTimeline = <Timeline events={events}
                                         customStartLabel={CustomStartLabel}
                                         customEndLabel={CustomEndLabel}
                                         customHeader={CustomHeader}
                                         customImageBody={CustomImageBody}
                                         customTextBody={CustomTextBody}
                                         customFooter={CustomFooter}/>;
        return <div>
            <h1>React Image Timeline Example</h1>
            <div className="toggle-container">
                <strong>Use Custom Components:</strong>
                <input type="checkbox"
                       onChange={this.handleToggle.bind(this)}
                       checked={useCustomComponents}
                />
            </div>
            <hr/>
            {useCustomComponents ? customTimeline : timeline}
        </div>;
    }
}
