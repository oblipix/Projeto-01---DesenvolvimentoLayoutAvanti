document.addEventListener('DOMContentLoaded', function() {
  // Primeiro carregue todas as seções
  const sections = [
    { id: 'header-container', file: 'header.html' },
    { id: 'super-sale-container', file: 'super-sale.html' },
    { id: 'launches-container', file: 'launches.html' },
    { id: 'info-section-container', file: 'info-section.html' },
    { id: 'location-container', file: 'location.html' },
    { id: 'info-section2-container', file: 'info-section2.html' },
    { id: 'launches2-container', file: 'launches2.html' },
    { id: 'contact-container', file: 'contact.html' },
    { id: 'newsletter-container', file: 'newsletter.html' },
    { id: 'footer-container', file: 'footer.html' }
  ];

  // Carregar todas as seções e depois configurar a busca
  Promise.all(
    sections.map(section => 
      fetch(`./sections/${section.file}`)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.text();
        })
        .then(html => {
          document.getElementById(section.id).innerHTML = html;
        })
        .catch(error => {
          console.error(`Erro ao carregar ${section.file}:`, error);
          document.getElementById(section.id).innerHTML = `<p style="color:red">Erro ao carregar a seção ${section.file}</p>`;
        })
    )
  ).then(() => {
    // Configuração da busca - só depois que todas as seções estiverem carregadas
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');

    if (!searchButton || !searchInput || !searchResult) {
      console.error('Elementos de busca não encontrados!');
      return;
    }

    function performSearch() {
      const query = searchInput.value.trim();
      
      if (query) {
        searchResult.textContent = `Você buscou por: '${query}'`;
        searchResult.classList.add('visible');
      } else {
        searchResult.textContent = '';
        searchResult.classList.remove('visible');
      }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') performSearch();
    });

    // Configuração do Swiper (sem a vírgula extra)
    if (document.querySelector('.swiper-container')) {
      new Swiper('.swiper-container, ', {
       
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 1,
          },
        },
      });
    }
  });
});