'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./timeline.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Event = _react.PropTypes.shape({
    date: _react.PropTypes.object.isRequired,
    title: _react.PropTypes.string.isRequired,
    imageUrl: _react.PropTypes.string.isRequired,
    text: _react.PropTypes.string.isRequired,
    onClick: _react.PropTypes.func,
    buttonText: _react.PropTypes.string,
    extras: _react.PropTypes.object
});

var DefaultStartLabel = function () {
    function DefaultStartLabel(props) {
        var event = props.event;

        return _react2['default'].createElement(
            'div',
            { className: 'rt-label' },
            (0, _moment2['default'])(event.date).year()
        );
    }

    return DefaultStartLabel;
}();

var DefaultEndLabel = function () {
    function DefaultEndLabel(props) {
        var event = props.event;

        return _react2['default'].createElement(
            'div',
            { className: 'rt-label' },
            (0, _moment2['default'])(event.date).year()
        );
    }

    return DefaultEndLabel;
}();

var DefaultHeader = function () {
    function DefaultHeader(props) {
        var _props$event = props.event;
        var date = _props$event.date;
        var title = _props$event.title;

        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'h2',
                { className: 'rt-title' },
                title
            ),
            _react2['default'].createElement(
                'p',
                { className: 'rt-date' },
                (0, _moment2['default'])(date).format('LL')
            )
        );
    }

    return DefaultHeader;
}();

var DefaultFooter = function () {
    function DefaultFooter(props) {
        var _props$event2 = props.event;
        var buttonText = _props$event2.buttonText;
        var onClick = _props$event2.onClick;

        var handleClick = function () {
            function handleClick(e) {
                e.preventDefault();
                (onClick || function () {})(e);
            }

            return handleClick;
        }();
        return _react2['default'].createElement(
            'a',
            { className: 'rt-btn', href: '#', onClick: handleClick },
            buttonText || 'Default Text'
        );
    }

    return DefaultFooter;
}();

var DefaultTextBody = function () {
    function DefaultTextBody(props) {
        var text = props.event.text;

        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'p',
                null,
                text
            )
        );
    }

    return DefaultTextBody;
}();

var DefaultImageBody = function () {
    function DefaultImageBody(props) {
        var imageUrl = props.event.imageUrl;

        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement('img', { src: imageUrl, className: 'rt-image' })
        );
    }

    return DefaultImageBody;
}();

var ArrowAndDot = function () {
    function ArrowAndDot(props) {
        return _react2['default'].createElement(
            'div',
            { className: 'rt-svg-container' },
            _react2['default'].createElement(
                'svg',
                { viewBox: '0 0 6 8', className: 'rt-arrow' },
                _react2['default'].createElement(
                    'g',
                    null,
                    _react2['default'].createElement('path', { d: 'M 0 0 L 6 4 L 0 8 L 0 0' })
                )
            ),
            _react2['default'].createElement(
                'svg',
                { viewBox: '0 0 8 10', className: 'rt-dot' },
                _react2['default'].createElement('circle', { cx: '4', cy: '5', r: '3', stroke: 'none', strokeWidth: '0' })
            )
        );
    }

    return ArrowAndDot;
}();

