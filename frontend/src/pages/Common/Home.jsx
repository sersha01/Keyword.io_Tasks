import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/Header/Header';
import Home from '../../components/Home/Home';
import Modal from '../../components/Modal/Modal';

const AdminHome = () => {
    // useEffect(() => {
    //     getUsers()
    // } , [])

  return (
    <Container>
        <Header />
        <Home />
        <Modal />
    </Container>
  )
}

export default AdminHome