import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { ReactComponent as EditButton } from '../Company/pencil.svg';
import { ReactComponent as DeleteButton } from '../Company/trash.svg';
import Modal from 'react-bootstrap/Modal';
import {
    getAllEmployeePosts,
    downloadImage,
    updateEmployeePost,
    deleteEmployeePost,
    getEmployeePost
} from '../Services/EmployeePostService';
import EmployeeService from "../Services/EmployeeService";
import { format } from 'date-fns';

const EmployeePostList = ({ employeeId, loggedInEmployeeId }) => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [postChanges, setPostChanges] = useState(0);
    const [images, setImages] = useState({});
    const [modalImage, setModalImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);
    const isEmployee = EmployeeService.isEmployee();

    useEffect(() => {
        fetchPosts(employeeId);
    }, [employeeId, postChanges]);

    const fetchPosts = async (employeeId) => {
        try {
            const response = await getAllEmployeePosts(employeeId);
            setPosts(response);
            await fetchImages(response);
        } catch (error) {
            console.log('Gabim gjatë marrjes së postimeve', error);
        }
    };

    const fetchImages = async (postList) => {
        const imagePromises = postList.map(post =>
            downloadImage(post.id)
                .then(imageData => {
                    const blob = new Blob([imageData], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    return { id: post.id, url };
                })
                .catch(error => {
                    console.error(`Gabim gjatë marrjes së imazhit për postimin me id ${post.id}:`, error);
                    return { id: post.id, url: null };
                })
        );

        const imageResults = await Promise.all(imagePromises);
        const imageMap = imageResults.reduce((acc, img) => ({ ...acc, [img.id]: img.url }), {});
        setImages(imageMap);
    };

    const handleShowModal = (id) => {
        setShowModal(true);
        setPostId(id);
        getEmployeePost(id)
            .then((response) => {
                const { title, content } = response;
                setTitle(title);
                setContent(content);
            })
            .catch(error => {
                console.error(error);
            });

        downloadImage(id)
            .then(imageData => {
                const blob = new Blob([imageData], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                setModalImage(url);
            })
            .catch(error => {
                console.error(`Gabim gjatë marrjes së imazhit për postimin me id ${id}:`, error);
                setModalImage(null);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPostId(null);
        setModalImage(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setTitleError('');
        setContentError('');

        let isValid = true;
        if (!title.trim()) {
            setTitleError('Titulli nuk mund të jetë bosh');
            isValid = false;
        }
        if (!content.trim()) {
            setContentError('Përmbajtja nuk mund të jetë bosh');
            isValid = false;
        }

        if (isValid) {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Ju nuk jeni të autentifikuar. Ju lutemi hyni fillimisht.');
                return;
            }

            const formData = new FormData();
            formData.append('post', JSON.stringify({ title, content }));
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            try {
                const response = await updateEmployeePost(postId, formData, token);
                console.log(response);
                handleCloseModal();
                setPostChanges(prev => prev + 1);
            } catch (error) {
                console.error("Gabim gjatë përditësimit të postimit:", error);
            }
        }
    };

    const confirmDeletePost = (postId) => {
        setDeletePostId(postId);
        setShowDeleteModal(true);
    };

    const handleDeletePost = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Ju nuk jeni të autentifikuar. Ju lutemi hyni fillimisht.');
            return;
        }

        try {
            const response = await deleteEmployeePost(deletePostId, token);
            console.log(response);
            setPostChanges(prev => prev + 1);
            setShowDeleteModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="container-lg d-flex justify-content-center">
            <MDBRow className="row-cols-1 g-4">
                {sortedPosts.map(post => (
                    <MDBCol key={post.id} className="mb-4 d-flex justify-content-center">
                        <MDBCard className="h-100" style={{ backgroundColor: '#e3f2fd', margin: '0rem', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
                            <MDBCardBody className="text-center" style={{ padding: '1rem', margin: '0.5rem'}}>
                                {post.employeeId == loggedInEmployeeId && isEmployee && (
                                    <div className="position-absolute top-0 end-0 mt-2 me-2">
                                        <button
                                            onClick={() => handleShowModal(post.id)}
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                padding: 0,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <EditButton />
                                        </button>
                                        <br />
                                        <button
                                            onClick={() => confirmDeletePost(post.id)}
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                padding: 0,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <DeleteButton />
                                        </button>
                                    </div>
                                )}
    
                                <MDBCardText tag="h5" className="mb-3">{post.title}</MDBCardText>
    
                                {images[post.id] ? (
                                    <img src={images[post.id]} alt={`${post.title}`} className="img-fluid mb-3" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                ) : (
                                    <div className="placeholder mb-3" style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0' }}></div>
                                )}
                                <MDBCardText style={{ whiteSpace: 'pre-wrap', fontSize: '1.2em' }}>{post.content}</MDBCardText>
                                <MDBCardText className="text-muted" style={{ fontSize: '0.9em' }}>
                                    {format(new Date(post.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className='text-center custom-font'>
                    <MDBCard className="mb-4" style={{ backgroundColor: '#e3f2fd', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
                        <form onSubmit={handleSubmit}>
                            <MDBCardBody className="text-center">
                                {modalImage ? (
                                    <img src={modalImage} alt={`${title}`} className="img-fluid rounded-circle mb-2" style={{ width: '100px', height: '100px' }} />
                                ) : (
                                    <div className="placeholder rounded-circle mb-2" style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0' }}></div>
                                )}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                            type="text"
                                            placeholder='Titulli'
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                                setTitleError('');
                                            }}
                                        />
                                        {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
                                    </MDBCol>
                                </MDBRow><br />
                                <MDBInput
                                    type="text"
                                    placeholder='Përmbajtja'
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                        setContentError('');
                                    }}
                                />
                                {contentError && <div style={{ color: 'red' }}>{contentError}</div>}<br />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
    
                                <MDBBtn
                                    className='mb-3 btn-primary'
                                    type="submit"
                                    style={{
                                        border: '1px solid #0d6efd',
                                        width: '160px',
                                        height: '40px'
                                    }}
                                >
                                    Ruaj Ndryshimet
                                </MDBBtn>
                            </MDBCardBody>
                        </form>
                    </MDBCard>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body className='text-center custom-font'>
                    <h5>A jeni i sigurt qe doni ta fshini?</h5>
                    <div className="d-flex justify-content-center mt-4">
                        <MDBBtn
                            className='me-2'
                            style={{ width: '100px' }}
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Anulo
                        </MDBBtn>
                        <MDBBtn
                            className='ms-2'
                            color='danger'
                            style={{ width: '100px' }}
                            onClick={handleDeletePost}
                        >
                            Fshij
                        </MDBBtn>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
    
};

export default EmployeePostList;
