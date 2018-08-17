import React from 'react';
export class YouTubePlayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            iframe: null
        }
        this.setFrameState = this.setFrameState.bind(this)
    }
    setFrameState(iframeObject){
        if (!iframeObject){return}
        this.setState({
            iframe: iframeObject
        });
    }
    render(){
        return (
            <div>
                <iframe 
                    title="Weather Video" 
                    width= {this.props.specs.width} 
                    height= {this.props.specs.height} 
                    src = {`https://www.youtube.com/embed/${this.props.video}?rel=0&amp;`+ 
                        `controls=${this.props.specs.controls?"1":"0"}&amp;`+
                        `showinfo=${this.props.specs.showInfo?"1":"0"}&amp;`+
                        `loop=${this.props.specs.loop?"1":"0"}&amp;`+
                        `autoplay=${this.props.specs.autoplay?"1":"0"}&amp;`+
                        `playlist=${this.props.video}`}
                    frameBorder="0" 
                    allow="autoplay; encrypted-media" 
                    ref={this.setFrameState}>
                </iframe>
                <div style={
                    {width: (this.state.iframe ? `${this.state.iframe.width}px` : null),
                    height:(this.state.iframe ? `${this.state.iframe.height*.99}px` : null),
                    position:"absolute", 
                    left:"50%",
                    transform: "translate(-50%,-101%)",
                    borderStyle:"solid",
                    overflow: "hidden"}}> 
                    {this.props.htmlOverlay}
                </div>
            </div>
        )
    }
}