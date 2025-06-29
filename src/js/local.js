document.addEventListener('DOMContentLoaded', function() {
    // Preview de fotos
    const fotoInput = document.getElementById('fotos');
    const previewDiv = document.getElementById('preview-fotos');
    
    fotoInput.addEventListener('change', function() {
        previewDiv.innerHTML = '';
        
        if (this.files) {
            Array.from(this.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const col = document.createElement('div');
                        col.className = 'col-6 col-md-4 col-lg-3 mb-3';
                        
                        col.innerHTML = `
                            <div class="position-relative">
                                <img src="${e.target.result}" class="img-fluid" alt="Preview">
                                <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1" onclick="this.parentElement.parentElement.remove()">
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>
                        `;
                        
                        previewDiv.appendChild(col);
                    }
                    
                    reader.readAsDataURL(file);
                }
            });
        }
    });

    // Validação do CEP
    const cepInput = document.getElementById('cep');
    
    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                    }
                });
        }
    });

    // Envio do formulário
    const formAnuncio = document.getElementById('form-anuncio');
    
    formAnuncio.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação adicional pode ser adicionada aqui
        alert('Seu anúncio foi enviado para análise! Em breve estará disponível na plataforma.');
        formAnuncio.reset();
        previewDiv.innerHTML = '';
    });
});

// Função global para remover fotos
function removerFoto(btn) {
    btn.parentElement.parentElement.remove();
}