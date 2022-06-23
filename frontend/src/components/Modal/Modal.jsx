import { createRef, useContext, useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import src from './480x300.png';
import style from './Modal.module.css'

export default function FormModal(props) {
    const { show, setShow, action, createBook, updateBook, uploadImage, imageLink } = useContext(AuthContext)
    const [image, setImage] = useState(null)

    let fileInput = createRef();

    const handleClose = () => setShow(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = {
            title: e.target.book.value,
            author: e.target.author.value,
            description: e.target.description.value,
          }
        if (action === "Add") {
            await uploadImage(image).then(res =>{
              formData.image = imageLink;
              createBook(formData)
              handleClose();
            })
          } else {
            formData.id = action
            updateBook(formData)
            handleClose();
        }
    }

    function handleChange(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            setImage(e.target.result)
          }
          reader.readAsDataURL(input.files[0]);
      }
  }
  return (
    <Modal
      {...props}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
        {action === "Add" && (<>
        <Form.Group className="mb-3" controlId="formBasicImage" >
            <img src={image ? image : src} alt="Book Image" id="image" className={`${style.image}`} onClick={()=>fileInput.current.click()}/>
            <Form.Control type="file" ref={fileInput} className="d-none" name="image" onChange={(e)=>{handleChange(e.target)}}/>
        </Form.Group>
          </>)}

        <Form.Group className="mb-3" controlId="formBasicBook">
            <Form.Label>Book Name</Form.Label>
            <Form.Control type="text" name="book" placeholder="Book name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAuthor">
            <Form.Label>Author Name</Form.Label>
            <Form.Control type="text" name="author" placeholder="Author name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDiscription">
            <Form.Label>Discription</Form.Label>
            <Form.Control
          as="textarea"
          placeholder="Discription"
          style={{ height: '100px' }}
          name="description"
        />
        </Form.Group>
        <div className='d-flex justify-content-around'>
            <Button variant="secondary" className='w-25' onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" type="submit" className='w-25'>
                Submit
            </Button>
        </div>
      </Form>
      </Modal.Body>
    </Modal>
  );
}