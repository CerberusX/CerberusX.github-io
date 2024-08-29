function switchLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.innerHTML = text; // 使用 innerHTML 而不是 innerText
        }
    });
}


// 默认语言设置
document.addEventListener('DOMContentLoaded', function() {
    switchLanguage('zh'); // 默认显示英文
});

// 添加导航链接的点击事件，使用平滑滚动
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, `#${targetId}`); // 更新URL但不影响平滑滚动
        }
    });
});

// 页面加载时，不自动滚动到哈希位置，始终显示在顶部
document.addEventListener('DOMContentLoaded', function() {
    // 清除哈希值，以防止页面自动滚动
    history.scrollRestoration = 'manual'; // 防止浏览器的自动滚动恢复
    window.scrollTo(0, 0); // 强制页面滚动到顶部
});

function showResume() {
    const resumeContainer = document.getElementById('resumeContainer');
    const existingFrame = document.getElementById('resumePDF');

    if (existingFrame && resumeContainer.contains(existingFrame)) {
        // 如果PDF框已经存在并且是resumeContainer的子节点，点击按钮时移除它
        resumeContainer.removeChild(existingFrame);
    } else {
        // 如果PDF框不存在，创建并显示它
        const pdfFrame = document.createElement('iframe');
        pdfFrame.id = 'resumePDF';
        pdfFrame.src = '黄宇航中文简历.pdf'; // 替换为你的PDF路径
        pdfFrame.style.width = '100%';
        pdfFrame.style.height = '500px'; // 设置高度，确保可见性
        resumeContainer.appendChild(pdfFrame);

        // 滚动到PDF阅览框
        resumeContainer.scrollIntoView({ behavior: 'smooth' });
    }
}




function closeResume() {
    const pdfModal = document.getElementById('pdfModal');
    const resumePDF = document.getElementById('resumePDF');

    // Hide the modal
    pdfModal.style.display = 'none';

    // Optional: Clear the PDF src to stop loading it
    resumePDF.src = '';
}

// Close the modal when clicking anywhere outside of the modal content
window.onclick = function(event) {
    const pdfModal = document.getElementById('pdfModal');
    if (event.target === pdfModal) {
        closeResume();
    }
}




function openModal() {
    document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// 点击模态窗口外部时关闭窗口
window.onclick = function(event) {
    if (event.target == document.getElementById('imageModal')) {
        closeModal();
    }
}

// let lastScrollTop = 0;
// const navbar = document.querySelector('nav'); // 选择导航栏

// window.addEventListener("scroll", function() {
//     let st = window.pageYOffset || document.documentElement.scrollTop;
//     let direction = st > lastScrollTop ? "down" : "up";

//     // 将 body 内容进行 transform，而不包括导航栏
//     if (direction === "down") {
//         document.body.style.transform = "translateY(-10px) scale(1.06)";
//     } else {
//         document.body.style.transform = "translateY(10px) scale(0.94)";
//     }

//     // 重置 transform，但不影响导航栏
//     setTimeout(() => {
//         document.body.style.transform = "translateY(0) scale(1)";
//     }, 200);

//     lastScrollTop = st <= 0 ? 0 : st; // 处理负滚动或移动端情况
// }, false);

let lastScrollTop = 0;
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            // 计算滚动的偏移量
            const delta = st - lastScrollTop;

            // 应用transform以制造拖拽感
            document.body.style.transform = `translateY(${delta * 0.4}px)`;

            // 延时恢复原位
            setTimeout(() => {
                document.body.style.transform = 'translateY(0)';
            }, 400); // 可以调整此值以改变延时的感觉

            lastScrollTop = st;
            ticking = false;
        });

        ticking = true;
    }
});
