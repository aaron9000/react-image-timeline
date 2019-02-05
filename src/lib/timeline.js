import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Arrow } from "./arrow.svg";
import { ReactComponent as Dot } from "./dot.svg";

const formattedYear = date => {
  return date ? String(date.getFullYear()) : '';
};

const formattedDate = date => {
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = String(date.getFullYear());
  return date ? `${day.length > 1 ? day : '0' + day}-${month.length > 1 ? month : '0' + month}-${year}` : '';
}

const DefaultStartLabel = props => {
  const { event } = props;
  return <div className="rt-label">{formattedYear(event.date)}</div>;
};

const DefaultEndLabel = props => {
  const { event } = props;
  return <div className="rt-label">{formattedYear(event.date)}</div>;
};

const DefaultHeader = props => {
  const { date, title } = props.event;
  return (
    <div>
      <h2 className="rt-title">{title}</h2>
      <p className="rt-date">{formattedDate(date)}</p>
    </div>
  );
};

const DefaultFooter = props => {
  const { buttonText, onClick } = props.event;
  const handleClick = e => {
    e.preventDefault();
    (onClick || (x => x))(e);
  };
  return (
    <button className="rt-btn" href="#" onClick={handleClick}>
      {buttonText || "Default Text"}
    </button>
  );
};

const DefaultTextBody = props => {
  const { text } = props.event;
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

const DefaultImageBody = props => {
  const { imageUrl } = props.event;
  return (
    <div>
      <img src={imageUrl} alt="" className="rt-image" />
    </div>
  );
};

const ArrowAndDot = props => {
  return (
    <div className="rt-svg-container">
      <Arrow className="rt-arrow" />
      <Dot className="rt-dot" />
    </div>
  );
};

export default class Timeline extends Component {

  getStateForProps(props) {
    const { events, reverseOrder } = props;
    const sortedEvents = (events || []).sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    if (reverseOrder) sortedEvents.reverse();
    return {
      events: sortedEvents
    };
  }

  constructor(props) {
    super(props);
    this.state = this.getStateForProps(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.getStateForProps(newProps));
  }

  render() {
    const { events } = this.state;
    const {
      customStartLabel, 
      customEndLabel, 
      customHeader, 
      customFooter, 
      customImageBody, 
      customTextBody,
      reverseOrder
    } = this.props;

    if (!events.length){
      return <div/>;
    }

    // Determine which component classes to use
    const StartComponent = customStartLabel || DefaultStartLabel;
    const EndComponent = customEndLabel || DefaultEndLabel;
    const HeaderComponent = customHeader || DefaultHeader;
    const ImageBodyComponent = customImageBody || DefaultImageBody;
    const TextBodyComponent = customTextBody || DefaultTextBody;
    const FooterComponent = customFooter || DefaultFooter;

    // Build start & end labels
    const first = a => a.length > 0 ? a[0] : null;
    const last = a => a.length > 0 ? a[a.length - 1] : null;
    const startEvent = (reverseOrder ? last : first)(events);
    const endEvent = (!reverseOrder ? last : first)(events);
    const startLabel = (
      <li key="start" className="rt-label-container">
        <StartComponent event={startEvent} />
      </li>
    );
    const endLabel = (
      <li key="end" className="rt-label-container">
        <EndComponent event={endEvent} />
      </li>
    );
    const topLabel = reverseOrder ? endLabel : startLabel;
    const bottomLabel = !reverseOrder ? endLabel : startLabel;

    // Build event list content
    const eventContent = events.map((event, index) => {
      return <li className="rt-event" key={index}>
        <div className="rt-backing">
          <ArrowAndDot />
          <div className="rt-content">
            <div className="rt-header-container">
              <HeaderComponent event={event} />
            </div>
            <div className="rt-image-container">
              <ImageBodyComponent event={event} />
            </div>
            <div className="rt-text-container">
              <TextBodyComponent event={event} />
            </div>
            <div className="rt-footer-container">
              <FooterComponent event={event} />
            </div>
          </div>
        </div>
      </li>
    });
    const clear = <li key="clear" className="rt-clear">
    </li>;

    return (
      <div className="rt-timeline-container">
        <ul className="rt-timeline">
          {topLabel}
          {eventContent}
          {clear}
          {bottomLabel}
        </ul>
      </div>
    );
  }
}

Timeline.displayName = "Timeline";

Timeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      buttonText: PropTypes.string,
      extras: PropTypes.object
    })
  ).isRequired,
  reverseOrder: PropTypes.bool,
  customStartLabel: PropTypes.func,
  customEndLabel: PropTypes.func,
  customHeader: PropTypes.func,
  customImageBody: PropTypes.func,
  customTextBody: PropTypes.func,
  customFooter: PropTypes.func
};