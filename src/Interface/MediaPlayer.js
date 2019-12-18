import React from 'react';
import Controls from '../Components/Controls';
import Tracklist from '../Components/Tracklist';
import data from '../Components/Data/tracks.json';
import Playlist from '../Components/Playlist';
import queryString from 'query-string';
import Search from '../Components/Search';


class MediaPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playing: false,
      currentTrackIndex: 0,
      shuffle: false,
      showAlbum: false,
      playlistExists: false,
      playlist: [],
      loggedIn: false,
      username: '',
      filterString: '',
      token: '',
      data: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.selectTrackNumber = this.selectTrackNumber.bind(this);
    this.shuffleSong = this.shuffleSong.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.setState({ tracks: data.tracks });
  }

  playAudio(){
    this.audioElement.load();
    this.audioElement.play();
  }
  pauseAudio(){
    this.audioElement.pause();
  }
  selectTrackNumber(trackId){
    this.setState({currentTrackIndex:trackId,playing:true},this.playAudio);
  }
  shuffleSong(){  
    const min = 1;
    const max = 10;
    const randomNumber = min + Math.random() * (max - min);
    this.setState({currentTrackIndex:Math.round(randomNumber),playing:true},this.playAudio);
    // can be better.
  }


  addToPlaylist(trackId){
    var playlistUpdated = this.state.playlist.concat(data.tracks.find(y => y.id === trackId));
    this.setState({playlist: playlistUpdated, playlistExists:true});
  }

  removeFromPlaylist(trackId){
      //logic
      // remove numebr from array
      //check if empty, if it is setState playlistExists: false
      if(!this.state.playlist && !this.state.playlist.length){
      this.setState({playlistExists: false})
      }
  }

  componentDidMount() {

    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    
   if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', { 
      headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json())
      .then(data => this.setState({username: data.display_name}))
      this.setState({loggedIn: true});
      this.setState({token: accessToken})
  
      fetch('https://api.spotify.com/v1/search?q=tania%20bowra&type=artist', {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
           'Accept': 'application/json',
         },
       }).then(response => response.json())
       .then(json => {
         this.setState({
           data: json.items,
          });
       });
       console.log(this.state.data)
     }

  

handleClick(e) {
  switch (e.target.id) {
    case "play":
      this.setState((state, props) => {
        let currentTrackIndex = state.currentTrackIndex;
        if (currentTrackIndex === 0) {
          currentTrackIndex = 1;
        }
        return {
          playing: true,
          currentTrackIndex: currentTrackIndex
          
        };
      },this.playAudio);
      break;
    case "pause":
      this.setState({ playing: false },this.pauseAudio);
      break;
    case "prev":
      this.setState((state, props) => {
        let currentIndex = state.currentTrackIndex - 1;
        if (currentIndex <= 0) {
          return null;
        } else {
          return { playing:true,currentTrackIndex: currentIndex };
        }
      },this.playAudio);
      break;
    case "next":
      this.setState((state, props) => {
        let currentIndex = state.currentTrackIndex + 1;
        if (currentIndex > data.tracks.length) {
          return null;
        } else {
          return { playing:true,currentTrackIndex: currentIndex };
        }
      },this.playAudio);
      break;
      case "shuffle":
         this.setState({shuffle: true},this.shuffleSong)
      break;
      case "showAlbum":
          this.setState({showAlbum: true});
        break;
      case "showArtist":
          this.setState({showAlbum: false});
        break;
      case "search":
        this.setState({})
          
      break;
    default:
      break;
  }
}
render() {
  return (
<div className="App">
    <div className="audio-player">
      <div className="logo">
        {!this.state.loggedIn &&
       <button onClick={() => window.location='http://localhost:8888/login'}>
          Sign in with Spotify
          </button>
        }
        {this.state.loggedIn &&
       <div>
          <h2> 
            Hello, {this.state.username}
          </h2>
          <Search token={this.state.token} />
        </div>
        }
        </div>

        <audio ref={(audio)=>{this.audioElement = audio}} src={"/songs/"+this.state.currentTrackIndex+".mp3"}/>
          <div className="info">
            <h1> Michael Knight </h1>
            <h3>Music player</h3>
            <br />
            <br />
          </div>
        <Controls onClick={this.handleClick} playing={this.state.playing} 
        showAlbum={this.state.showAlbum} />
        <div className="playlist-heading">
                Songs  &nbsp;   &nbsp;   &nbsp; 
                <i className="fa fa-align-left" aria-hidden="true"></i>
            </div>
    <Tracklist
        currentTrackIndex={this.state.currentTrackIndex}
        selectTrackNumber={this.selectTrackNumber}
        addToPlaylist={this.addToPlaylist}
        showAlbum={this.state.showAlbum}
    />
        {this.state.playlistExists &&
          <div>
            <div className="playlist-heading">
                Playlist  &nbsp;   &nbsp;   &nbsp; 
                <i className="fa fa-align-left" aria-hidden="true"></i>
            </div>
          <Playlist
          
            currentTrackIndex={this.state.currentTrackIndex}
            playlist={this.state.playlist} 
            selectTrackNumber={this.selectTrackNumber}
            removeFromPlaylist={this.removeFromPlaylist}
          />
        </div>
        } 
  </div>
</div>
  );
}
}




export default MediaPlayer;

