const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'
    : 'https://meijia-home-production.up.railway.app/api';

const api = {
    async request(url, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        try {
            const response = await fetch(`${API_BASE}${url}`, {
                ...options,
                headers
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, message: '网络错误' };
        }
    },

    get(url) {
        return this.request(url);
    },

    post(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    // User
    login(username, password) {
        return this.post('/user/login', { username, password });
    },

    register(username, phone, password) {
        return this.post('/user/register', { username, phone, password });
    },

    getUserInfo() {
        return this.get('/user/info');
    },

    // Products
    getProducts(category, keyword) {
        let url = '/product/list?';
        if (category) url += `category=${category}&`;
        if (keyword) url += `keyword=${keyword}&`;
        return this.get(url);
    },

    getHotProducts() {
        return this.get('/product/hot');
    },

    getProductDetail(id) {
        return this.get(`/product/${id}`);
    },

    // Orders
    createOrder(data) {
        return this.post('/order/create', data);
    },

    getOrders(status) {
        let url = '/order/list';
        if (status) url += `?status=${status}`;
        return this.get(url);
    },

    payOrder(orderNo) {
        return this.post(`/order/pay/${orderNo}`);
    },

    // Demands
    createDemand(data) {
        return this.post('/demand/create', data);
    },

    getMyDemands() {
        return this.get('/demand/list');
    },

    // Init
    initData() {
        return this.get('/init/data');
    }
};

function showToast(message, duration = 2000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function saveAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/pages/login.html';
}

function formatPrice(price) {
    return '¥' + Number(price).toLocaleString('zh-CN', { minimumFractionDigits: 2 });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN');
}

function getCategoryIcon(category) {
    const icons = {
        '瓷砖': '🧱',
        '卫浴': '🚿',
        '家具': '🛋️',
        '灯具': '💡',
        '涂料': '🎨',
        '地板': '🪵',
        '木板': '🪵',
        '厨卫': '🍳'
    };
    return icons[category] || '📦';
}
