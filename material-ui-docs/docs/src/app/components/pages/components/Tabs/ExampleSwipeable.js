import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
}

export default class TabsExampleSwipeable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return (
      <div>
        <Tabs 
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Tab One" value={0} />
          <Tab label="Tab Two" value={1} />
          <Tab label="Tab 3" value={2} />
          <Tab label="Tab 4" value={3} />
          <Tab label="Tab 5" value={4} />
          <Tab label="Tab 6" value={5} />
          <Tab label="Tab 7" value={6} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >

          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
          <div style={styles.slide}>
            slide n°4
          </div>
          <div style={styles.slide}>
            slide n°5
          </div>
          <div style={styles.slide}>
            slide n°6
          </div>
          <div style={styles.slide}>
            slide n°7
          </div>
        </SwipeableViews>
      </div>
    );
  }
}