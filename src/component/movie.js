import React, {Component} from 'react';
import {Col, Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class Movies extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selected: this.props.movieLiked,};
  }
  handleClick(){
    this.props.handleClickParent(this.state.selected,this.props.movieName);
    this.setState({
      selected: !this.state.selected,
    });
    if (!this.state.selected){
    fetch('http://localhost:3000/mymovies', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`title=${this.props.movieName}&overview=${this.props.movieDesc}&poster_path=${this.props.movieImg}&idMovieDB=${this.props.idMovie}`
          }).then(function(data) {
            console.log('We have saved this movie -->',data)
          }).catch((error) => {
            console.error('Oups, there is an error when adding a movie-->',error);
          });
    } else {
      fetch(`http://localhost:3000/mymovies/${this.props.idMovie}`, {
        method: 'DELETE'
      });
    }
    console.log(this.props.idMovie)
  }
    render() {
      console.log(this.props.movieLiked)
        var card = {};
        var styleHeart = {
            cursor: 'pointer',
            position: "absolute",
            top: "20px",
            right: "20px",
          }
     if (this.state.selected) { 
       styleHeart.color = "fc6861";
     }
     if (this.props.displayOnlyLike && !this.state.selected){
        card.display = "none";
     }
      return(
        <Col xs="12" sm="6" md="4" lg="3" style={card}>
        <div style={{marginBottom:"15px"}}>
          <Card>
          <CardImg style={{height: 400}} top width="100%" src={this.props.movieImg} alt="Card image cap"/>
          <CardBody style={{height: 570}}>
            <FontAwesomeIcon onClick={this.handleClick} size="1x" icon={faHeart} style={styleHeart}/>
            <CardTitle>{this.props.movieName}</CardTitle>
            <CardText >{this.props.movieDesc}</CardText>
          </CardBody>
        </Card>
        </div>
        </Col>
   );
  }}
  export default Movies;