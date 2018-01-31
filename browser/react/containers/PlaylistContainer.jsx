import React from 'react';
import store from '../store';
import Playlist from '../components/Playlist';
import { fetchPlaylist, addSong } from '../action-creators/playlists';
import { start } from  '../action-creators/player';

export default class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    this.fetchPlaylist(this.props.match.params.id);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchPlaylist(nextProps.match.params.id);
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchPlaylist(id) {
    store.dispatch(fetchPlaylist(id));
  }

  start(song) {
    store.dispatch(start(song));
  }

  addSong() {
    return store.dispatch(addSong());
  }
  render() {
    return (
      <Playlist
        playlist={this.state.playlists.selected}
        start={this.start}
        currentSong={this.state.player.currentSong}
        addSong={this.addSong}
      />
    );
  }
}