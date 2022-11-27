import React from 'react';
import * as R from 'ramda';
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
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

  describe('State', () => {
    it('special cases 0 events', () => {
      render(<Timeline events={[]} />);
      expect(screen.queryByText(/./)).toBeNull();
    });

    it('filters events with invalid dates', () => {
      render(<Timeline events={SINGLE_INVALID_EVENT} />);
      expect(screen.queryByText(/./)).toBeNull();
    });

    it('only filters invalid dates', () => {
      render(<Timeline events={MIXED_DATES} />);
      expect(screen.queryAllByRole('heading')).toHaveLength(3);
    });
  });
  describe('Labels', () => {
    it('renders labels on the ends of the timeline', () => {
      render(<Timeline events={SHUFFLED_EVENTS} />);
      const listItems = screen.getAllByRole('listitem');
      expect(
        listItems[0]
      ).toContainHTML('<li class="rt-label-container"><div class="rt-label">2000</div></li>');
      expect(
        listItems[listItems.length - 1]
      ).toContainHTML('<li class="rt-label-container"><div class="rt-label">2010</div></li>');
    });

    it('renders reversed labels', () => {
      render(<Timeline events={SHUFFLED_EVENTS} reverseOrder={true} />);
      const listItems = screen.getAllByRole('listitem');
      expect(
        listItems[0]
      ).toContainHTML('<li class="rt-label-container"><div class="rt-label">2010</div></li>');
      expect(
        listItems[listItems.length - 1]
      ).toContainHTML('<li class="rt-label-container"><div class="rt-label">2000</div></li>');
    });
  });

  describe('Layout', () => {
    it('renders dense layout with no minimum height', () => {
      render(<Timeline events={SHUFFLED_EVENTS} denseLayout={true}/>);
      expect(
        screen
          .getAllByRole('listitem')[1]
      ).toHaveStyle({ minHeight: 'auto' });
    });
    it('renders normal layout without a style override', () => {
      render(<Timeline events={SHUFFLED_EVENTS} denseLayout={false}/>);
      expect(
        screen
          .getAllByRole('listitem')[1]
      ).not.toHaveStyle({ minHeight: 'auto' });
    });
  });

  describe('Events', () => {
    it('events call onClick when clicked', () => {
      const onClick = sinon.spy();
      const spiedEvents = R.map(event => {
        return R.mergeRight(event, { onClick });
      }, SHUFFLED_EVENTS);
      render(<Timeline events={spiedEvents} />);
      fireEvent(screen
        .getAllByRole('button')[0], new MouseEvent('click', {bubbles: true, cancelable: true}))
      expect(onClick.calledOnce).toBe(true);
    });

    it('renders events in order with unordered data', () => {
      render(<Timeline events={SHUFFLED_EVENTS} />);
      const listItems = screen.getAllByText(/(FIRST)|(LAST)/);
      expect(
        listItems[0]
      ).toHaveTextContent('FIRST');
      expect(
        listItems[listItems.length - 1]
      ).toHaveTextContent('LAST');
    });
    it('renders events in reverse-order with unordered data', () => {
      render(<Timeline events={SHUFFLED_EVENTS} reverseOrder={true} />);
      const listItems = screen.getAllByText(/(FIRST)|(LAST)/);
      expect(
        listItems[0]
      ).toHaveTextContent('LAST');
      expect(
        listItems[listItems.length - 1]
      ).toHaveTextContent('FIRST');
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
      render(<Timeline events={SHUFFLED_EVENTS} customComponents={CUSTOM_COMPONENTS} />);

      expect(screen.getByText('*CustomTopLabel*'));
      expect(screen.getByText('*CustomBottomLabel*'));

      expect(screen.getAllByText('*CustomHeader*')).toHaveLength(3);
      expect(screen.getAllByText('*CustomImageBody*')).toHaveLength(3);
      expect(screen.getAllByText('*CustomTextBody*')).toHaveLength(3);
      expect(screen.getAllByText('*CustomFooter*')).toHaveLength(3);
    });
  });
});
