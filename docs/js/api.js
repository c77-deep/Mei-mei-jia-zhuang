// 使用本地存储模式（无需后端服务器）
const USE_LOCAL_STORAGE = true;

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'
    : 'https://meijia-home-production.up.railway.app/api';

// 快速体验功能 - 自动创建临时用户
function quickLogin() {
    let user = getUser();
    if (!user) {
        // 创建临时用户
        const tempUser = {
            username: 'temp_' + Date.now(),
            nickname: '体验用户',
            phone: ''
        };
        const token = 'quick_token_' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(tempUser));
        
        // 保存到用户列表
        const users = localDB.getUsers();
        users.push({
            ...tempUser,
            password: 'temp123',
            createTime: new Date().toISOString()
        });
        localDB.saveUsers(users);
        
        return tempUser;
    }
    return user;
}

// 本地存储数据管理
const localDB = {
    getProducts() {
        const products = localStorage.getItem('products');
        if (!products) {
            // 初始化示例数据
            const defaultProducts = [
                { id: 1, name: '诺贝尔瓷砖 现代简约灰', category: '瓷砖', price: 89, brand: '诺贝尔', sales: 1234, icon: '🧱' },
                { id: 2, name: '东鹏瓷砖 大理石纹', category: '瓷砖', price: 129, brand: '东鹏', sales: 856, icon: '🧱' },
                { id: 3, name: '科勒智能马桶', category: '卫浴', price: 2999, brand: '科勒', sales: 567, icon: '🚿' },
                { id: 4, name: '九牧花洒套装', category: '卫浴', price: 899, brand: '九牧', sales: 2341, icon: '🚿' },
                { id: 5, name: '欧普吸顶灯', category: '灯具', price: 299, brand: '欧普', sales: 3456, icon: '💡' },
                { id: 6, name: '雷士射灯', category: '灯具', price: 59, brand: '雷士', sales: 5678, icon: '💡' },
                { id: 7, name: '索菲亚全屋定制', category: '定制', price: 19999, brand: '索菲亚', sales: 234, icon: '🚪' },
                { id: 8, name: '欧派橱柜定制', category: '定制', price: 15999, brand: '欧派', sales: 345, icon: '🚪' },
                { id: 9, name: '多乐士墙面漆', category: '涂料', price: 399, brand: '多乐士', sales: 4567, icon: '🎨' },
                { id: 10, name: '立邦净味漆', category: '涂料', price: 299, brand: '立邦', sales: 6789, icon: '🎨' },
                { id: 11, name: '圣象实木地板', category: '地板', price: 199, brand: '圣象', sales: 2345, icon: '🪵' },
                { id: 12, name: '大自然复合地板', category: '地板', price: 129, brand: '大自然', sales: 3456, icon: '🪵' },
                { id: 13, name: 'TATA木门', category: '门窗', price: 1599, brand: 'TATA', sales: 1234, icon: '🚪' },
                { id: 14, name: '盼盼防盗门', category: '门窗', price: 2999, brand: '盼盼', sales: 567, icon: '🚪' },
                { id: 15, name: '方太油烟机', category: '厨电', price: 3999, brand: '方太', sales: 890, icon: '🍳' },
                { id: 16, name: '老板燃气灶', category: '厨电', price: 1999, brand: '老板', sales: 1234, icon: '🍳' }
            ];
            localStorage.setItem('products', JSON.stringify(defaultProducts));
            return defaultProducts;
        }
        return JSON.parse(products);
    },
    
    getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    },
    
    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }
};

const api = {
    async request(url, options = {}) {
        // 如果使用本地存储模式
        if (USE_LOCAL_STORAGE) {
            return this.handleLocalRequest(url, options);
        }
        
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
    
    handleLocalRequest(url, options = {}) {
        const method = options.method || 'GET';
        const body = options.body ? JSON.parse(options.body) : null;
        
        // 用户登录
        if (url === '/user/login' && method === 'POST') {
            const users = localDB.getUsers();
            const user = users.find(u => u.username === body.username && u.password === body.password);
            if (user) {
                const token = 'local_token_' + Date.now();
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ username: user.username, nickname: user.nickname, phone: user.phone }));
                return { success: true, data: { token, user: { username: user.username, nickname: user.nickname } } };
            }
            return { success: false, message: '用户名或密码错误' };
        }
        
        // 用户注册
        if (url === '/user/register' && method === 'POST') {
            const users = localDB.getUsers();
            if (users.find(u => u.username === body.username)) {
                return { success: false, message: '用户名已存在' };
            }
            const newUser = {
                id: users.length + 1,
                username: body.username,
                phone: body.phone,
                password: body.password,
                nickname: body.username,
                createTime: new Date().toISOString()
            };
            users.push(newUser);
            localDB.saveUsers(users);
            return { success: true, message: '注册成功' };
        }
        
        // 获取用户信息
        if (url === '/user/info' && method === 'GET') {
            const user = localStorage.getItem('user');
            if (user) {
                return { success: true, data: JSON.parse(user) };
            }
            return { success: false, message: '未登录' };
        }
        
        // 获取商品列表
        if (url.startsWith('/product/list') && method === 'GET') {
            const products = localDB.getProducts();
            const params = new URLSearchParams(url.split('?')[1]);
            let filtered = [...products];
            
            if (params.get('category')) {
                filtered = filtered.filter(p => p.category === params.get('category'));
            }
            if (params.get('keyword')) {
                const keyword = params.get('keyword').toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));
            }
            
            return { success: true, data: filtered };
        }
        
        // 获取热门商品
        if (url === '/product/hot' && method === 'GET') {
            const products = localDB.getProducts();
            const hot = products.sort((a, b) => b.sales - a.sales).slice(0, 8);
            return { success: true, data: hot };
        }
        
        // 获取商品详情
        if (url.startsWith('/product/') && method === 'GET') {
            const id = parseInt(url.split('/')[2]);
            const products = localDB.getProducts();
            const product = products.find(p => p.id === id);
            if (product) {
                return { success: true, data: product };
            }
            return { success: false, message: '商品不存在' };
        }
        
        // 创建订单
        if (url === '/order/create' && method === 'POST') {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const newOrder = {
                id: orders.length + 1,
                orderNo: 'ORD' + Date.now(),
                ...body,
                status: '待付款',
                createTime: new Date().toISOString()
            };
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
            return { success: true, data: newOrder };
        }
        
        // 获取订单列表
        if (url.startsWith('/order/list') && method === 'GET') {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            return { success: true, data: orders };
        }
        
        // 创建需求
        if (url === '/demand/create' && method === 'POST') {
            const demands = JSON.parse(localStorage.getItem('demands') || '[]');
            const newDemand = {
                id: demands.length + 1,
                ...body,
                status: '待处理',
                createTime: new Date().toISOString()
            };
            demands.push(newDemand);
            localStorage.setItem('demands', JSON.stringify(demands));
            return { success: true, data: newDemand };
        }
        
        // 获取需求列表
        if (url === '/demand/list' && method === 'GET') {
            const demands = JSON.parse(localStorage.getItem('demands') || '[]');
            return { success: true, data: demands };
        }
        
        // 初始化数据
        if (url === '/init/data' && method === 'GET') {
            return { success: true, message: '数据已初始化' };
        }
        
        return { success: false, message: '接口不存在' };
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
