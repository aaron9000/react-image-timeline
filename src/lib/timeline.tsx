import React, { useState, useCallback } from 'react';

export interface TimelineEventClickHandler {
  (event: any): void;
}

export interface TimelineEvent {
  date: Date;
  title: string;
  imageUrl: string;
  // placeholderImageUrl?: string;
  text: string;
  onClick?: TimelineEventClickHandler | null;
  buttonText?: string | null;
  extras?: object | null;
}

export interface TimelineEventProps {
  event: TimelineEvent;
}

export interface TimelineCustomComponents {
  topLabel?: React.PureComponent<TimelineEventProps> | React.ReactNode | null;
  bottomLabel?: React.PureComponent<TimelineEventProps> | React.ReactNode | null;
  header?: React.PureComponent<TimelineEventProps> | React.ReactNode | null;
  imageBody?: React.PureComponent<TimelineEventProps> | React.ReactNode | null;
  textBody?: React.PureComponent<TimelineEventProps> | React.ReactNode | null;
  footer?: React.PureComponent<TimelineEventProps> | React.ReactNode | null;
}

export interface TimelineProps {
  customComponents?: TimelineCustomComponents | null;
  events: Array<TimelineEvent>;
  reverseOrder?: boolean;
  // placeholderImageUrl?: string;
}

const isNonZeroArray = (a: Array<TimelineEvent>) => Array.isArray(a) && a.length > 0;

const takeFirst = (a: Array<TimelineEvent>) => (isNonZeroArray(a) ? a[0] : ({} as TimelineEvent));

const takeLast = (a: Array<TimelineEvent>) => (isNonZeroArray(a) ? a[a.length - 1] : ({} as TimelineEvent));

const isValidDate = (date: Date) => {
  return date && date instanceof Date && !isNaN(date.getTime());
};

const formattedYear = (date: Date) => {
  return isValidDate(date) ? String(date.getFullYear()) : '-';
};

const formattedDate = (date: Date) => {
  if (!isValidDate(date)) return '-';
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = String(date.getFullYear());
  return `${month.length > 1 ? month : '0' + month}/${day.length > 1 ? day : '0' + day}/${year}`;
};

const Dot = React.memo(function Dot(props) {
  return (
    <svg className="rt-dot" viewBox="0 0 8 10">
      <circle cx="4" cy="5" r="3" stroke="none" />
    </svg>
  );
});

const Arrow = React.memo(function Arrow(props) {
  return (
    <svg className="rt-arrow" viewBox="0 0 6 8">
      <g>
        <path d="M 0 0 L 6 4 L 0 8 L 0 0" />
      </g>
    </svg>
  );
});

const DefaultTopLabel = React.memo(function DefaultTopLabel(props: TimelineEventProps) {
  return <div className="rt-label">{formattedYear(props.event.date)}</div>;
});

const DefaultBottomLabel = React.memo(function DefaultBottomLabel(props: TimelineEventProps) {
  return <div className="rt-label">{formattedYear(props.event.date)}</div>;
});

const DefaultHeader = React.memo(function DefaultHeader(props: TimelineEventProps) {
  return (
    <div>
      <h2 className="rt-title">{props.event.title}</h2>
      <p className="rt-date">{formattedDate(props.event.date)}</p>
    </div>
  );
});

const DefaultFooter = React.memo(function DefaultFooter(props: TimelineEventProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    (props.event.onClick || (x => x))(e);
  };

  return (
    <button className="rt-btn" onClick={handleClick}>
      {props.event.buttonText || ''}
    </button>
  );
});

const DefaultTextBody = React.memo(function DefaultTextBody(props: TimelineEventProps) {
  return (
    <div>
      <p>{props.event.text}</p>
    </div>
  );
});

const DefaultImageBody = React.memo((props: TimelineEventProps) => {
  return (
    <div>
      <img src={props.event.imageUrl} className="rt-image" alt="" />
    </div>
  );
});

const ArrowAndDot = React.memo(function ArrowAndDot(props) {
  return (
    <div className="rt-svg-container">
      <Arrow />
      <Dot />
    </div>
  );
});

const Clear = React.memo(function Clear(props) {
  return <li key="clear" className="rt-clear" />;
});

