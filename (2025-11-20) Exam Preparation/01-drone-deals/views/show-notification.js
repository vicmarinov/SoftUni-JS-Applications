const NOTIFICATION_SHOWING_TIME_IN_MILLISECONDS = 3 * 1000;

export function showNotification (message) {
    const notificationContainer = document.getElementById('errorBox');
    const notificationField = notificationContainer.querySelector('span.msg');

    notificationContainer.style.display = 'block';
    notificationField.textContent = message;

    setTimeout(() => {
        notificationContainer.style.display = 'none';
        notificationField.textContent = '';
    }, NOTIFICATION_SHOWING_TIME_IN_MILLISECONDS);
}