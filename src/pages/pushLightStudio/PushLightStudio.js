import React, { Component } from "react";
import "./PushLightStudio.css";

class PushLightStudio extends Component {
  render() {
    // You can pass the URL as a prop or hardcode it here
    const iframeUrl = this.props.url || "https://example.com";
    const iframeTitle = this.props.title || "Embedded Page";

    return (
      <div className="pushlight-studio">
        <iframe
          src={iframeUrl}
          title={iframeTitle}
          className="embedded-iframe"
          allowFullScreen
        />
      </div>
    );
  }
}

export default PushLightStudio;