const Timeline = React.memo((props: TimelineProps) => {
  const { events, customComponents, reverseOrder } = props;

  if (!events.length) {
    return <div />;
  }

  const sortedEvents = events
    .slice(0)
    .filter(({ date }) => isValidDate(date))
    .sort((a, b) => {
      return reverseOrder
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const { topLabel, bottomLabel, header, footer, imageBody, textBody } = customComponents || {};
  const TopComponent = (topLabel || DefaultTopLabel) as React.ComponentType<TimelineEventProps>;
  const BottomComponent = (bottomLabel || DefaultBottomLabel) as React.ComponentType<TimelineEventProps>;
  const HeaderComponent = (header || DefaultHeader) as React.ComponentType<TimelineEventProps>;
  const ImageBodyComponent = (imageBody || DefaultImageBody) as React.ComponentType<TimelineEventProps>;
  const TextBodyComponent = (textBody || DefaultTextBody) as React.ComponentType<TimelineEventProps>;
  const FooterComponent = (footer || DefaultFooter) as React.ComponentType<TimelineEventProps>;

  const timelineComposition = (
    <div className="rt-timeline-container">
      <ul className="rt-timeline">
        <li key="top" className="rt-label-container">
          <TopComponent event={takeFirst(sortedEvents)} />
        </li>
        {sortedEvents.map((event, index) => {
          return (
            <li className="rt-event" key={index}>
              <div className="rt-backing">
                <ArrowAndDot />
                <div>
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
          );
        })}
        <Clear />
        <li key="bottom" className="rt-label-container">
          <BottomComponent event={takeLast(sortedEvents)} />
        </li>
      </ul>
    </div>
  );
  return <div>{timelineComposition}</div>;
});

export default Timeline;

/*
const StableImageBody = React.memo((props: TimelineEventProps) => {
  const [loaded, setLoaded] = useState(false);
  const onMainImageFinishLoading = useCallback(() => setLoaded(true), []);

  const { imageUrl, placeholderImageUrl } = props.event;

  return (
    <div>
      {!loaded ? <img src={placeholderImageUrl} className="rt-image" alt="" /> : null}
      <img
        src={imageUrl}
        style={!loaded ? { visibility: 'hidden' } : {}}
        className="rt-image"
        alt=""
        onLoad={onMainImageFinishLoading}
      />
    </div>
  );
});
*/

/*
const StableTimeline = React.memo((props: TimelineProps) => {

  const [loaded, setLoaded] = useState(false);
  const onPlaceholderImageFinishLoading = useCallback(() => setLoaded(true), []);
  const { events, customComponents, reverseOrder, placeholderImageUrl } = props;

  // Obey sorting
  const sortedEvents = events
    .slice(0)
    .filter(({ date }) => isValidDate(date))
    .sort((a, b) => {
      return reverseOrder
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .map(e => ({ ...e, placeholderImageUrl }));

  // Render nothing with empty events
  if (!sortedEvents.length) {
    return <div />;
  }

  // Use custom component when provided
  const { topLabel, bottomLabel, header, footer, imageBody, textBody } = customComponents || {};
  const TopComponent = (topLabel || DefaultTopLabel) as React.ComponentType<TimelineEventProps>;
  const BottomComponent = (bottomLabel || DefaultBottomLabel) as React.ComponentType<TimelineEventProps>;
  const HeaderComponent = (header || DefaultHeader) as React.ComponentType<TimelineEventProps>;
  const ImageBodyComponent = (imageBody || DefaultImageBody) as React.ComponentType<TimelineEventProps>;
  const TextBodyComponent = (textBody || DefaultTextBody) as React.ComponentType<TimelineEventProps>;
  const FooterComponent = (footer || DefaultFooter) as React.ComponentType<TimelineEventProps>;

  const timelineComposition = (
    <div className="rt-timeline-container">
      <ul className="rt-timeline">
        <li key="top" className="rt-label-container">
          <TopComponent event={takeFirst(sortedEvents)} />
        </li>
        {sortedEvents.map((event, index) => {
          return (
            <li className="rt-event" key={index}>
              <div className="rt-backing">
                <ArrowAndDot />
                <div>
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
          );
        })}
        <Clear />
        <li key="bottom" className="rt-label-container">
          <BottomComponent event={takeLast(sortedEvents)} />
        </li>
      </ul>
    </div>
  );

  // TODO: get back to smooth loading
  return (
    <div>
      {!loaded ? (
        <img
          src={placeholderImageUrl}
          style={{ visibility: 'hidden' }}
          alt=""
          onLoad={onPlaceholderImageFinishLoading}
        />
      ) : (
          timelineComposition
        )}
    </div>
  );
});
*/
