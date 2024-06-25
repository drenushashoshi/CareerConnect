import React, { useEffect, useState } from 'react';
import notificationService from '../Services/notificationService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Badge, Button } from 'react-bootstrap';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const companyId = sessionStorage.getItem('companyId');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await notificationService.getNotifications(token, companyId);
            console.log("Fetched notifications:", data);

            let formattedNotifications = [];

            if (Array.isArray(data)) {
                formattedNotifications = data.map(notification => ({
                    id: notification.id,
                    message: notification.message,
                    read: notification.read,
                    companyId: notification.companyId
                }));
            } else {
                console.log("Invalid data structure:", data);
            }

            setNotifications(formattedNotifications.reverse());
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setNotifications([]);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markAsRead(id, token);
            fetchNotifications();
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await notificationService.deleteNotification(id, token);
            fetchNotifications();
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const unreadCount = notifications.filter(notification => !notification.read).length;

    return (
        <Dropdown show={show} onToggle={() => setShow(!show)} align="start"  >
            <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ border: 'none', color: '#6c757d' }}>
                Notifications {unreadCount > 0 && <Badge bg="danger">{unreadCount}</Badge>}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '300px'}}>
                {notifications.length === 0 ? (
                    <Dropdown.ItemText>No notifications</Dropdown.ItemText>
                ) : (
                    <div style={{ maxHeight: '150px', overflowY: 'auto', overflowX: 'hidden' }}>
                        {notifications.map(notification => (
                            <Dropdown.Item
                                key={notification.id}
                                className="d-flex justify-content-between align-items-center"
                                style={{ padding: '10px', borderBottom: '1px solid #ddd', whiteSpace: 'normal' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: notification.read ? 'normal' : 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {notification.message || 'No message'}
                                    </div>
                                </div>
                                <div className="d-flex flex-column ms-2">
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        style={{ minWidth: '75px', textAlign: 'center', padding: '2px' }}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        Read
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        style={{ minWidth: '75px', textAlign: 'center', padding: '2px', marginTop: '5px' }}
                                        onClick={() => handleDelete(notification.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationDropdown;
