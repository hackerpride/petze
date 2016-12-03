import React, {PropTypes} from 'react';

export default class App extends React.Component {

  static propTypes = {
    routes: PropTypes.object.isRequired,
  }
  render() {
    return this.props.routes;
  }
}
