import React, {Component} from 'react';
import './App.css';
import {Container, Row,UncontrolledDropdown,DropdownMenu,DropdownItem,DropdownToggle,Col, Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
// import Header from './component/header'
import Movies from './component/movie'

class App extends Component {
  constructor(props){
    super(props);
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {viewOnlyLike: false,moviesCount: 0, moviesNameList: [],movies: [],dataStatus: "loading...",moviesLiked:[],}}
  
    componentWillMount(){      
      console.log("avant affichage");
     }
   
     componentDidMount(){
      var ctx = this;     
      fetch('http://localhost:3000/movies')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("réponse du backend",data)
        ctx.setState({
          movies:data.body.results
        })
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });
      console.log("après affichage");

      fetch('http://localhost:3000/mymovies')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data.data)
        var moviesNameListCopy = data.data.map((movie) => {
          return movie.title;
        });
        console.log("réponse du backend",data)
        ctx.setState({
          moviesLiked:data.data,
          moviesCount: data.data.length,
          moviesNameList: moviesNameListCopy  
        })
        console.log(ctx.state.moviesLiked)
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });
     }


  handleClickLikeOn(){
    this.setState({
      viewOnlyLike: true,
    })
    console.log("clic détecté");
  }
  handleClickLikeOff(){
    this.setState({
      viewOnlyLike: false,
    })
    console.log("clic détecté");
  }
  handleClick(isSelected, movieName) {
    var moviesNameListCopy = [...this.state.moviesNameList]
    if (!isSelected){
      moviesNameListCopy.push(movieName);
    this.setState({
      moviesCount: this.state.moviesCount+1,
      moviesNameList : moviesNameListCopy,
    })
  } else {
    var index =moviesNameListCopy.indexOf(movieName)
    moviesNameListCopy.splice(index,1)
    this.setState({
      moviesCount: this.state.moviesCount-1,
      moviesNameList : moviesNameListCopy,
    })
  }
    console.log("click détecté");
  }

  render(){
    var moviesData = [...this.state.movies];
    var movieList = moviesData.map((movie, i) => {
      var isLiked = false;
      for (var y = 0; y < this.state.moviesLiked.length; y++) {
        console.log(movie.id)
        if (movie.id === this.state.moviesLiked[y].idMovieDB) {
          isLiked = true;
          break;
        }
      }
      console.log(isLiked)
      return(<Movies
        key={i} 
        movieName={movie.title} 
        movieDesc={movie.overview} 
        movieImg={"https://image.tmdb.org/t/p/w500/"+movie.poster_path}
        displayOnlyLike={this.state.viewOnlyLike}
        handleClickParent={this.handleClick}
        idMovie={movie.id}
        movieLiked = {isLiked}

        />)
    });
    var moviesCount = this.state.moviesCount
    // 4 movies to try
 
    var moviesLast;
    console.log(this.state.moviesLiked)
    // We need the 3 Last movies,
    var lastMovie1 = this.state.moviesNameList[this.state.moviesCount - 1]
    var lastMovie2 = this.state.moviesNameList[this.state.moviesCount - 2]
    var lastMovie3 = this.state.moviesNameList[this.state.moviesCount - 3]
 
    if(this.state.moviesCount === 0){
      moviesLast = 'Aucun Film sélectionné '
    }
    if(this.state.moviesCount === 1){
      moviesLast = lastMovie1
    }
    if(this.state.moviesCount === 2){
      moviesLast = `${lastMovie1}, ${lastMovie2}`
    }
    if(this.state.moviesCount >= 3){
      moviesLast = `${lastMovie1}, ${lastMovie2}, ${lastMovie3}`
    }
    
  return (
    <div className="App">
      <Col xs="12" md="5">
        <div style={{marginBottom:"30px"}}>
          <Navbar light expand="md">
            <NavbarBrand href="/"><img src="./logo.png"></img></NavbarBrand>
              <Nav className="ml-auto" navbar>
               <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOff} style={{color:"white"}}>Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOn} style={{color:"white"}}>My movies</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{color:"white",backgroundColor:"grey",borderRadius:"20%"}}>
                {this.state.moviesCount}
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>
                    {moviesLast}
                </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
      </div>
      </Col>
    <Container>
      <Row>
      {movieList}
      </Row>
    </Container>
    </div>
  );
}}

export default App;