var Timelime = function (_Component) {
    _inherits(Timelime, _Component);

    _createClass(Timelime, [{
        key: 'getStateForProps',
        value: function () {
            function getStateForProps(props) {
                var events = props.events;
                var reverseOrder = props.reverseOrder;

                var sortedEvents = _ramda2['default'].sortBy(_ramda2['default'].prop('date'), events || []);
                return {
                    events: reverseOrder ? _ramda2['default'].reverse(sortedEvents) : sortedEvents
                };
            }

            return getStateForProps;
        }()
    }]);

    function Timelime(props) {
        _classCallCheck(this, Timelime);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timelime).call(this, props));

        _this.state = _this.getStateForProps(props);
        return _this;
    }

    _createClass(Timelime, [{
        key: 'componentWillReceiveProps',
        value: function () {
            function componentWillReceiveProps(newProps) {
                this.setState(this.getStateForProps(newProps));
            }

            return componentWillReceiveProps;
        }()
    }, {
        key: 'contentForEvent',
        value: function () {
            function contentForEvent(event, index, HeaderClass, ImageBodyClass, TextBodyClass, FooterClass) {
                var content = _react2['default'].createElement(
                    'div',
                    { className: 'rt-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'rt-header-container' },
                        _react2['default'].createElement(HeaderClass, { event: event })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'rt-image-container' },
                        _react2['default'].createElement(ImageBodyClass, { event: event })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'rt-text-container' },
                        _react2['default'].createElement(TextBodyClass, { event: event })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'rt-footer-container' },
                        _react2['default'].createElement(FooterClass, { event: event })
                    )
                );
                return _react2['default'].createElement(
                    'li',
                    { className: index === 1 ? 'rt-event rt-offset-second' : 'rt-event', key: index },
                    _react2['default'].createElement(
                        'div',
                        { className: 'rt-backing' },
                        _react2['default'].createElement(ArrowAndDot, null),
                        content
                    )
                );
            }

            return contentForEvent;
        }()
    }, {
        key: 'content',
        value: function () {
            function content() {
                var _this2 = this;

                var _props = this.props;
                var reverseOrder = _props.reverseOrder;
                var customStartLabel = _props.customStartLabel;
                var customEndLabel = _props.customEndLabel;
                var customHeader = _props.customHeader;
                var customFooter = _props.customFooter;
                var customTextBody = _props.customTextBody;
                var customImageBody = _props.customImageBody;
                var events = this.state.events;

                // Determine which component classes to use

                var StartClass = customStartLabel || DefaultStartLabel;
                var EndClass = customEndLabel || DefaultEndLabel;
                var HeaderClass = customHeader || DefaultHeader;
                var ImageBodyClass = customImageBody || DefaultImageBody;
                var TextBodyClass = customTextBody || DefaultTextBody;
                var FooterClass = customFooter || DefaultFooter;

                // Build start & end labels
                var startEvent = (reverseOrder ? _ramda2['default'].last : _ramda2['default'].head)(events);
                var endEvent = (!reverseOrder ? _ramda2['default'].last : _ramda2['default'].head)(events);
                var startLabel = _react2['default'].createElement(
                    'li',
                    { key: 'start', className: 'rt-label-container' },
                    _react2['default'].createElement(StartClass, { event: startEvent })
                );
                var endLabel = _react2['default'].createElement(
                    'li',
                    { key: 'end', className: 'rt-label-container' },
                    _react2['default'].createElement(EndClass, { event: endEvent })
                );
                var topLabel = reverseOrder ? endLabel : startLabel;
                var bottomLabel = !reverseOrder ? endLabel : startLabel;
                var clear = _react2['default'].createElement('li', { key: 'clear', className: 'rt-clear' });

                // Compose labels and events together
                return _ramda2['default'].pipe(_ramda2['default'].addIndex(_ramda2['default'].reduce)(function (accum, event, index) {
                    var content = _this2.contentForEvent(event, index, HeaderClass, ImageBodyClass, TextBodyClass, FooterClass);
                    return _ramda2['default'].append(content, accum);
                }, [topLabel]), _ramda2['default'].append(clear), _ramda2['default'].append(bottomLabel))(events);
            }

            return content;
        }()
    }, {
        key: 'render',
        value: function () {
            function render() {
                var events = this.state.events;

                var content = events && events.length ? this.content() : _react2['default'].createElement('div', null);
                return _react2['default'].createElement(
                    'div',
                    { className: 'rt-timeline-container' },
                    _react2['default'].createElement(
                        'ul',
                        { className: 'rt-timeline' },
                        content
                    )
                );
            }

            return render;
        }()
    }]);

    return Timelime;
}(_react.Component);

Timelime.displayName = 'Timeline';
Timelime.propTypes = {
    events: _react.PropTypes.arrayOf(Event).isRequired,
    reverseOrder: _react.PropTypes.bool,
    customStartLabel: _react.PropTypes.func,
    customEndLabel: _react.PropTypes.func,
    customHeader: _react.PropTypes.func,
    customImageBody: _react.PropTypes.func,
    customTextBody: _react.PropTypes.func,
    customFooter: _react.PropTypes.func
};
exports['default'] = Timelime;