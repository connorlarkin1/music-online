import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase";
import client from './client';
import ReactSearchBox from 'react-search-box'
import SearchBar from './SearchBar'
import gql from "graphql-tag";
import Lottie from 'react-lottie';

import MediaItem from './MediaItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as animationData from './1446-bikingiscool.json'
import toRenderProps from 'recompose/toRenderProps';
import withWidth from '@material-ui/core/withWidth';

const WithWidth = toRenderProps(withWidth());
const styles = theme => ({
  root: {
   // flexGrow: 1,
   width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


const someFunction = (action = 'frank ocean', entity = 'song',limit = 10, isSpotify = false ) => {
  return new Promise((resolve, reject) => {
    /*stuff using username, password*/

    client
      .query({
          query: gql`
          query getItuness ($action: String, $limit: Int, $entity: String){
                  getItunes(query: $action, limit: $limit, entity: $entity){
                      getQuery {
                          artistName
                          trackName
                          artworkUrl100
                          collectionName
                          collectionType
                          artistViewUrl
                          collectionViewUrl
                          trackViewUrl
                          previewUrl
                      }
                  }
              
              }
          `,
          variables: {action, limit, entity}
        })
        .then(result => {
        // console.log(result);
          resolve(result);
        // console.log(result?.data?.getItunes?.getQuery)
          //dispatch({type: TEST_ACTION, payload: result?.data?.getItunes?.getQuery, isSpotify});
        });

  });
};


async function  musicGQL(action = 'frank ocean', entity = 'song',limit = 10, isSpotify = false ){
  client
  .query({
      query: gql`
      query getItuness ($action: String, $limit: Int, $entity: String){
              getItunes(query: $action, limit: $limit, entity: $entity){
                  getQuery {
                      artistName
                      trackName
                      artworkUrl100
                      collectionName
                      collectionType
                      artistViewUrl
                      collectionViewUrl
                      trackViewUrl
                      previewUrl
                  }
              }
          
          }
      `,
      variables: {action, limit, entity}
    })
    .then(result => {
     // console.log(result);
      return result;
     // console.log(result?.data?.getItunes?.getQuery)
      //dispatch({type: TEST_ACTION, payload: result?.data?.getItunes?.getQuery, isSpotify});
    });
}


var config = {
  apiKey: "AIzaSyBIrEGTquVXj-V1aDbgBJt0qoXRGAX1IUc",
  authDomain: "universal-music-url.firebaseapp.com",
  databaseURL: "https://universal-music-url.firebaseio.com",
  projectId: "universal-music-url",
  storageBucket: "universal-music-url.appspot.com",
  messagingSenderId: "173673950646"
};

firebase.initializeApp(config);

var functions = firebase.functions();


var addMessage = firebase.functions().httpsCallable('top100');
/*addMessage({ some: "smell me" }).then(function(result) {
  // Read result of the Cloud Function.
  var sanitizedMessage = result.data.text;
  console.log(result.data.songs)


  // ...
});*/



class App extends Component {
  state = {
    searchData: [],
    query: '',
    isStopped: false, 
    isPaused: false
  }

  updateQuery = (query) => {
    someFunction(query).then(dta => {
      if (query === this.state.query){
        this.setState({searchData: dta.data.getItunes.getQuery})
        console.log(dta.data.getItunes.getQuery)
      }
      else {
        console.log('CANCELLED')
      }
      
      /* stuff */
    });
    
    this.setState({query: query})
  }

  renderMediaItems = () => {
    const { searchData } = this.state;
    if (searchData){
      console.log(searchData)

      searchData.map((o) => {
        return (
          <Grid item  justify='center' alignItems='center'>
            <MediaItem/>
          </Grid>
         
        )
      })
    }
  }

  render() {
    const { searchData } = this.state;

    return (
      <div className={styles.root}>
     
      <SearchBar
        updateQuery={this.updateQuery}
      />

<Grid container direction='row' justify='center' alignItems='center' spacing={16}>

<div style={{marginLeft: "auto",
    marginRight: "auto", margin: "20px"}}>

          {
            searchData.map((o) => {
        return (
          <div style={{ margin: "20px"}}>
          <Grid item xs>
            <MediaItem
              itemData={o}
            />

          </Grid>
          </div>
         
        )
      })
          }
          </div>
      
        </Grid>
      </div>
    );
  }
}

export default App;
