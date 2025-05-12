// 多语言内容
const translations = {
    'zh-CN': {
        welcome: 'Gforce Freight Mel 提货预约',
        name: '收货人姓名',
        phone: '联系电话',
        order: '订单号',
        date: '取件日期',
        time: '取件时段',
        submit: '提交预约',
        success: '您已预约成功',
        selectTime: '请选择时段',
        timeSlots: [
            '09:30-10:00', '10:00-10:30', '10:30-11:00',
            '11:00-11:30', '11:30-12:00', '12:00-12:30',
            '12:30-13:00', '13:00-13:30', '13:30-14:00',
            '14:00-14:30', '14:30-15:00', '15:00-15:30',
            '15:30-16:00', '16:00-16:30'
        ]
    },
    'en': {
        welcome: 'Gforce Freight Mel pick up reservation',
        name: 'Recipient Name',
        phone: 'Phone Number',
        order: 'Order Number',
        date: 'Pickup Date',
        time: 'Pickup Time',
        submit: 'Submit Appointment',
        success: 'Your appointment has been booked',
        selectTime: 'Please select time slot',
        timeSlots: [
            '09:30-10:00', '10:00-10:30', '10:30-11:00',
            '11:00-11:30', '11:30-12:00', '12:00-12:30',
            '12:30-13:00', '13:00-13:30', '13:30-14:00',
            '14:00-14:30', '14:30-15:00', '15:00-15:30',
            '15:30-16:00', '16:00-16:30'
        ]
    }
};

// 当前语言状态
let currentLang = 'en';

// DOM元素
const languageToggle = document.getElementById('language-toggle');
const welcomeMessage = document.getElementById('welcome-message');
const form = document.getElementById('appointment-form');
const successMessage = document.getElementById('success-message');
const timeSelect = document.getElementById('time');
const dateInput = document.getElementById('date');

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 设置日期选择器，禁用今天和周末，且只能选择一个月内的日期
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);
    
    dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    
    // 简单有效的周末禁用
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay();
        if (day === 0 || day === 6) { // 0是周日，6是周六
            this.value = ''; // 清空选择
            alert(currentLang === 'zh-CN' ? '只能选择工作日(周一至周五)' : 'Please select a weekday (Monday to Friday)');
        }
    });
    
    // 初始化时间选择器
    updateTimeSelect();
    
    // 初始化语言切换按钮
    updateLanguageToggle();
    // 初始化语言
    updateLanguage();
});

// 语言切换功能
languageToggle.addEventListener('click', function() {
    currentLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    updateLanguage();
    updateLanguageToggle();
});

function updateLanguage() {
    // 更新页面文本
    welcomeMessage.textContent = translations[currentLang].welcome;
    document.querySelector('label[for="name"]').textContent = translations[currentLang].name;
    document.querySelector('label[for="phone"]').textContent = translations[currentLang].phone;
    document.querySelector('label[for="order"]').textContent = translations[currentLang].order;
    document.querySelector('label[for="date"]').textContent = translations[currentLang].date;
    document.querySelector('label[for="time"]').textContent = translations[currentLang].time;
    document.querySelector('.submit-btn').textContent = translations[currentLang].submit;
    successMessage.textContent = translations[currentLang].success;
    
    // 更新时间选择器
    updateTimeSelect();
}

function updateLanguageToggle() {
    languageToggle.textContent = currentLang === 'zh-CN' ? 'EN' : '中文';
}

function updateTimeSelect() {
    // 清空现有选项
    timeSelect.innerHTML = '';
    
    // 添加默认选项
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = translations[currentLang].selectTime;
    timeSelect.appendChild(defaultOption);
    
    // 添加时间选项
    translations[currentLang].timeSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
    });
}

// 表单提交处理
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 验证表单
    if (validateForm()) {
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            order: document.getElementById('order').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };
        
        // 发送邮件(模拟)
        sendEmail(formData);
        
        // 显示成功消息
        showSuccessMessage();
        
        // 3秒后重置表单
        setTimeout(() => {
            form.reset();
            hideSuccessMessage();
        }, 3000);
    }
});

function validateForm() {
    let isValid = true;
    
    // 简单验证所有必填字段
    const requiredFields = ['name', 'phone', 'order', 'date', 'time'];
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value) {
            isValid = false;
            showError(element, '此字段为必填项');
        } else {
            hideError(element);
        }
    });
    
    // 验证电话号码格式
    const phone = document.getElementById('phone').value;
    if (phone && !/^\d+$/.test(phone)) {
        isValid = false;
        showError(document.getElementById('phone'), '请输入有效的电话号码');
    }
    
    return isValid;
}

function showError(element, message) {
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(element) {
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}

function showSuccessMessage() {
    successMessage.textContent = translations[currentLang].success;
    successMessage.style.display = 'block';
}

function hideSuccessMessage() {
    successMessage.style.display = 'none';
}

// 模拟发送邮件
function sendEmail(formData) {
    const data = new FormData();
    data.append('accessKey', 'sf_hgdjhb56haaec52cfg44e81n');
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('order', formData.order);
    data.append('date', formData.date);
    data.append('time', formData.time);

    fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('邮件发送成功');
        } else {
            console.error('邮件发送失败:', data);
        }
    })
    .catch(error => {
        console.error('邮件发送失败:', error);
    });
}
