import React, { Component } from "react";

class BackgroundMusic extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  handlePlay = () => {
    this.audioRef.current.play();
    this.props.onPlay();
  };

  render() {
    return (
      <div className="start-button">
        <audio ref={this.audioRef} src="/sounds/bgm.mp3" loop />;
        <button onClick={this.handlePlay}>Game Start</button>
      </div>
    );
  }
}

export default BackgroundMusic;
