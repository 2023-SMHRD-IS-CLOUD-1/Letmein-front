import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
function ContactCustomer() {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSaveChanges = () => {
        // 여기에 문의 등록 버튼을 클릭했을 때 처리해야 할 로직을 구현합니다.
        // 예를 들어, 입력한 제목과 문의사항을 가져와서 처리할 수 있습니다.
        console.log('Title:', title);
        console.log('Content:', content);

        // 처리가 완료되면 모달을 닫습니다.
        handleClose();
    };

    return (
        <>
            <Row className="justify-content-end">
                <h2 className="text-center">고객 문의</h2>
                <Col xs="auto">
                    <Button variant="dark" onClick={handleShow}>
                        고객문의&gt;&gt;
                    </Button>
                </Col>
            </Row>
            <br />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>고객 문의</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> 제목 </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="문의 제목을 입력하세요"
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>문의사항</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="dark" onClick={handleSaveChanges}>
                        문의 등록
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ContactCustomer;
