import React, { useEffect, useState } from 'react';
import { listEmployeePosts, deleteEmployeePost } from '../Services/EmployeePostService';
import EmployeeService from '../Services/EmployeeService';

const EmployeePostList = () => {
    const [employeePosts, setEmployeePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isEmployee = EmployeeService.isEmployee();

    useEffect(() => {
        fetchEmployeePosts();
    }, []);

    const fetchEmployeePosts = async () => {
        try {
            const data = await listEmployeePosts();
            setEmployeePosts(data);
        } catch (error) {
            setError('Error fetching employee posts');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await deleteEmployeePost(postId);
            setEmployeePosts(employeePosts.filter(post => post.id !== postId));
        } catch (error) {
            setError('Error deleting employee post');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                    {isEmployee && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {employeePosts.length > 0 ? (
                    employeePosts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{new Date(post.postDate).toLocaleDateString()}</td>
                            {isEmployee && (
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={isEmployee ? 5 : 4} className="text-center">No posts available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePostList;
