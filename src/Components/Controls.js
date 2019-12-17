
import React from 'react';


class Controls extends React.Component {
    render() {
      return (
        <div className="controls">
          <div className="controls_plays">
          <i
            id="prev"
            className="fa fa-fw fa-fast-backward prev"
            onClick={this.props.onClick}
          />
          {!this.props.playing &&
            <i
              id="play"
              onClick={this.props.onClick}
              className="fa fa-fw fa-play play"
            />}
          {this.props.playing &&
            <i
              id="pause"
              onClick={this.props.onClick}
              className="fa fa-fw fa-pause pause"
            />}
          <i
            id="next"
            className="fa fa-fw fa-fast-forward next"
            onClick={this.props.onClick}
          />
          </div>
          <div className="controls_player">
    
         
           
    
          <i 
            id="shuffle"
            className="fa fa-random  fa-fw shuffle" 
            onClick={this.props.onClick} 
            />
    
      
          {!this.props.showAlbum &&
            <button
            id="showAlbum" 
            className="button"
            onClick={this.props.onClick}>
            Show Album
          </button>}

          {this.props.showAlbum &&
            <button 
            id="showArtist" 
            className="button" 
            onClick={this.props.onClick}>
            Show Track
          </button>}
            
    
    </div>
        </div>
      );
    }
    }

    export default Controls