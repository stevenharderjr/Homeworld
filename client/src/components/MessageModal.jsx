import React from 'react';
import './MessageModal.css';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);

    this.timer = undefined;

    this.newMessage = this.newMessage.bind(this);
    this.killTimer = this.killTimer.bind(this);

    this.state = {
      message: '',
      display: false
    }
  }

  newMessage(duration = 2000) {
    this.timer && this.killTimer();
    this.timer = setTimeout(this.killTimer, duration);
  }

  killTimer() {
    clearTimeout(this.timer);
    this.setState({ display: false });
  }

  componentDidMount() {
    const message = this.props;
    if (message !== this.state.message) {
      this.newMessage(message);
    }
  }

  render() {
    const { message } = this.props;
    const { display } = this.state;

    return (
      display ? (
        <div className="message-modal">
          <span>{message}</span>
        </div>
      ) : null
    )
  }
}