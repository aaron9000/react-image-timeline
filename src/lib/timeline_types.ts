export interface TimelineEventClickHandler {
  (event: any): void;
}

export interface TimelineEvent {
  date: Date;
  title: string;
  imageUrl: string;
  text: string;
  onClick?: TimelineEventClickHandler | null;
  buttonText?: string | null;
  extras?: object | null;
}

export interface TimelineEventConsumerProps {
  event: TimelineEvent;
}

export interface TimelineCustomComponents {
  topLabel?: React.PureComponent<TimelineEventConsumerProps> | React.ReactNode | null;
  bottomLabel?: React.PureComponent<TimelineEventConsumerProps> | React.ReactNode | null;
  header?: React.PureComponent<TimelineEventConsumerProps> | React.ReactNode | null;
  imageBody?: React.PureComponent<TimelineEventConsumerProps> | React.ReactNode | null;
  textBody?: React.PureComponent<TimelineEventConsumerProps> | React.ReactNode | null;
  footer?: React.PureComponent<TimelineEventConsumerProps> | React.ReactNode | null;
}

export interface TimelineProps {
  customComponents?: TimelineCustomComponents | null;
  events: Array<TimelineEvent>;
  reverseOrder?: boolean;
}
