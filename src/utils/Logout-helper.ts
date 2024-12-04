export const logoutHelper = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('Municipio');
    localStorage.removeItem('user');
    window.location.href = '/login';
};