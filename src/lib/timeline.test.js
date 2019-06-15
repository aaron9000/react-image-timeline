import React from 'react';
import * as R from 'ramda';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render, spy } from 'enzyme';
import Timeline from './timeline';

const SHUFFLED_EVENTS = [
  {
    title: 'LAST',
    imageUrl: 'LAST',
    text: 'LAST',
    date: new Date(2010, 1, 11),
    extras: { foo: 'bar' },
  },
  {
    title: 'FIRST',
    imageUrl: 'FIRST',
    text: 'FIRST',
    date: new Date(2000, 1, 11),
    extras: { foo: 'bar' },
  },
  {
    title: 'MIDDLE',
    imageUrl: 'MIDDLE',
    text: 'MIDDLE',
    date: new Date(2005, 1, 11),
    extras: { foo: 'bar' },
  },
];

const SINGLE_INVALID_EVENT = [
  {
    title: 'TITLE',
    imageUrl: 'IMAGE_URL',
    text: 'TEXT',
    date: new Date('asdfadf'),
    extras: null,
  },
];

const MIXED_DATES = SINGLE_INVALID_EVENT.concat(SHUFFLED_EVENTS);

const EMPTY_DIV = <div />;

const CustomHeader = props => {
  return <div>*CustomHeader*</div>;
};

const CustomImageBody = props => {
  return <div>*CustomImageBody*</div>;
};

const CustomTextBody = props => {
  return <div>*CustomTextBody*</div>;
};

const CustomFooter = props => {
  return <div>*CustomFooter*</div>;
};

const CustomTopLabel = props => {
  return <div>*CustomTopLabel*</div>;
};

const CustomBottomLabel = props => {
  return <div>*CustomBottomLabel*</div>;
};

describe('<Timeline />', () => {
  describe('Lifecycle', () => {
    it('mounts when rendered', () => {
      Timeline.prototype.componentDidMount = sinon.spy();
      mount(<Timeline events={[]} />);
      expect(Timeline.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    it('componentWillReceiveProps is called with new props', () => {
      Timeline.prototype.componentWillReceiveProps = sinon.spy();
      mount(<Timeline events={[]} />).setProps({ events: [] });
      expect(Timeline.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
    });
  });

  describe('State', () => {
    it("receives 'extras' in 'events' prop", () => {
      const wrapper = mount(<Timeline events={SHUFFLED_EVENTS} />);
      const { extras } = R.head(wrapper.props().events);
      expect(extras.foo).to.equal('bar');
    });

    it('special cases 0 events', () => {
      expect(shallow(<Timeline events={[]} />).contains(EMPTY_DIV)).to.equal(true);
    });

    it('filters events with invalid dates', () => {
      expect(shallow(<Timeline events={SINGLE_INVALID_EVENT} />).contains(EMPTY_DIV)).to.equal(true);
    });

    it('only filters invalid dates', () => {
      expect(shallow(<Timeline events={MIXED_DATES} />).contains(EMPTY_DIV)).to.equal(false);
    });
  });

  describe('Labels', () => {
    it('renders labels on the ends of the timeline', () => {
      const wrapper = shallow(<Timeline events={SHUFFLED_EVENTS} />);
      expect(
        wrapper
          .find('li')
          .first()
          .html()
      ).to.equal('<li class="rt-label-container"><div class="rt-label">2000</div></li>');
      expect(
        wrapper
          .find('li')
          .last()
          .html()
      ).to.equal('<li class="rt-label-container"><div class="rt-label">2010</div></li>');
    });

    it('renders reversed labels', () => {
      const wrapper = shallow(<Timeline events={SHUFFLED_EVENTS} reverseOrder={true} />);
      expect(
        wrapper
          .find('li')
          .first()
          .html()
      ).to.equal('<li class="rt-label-container"><div class="rt-label">2010</div></li>');
      expect(
        wrapper
          .find('li')
          .last()
          .html()
      ).to.equal('<li class="rt-label-container"><div class="rt-label">2000</div></li>');
    });
  });

  describe('Events', () => {
    it('renders events correctly', () => {
      const shallowWrapper = shallow(<Timeline events={SHUFFLED_EVENTS} />);
      const deepWrapper = render(<Timeline events={SHUFFLED_EVENTS} />);
      const assertClassCountDeep = (classes, count) => {
        R.map(c => {
          return expect(deepWrapper.find(c)).to.have.length(count);
        }, classes);
      };
      const assertClassCountShallow = (classes, count) => {
        R.map(c => {
          return expect(shallowWrapper.find(c)).to.have.length(count);
        }, classes);
      };
      assertClassCountShallow(['.rt-timeline', '.rt-timeline-container'], 1);
      assertClassCountDeep(['.rt-label-container'], 2);
      assertClassCountDeep(
        [
          '.rt-event',
          '.rt-btn',
          '.rt-image-container',
          '.rt-text-container',
          '.rt-header-container',
          '.rt-footer-container',
        ],
        R.length(SHUFFLED_EVENTS)
      );
    });

    it('events call onClick when clicked', () => {
      const onClick = sinon.spy();
      const spiedEvents = R.map(event => {
        return R.merge(event, { onClick });
      }, SHUFFLED_EVENTS);
      const wrapper = mount(<Timeline events={spiedEvents} />);
      wrapper
        .find('button')
        .first()
        .simulate('click');
      expect(onClick.calledOnce).to.equal(true);
    });

    it('renders events in order with unordered data', () => {
      const wrapper = shallow(<Timeline events={SHUFFLED_EVENTS} />);
      expect(
        wrapper
          .find('.rt-event')
          .first()
          .html()
          .indexOf('FIRST')
      ).to.be.above(-1);
      expect(
        wrapper
          .find('.rt-event')
          .last()
          .html()
          .indexOf('LAST')
      ).to.be.above(-1);
    });

    it('renders events in reverse-order with unordered data', () => {
      const wrapper = shallow(<Timeline events={SHUFFLED_EVENTS} reverseOrder={true} />);
      expect(
        wrapper
          .find('.rt-event')
          .first()
          .html()
          .indexOf('LAST')
      ).to.be.above(-1);
      expect(
        wrapper
          .find('.rt-event')
          .last()
          .html()
          .indexOf('FIRST')
      ).to.be.above(-1);
    });
  });

  describe('Custom Components', () => {
    it('renders custom components', () => {
      const CUSTOM_COMPONENTS = {
        topLabel: CustomTopLabel,
        bottomLabel: CustomBottomLabel,
        header: CustomHeader,
        imageBody: CustomImageBody,
        textBody: CustomTextBody,
        footer: CustomFooter,
      };
      const wrapper = render(<Timeline events={SHUFFLED_EVENTS} customComponents={CUSTOM_COMPONENTS} />);

      const firstLabelHtml = wrapper
        .find('.rt-label-container')
        .first()
        .html();
      expect(firstLabelHtml.indexOf('*CustomTopLabel*')).to.be.above(-1);

      const lastLabelHtml = wrapper
        .find('.rt-label-container')
        .last()
        .html();
      expect(lastLabelHtml.indexOf('*CustomBottomLabel*')).to.be.above(-1);

      const eventHtml = wrapper
        .find('.rt-event')
        .first()
        .html();
      expect(eventHtml.indexOf('*CustomHeader*')).to.be.above(-1);
      expect(eventHtml.indexOf('*CustomImageBody*')).to.be.above(-1);
      expect(eventHtml.indexOf('*CustomTextBody*')).to.be.above(-1);
      expect(eventHtml.indexOf('*CustomFooter*')).to.be.above(-1);
    });
  });
});
