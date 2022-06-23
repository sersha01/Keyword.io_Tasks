import React, { useContext, useEffect } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext';
import style from './Home.module.css'

function Home() {
  let { user, books, setShow, setAction, retrieveBooks, deleteBook } = useContext(AuthContext);

  const handleShow = (id) => {
    setAction(id)
    setShow(true)
  }
  useEffect(() => {
    retrieveBooks()
  },[])
  return (
    <Col className='row m-0 px-5 px-sm-2 px-md-0' xs={12}>
    {books.map((book, idx) => (
      <Col xs={12} md={6} lg={4} className="my-4" key={idx}>
        <Card>
          <Card.Img variant="top" className={`${style.image}`} src={book.image} alt='Book image' />
          <Card.Body>
            <Card.Title className='d-flex justify-content-between'>
              <div>{[book.title]}<br/><span className={`${style.author} ps-5 text-muted`}>by {book.author}</span></div>
              </Card.Title>
            <Card.Text className={`${style.cardText}`}>
              {book.discription}
            </Card.Text>
            {user && (<Card.Text className='d-flex justify-content-around'>
              <Col className='px-3'>
                <Button variant="outline-dark" className='w-100' onClick={()=>{handleShow(book.id)}}>Edit</Button>
              </Col>
              <Col className='px-3'>
                <Button variant="outline-danger" className='w-100' onClick={()=>{deleteBook({id:book.id})}}>Delete</Button>
              </Col>
            </Card.Text>)}
          </Card.Body>
        </Card>
      </Col>
    ))}
    </Col>
  )
}

export default Home
