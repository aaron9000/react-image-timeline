import React, {Component, PropTypes} from 'react';
import R from 'ramda';
import moment from 'moment';
import sinon from 'sinon';
import {expect} from 'chai';
import {shallow, mount, render, spy} from 'enzyme';
import Timeline from '../lib/timeline';

const shuffledEvents = [
    {
        title: 'LAST',
        imageUrl: 'LAST',
        text: 'LAST',
        date: moment('2010-01-01'),
        extras: {foo: 'bar'}
    },
    {
        title: 'FIRST',
        imageUrl: 'FIRST',
        text: 'FIRST',
        date: moment('2000-01-01'),
        extras: {foo: 'bar'}
    },
    {
        title: 'MIDDLE',
        imageUrl: 'MIDDLE',
        text: 'MIDDLE',
        date: moment('2005-01-01'),
        extras: {foo: 'bar'}
    }
];

const emptyDiv = <div></div>;

const CustomHeader = (props) => {
    return <div>*CustomHeader*</div>;
};

const CustomImageBody = (props) => {
    return <div>*CustomImageBody*</div>;
};

const CustomTextBody = (props) => {
    return <div>*CustomTextBody*</div>;
};

const CustomFooter = (props) => {
    return <div>*CustomFooter*</div>;
};

const CustomStartLabel = (props) => {
    return <div>*CustomStartLabel*</div>;
};

const CustomEndLabel = (props) => {
    return <div>*CustomEndLabel*</div>;
};

describe("<Timeline />", () => {

    it("mounts when rendered", () => {
        Timeline.prototype.componentDidMount = sinon.spy();
        mount(<Timeline />);
        expect(Timeline.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    it("componentWillReceiveProps is called with new props", () => {
        Timeline.prototype.componentWillReceiveProps= sinon.spy();
        mount(<Timeline />).setProps({events: []});
        expect(Timeline.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
    });

    it("receives 'extras' in 'events' prop", () => {
        const wrapper = mount(<Timeline events={shuffledEvents} />);
        const {extras} = R.head(wrapper.props().events);
        expect(extras.foo).to.equal('bar');
    });

    it("renders empty div with null events", () => {
        expect(shallow(<Timeline />).contains(emptyDiv)).to.equal(true);
    });

    it("renders empty div with 0 events", () => {
        expect(shallow(<Timeline events={[]} />).contains(emptyDiv)).to.equal(true);
    });

    it("renders content with non-zero events", () => {
        const wrapper = render(<Timeline events={shuffledEvents} />);
        const assertClassCount = (classes, count) => {
            R.map(c => {
                return expect(wrapper.find(c)).to.have.length(count);
            }, classes);
        };
        assertClassCount([
            '.rt-timeline',
            '.rt-timeline-container'
        ], 1);
        assertClassCount([
            '.rt-label-container'
        ], 2);
        assertClassCount([
            '.rt-event',
            '.rt-btn',
            '.rt-image-container',
            '.rt-text-container',
            '.rt-header-container',
            '.rt-footer-container'
        ], R.length(shuffledEvents));
    });

    it("renders labels on the ends of the timeline", () => {
        const wrapper = shallow(<Timeline events={shuffledEvents}/>);
        expect(wrapper.find('li').first().find('.rt-label-container')).to.have.length(1);
        expect(wrapper.find('li').last().find('.rt-label-container')).to.have.length(1);
    });

    it("renders events in order with unordered data", () => {
        const wrapper = shallow(<Timeline events={shuffledEvents}/>);
        expect(wrapper.find('.rt-event').first().html().indexOf('FIRST')).to.be.above(-1);
        expect(wrapper.find('.rt-event').last().html().indexOf('LAST')).to.be.above(-1);

    });

    it("renders events in reverse-order with unordered data", () => {
        const wrapper = shallow(<Timeline events={shuffledEvents} reverseOrder={true}/>);
        expect(wrapper.find('.rt-event').first().html().indexOf('LAST')).to.be.above(-1);
        expect(wrapper.find('.rt-event').last().html().indexOf('FIRST')).to.be.above(-1);
    });

    it("renders custom components", () => {
        const wrapper = render(<Timeline events={shuffledEvents}
                                         customStartLabel={CustomStartLabel}
                                         customEndLabel={CustomEndLabel}
                                         customHeader={CustomHeader}
                                         customImageBody={CustomImageBody}
                                         customTextBody={CustomTextBody}
                                         customFooter={CustomFooter}/>);

        const firstLabelHtml = wrapper.find('.rt-label-container').first().html();
        expect(firstLabelHtml.indexOf('*CustomStartLabel*')).to.be.above(-1);

        const lastLabelHtml = wrapper.find('.rt-label-container').last().html();
        expect(lastLabelHtml.indexOf('*CustomEndLabel*')).to.be.above(-1);

        const eventHtml = wrapper.find('.rt-event').first().html();
        expect(eventHtml.indexOf('*CustomHeader*')).to.be.above(-1);
        expect(eventHtml.indexOf('*CustomImageBody*')).to.be.above(-1);
        expect(eventHtml.indexOf('*CustomTextBody*')).to.be.above(-1);
        expect(eventHtml.indexOf('*CustomFooter*')).to.be.above(-1);
    });

    it("calls onClick when clicked", () => {
        const onClick = sinon.spy();
        const spiedEvents = R.map((event) => {
            return R.merge(event, {onClick});
        }, shuffledEvents);
        const wrapper = mount(<Timeline events={spiedEvents} />);
        wrapper.find('a').first().simulate('click');
        expect(onClick.calledOnce).to.equal(true);
    });
});

