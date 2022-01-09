import Index from '$routes/Index.svelte';
import Login from '$routes/Login.svelte';
import Register from '$routes/Register.svelte';

export default {
    '/': Index,
    '/login': Login,
    '/register': Register,
}