import React, { Component} from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = ()=>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = ()=>{
    // leer el state de la pagina actual
    let pagina = this.state.pagina;

    // Si la pagina es 1, ya no ir mas atras
    if(pagina===1) return null;

    // Resta uno a la pagina actual
    pagina-=1;

    //agregar el cambio al state
    this.setState({
      pagina
    }, ()=>{
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);
  }
  paginaSiguiente = ()=>{
    // leer el state de la pagina actual
    let pagina = this.state.pagina;

    // Sumar uno a la pagina actual
    pagina+=1;

    //agregar el cambio al state
    this.setState({
      pagina
    }, ()=>{
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);
  }
  consultarApi =() =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=20483101-0549ef7f61c4201a550e8637a&q=${termino}&per_page=30&page=${pagina}`;
    //console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes : resultado.hits }) )
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino: termino,
      pagina: 1
    }, ()=>{
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
