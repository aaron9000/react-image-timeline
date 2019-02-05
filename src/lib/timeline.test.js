import React from "react";
import * as R from "ramda";
import sinon from "sinon";
import { expect } from "chai";
import { shallow, mount, render, spy } from "enzyme";
import Timeline from "./timeline";

const SHUFFLED_EVENTS = [
  {
    title: "LAST",
    imageUrl: "LAST",
    text: "LAST",
    date: new Date("2010-01-01"),
    extras: { foo: "bar" }
  },
  {
    title: "FIRST",
    imageUrl: "FIRST",
    text: "FIRST",
    date: new Date("2000-01-01"),
    extras: { foo: "bar" }
  },
  {
    title: "MIDDLE",
    imageUrl: "MIDDLE",
    text: "MIDDLE",
    date: new Date("2005-01-01"),
    extras: { foo: "bar" }
  }
];

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

const CustomStartLabel = props => {
  return <div>*CustomStartLabel*</div>;
};

const CustomEndLabel = props => {
  return <div>*CustomEndLabel*</div>;
};

describe("<Timeline />", () => {
  it("mounts when rendered", () => {
    Timeline.prototype.componentDidMount = sinon.spy();
    mount(<Timeline events={[]} />);
    expect(Timeline.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it("componentWillReceiveProps is called with new props", () => {
    Timeline.prototype.componentWillReceiveProps = sinon.spy();
    mount(<Timeline events={[]} />).setProps({ events: [] });
    expect(Timeline.prototype.componentWillReceiveProps.calledOnce).to.equal(
      true
    );
  });

  it("receives 'extras' in 'events' prop", () => {
    const wrapper = mount(<Timeline events={SHUFFLED_EVENTS} />);
    const { extras } = R.head(wrapper.props().events);
    expect(extras.foo).to.equal("bar");
  });

  it("renders empty div with 0 events", () => {
    expect(shallow(<Timeline events={[]} />).contains(EMPTY_DIV)).to.equal(true);
  });

  it("renders content with non-zero events", () => {
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
    assertClassCountShallow([".rt-timeline", ".rt-timeline-container"], 1);
    assertClassCountDeep([".rt-label-container"], 2);
    assertClassCountDeep(
      [
        ".rt-event",
        ".rt-btn",
        ".rt-image-container",
        ".rt-text-container",
        ".rt-header-container",
        ".rt-footer-container"
      ],
      R.length(SHUFFLED_EVENTS)
    );
  });

  it("renders labels on the ends of the timeline", () => {
    const wrapper = shallow(<Timeline events={SHUFFLED_EVENTS} />);
    expect(
      wrapper
        .find("li")
        .first()
        .find(".rt-label-container")
    ).to.have.length(1);
    expect(
      wrapper
        .find("li")
        .last()
        .find(".rt-label-container")
    ).to.have.length(1);
  });

  it("renders events in order with unordered data", () => {
    const wrapper = shallow(<Timeline events={SHUFFLED_EVENTS} />);
    expect(
      wrapper
        .find(".rt-event")
        .first()
        .html()
        .indexOf("FIRST")
    ).to.be.above(-1);
    expect(
      wrapper
        .find(".rt-event")
        .last()
        .html()
        .indexOf("LAST")
    ).to.be.above(-1);
  });

  it("renders events in reverse-order with unordered data", () => {
    const wrapper = shallow(
      <Timeline events={SHUFFLED_EVENTS} reverseOrder={true} />
    );
    expect(
      wrapper
        .find(".rt-event")
        .first()
        .html()
        .indexOf("LAST")
    ).to.be.above(-1);
    expect(
      wrapper
        .find(".rt-event")
        .last()
        .html()
        .indexOf("FIRST")
    ).to.be.above(-1);
  });

  it("renders custom components", () => {
    const wrapper = render(
      <Timeline
        events={SHUFFLED_EVENTS}
        customStartLabel={CustomStartLabel}
        customEndLabel={CustomEndLabel}
        customHeader={CustomHeader}
        customImageBody={CustomImageBody}
        customTextBody={CustomTextBody}
        customFooter={CustomFooter}
      />
    );

    const firstLabelHtml = wrapper
      .find(".rt-label-container")
      .first()
      .html();
    expect(firstLabelHtml.indexOf("*CustomStartLabel*")).to.be.above(-1);

    const lastLabelHtml = wrapper
      .find(".rt-label-container")
      .last()
      .html();
    expect(lastLabelHtml.indexOf("*CustomEndLabel*")).to.be.above(-1);

    const eventHtml = wrapper
      .find(".rt-event")
      .first()
      .html();
    expect(eventHtml.indexOf("*CustomHeader*")).to.be.above(-1);
    expect(eventHtml.indexOf("*CustomImageBody*")).to.be.above(-1);
    expect(eventHtml.indexOf("*CustomTextBody*")).to.be.above(-1);
    expect(eventHtml.indexOf("*CustomFooter*")).to.be.above(-1);
  });

  it("calls onClick when clicked", () => {
    const onClick = sinon.spy();
    const spiedEvents = R.map(event => {
      return R.merge(event, { onClick });
    }, SHUFFLED_EVENTS);
    const wrapper = mount(<Timeline events={spiedEvents} />);
    wrapper
      .find("button")
      .first()
      .simulate("click");
    expect(onClick.calledOnce).to.equal(true);
  });
});
