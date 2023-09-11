function getDPI() {
    const tester = document.getElementById('dpi-tester');
    return tester.offsetWidth;
}

let currentUnit = 'cm'; // 默认单位为厘米

document.querySelector('.cm-option').addEventListener('click', function() {
    if (currentUnit !== 'cm') {
        currentUnit = 'cm';
        generateRuler();
        this.classList.add('selected');
        document.querySelector('.inch-option').classList.remove('selected');
    }
});

document.querySelector('.inch-option').addEventListener('click', function() {
    if (currentUnit !== 'inch') {
        currentUnit = 'inch';
        generateRuler();
        this.classList.add('selected');
        document.querySelector('.cm-option').classList.remove('selected');
    }
});

function generateRuler() {
    const ruler = document.getElementById('ruler');
    ruler.innerHTML = ''; // 清空尺子上的内容，以便重新生成

    const dpi = getDPI(); // 使用新的方法获取DPI

    // 计算屏幕的对角线像素数
    const diagonalPixels = Math.sqrt(Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2));
    
    // 将对角线像素数转换为英寸
    const diagonalInches = diagonalPixels / dpi;

    // 显示对角线英寸数
    document.getElementById('diagonalSize').textContent = diagonalInches.toFixed(2); // 使用toFixed(2)限制小数点后的数字数量为2

    const pixelsPerCm = dpi / 2.54; // 每厘米的像素数
    const pixelsPerInch = dpi; // 每英寸的像素数
    const pixelsPerTenthInch = dpi / 10; // 每0.1英寸的像素数
    const pixelsPerMm = pixelsPerCm / 10; // 每毫米的像素数

    const rulerLength = currentUnit === 'cm' ? diagonalInches * 2.54 : diagonalInches; // 尺子的长度（厘米或英寸）

    const offset =10; // 添加20像素的偏移量

    if (currentUnit === 'cm') {
        for (let i = 0; i <= rulerLength * 10; i++) {
            const tick = document.createElement('div');
            tick.classList.add('tick');
            if (i % 10 === 0) {
                tick.classList.add('tick-long');
                const label = document.createElement('div');
                label.classList.add('label');
                label.style.left = `${i * pixelsPerMm + offset}px`;
                label.textContent = `${i / 10}`;
                ruler.appendChild(label);
            } else if (i % 5 === 0) {
                tick.classList.add('tick-5mm');
            } else {
                tick.classList.add('tick-mm');
            }
            tick.style.left = `${i * pixelsPerMm + offset}px`;
            ruler.appendChild(tick);
        }
    } else {
        for (let i = 0; i <= rulerLength * 10; i++) {
            const tick = document.createElement('div');
            tick.classList.add('tick');
            if (i % 10 === 0) {
                tick.classList.add('tick-long');
                const label = document.createElement('div');
                label.classList.add('label');
                label.style.left = `${i * pixelsPerTenthInch + offset}px`;
                label.textContent = `${i / 10}`;
                ruler.appendChild(label);
            } else if (i % 5 === 0) {
                tick.style.height = '15px';
            }
            tick.style.left = `${i * pixelsPerTenthInch + offset}px`;
            ruler.appendChild(tick);
        }
    }
}

// 当文档加载完成后，自动生成尺子
document.addEventListener('DOMContentLoaded', function() {
    generateRuler();
});
