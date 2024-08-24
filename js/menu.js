// Seleciona elementos do DOM
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout-button');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Variável para armazenar itens do carrinho
let cart = [];
let clientName = ''; // Nome do cliente
let tableNumber = ''; // Número da mesa

// Função para atualizar o carrinho na aba lateral
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">R$ ${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });
    totalPriceElement.textContent = total.toFixed(2);
}

// Função para adicionar um item ao carrinho
function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
}

// Adiciona evento de clique aos botões de adicionar ao carrinho
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Mostra a aba lateral do carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('show');
});

// Fecha a aba lateral do carrinho
closeCartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
});

// Envia o pedido para o WhatsApp
checkoutButton.addEventListener('click', () => {
    const message = `Mesa: ${tableNumber}\nNome: ${clientName}\nPedido:\n\n` +
                    cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('\n') +
                    `\n\nValor total: R$ ${totalPriceElement.textContent}`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5515998570140'; // Substitua pelo número do WhatsApp do estabelecimento
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

// Define o nome do cliente e número da mesa a partir do localStorage
function setClientInfo() {
    clientName = localStorage.getItem('clientName');
    tableNumber = localStorage.getItem('tableNumber');
    document.getElementById('client-name').textContent = `Nome: ${clientName}`;
    document.getElementById('table-number').textContent = `Mesa: ${tableNumber}`;
}

// Chama a função para definir as informações do cliente e mesa
setClientInfo();
