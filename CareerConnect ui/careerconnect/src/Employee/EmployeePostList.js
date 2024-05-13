import React, { useEffect, useState } from 'react';
import { getEmployeePost } from '../Services/EmployeePostService';

const EmployeePostList = () => {
    const [employeePost, setEmployeePost] = useState([]);

    useEffect(() => {
        fetchEmployeePosts();
    }, []);

    const fetchEmployeePosts = () => {
        getEmployeePost()
            .then(response => {
                setEmployeePost(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee posts:', error);
            });
    };

    return (
        <div className='container'>
            <h2>List of Employee Posts:</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Post Date</th>
                        <th>Attachments</th>
                    </tr>
                </thead>
                <tbody>
                    {employeePost.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{new Date(post.postDate).toLocaleDateString()}</td>
                            <td>
                                {post.attachments && (
                                    <ul>
                                        {post.attachments.map((attachment, index) => (
                                            <li key={index}>{attachment}</li>
                                        ))}
                                    </ul>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePostList;
