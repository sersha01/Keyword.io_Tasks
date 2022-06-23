import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Header = () => {
  let { user, logout, setShow, setAction } = useContext(AuthContext);
  const handleShow = () => {
    setShow(true)
    setAction("Add")
  }
  return (
    <Row>
      <Col className='h3'>Welcome {user ? user.username : 'to our library'}</Col>
      <Col className='d-flex justify-content-end pe-4 py-2'>
        {user ? <>
          <Button variant='outline-success' onClick={handleShow} className='px-4 me-2'>&#10010; Add New</Button>
          <Button variant='danger' onClick={logout} className='px-4'>Logout</Button>
          </>: <>
          <Link to='/login' className='px-4 me-2'><Button variant='outline-primary' className='px-4 me-2'>Login</Button></Link>
            
          </>}
      </Col>
    </Row>
  )
}

export default Header
