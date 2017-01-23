import React, { Component } from 'react';
import EventListener from 'react-event-listener';

export const SMALL = 1;
export const MEDIUM = 2;
export const LARGE = 3;

export default function withWidth(options = {}) {
  const {
    largeWidth = 992,
    mediumWidth = 768,
    resizeInterval = 166,
  } = options;

  return (MyComponent) => {
    return class WithWidth extends Component {
      state = {
        width: null,
      };

      componentDidMount() {
        this.updateWidth();
      }

      componentWillUnmount() {
        clearTimeout(this.deferTimer);
      }


      handleResize = () => {
        clearTimeout(this.deferTimer);
        this.deferTimer = setTimeout(() => {
          this.updateWidth();
        }, resizeInterval);
      }

      updateWidth() {
        const innerWidth = window.innerWidth;
        let width;

        if ( innerWidth >= largeWidth) {
          width = LARGE;
        } else if (innerWidth >= mediumWidth) {
          width = MEDIUM;
        } else {
          width = SMALL;
        }

        if ( width !== this.state.width) {
          this.setState({
            width: width,
          });
        }
      }

      render() {

        const width = this.state.width;

        if ( width === null) {
          return null;
        }
        return (
          <EventListener target="window" onResize={this.handleResize}>
            <MyComponent
              width={width}
              {...this.props}
            />
          </EventListener>
        );
      }
    };
  };
}
