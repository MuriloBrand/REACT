import './App.css';
import { Header } from '../components/Header';
import{Trash, PencilCircle} from "phosphor-react"
import { EventCard } from '../components/EventCard';
import { useState } from 'react';
let eventosestaticos =[
  {
    id: 1,
    nome: "Protesto pelas ferias de três meses!",
    data:"SEX, 31/12/2012",
    img:"https://pos.ibmr.br/app/uploads/2021/01/planejamentoegestaodeventos-vitrine.jpg"
  },
  {
    id: 2,
    nome:"Reforço em API Javascript",
    data:"QUI, 06/07/2023",
    img:"https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1275224/retina_1708x683_cover-secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png"
  },
  {
    id: 3,
    nome:"São João",
    data:"QUI, 23/06/2023",
    img:"https://cdn.folhape.com.br/upload/dn_arquivo/2021/06/2606-lecticia-greg.jpg"
  }
]

export function App() {
  const [eventos, setEventos] = useState(eventosestaticos)
  const [nome, setNome] = useState("")
  const [data, setData] = useState("")
  const [img, setImg] = useState("")

function conveterImagem(e){
  const reader = new FileReader ();

  reader.readAsDataURL(e.target.files[0]);

  reader.onload = ()=>{
    setImg(reader.result)
  }
}
function criarNovoEvento(e){
  e.preventDefault()

  const id =eventos.length > 0 ? eventos[eventos.length - 1].id + 1: 1
  
  const novoEvento ={
    id,
    nome,
    data,
    img
  }
  setEventos([...eventos,novoEvento])
}
function deletarEventos(id){
  let confirmar = window.confirm ("Tem certeza que deseja excluir o evento?")
  if(confirmar){
  const eventosAtualizados = eventos.filter(evento =>evento.id !== id)
  
  setEventos(eventosAtualizados)
  }
}
  return (
  <> 
   <Header/>
    <h1 className='nome-title'>Bem vindos ao site de eventos! </h1>
    <section className='container'>
    <form onSubmit={criarNovoEvento}>
      <div>
        <label htmlFor='nome'>Nome</label>
        <input onChange={(e)=>{setNome(e.target.value)}} type='text' id='nome'/>
      </div>
      <div>
        <label htmlFor='data'>Data</label>
        <input onChange={(e)=>{setData(e.target.value)}} type='text' id='data'/>
      </div>
      <div className='label-imagem'>
        <label htmlFor='imagem'>Selecione a imagem do evento</label>
        <input onChange={conveterImagem} type='file' id='imagem'/>
      </div>
      <div className='preview-imagem'>
        <img style={{display: img ? 'initial':'none'}} src={img} alt=''/>

      </div>
      <button>Cadastrar Eventos</button>

    </form>
   <div className='container-eventos'>
      
      {eventos.map(evento =>{
        return(
      <EventCard
        key={evento.id}
        id={evento.id}
        nome={evento.nome}
        data={evento.data}
        img={evento.img}
        deletarEventos={deletarEventos}
      />
      )
      })}


   </div>
   </section>
  </>

  );
}

export default App;
