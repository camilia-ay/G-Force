// 多语言内容
const translations = {
    'zh-CN': {
        welcome: '我是G Force Mel AI,很高兴见到你!',
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
        welcome: 'I am G Force Mel AI, nice to meet you!',
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
let currentLang = 'zh-CN';

// DOM元素
const languageToggle = document.getElementById('language-toggle');
const welcomeMessage = document.getElementById('welcome-message');
const form = document.getElementById('appointment-form');
const successMessage = document.getElementById('success-message');
const timeSelect = document.getElementById('time');
const dateInput = document.getElementById('date');

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 设置日期选择器最小日期为今天
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // 初始化时间选择器
    updateTimeSelect();
    
    // 初始化语言切换按钮
    updateLanguageToggle();
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
    successMessage.style.display = 'block';
}

function hideSuccessMessage() {
    successMessage.style.display = 'none';
}

// 模拟发送邮件
function sendEmail(formData) {
    const emailContent = `
        预约详情:
        姓名: ${formData.name}
        电话: ${formData.phone}
        订单号: ${formData.order}
        取件日期: ${formData.date}
        取件时段: ${formData.time}
    `;
    
    // 在实际应用中，这里应该调用邮件发送API
    console.log('发送邮件到: 387910581@qq.com');
    console.log(emailContent);
    
    // 模拟发送(实际项目中需要替换为真实邮件发送逻辑)
    fetch('https://api.example.com/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: '387910581@qq.com',
            subject: '新的预约请求',
            text: emailContent
        })
    }).catch(error => {
        console.error('邮件发送失败:', error);
    });
}
